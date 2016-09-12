document.getElementById('top-menu-toggler').addEventListener('click', function(e) {
	var navMenu = document.getElementById('top-menu-list');
	
	if (navMenu.className.indexOf('is-visible') > -1) {
		navMenu.classList.remove('is-visible');
	}
	else {
		navMenu.classList.add('is-visible');
	}
})