var notable = require('../dal/notable')
var q = require('q');

exports.index = function(req, res){
	notable.viewDesignDocument('topics', 'topics').then(function(rows){
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
	notable.addDocument(doc).then(function(id) {
		res.write(JSON.stringify({ "id" : id }));
		res.end();
	});
};

exports.get = function(req, res) {
	var topId = req.params.topicId;
	q.all([notable.viewDesignDocument('articles', 'articles', topId), notable.getDocument(topId)])
		.spread(function(articles, topic) {
			res.render('topics/topic', {
				title: topic.title,
				topic: topic,
				articles: articles
			});
		});
};

exports.edit = function(req, res) {
	var topId = req.params.topicId;
	notable.getDocument(topId).then(function(topic){
		res.render('topics/add', {
			title: 'Edit ' + topic.title,
			topic: topic
		});
	});
};

exports.update = function(req, res) {
	var doc = {
		id : req.params.topicId,
		title : req.body.title,
		description : req.body.description,
		type : "topic"
	};
	notable.updateDocument(doc).then(function(id) {
		res.write(JSON.stringify({ "id" : id }));
		res.end();
	});
};

exports.destroy = function(req, res) {
	var id = req.params.topicId;
	notable.deleteDocument(id).then(function(){
		res.end();
	});
};

