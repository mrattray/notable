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
  app.get('/topics/:topicId/articles/:articleId', articles.get);
  /*app.get('/topics/:topicId/edit', topic.edit);
  app.put('/topics/:topicId', topic.update);
  app.del('/topics/:topicId', topic.destroy);*/
	  
  // home route
  app.get('/', topics.index);
};
