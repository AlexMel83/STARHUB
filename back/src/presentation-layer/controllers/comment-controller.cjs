const config = require("../../../config/config.cjs");
const knex = require("./../../../config/knex.config.cjs");
const commentModel = require("../../data-layer/models/comment-model.cjs");
const ApiError = require("../../middlewares/exceptions/api-errors.cjs");

class CommentController {
  async getComments(req, res, next) {
    const user = req.user;
    try {
      let response;
      if (req?.query?.id) {
        response = await commentModel.getCommentById(req.query.id);
        return res.json(response);
      } else if(req?.query?.deal_id) {
        response = await commentModel.getCommentByDealId(req.query.deal_id);
      } else {
        response = await commentModel.getAllComments();
        return res.json(response);
      };
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    };
  };

  async addComment(req, res, next) {
    const fields = req.body;
    try{
      const payload = {
      text: fields?.text,
      deal_id: fields.deal_id,
      user_id: fields?.user_id,
    };
    const comment = commentModel.addComment(payload);
    return res.status(200).json(comment);
    } catch(error){
      console.error(error);
      return next(ApiError.IntServError(error));
    };
  };

  async editComment(req, res, next) {
    const fields = req.body;
    try{
      const commentDataBase = await commentModel.getCommentById(fields.id);
    if (!commentDataBase) {
      return next(ApiError.NotFound(`comment with id: ${fields.id} was not found`));
    }
    let updatedComment = {};
    const payload = {
      id: fields.id,
      text: fields?.text ?? customerDataBase.text,
      updated_at: new Date().toISOString(),
    };
    return res.status(200).json(updatedComment);
    } catch(error){
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  };

  async deleteComment(req, res, next) {
    const id = req.query.id;
    try {
      const response = await commentModel.deleteComment(id);
      if (!response) {
        return next(ApiError.NotFound(`comment with id: ${id} was not found`));
      };
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    };
  };
};

module.exports = new CommentController();
