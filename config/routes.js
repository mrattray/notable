/**
 * Controllers
 */

var topics = require('../app/controllers/topics')
  , articles = require('../app/controllers/articles');

/**
 * Expose routes
 */

module.exports = function (app) {

  // user routes
  app.get('/topics', topics.index);
  app.get('/topics/add', topics.add);
  app.post('/topics/create', topics.create);
  app.get('/topics/:topicId', topics.get);
  app.get('/topics/:topicId/edit', topics.edit);
  app.post('/topics/:topicId/update', topics.update);
  app.get('/topics/:topicId/delete', topics.destroy);
  app.get('/topics/:topicId/articles/add', articles.add);
  app.post('/topics/:topicId/articles/create', articles.create);
  app.get('/articles/:articleId', articles.get);
  app.get('/articles/:articleId/edit', articles.edit);
  app.post('/articles/:articleId/update', articles.update);
  app.get('/articles/:articleId/delete', articles.destroy);
	  
  // home route
  app.get('/', topics.index);
};
