const config = require("../../../config/config.cjs");
const { CLIENT_URL } = process.env;
const knex = require("./../../../config/knex.config.cjs");
const userService = require("../../service-layer/services/user-service.cjs");
const userModel = require("../../data-layer/models/user-model.cjs");
const ApiError = require("../../middlewares/exceptions/api-errors.cjs");

class UserController {
  async registration(req, res) {
    let trx;
    try {
      trx = await knex.transaction();
      const { email, password, role } = req.body;
      const userData = await userService.registration(
        email,
        password,
        role,
        trx,
      );
      res.cookie("refreshToken", userData.refreshToken, config.cookieOptions);
      await trx.commit();
      return res.json(userData);
    } catch (error) {
      await trx.rollback();
      console.error(error.code);
      if (error.status === 400) {
        return res.json(ApiError.BadRequest(error));
      } else if (error.code === "ESOCKET") {
        return res.json(ApiError.IntServError("mail-server error"));
      } else {
        return res.json(ApiError.IntServError(error));
      }
    }
  }

  async login(req, res) {
    let trx;
    try {
      trx = await knex.transaction();
      const { email, password } = req.body;
      const userData = await userService.login(email, password, trx);
      res.cookie("refreshToken", userData.refreshToken, config.cookieOptions);
      trx.commit();
      userData.refreshToken = "";
      userData.accessToken = "";
      return res.json(userData);
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        res.json(ApiError.IntServError("Connection refused"));
      }
      trx.rollback();
      console.error(error);
      if (error.status === 400) {
        return res.json(ApiError.BadRequest(error));
      } else {
        return res.json(ApiError.IntServError(error));
      }
    }
  }

  async logout(req, res) {
    let trx;
    try {
      trx = await knex.transaction();
      let { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken, trx);
      res.clearCookie("refreshToken");
      await trx.commit();
      if (token === null) {
        return res.json(ApiError.BadRequest("User has already logged out"));
      } else if (token === 1) {
        return res.json("User logout completed successfully");
      }
      return res.json(token);
    } catch (error) {
      await trx.rollback();
      console.error(error);
      if (error.status === 400) {
        return res.json(ApiError.BadRequest(error));
      } else {
        return res.json(ApiError.IntServError(error));
      }
    }
  }

  async activate(req, res) {
    let trx;
    try {
      trx = await knex.transaction();
      const activationLink = req.params.link;
      const email = await userService.activate(activationLink, trx);
      trx.commit();
      return res.redirect(`${CLIENT_URL}/?email=${email}`);
    } catch (error) {
      trx.rollback();
      console.error(error);
      if (error.status === 400) {
        return res.json(ApiError.BadRequest(error));
      } else {
        return res.json(ApiError.IntServError(error));
      }
    }
  }

  async refresh(req, res) {
    let trx;
    try {
      trx = await knex.transaction();
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res.json(
          ApiError.BadRequest("User not authorized, refreToken not found"),
        );
      }
      const userData = await userService.refresh(refreshToken, trx);
      res.cookie("refreshToken", userData.refreshToken, config.cookieOptions);
      await trx.commit();
      return res.json(userData);
    } catch (error) {
      if (trx) {
        await trx.rollback();
      }
      console.error("Error:", error);
      if (error.status === 400) {
        return res.json(ApiError.BadRequest(error));
      } else {
        return res.json(ApiError.IntServError(error));
      }
    }
  }

  async getUser(req, res) {
    const user = req.user;
    try {
      let response;
      if (req?.query?.id) {
        response = await userService.getUser(req.query.id);
        if (user.id === response.id) {
          return res.json(response);
        } else {
          return res.send(ApiError.AccessDeniedForRole("User not owner"));
        }
      } else {
        return res.json(ApiError.BadRequest("parametr not found"));
      }
    } catch (error) {
      console.error(error);
      if (error.status === 400) {
        return res.json(ApiError.BadRequest(error));
      } else if (error.status === 404) {
        return res.json(ApiError.NotFound(`id: ${req.query.id} was not found`));
      } else {
        return res.json(ApiError.IntServError(error));
      }
    }
  }

  async editUser(req, res) {
    const fields = req.body;
    const userDataBase = await userModel.findUserByEmailWithHash(fields.email);
    if (!userDataBase) {
      return res.json(
        ApiError.NotFound(`user with email: ${fields.email} was not found`),
      );
    }
    let updatedUser = {};
    if (fields?.password) {
      fields.password = await userService.hashPassword(fields.password);
    }
    const payload = {
      id: userDataBase.id,
      email: fields.email,
      password: fields?.password ?? userDataBase.password,
      name: fields?.name ?? userDataBase.name,
      surname: fields?.surname ?? userDataBase.surname,
      phone: fields?.phone ?? userDataBase.phone,
      role: fields?.role ?? userDataBase.role,
      activationlink: fields?.activationlink ?? userDataBase.activationlink,
      isactivated: fields?.isactivated ?? userDataBase.isactivated,
      updated_at: new Date().toISOString(),
    };

    const userData = req.user;
    try {
      if (userData.role === "admin") {
        updatedUser = await userModel.editUser(payload);
        return res.status(200).json(updatedUser);
      } else if (userData.id === userDataBase.id) {
        payload.role = userDataBase.role;
        payload.activationlink = userDataBase.activationlink;
        payload.isactivated = userDataBase.isactivated;
        updatedUser = await userModel.editUser(payload);
        return res.status(200).json(updatedUser);
      } else {
        return res.json(ApiError.AccessDeniedForRole("User not owner"));
      }
    } catch (error) {
      console.error(error);
      if (error.status === 400) {
        return res.json(ApiError.BadRequest(error));
      } else {
        return res.json(ApiError.IntServError(error));
      }
    }
  }

  async deleteUser(req, res) {
    const userId = req.params.user_id;

    const userDataBase = await userModel.findUserById(userId);
    if (!userDataBase) {
      return res.json(
        ApiError.NotFound(`user with email: ${userId} was not found`),
      );
    }

    let response;
    try {
      const role = req.user.role;
      if (role === "admin") {
        response = await userModel.deleteUser(userId);
        return res.status(200).json(response);
      } else {
        return res.json(ApiError.AccessDeniedForRole("User not owner"));
      }
    } catch (error) {
      console.error(error);
      if (error.status === 400) {
        return res.json(ApiError.BadRequest(error));
      } else {
        return res.json(ApiError.IntServError(error));
      }
    }
  }
}

module.exports = new UserController();
