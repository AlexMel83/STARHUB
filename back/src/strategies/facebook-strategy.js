const { generators } = require("openid-client");
const crypto = require("crypto");
const fetch = require("node-fetch");
const UserModel = require("../models/user-model");
const uuid = require("uuid");

class FacebookStrategy {
  constructor(clientId, clientSecret, redirectUri) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
  }

  async generateAuthUrl() {
    const codeVerifier = generators.codeVerifier();
    const state = crypto.randomBytes(8).toString("hex");
    const url = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&state=${state}&scope=public_profile`;
    return { url, state, codeVerifier };
  }

  async handleCallback(code) {
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v12.0/oauth/access_token?client_id=${this.clientId}&client_secret=${this.clientSecret}&redirect_uri=${this.redirectUri}&code=${code}`,
    );
    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      throw new Error(tokenData.error.message);
    }
    const { access_token } = tokenData;
    const userInfoResponse = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${access_token}`,
    );
    const userInfo = await userInfoResponse.json();
    if (userInfo.error) {
      throw new Error(userInfo.error.message);
    }
    const authLink = uuid.v4();
    let user = await UserModel.findUserByFacebookId(userInfo.id);
    if (user) {
      user = await UserModel.editUser({
        id: user.id,
        activationlink: authLink,
      });
    } else {
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
        facebook_id: userInfo.id ? userInfo.id : "",
      });
    }
    return user;
  }
}

module.exports = FacebookStrategy;
