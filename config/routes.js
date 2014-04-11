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
  app.get('/topics/:topicId', topics.get);
  app.post('/topics/create', topics.create);
  /*app.get('/topics/:topicId/articles/:articleId', articles.show);
  app.post('/topics/:topicId/new', articles.create);
  app.get('/topics/:topicId/edit', topic.edit);
  app.put('/topics/:topicId', topic.update);
  app.del('/topics/:topicId', topic.destroy);*/
  

  
  // home route
  app.get('/', topics.index);
};
