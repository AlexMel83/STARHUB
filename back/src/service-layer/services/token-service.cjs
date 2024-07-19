const jwt = require("jsonwebtoken");
const { JWT_AC_SECRET, JWT_AC_EXP, JWT_RF_SECRET, JWT_RF_EXP, JWT_RF_MA } =
  process.env;
const tokenModel = require("../../data-layer/models/token-model.cjs");
const userModel = require("../../data-layer/models/user-model.cjs");
const knex = require("../../../config/knex.config.cjs");
const moment = require("moment-timezone");
const ApiError = require("../../middlewares/exceptions/api-errors.cjs");

const allowedRoles = ["user", "manager", "admin"];

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_AC_SECRET, {
      expiresIn: JWT_AC_EXP,
    });
    const refreshToken = jwt.sign(payload, JWT_RF_SECRET, {
      expiresIn: JWT_RF_EXP,
    });

    const refreshTokenExpMs = moment.duration(JWT_RF_MA).asMilliseconds();
    const expRfTokenDate = moment().add(refreshTokenExpMs, "milliseconds");

    console.log(
      "JWT_AC_EXP",
      JWT_AC_EXP,
      "accessToken",
      accessToken,
      "JWT_RF_EXP",
      JWT_RF_EXP,
      "refreshToken",
      refreshToken,
      "refreshTokenExpMs",
      refreshTokenExpMs,
      "expRfTokenDate",
      expRfTokenDate,
    );
    return {
      accessToken,
      refreshToken,
      expRfToken: expRfTokenDate.toISOString(),
    };
  }

  async saveToken(userId, refreshToken, expToken, trx = knex) {
    try {
      const tokenData = await tokenModel.getUserToken({ userId }, trx);
      if (tokenData.length) {
        tokenData.refreshToken = refreshToken;
      }
      const token = await tokenModel.saveToken(
        userId,
        refreshToken,
        expToken,
        trx,
      );
      return token;
    } catch (error) {
      console.error(error);
      throw error;
    }
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
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_RF_SECRET);
      return userData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async removeToken(refreshToken, trx) {
    try {
      const tokenData = await tokenModel.deleteOneToken(refreshToken, trx);
      return tokenData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findToken(refreshToken, trx) {
    const tokenData = await tokenModel.findOneToken(refreshToken, trx);
    return tokenData;
  }
}

module.exports = new TokenService();
