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

// function introAnimate() {

// 	//mainContent.classList.add('js-loading');

// 	//window.addEventListener("load", svgLoadCookie, false);

// 	// function svgLoadCookie() {
// 	// 	mainContent.removeClass('js-loading');
// 	// 	//$('.wrapper').removeClass('hidden-main-content');
// 	// 	hiddenContent.removeClass('hidden-main-content');
// 	// 	//$('#loader-wrapper').hide('slow');
// 	// 	//document.body.classList.add('loaded');
// 	// 	document.body.className += 'loaded';
// 	// }

// 	//setTimeout(svgLoadCookie, 2500);	
// };

// introAnimate();

console.log('not ready');

// function svgLoadCookie(){

// 	var mainContent = document.getElementById('loader-wrapper');
// 	var loader = document.getElementById('loader-content');
// 	var hiddenContent = document.getElementById('main-content-wrapper');

// 	if (!Cookies.get('loaded')){

// 		Cookies.set('loaded', 'true', {expires: 1});

// 		let stateCheck = setInterval(() => {


// 			if (document.readyState === 'complete') {

// 				clearInterval(stateCheck);
// 				// Faking the animation intro
// 				mainContent.removeClass('js-loading');
// 				//$('.wrapper').removeClass('hidden-main-content');
// 				hiddenContent.removeClass('hidden-main-content');
// 				//$('#loader-wrapper').hide('slow');
// 				//document.body.classList.add('loaded');
// 				document.body.className += 'loaded';
// 				console.log('ready + cookie set');
// 				//svgLoadCookie();
// 				// document ready
// 			} else {
// 			//
// 			}
// 		}, 100);

// 	} else {

// 		//document.body.className += 'loaded';
// 		document.body.classList.add('loaded');
// 		mainContent.style.display = 'none';
// 		hiddenContent.removeClass('hidden-main-content');
// 		console.log('ready + existing cookie');
// 	};
// };

// window.onload = function() { // same as window.addEventListener('load', (event) => {
// 	svgLoadCookie();
// };

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
         
          elmnt.removeAttribute("include-html");
          includeHTML();
          
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};