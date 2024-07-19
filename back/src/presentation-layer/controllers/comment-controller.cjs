const commentModel = require("../../data-layer/models/comment-model.cjs");
const ApiError = require("../../middlewares/exceptions/api-errors.cjs");

class CommentController {
  async getComments(req, res, next) {
    try {
      let response = null;
      if (req?.query?.id) {
        response = await commentModel.getCommentById(req.query.id);
      } else if (req?.query?.deal_id) {
        response = await commentModel.getCommentsByDealId(req.query.deal_id);
      } else if (req?.query?.user_id) {
        response = await commentModel.getCommentsByUserId(req.query.deal_id);
      } else {
        response = await commentModel.getAllComments();
      }
      if (response.length) {
        return res.json(response);
      } else {
        return next(ApiError.NotFound("comment(s) not found"));
      }
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  }

  async addComment(req, res, next) {
    let user_id = req?.user?.id;
    if (!user_id) {
      return next(ApiError.UnauthorizedError("User not autorized"));
    }
    const fields = req.body;
    try {
      const payload = {
        text: fields?.text,
        deal_id: fields.deal_id,
        user_id: user_id,
      };
      console.log(payload);
      const comment = commentModel.addComment(payload);
      return res.status(200).json(comment);
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  }

  async editComment(req, res, next) {
    const fields = req.body;
    try {
      const commentDataBase = await commentModel.getCommentById(fields.id);
      if (!commentDataBase) {
        return next(
          ApiError.NotFound(`comment with id: ${fields.id} was not found`),
        );
      }
      const payload = {
        id: fields.id,
        text: fields?.text ?? commentDataBase.text,
        updated_at: new Date().toISOString(),
      };
      let updatedComment = await commentModel.editComment(payload);
      return res.status(200).json(updatedComment);
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  }

  async deleteComment(req, res, next) {
    const id = req.query.id;
    try {
      const response = await commentModel.deleteComment(id);
      if (!response) {
        return next(ApiError.NotFound(`comment with id: ${id} was not found`));
      }
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  }
}

module.exports = new CommentController();
