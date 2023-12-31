const { checkExists } = require("../db/seeds/utils");
const {
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
  incrementArticleVotes,
  insertComment,
  insertArticle,
  removeArticleById,
} = require("../models/index.models");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { topic, sort_by, order, limit, p } = req.query;

  const articlePromises = [selectArticles(topic, sort_by, order, limit, p)];

  if (topic) articlePromises.push(checkExists("topics", "slug", topic));

  Promise.all(articlePromises)
    .then(([articles]) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const {
    query: { limit, p },
    params: { article_id },
  } = req;

  Promise.all([
    selectCommentsByArticleId(article_id, limit, p),
    checkExists("articles", "article_id", article_id),
  ])
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.patchVotesByArticleId = (req, res, next) => {
  const {
    body: { inc_votes },
    params: { article_id },
  } = req;
  Promise.all([
    incrementArticleVotes(inc_votes, article_id),
    checkExists("articles", "article_id", article_id),
  ])
    .then(
      ([
        {
          rows: [article],
        },
      ]) => {
        res.status(200).send({ article });
      }
    )
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const {
    body: { username, body },
    params: { article_id },
  } = req;
  insertComment(body, username, article_id)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  const {
    body: { author, title, topic, body, article_img_url },
  } = req;
  insertArticle(author, title, topic, body, article_img_url)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch(next);
};

exports.deleteArticleById = (req, res, next) => {
  const { article_id } = req.params;
  removeArticleById(article_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};