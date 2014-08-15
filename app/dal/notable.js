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
};

exports.updateDocument = function(obj) {
	var deferred = q.defer();
	notable.get(obj._id, { revs_info: true }, function (error, existing) { 
		if(!error) {
			obj._rev = existing._rev;
			notable.insert(obj, obj._id, function(error, body) {
				if (error) {
					deferred.reject(new Error(error));
				}
				else {
					deferred.resolve(body.id);
				}
			});
		}
		else {
			deferred.reject(new Error(err));
		}
	});
	return deferred.promise;
};

exports.deleteDocument = function(key){
	var deferred = q.defer();
	notable.get(key, { revs_info: true }, function (err, body){
		if (!err) {
			notable.destroy(key, body._rev, function(err, body) {
				if (err) {
					deferred.reject(new Error(err));
				}
				else {				
					deferred.resolve();
				}
			});
		}
		else {
			deferred.reject(new Error(err));
		}
	});
	return deferred.promise;
};

exports.viewDesignDocument = function(designName, viewName, id) {
	var deferred = q.defer();
	var param = {};
	if (id) {
		param = {descending: true, endkey : [id], startkey : [id,{}]};
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