const customerModel = require("../../data-layer/models/customer-model.cjs");
const ApiError = require("../../middlewares/exceptions/api-errors.cjs");

class CustomerController {
  async getCustomers(req, res, next) {

    try {
      let response;
      if (req?.query?.id) {
        response = await customerModel.getCustomerById(req.query.id);
        return res.json(response);
      } else {
        response = await customerModel.getAllCustomers();
        return res.json(response);
      };
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    };
  };

  async addCustomer(req, res, next) {
    const fields = req.body;
    try{
      const payload = {
      name: fields?.name,
      email: fields.email,
      avatar_url: fields?.avatar_url,
      from_source: fields?.from_source,
    };
    const customer = customerModel.addCustomer(payload);
    return res.status(200).json(customer);
    } catch(error){
      console.error(error);
      return next(ApiError.IntServError(error));
    };
  };

  async editCustomer(req, res, next) {
    const fields = req.body;
    try{
      const customerDataBase = await customerModel.getCustomerById(fields.id);
    if (!customerDataBase) {
      return next(ApiError.NotFound(`customer with id: ${fields.id} was not found`));
    }
   
    const payload = {
      id: fields.id,
      name: fields?.name ?? customerDataBase.name,
      email: fields.email ?? customerDataBase.email,
      avatar_url: fields?.avatar_url ?? userDataBase.avatar_url,
      from_source: fields?.from_source ?? userDataBase.from_source,
      updated_at: new Date().toISOString(),
    };
    const updatedCustomer = await customerModel.editCustomer(payload);
    return res.status(200).json(updatedCustomer);
    } catch(error){
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  };

  async deleteCustomer(req, res, next) {
    const id = req.query.id;
    try {
      const response = await customerModel.deleteCustomer(id);
      if (!response) {
        return next(ApiError.NotFound(`customer with id: ${id} was not found`));
      };
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    };
  };
};

module.exports = new CustomerController();
