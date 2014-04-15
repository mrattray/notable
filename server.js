#!/usr/bin/env node
var debug = require('debug')('my-application');

var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config/config.js');
var nano = require('nano')(config.database.db);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || config.node.port);

require('./config/routes')(app);

nano.db.get(config.database.name, function (err, body) {
	if (err) {
		nano.db.create('notable');
	}
	else {
		console.log('notable database already existed');
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

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

module.exports = app;