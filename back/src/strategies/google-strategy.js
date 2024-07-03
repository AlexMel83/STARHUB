const { Issuer, generators } = require("openid-client");
const UserModel = require("../models/user-model");
const uuid = require("uuid");

class GoogleStrategy {
  constructor(clientId, clientSecret, redirectUri) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.issuer = null;
    this.client = null;
    this.init();
  }

  async init() {
    this.issuer = await Issuer.discover("https://accounts.google.com");
    this.client = new this.issuer.Client({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uris: [this.redirectUri],
      response_types: ["code"],
    });
  }

  async generateAuthUrl() {
    const codeVerifier = generators.codeVerifier();
    const codeChallenge = generators.codeChallenge(codeVerifier);
    const url = this.client.authorizationUrl({
      scope:
        "openid email profile phone https://www.googleapis.com/auth/user.phonenumbers.read",
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
      state: generators.state(),
    });
    return { url, codeVerifier };
  }

  async handleCallback(code, codeVerifier) {
    const authLink = uuid.v4();
    const tokenSet = await this.client.callback(
      this.redirectUri,
      { code },
      { code_verifier: codeVerifier },
    );
    const userInfo = await this.client.userinfo(tokenSet.access_token);
    let user = await UserModel.findUserByGoogleId(userInfo.sub);
    if (user) {
      user = await UserModel.editUser({
        id: user.id,
        activationlink: authLink,
      });
    } else {
      try {
        [user] = await UserModel.insertUser({
          email: userInfo.email ? userInfo.email : "",
          role: "user",
          name: userInfo.given_name || userInfo.name.split(" ")[0],
          surname: userInfo.family_name || userInfo.name.split(" ")[1],
          phone: userInfo.phone_number,
          picture: userInfo.picture,
          activationlink: authLink,
          isactivated: true,
          social_login: true,
          google_id: userInfo.sub,
        });
      } catch (error) {
        throw error;
      }
    }
    return user;
  }
}

module.exports = GoogleStrategy;