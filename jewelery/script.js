$(function () {
	var $loginBtn = $(".btn--login");
	var $loginContainer = $(".login-container");


	$loginBtn.on('click', function(event) {
		event.preventDefault();

		$loginContainer.toggleClass('show-login');
	});
});
