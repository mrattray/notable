$(document).ready(function() {
	$('#createArticle').click(createArticle);
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
			window.location.replace(json.id);
		}
	});
};
