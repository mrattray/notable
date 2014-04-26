$(document).ready(function() {
	var create = $('#createTopic');
	if (create){
		create.click(createTopic);
		
	}
	var update = $('#updateTopic');
	if (update) {
		update.click(updateTopic);
	}
});

var createTopic = function() {
	var title = $('#title').val();
	var desc = $('#description').val();
	$.ajax({
		url : "/topics/create",
		type : "POST",
		data : { title : title, description : desc },
		success : function (response){
			var json = $.parseJSON(response);
			window.location.replace('/topics/' + json.id);
		}
	});
};

var updateTopic = function() {
	var title = $('#title').val();
	var desc = $('#description').val();
	$.ajax({
		url : "update",
		type : "POST",
		data : { title : title, description : desc },
		success : function (response){
			var json = $.parseJSON(response);
			window.location.replace('/topics/' + json.id);
		}
	});
};
