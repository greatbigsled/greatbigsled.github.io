(function(){
	var companionsToggle = document.querySelector('.companions-toggle'),
		moreCompanions = document.querySelector('.companions-all'),
		dirLinks = document.querySelectorAll('.dir-nav a'),
		dirItems = document.querySelectorAll('.dir-item'),
		closeBtn = document.querySelector('.btn-close'),
		orderToggle = document.querySelector('.order-toggle'),
		orderForm = document.querySelector('.directions-form'),
		colorsList = {
			'show-blue' : 'item-blue',
			'show-red' : 'item-red',
			'show-yellow' : 'item-yellow',
			'show-green' : 'item-green',
			'show-purple' : 'item-purple',
			'show-orange' : 'item-orange'
		};

	var mainMenuToggle = document.querySelector('.nav-toggle'),
		mainMenuList = document.querySelector('.nav-list');

	mainMenuToggle.addEventListener('click', function(e){
		e.preventDefault();

		mainMenuList.classList.toggle('show-item');
		console.log(this.className);
	});



	orderToggle.addEventListener('click', function(e){
		e.preventDefault();

		orderForm.classList.toggle('no-display');
		console.log(this.className);
	});

	closeBtn.addEventListener('click', function(e){
		e.preventDefault();

		orderForm.classList.toggle('no-display');
		console.log(this.className);
	});


	companionsToggle.addEventListener('click', function(e){
		e.preventDefault();

		moreCompanions.className += ' companions-show';
		this.className += ' no-display';
		console.log(this.className);
	});
})();