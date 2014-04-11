$(document).ready(function() {
	$('#createTopic').click(createTopic);
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
