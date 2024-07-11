const config = require("../../../config/config.cjs");
const knex = require("./../../../config/knex.config.cjs");
const dealModel = require("../../data-layer/models/deal-model.cjs");
const ApiError = require("../../middlewares/exceptions/api-errors.cjs");

class dealController {
  async getDeals(req, res, next) {
    try {
      let response;
      if (req?.query?.id) {
        response = await dealModel.getDealById(req.query.id);
        return res.json(response);
      } else if(req?.query?.customer_id) {
        response = await dealModel.getDealsByCustomerId(req.query.customer_id);
        return res.json(response);
      } else {
        response = await dealModel.getAllDeals();
        return res.json(response);
      };
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    };
  };

  async addDeal(req, res, next) {
    const fields = req.body;
    try{
      const payload = {
        name: fields.name,
        price: fields?.price,
        status: fields.status,
        customer_id: fields?.customer_id,
    };
    const deal = dealModel.addDeal(payload);
    return res.status(200).json(deal);
    } catch(error){
      console.error(error);
      return next(ApiError.IntServError(error));
    };
  };

  async editDeal(req, res, next) {
    const fields = req.body;
    try{
      const dealDataBase = await dealModel.getDealById(fields.id);
    if (!dealDataBase) {
      return next(ApiError.NotFound(`deal with id: ${fields.id} was not found`));
    }
    let updatedDeal = {};
    const payload = {
      id: fields.id,
      name: fields?.name ?? dealDataBase.name,
      price: fields?.price ?? dealDataBase.price,
      status: fields.status ?? dealDataBase.status,
      customer_id: fields?.customer_id ?? dealDataBase.customer_id,
      updated_at: new Date().toISOString(),
    };
    return res.status(200).json(updatedDeal);
    } catch(error){
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  };

  async deleteDeal(req, res, next) {
    const id = req.query.id;
    try {
      const response = await dealModel.deleteDeal(id);
      if (!response) {
        return next(ApiError.NotFound(`deal with id: ${id} was not found`));
      };
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    };
  };
};

module.exports = new dealController();