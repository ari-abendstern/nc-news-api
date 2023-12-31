const endpoints = require("../endpoints.json");
const { selectTopics, insertTopic } = require("./topics.models");
const {
  selectArticles,
  selectArticleById,
  removeArticleById,
  incrementArticleVotes,
  insertArticle,
} = require("./articles.models");
const {
  selectCommentsByArticleId,
  insertComment,
  removeCommentById,
  incrementCommentVotes,
} = require("./comments.models");
const { selectUsers, selectUserByUsername } = require("./users.models");

const selectEndpoints = () => {
  return endpoints;
};

module.exports = {
  selectTopics,
  insertTopic,
  selectArticles,
  selectArticleById,
  removeArticleById,
  incrementArticleVotes,
  insertArticle,
  selectCommentsByArticleId,
  insertComment,
  removeCommentById,
  incrementCommentVotes,
  selectUsers,
  selectUserByUsername,
  selectEndpoints,
};
