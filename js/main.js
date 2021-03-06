// DOM Ready
$(document).on('ready', function(){
    //console.log('js running?');

	// Setting a cookie for the intro loader
	
	// function svgLoadCookie(){
		
	// 	// if the cookie 'loaded' does not exist, do this -
		
	// 	if (!Cookies.get('loaded')){
	// 		Cookies.set('loaded', 'true', {expires: 1});
		
	// 	// Faking the animation intro
	// 	    // var introAnimate = setTimeout(function(){

	// 	    //     $('body').addClass('loaded');

	// 	    //     if ($('body').hasClass('loaded')){
	// 	    //     	$('.wrapper').delay(0).queue(function(next){
	// 	    //     		$(this).removeClass('hidden-main-content');
	// 	    //     		next();
	// 	    //     	});
	// 	    // 	}
		    
	// 	    // }, 0);

	// 		let stateCheck = setInterval(() => {
	// 			if (document.readyState === 'complete') {
	// 				clearInterval(stateCheck);
	// 				// Faking the animation intro
	// 				var introAnimate = setTimeout(function(){

	// 				    $('body').addClass('loaded');

	// 				    if ($('body').hasClass('loaded')){
	// 				    	$('.wrapper').delay(0).queue(function(next){
	// 				    		$(this).removeClass('hidden-main-content');
	// 				    		next();
	// 				    	});
	// 					}

	// 				}, 0);
	// 				// document ready
	// 			}
	// 		}, 100);


	// 	// otherwise, if the cookie exists do this -
		
	// 	} else {
	// 		$('body').addClass('loaded');
	//     	$('.wrapper').removeClass('hidden-main-content');
	//     	$('#loader-wrapper').hide();
	// 	}	
	// };

	// svgLoadCookie();

	
	// initializing swiper
    // Swiper Slider
    // var swiper = new Swiper('.swiper-container', {
    //     pagination: '.swiper-pagination',
    //     paginationClickable: true,
    //     nextButton: '.swiper-button-next',
    //     prevButton: '.swiper-button-prev',
    //     loop: true
    // });

	// Select all links with hashes
	$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]')
		.not('[href="#0"]')
		.click(function(event) {
		// On-page links
		if (
		  location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
		  && 
		  location.hostname == this.hostname
		) {
		  // Figure out element to scroll to
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		  // Does a scroll target exist?
		  if (target.length) {
		    // Only prevent default if animation is actually gonna happen
		    event.preventDefault();
		    $('html, body').animate({
		      scrollTop: target.offset().top
		    }, 600, function() {
		      // Callback after animation
		      // Must change focus!
		      var $target = $(target);
		      $target.focus();
		      if ($target.is(":focus")) { // Checking if the target was focused
		        return false;
		      } else {
		        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
		        $target.focus(); // Set focus again
		      };
		    });
		  }
		}
	});

	// NASA Apod API
	var url = "https://api.nasa.gov/planetary/apod?api_key=O5Jg72w3pMyqTYFR6RljtmxA3cIlFvRux44sm0vV";
	var fallbackImageUrl = "image/heic0601a_compressed_shrunk.jpg";

	$.ajax({
	  url: url,
	  success: handleResult
	});

	function handleResult(result){
		if(result.media_type == "video") {

			// we want to insert a fallback image url when a video is detected
			$('.block-nasa').css('background', 'url(' + fallbackImageUrl + ') 50% 50% no-repeat');

		} else {

		    $('.block-nasa').css('background', 'url(' + result.url + ') 50% 50% no-repeat');
		}	
	};

	// //daily verse generator
	// var getVerse = function() {
	//   $.ajax({
	//     url: "https://labs.bible.org/api/?passage=votd&type=json&callback=dailyVerse", 
	//     crossDomain: true,
	//     dataType: 'jsonp',
	//     success: function(result){
	//        $("#verseQuote")
	//          .html('<strong>'+
	//                result[0].bookname+
	//                ' ' + result[0].chapter +
	//                ':' + result[0].verse +
	//                '</strong> ' +
	//                result[0].text);
	//     }
	//   });
	// };
	// getVerse();

	$('#page-nav').viewportChecker();
	$('.stat-bars').viewportChecker();
	$('#stats').viewportChecker();


	// Animating on scroll position
	// $('#page-nav').addClass('start-svg-animate').viewportChecker({
	//        classToAdd: 'stop-svg-animate',
	//        classToRemove: 'start-svg-animate',
	//        offset: 400
	//    });	

	// $('#stats').addClass('hidden-animation').viewportChecker({
	//        classToAdd: 'animation-begin visible-animation',
	//        offset: 100
	//    });


	   // $('.stat-bars').addClass('hidden-main-content').viewportChecker({
	   //     classToAdd: 'is-playing',
	   //     classToRemove: 'hidden-main-content',
	   //     offset: 400
	   // });

	// Delaying the stat bar animation - this works, but needs improvement		
	function animateStats(){

		// $('.stat-bars').addClass('hidden-main-content').viewportChecker({
	 //        classToAdd: 'is-playing',
	 //        classToRemove: 'hidden-main-content',
	 //        offset: 400
	 //    });

		// if class .stat-bars has class .hidden-main-content, do this
		if (!$('.stat-bars').hasClass('hidden-main-content')){

			// if screen comes into view do this
			var statAnimate = setTimeout(function(){

				// this sets the class to js-animate on scroll
				// $('.stat-bars').viewportChecker({
				// 	classToAdd: 'js-animate',
				// 	offset: 400
				// });
				

				$('.stat-bars').delay(1500).queue(function(next){
					$(this).addClass('is-playing');
					next();
				});

				// This runs if screen is in view

				if ($('#animate-stats').hasClass('js-animate')){
						
					$('.stat-bars').delay(2000).queue(function(next){
						$(this).removeClass('hidden-main-content');
						next();
					});

					$('.stat-bars').delay(1500).queue(function(next){
						$(this).addClass('is-playing');
						next();
					});
				}

			});

		} 

		// else {

		// 		var statEngage = setTimeout(function(){

		// 			// this sets the class to js-animate on scroll
		// 			$('.stat-bars').viewportChecker({
		// 				classToAdd: 'is-playing',
		// 				offset: 400
		// 			});

		// 			// This runs if screen is in view

		// 			// if (!$('.stat-bars').hasClass('is-playing')){
							
		// 			// 	$('.stat-bars').delay(100).queue(function(next){
		// 			// 		$(this).addClass('is-playing');
		// 			// 		next();
		// 			// 	});
		// 			// }

		// 		});
		// 	}
	};

	// Delaying the stat bar animation - this works, but needs improvement		
	// function statsEngage(){

	// 	// if class .stat-bars has class .hidden-main-content, do this
	// 	if ($('.stat-bars').hasClass('engage')){
						
	// 		// if screen comes into view do this
	// 		var statEngage = setTimeout(function(){

	// 			// this sets the class to js-animate on scroll
	// 			$('.stat-bars').viewportChecker({
	// 				classToRemove: 'hidden-main-content',
	// 				offset: 400
	// 			});

	// 			// This runs if screen is in view

	// 			if (!$('.stat-bars').hasClass('is-playing')){
						
	// 				$('.stat-bars').delay(100).queue(function(next){
	// 					$(this).addClass('is-playing');
	// 					next();
	// 				});
	// 			}

	// 		});
	// 	}

	// };


	// statsEngage();
	animateStats();

	// $('#stats').addClass('hidden-animation');
	// $('.stat-bars').addClass('hidden-main-content');


	// Nav ScrollTo

	var navHeight = $('.nav-wrapper').outerHeight(true);

	var navClass = $('.nav-main a.js-internal, .page-nav-svg, .js-section-btn');

	// Global scrollTo click event

	navClass.on('click', function(e){
		var whereToScroll = $(this).attr('href');

		e.preventDefault();

		navClass.removeClass('is-current');

		$(this).addClass('is-current');		

		// $.scrollTo(whereToScroll, {
		// 	duration: 600,
		// })

		if ($(this) === '#About') {
			$('#stats').removeClass('hidden-animation').addClass('animation-begin visible-animation');
			$('.stat-bars').removeClass('hidden-main-content').addClass('is-playing');
		};
	})


	$(window).scroll(function() {    

	    var navScroll = $(window).scrollTop();

	    if (navScroll >= 100) {
	        $(".js-scroll").addClass('planet-nav');
	        $('.js-nav-reset').css({
	   			height: '0'
	   		});
	    } else {
	    	$('.js-scroll').removeClass('planet-nav');
	    	$('.js-nav-reset').css({
	   			position: 'absolute',
	   			height: 'auto',
	   		});
	    }

	});

    

    // Updating Footer Copyright Year
    var updateYear = function(){
    	
    	$('.footerYear').html(new Date().getFullYear());
	
	};

	updateYear();

	//wow
	wow = new WOW(
		{
			animateClass: 'animate__animated', // default
		}
	)
	wow.init();

	function countDown() {
		var timeleft = 4;var downloadTimer = "";
		
		function refreshTime() {
			downloadTimer = setInterval(function(){

				if(timeleft <= 0){
					clearInterval(downloadTimer);
					$('#experimentalModal').toggle();
					Cookies.set('modal', 'viewed', {expires: 1});

					//document.getElementById("countdown").innerHTML = "0";
				} else {
					//
				}
				timeleft -= 1;
			}, 1000);
		}

		$('#experimentalModal').addEventListener('show.bs.modal', function () {
			refreshTime();
		});


		$('#experimentalModal').addEventListener('hide.bs.modal', function (e) {
			 //alert('I should stop now');
			 //return;
			 clearInterval(downloadTimer);
			 Cookies.set('modal', 'viewed', {expires: 1});
		});
	};
	countDown();


	console.log('modal ready??');

	var changeObject = document.getElementById('main-content-wrapper');
	var observer = new MutationObserver(function (event) {
		if (!Cookies.get('modal')) {
			console.log('modal entry??');
			setTimeout(function() {
				$('#experimentalModal').toggle();
			}, 1200);
		};
		console.log('class that changed ' + changeObject.className);  
	})

	observer.observe(changeObject, {
		attributes: true, 
		attributeFilter: ['class'],
		childList: false, 
		characterData: false
	})

	// $("#classchange-btn").on("classChanged", function () { 
	// 	countDown();
	// }); 


	// if (!Cookies.get('modal')){
	// 	$('#experimentalModal').modal('show');
	// 		//bs modal
	// 	setTimeout(function(){
	// 		$('#experimentalModal').modal('hide');
	// 		Cookies.set('modal', 'viewed', {expires: 1});
	// 	}, 4000);
	// };

}); // end doc on ready

(function() {
  $(document ).ready(function() {
      getVerse();
  });

  var getVerse = function() {
      $.ajax({
        url: "https://labs.bible.org/api/?passage=votd&type=json&callback=randomVerse", 
        crossDomain: true,
        dataType: 'jsonp',
        success: function(result){
           $("#verseQuote")
            .html(
              '<p class="panel-heading text-muted">'+result[0].text+'</p>'+
              '<strong class="badge">'+
              result[0].bookname+
              ' ' + result[0].chapter +
              ':' + result[0].verse +
              '</strong> ' 
            );
        }
      });
  }
})();
