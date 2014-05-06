$(document).ready(function() {
	var create = $('#createArticle');
	if (create){
		create.click(createArticle);
		
	}
	var update = $('#updateArticle');
	if (update) {
		update.click(updateArticle);
	}
});

var createArticle = function() {
	var title = $('#title').val();
	var content = $('#content').val();
	$.ajax({
		url : "create",
		type : "POST",
		data : { title : title, content : content },
		success : function (response){
			var json = $.parseJSON(response);
			window.location.replace('/articles/' + json.id);
		}
	});
};


var updateArticle = function() {
	var title = $('#title').val();
	var content = $('#content').val();
	var timestamp = $('#timestamp').val();
	var topicId = $('#topicId').val();
	$.ajax({
		url : "update",
		type : "POST",
		data : { title : title, content : content, timestamp : timestamp, topicId : topicId},
		success : function (response){
			var json = $.parseJSON(response);
			window.location.replace('/articles/' + json.id);
		}
	});
};
