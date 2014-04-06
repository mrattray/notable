
var nano = require('nano')('http://localhost:5984');
var notable = nano.use('notable');


exports.index = function(req, res){
	notable.list(function(err, body) {
		if (!err) {
	      res.render('topics/index', {
	        title: 'Topics',
	        topics: body.rows
	      });
		}
	});
};

exports.get = function(req, res) {
	req.params.topicId
};