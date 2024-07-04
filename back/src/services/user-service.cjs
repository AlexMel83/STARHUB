const UserModel = require("../models/user-model.cjs");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service.cjs");
const tokenService = require("./token-service.cjs");
const UserDto = require("../dtos/user-dto.cjs");
const { API_URL } = process.env;
const ApiError = require("../exceptions/api-errors.cjs");

class UserService {
  async registration(email, password, role, trx) {

    const candidate = await UserModel.findUserByEmail(email);

    if (candidate) {
      throw ApiError.BadRequest(`User with some email ${email} already exist`);
    }
    if (role != "user" && role != "manager" && role != "admin") {
      throw ApiError.BadRequest(`role ${role} not found`);
    }

    const activationLink = uuid.v4();
    const hashPassword = await this.hashPassword(password);
    const user = await UserModel.insertUser(
      { email, password: hashPassword, role, activationlink: activationLink },
      trx,
    );
    if (process.env.NODE_ENV === "development") {
      await mailService.sendActivationMail(
        email,
        `${API_URL}/activate/${activationLink}`,
      );
    } else {
      await mailService.sendActivationMail(
        email,
        `${API_URL}/activate/${activationLink}`,
      );
    }
    const userDto = new UserDto(user[0]);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(user[0].id, tokens.refreshToken, trx);

    return {
      ...tokens,
      user: user,
    };
  }

  async activate(activationLink, trx) {
    const user = await UserModel.findUserByActivationLink(activationLink, trx);
    if (!user) {
      throw ApiError.BadRequest("Wrong activation link");
    }
    if (user.isactivated) {
      throw ApiError.BadRequest("User already activated");
    }

    user.isactivated = true;
    const userData = {
      email: user.email,
      isactivated: user.isactivated,
    };

    await UserModel.activateUser(userData, trx);

    return userData.email;
  }

  async login(email, password, trx) {
    const user = await UserModel.findUserByEmailWithHash(email);

    if (!user) {
      throw ApiError.NotFound(`Користувач з email: ${email} не знайдений`);
    }

    if (!user.isactivated) {
      throw ApiError.BadRequest(`Обліковий запис: ${email} не активовано`);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Невірний пароль");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken, trx);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken, trx) {
    const token = await tokenService.removeToken(refreshToken, trx);
    return token;
  }

  async refresh(refreshToken, trx) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken, trx);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findUserByEmail(userData.email, trx);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken, trx);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async getUser(id) {
    const user = await UserModel.findUserById(id);
    if (!user) {
      throw ApiError.NotFound(`id: ${id} was not found`);
    }
    return user;
  }

  async hashPassword(password) {
    const hashPassword = await bcrypt.hash(password, 3);
    return hashPassword;
  }
}

module.exports = new UserService();
