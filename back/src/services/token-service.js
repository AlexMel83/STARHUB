const jwt = require("jsonwebtoken");
const { JWT_AC_SECRET, JWT_AC_EXP, JWT_RF_SECRET, JWT_RF_EXP } = process.env;
const tokenModel = require("./../models/token-model");
const userModel = require("./../models/user-model");
const knex = require("./../../config/knex.config");
const ApiError = require("./../exceptions/api-errors");

const allowedRoles = ["user", "manager", "admin"];

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_AC_SECRET, {
      expiresIn: JWT_AC_EXP,
    });
    const refreshToken = jwt.sign(payload, JWT_RF_SECRET, {
      expiresIn: JWT_RF_EXP,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateAccessToken(token, next) {
    try {
      const userData = jwt.verify(token, process.env.JWT_AC_SECRET);
      const userDataBase = await userModel.findUserByEmail(userData.email);
      userDataBase.iat = userData.iat;
      userDataBase.exp = userData.exp;
      if (!userDataBase) {
        return next(
          ApiError.NotFound(`email: ${userData.email} was not found`),
        );
      }
      const isactivated_token = userDataBase.isactivated;
      if (!isactivated_token) {
        return next(ApiError.AccessDeniedForRole("User not activated"));
      }
      const { role } = userDataBase;
      if (allowedRoles.includes(role)) {
        return userDataBase;
      } else {
        return next(ApiError.AccessDeniedForRole("Wrong role"));
      }
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_RF_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken, trx = knex) {
    try {
      const tokenData = await tokenModel.getUserToken({ userId }, trx);
      if (tokenData.length) {
        tokenData.refreshToken = refreshToken;
      }
      const token = await tokenModel.saveToken(userId, refreshToken, trx);
      return token;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async removeToken(refreshToken, trx) {
    try {
      const tokenData = await tokenModel.deleteOneToken(refreshToken, trx);
      return tokenData;
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken, trx) {
    const tokenData = await tokenModel.findOneToken(refreshToken, trx);

    return tokenData;
  }
}

module.exports = new TokenService();
