var notable = require('../dal/notable')
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
	notable.addDocument(doc).then(function(id) {
		res.write(JSON.stringify({ "id" : id }));
		res.end();
	});
};

exports.get = function(req, res) {
	var artId = req.params.articleId;
	notable.getDocument(artId).then(function(article)
		{
			res.render('articles/article', {
				title: article.title,
				article: article,
			});
		});
};


exports.edit = function(req, res) {
	var artId = req.params.articleId;
	notable.getDocument(artId).then(function(article){
		res.render('articles/add', {
			title: 'Edit ' + article.title,
			article: article
		});
	});
};

exports.update = function(req, res) {
	var doc = {
		_id : req.params.articleId,
		title : req.body.title,
		content : req.body.content,
		timestamp: req.body.timestamp,
		topicId: req.body.topicId,
		type : "article"
	};
	notable.updateDocument(doc).then(function(id) {
		res.write(JSON.stringify({ "id" : id }));
		res.end();
	});
};

exports.destroy = function(req, res) {
	var id = req.params.articleId;
	notable.deleteDocument(id).then(function(){
		res.end();
	});
};