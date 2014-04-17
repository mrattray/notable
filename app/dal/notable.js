var config = require('../../config/config.js');
var nano = require('nano')(config.database.db);
var notable = nano.use(config.database.name);
var q = require('q');

exports.getDocument = function(docId) {
	var deferred = q.defer();
	notable.get(docId, function(err, body) {
		if (err){
			deferred.reject(new Error(err));
		}
		else {
			deferred.resolve(body);
		}
	});
	return deferred.promise;
};


exports.addDocument = function(doc) {
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

exports.viewDesignDocument = function(designName, viewName, id) {
	var deferred = q.defer();
	var param = {};
	if (id) {
		param = {key : id};
	}
	notable.view(designName, viewName, param, function(err, body) {
		if (err){
			deferred.reject(new Error(err));
		}
		else {
			deferred.resolve(body.rows);
		}
	});
	return deferred.promise;
};