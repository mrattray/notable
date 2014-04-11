
var nano = require('nano')('http://localhost:5984');
var notable = nano.use('notable');
var q = require('q');

exports.index = function(req, res){
	getTopics().then(function(rows){
		res.render('topics/index', {
	        title: 'Topics',
	        topics: rows
	      });
	});
};

exports.add = function(req, res) {
	res.render('topics/add', {
		title: 'Create Topic'
	});
};

exports.create = function(req, res){
	var doc = {
		title : req.body.title,
		description : req.body.description,
		type : "topic"
	};
	addTopic(doc).then(function(id) {
		res.write(JSON.stringify({ "id" : id }));
		res.end();
	});
};

exports.get = function(req, res) {
	var topId = req.params.topicId;
	q.all([getArticles(topId), getTopic(topId)])
		.spread(function(articles, topic) {
			res.render('topics/topic', {
				title: topic.title,
				topic: topic,
				articles: articles
			});
		});
};

var addTopic = function(doc) {
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

var getTopics = function() {
	var deferred = q.defer();
	notable.view('topics', 'topics', function(err, body) {
		if (err){
			deferred.reject(new Error(err));
		}
		else {
			deferred.resolve(body.rows);
		}
	});
	return deferred.promise;
};

var getArticles = function(topicId) {
	var deferred = q.defer();
	notable.view('articles', 'articles', {key: topicId}, function(err, body) {
		if (err){
			deferred.reject(new Error(err));
		}
		else {
			deferred.resolve(body.rows);
		}
	});
	return deferred.promise;
};

var getTopic = function(topicId) {
	var deferred = q.defer();
	notable.get(topicId, function(err, body) {
		if (err){
			deferred.reject(new Error(err));
		}
		else {
			deferred.resolve(body);
		}
	});
	return deferred.promise;
};