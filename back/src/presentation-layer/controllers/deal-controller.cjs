const config = require("../../../config/config.cjs");
const knex = require("./../../../config/knex.config.cjs");
const dealModel = require("../../data-layer/models/deal-model.cjs");
const customerModel = require("../../data-layer/models/customer-model.cjs");
const ApiError = require("../../middlewares/exceptions/api-errors.cjs");

class dealController {
  async getDeals(req, res, next) {
    try {
      let response;
      if (req?.query?.id) {
        response = await dealModel.getDealById(req.query.id);
        return res.json(response);
      } else if (req?.query?.customer_id) {
        response = await dealModel.getDealsByCustomerId(req.query.customer_id);
        return res.json(response);
      } else {
        response = await dealModel.getAllDeals();
        return res.json(response);
      }
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  }

  async addDeal(req, res, next) {
    const fields = req.body;
    const customerFields = {
      customer_email: req.body.customer_email,
      customer_name: req.body.customer_name,
    };
    const trx = await knex.transaction();
    let customer = {
      name: customerFields.customer_name,
      email: customerFields.customer_email,
    };
    try {
      const custmerByName = await customerModel.getCustomerByName(
        customerFields.customer_name,
        trx,
      );
      if (custmerByName) {
        customer.id = custmerByName.id;
        customer = await customerModel.editCustomer(customer, trx);
      } else {
        const customerByEmail = await customerModel.getCustomerByEmail(
          customerFields.customer_email,
          trx,
        );
        if (customerByEmail) {
          customer.id = customerByEmail.id;
          customer = await customerModel.editCustomer(customer, trx);
        } else {
          [customer] = await customerModel.addCustomer(customer, trx);
        }
      }
      const payload = {
        name: fields.name,
        price: fields?.price,
        status: fields.status,
        customer_id: customer.id,
      };
      const deal = await dealModel.addDeal(payload, trx);
      await trx.commit();
      return res.status(200).json(deal);
    } catch (error) {
      console.error(error);
      await trx.rollback();
      return next(ApiError.IntServError(error));
    }
  }

  async editDeal(req, res, next) {
    const fields = req.body;
    try {
      const dealDataBase = await dealModel.getDealById(fields.id);
      if (!dealDataBase) {
        return next(
          ApiError.NotFound(`deal with id: ${fields.id} was not found`),
        );
      }
      const payload = {
        id: fields.id,
        name: fields?.name ?? dealDataBase.name,
        price: fields?.price ?? dealDataBase.price,
        status: fields.status ?? dealDataBase.status,
        customer_id: fields?.customer_id ?? dealDataBase.customer_id,
        updated_at: new Date().toISOString(),
      };
      const response = await dealModel.editDeal(payload);
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  }

  async deleteDeal(req, res, next) {
    const id = req.query.id;
    try {
      const response = await dealModel.deleteDeal(id);
      if (!response) {
        return next(ApiError.NotFound(`deal with id: ${id} was not found`));
      }
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  }
}

module.exports = new dealController();
