//Load html partials
includeHTML();

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
