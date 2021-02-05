//Vanilla remove class function
HTMLElement.prototype.removeClass = function(remove) {
  var newClassName = "";
  var i;
  var classes = this.className.split(" ");
  for (i = 0; i < classes.length; i++) {
    if (classes[i] !== remove) {
      newClassName += classes[i] + " ";
    }
  }
  if (newClassName.trim) {
    newClassName = newClassName.trim();
  }
  this.className = newClassName;
}


console.log('not ready');

function svgLoadCookie(){

	//var mainContent = document.getElementById('loader-wrapper');
	//loader = document.getElementById('loader-content');
	var hiddenContent = document.getElementById('main-content-wrapper');

	var mainContent = document.querySelector('#loader-wrapper');
	var loader = document.querySelector('#loader-content');

	if (!Cookies.get('loaded')){

		Cookies.set('loaded', 'true', {expires: 1});

		let stateCheck = setInterval(() => {


			if (document.readyState === 'complete') {

				clearInterval(stateCheck);
				// Faking the animation intro
				mainContent.removeClass('js-loading');
				//$('.wrapper').removeClass('hidden-main-content');
				hiddenContent.removeClass('hidden-main-content');
				//$('#loader-wrapper').hide('slow');
				//document.body.classList.add('loaded');
				document.body.className += 'loaded';
				console.log('ready + cookie set');
				//svgLoadCookie();
				// document ready
			} else {
			//
			}
		}, 100);

	} else {

		//document.body.className += 'loaded';
		document.body.classList.add('loaded');
		mainContent.style.display = 'none';
		hiddenContent.removeClass('hidden-main-content');
		console.log('ready + existing cookie');
	};
};


window.onload = function() { // same as window.addEventListener('load', (event) => {
	svgLoadCookie();
};
