const { selectTopics, selectEndpoints } = require("./topics.models");
const {selectArticleById} = require('./articles.models');

module.exports = { selectTopics, selectArticleById, selectEndpoints };
