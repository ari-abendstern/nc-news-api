const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleById,
  patchVotesByArticleId,
  getCommentsByArticleId,
  postCommentByArticleId,
  postArticle,
  deleteArticleById,
} = require("../controllers/index.controllers");

articlesRouter.route("/").get(getArticles).post(postArticle);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchVotesByArticleId)
  .delete(deleteArticleById);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = articlesRouter;
