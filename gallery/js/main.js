jQuery(document).ready(function($) {
	var lang = $(".head-nav .lang");

	lang.on('click', function(event) {
		if($(event.target).is(".head-nav .lang")) {
			$(this).children('ul').toggleClass('is-visible');
		}
	});

	var lang = $(".head-nav .user");

	lang.on('click', function(event) {
		if($(event.target).is(".head-nav .user")) {
			$(this).children('ul').toggleClass('is-visible');
		}
	});

	var lang = $(".head-nav .menu");

	lang.on('click', function(event) {
		if($(event.target).is(".head-nav .menu")) {
			$(this).children('ul').toggleClass('is-visible');
		}
	});

	$("#lightgallery").lightGallery(); 
});