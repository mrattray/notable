var config = require('../../config/config.js');
var nano = require('nano')(config.database.db);

nano.db.get(config.database.name, function (err, body) {
	if (err) {
		nano.db.create(config.database.name);
	}
	else {
		console.log(config.database.name + ' database already existed');
	}
});

var notable = nano.use(config.database.name);

notable.insert(
	{ "views": 
		{ "topics": { 
			"map": function(doc) {   
				if (doc.type == 'topic') {
					emit(doc._id, {Title: doc.title, Description: doc.description});
				}
			}
		} 
	}
	}, '_design/topics', function (err, res) {
	if (!err) {
		console.log("added design document");
	}
	else {
		console.log("design document already exists.");
	}
  });
notable.insert(
	{ "views": 
		{ "articles": { 
			"map": function(doc) {   
				if (doc.type == 'article') {
					emit(doc.topicId, {Title: doc.title, Content: doc.content, TimeStamp: doc.timestamp});
				}
			}
		}
	}
	}, '_design/articles', function (err, res) {
	if (!err) {
		console.log("added design document");
	}
	else {
		console.log("design document already exists.");
	}
  });