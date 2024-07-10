const tokenService = require("./token-service.cjs");
const UserDto = require("../../data-layer/dtos/user-dto.cjs");
const GoogleStrategy = require("../strategies/google-strategy.cjs");
const FacebookStrategy = require("../strategies/facebook-strategy.cjs");
const ApiError = require("../../middlewares/exceptions/api-errors.cjs");
const UserModel = require("../../data-layer/models/user-model.cjs");
const config = require("../../../config/config.cjs");
const uuidRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
const emailRegex = /\(email\)=\(([^)]+)\)/;
const {
  CLIENT_URL,
  API_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
} = process.env;

class SocialLoginService {
  constructor() {
    this.strategies = {
      google: new GoogleStrategy(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        `${API_URL}/social-login/google/callback`,
      ),
      facebook: new FacebookStrategy(
        FACEBOOK_CLIENT_ID,
        FACEBOOK_CLIENT_SECRET,
        `${API_URL}/social-login/facebook/callback`,
      ),
    };
  }

  async generateAuthUrl(provider) {
    const strategy = this.strategies[provider];
    if (!strategy) {
      throw new Error(`Unsupported provider: ${provider}`);
    }
    return strategy.generateAuthUrl();
  }

  async handleCallback(provider, code, codeVerifier, res) {
    const strategy = this.strategies[provider];
    if (!strategy) {
      return res.json(ApiError.BadRequest(`Unsupported provider: ${provider}`));
    }
    try {
      const user = await strategy.handleCallback(code, codeVerifier);
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(user.id, tokens.refreshToken);
      res.cookie("refreshToken", tokens.refreshToken, config.rFcookieOptions);
      const frontendRedirectUri = `${CLIENT_URL}?authLink=${user.activationlink}`;
      return res.redirect(frontendRedirectUri);
    } catch (error) {
      console.error(error);
      const match = error.detail.match(emailRegex);
      if (match) {
        const email = match[1];
        const errorMessage = email;
        return res.redirect(
          `${CLIENT_URL}?email=${email}&error=${encodeURIComponent(errorMessage)}`,
        );
      }
      return res.json(ApiError.BadRequest(error));
    }
  }

  async getAuthUser(authLink, res) {
    if (!uuidRegex.test(authLink)) {
      throw ApiError.BadRequest("Wrong auth link");
    }
    try {
      const userData = await UserModel.findUserByActivationLink(authLink);
      if (!userData) {
        throw ApiError.BadRequest("Wrong auth link");
      }
      if (userData) {
        return res.json(userData);
      }
      return res.status(401).json({ message: "Unauthorized" });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new SocialLoginService();
