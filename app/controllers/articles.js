var nano = require('nano')('http://localhost:5984');
var notable = nano.use('notable');
var q = require('q');

exports.add = function(req, res) {
	res.render('articles/add', {
		title: 'Create Article'
	});
};

exports.create = function(req, res){
	var doc = {
		title : req.body.title,
		content : req.body.content,
		type : "article",
		topicId : req.params.topicId,
		timestamp : new Date()
	};
	addArticle(doc).then(function(id) {
		res.write(JSON.stringify({ "id" : id }));
		res.end();
	});
};

exports.get = function(req, res) {
	var topId = req.params.topicId;
	var artId = req.params.articleId;
	getArticle(artId).then(function(article)
		{
			res.render('articles/article', {
				title: article.title,
				article: article,
			});
		});
};

var addArticle = function(doc) {
	var deferred = q.defer();
	notable.insert(doc, function(err, body){
		if (err) {
			deferred.reject(new Error(err));
		}
		else {
			deferred.resolve(body.id);
		}
	});
	return deferred.promise;
}

var getArticle = function(articleId) {
	var deferred = q.defer();
	notable.get(articleId, function(err, body) {
		if (err){
			deferred.reject(new Error(err));
		}
		else {
			deferred.resolve(body);
		}
	});
	return deferred.promise;
};