// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    //console.log('js running?');

	// Removed commented-out svgLoadCookie function

	// Removed commented-out Swiper initialization

	// NASA Apod API
	var url = "https://api.nasa.gov/planetary/apod?api_key=O5Jg72w3pMyqTYFR6RljtmxA3cIlFvRux44sm0vV";
	var fallbackImageUrl = "image/heic0601a_compressed_shrunk.jpg";

	// Fetch NASA APOD data
	fetch(url)
	  .then(response => {
	    if (!response.ok) {
	      throw new Error(`HTTP error! status: ${response.status}`);
	    }
	    return response.json();
	  })
	  .then(handleResult)
	  .catch(error => {
	    console.error('Error fetching NASA APOD:', error);
	    // Apply fallback on error
	    handleResult({ media_type: 'error' }); // Pass a dummy object to trigger fallback
	  });

	function handleResult(result){
		const nasaBlock = document.querySelector('.block-nasa'); // Use vanilla JS selector
		if (!nasaBlock) return; // Exit if element not found

		let backgroundUrl = fallbackImageUrl; // Default to fallback

		if (result && result.media_type === "image" && result.url) {
			backgroundUrl = result.url;
		}
		// Apply background (either image URL or fallback)
		nasaBlock.style.background = `url('${backgroundUrl}') 50% 50% / cover no-repeat`; // Use cover for better fit
	};

	// //daily verse generator (Original jQuery AJAX)
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

	// --- Intersection Observer Setup for Animations ---

	const animationObserverOptions = {
	  root: null, // relative to document viewport
	  rootMargin: '0px',
	  threshold: 0.1 // Trigger when 10% of the element is visible
	};

	const animationCallback = (entries, observer) => {
	  entries.forEach(entry => {
	    if (entry.isIntersecting) {
	      const target = entry.target;
	      
	      // Handle WOW animations (add animate__animated and specific animation class)
	      if (target.classList.contains('wow')) {
	        const animationDelay = target.dataset.wowDelay || '0s';
	        target.style.visibility = 'visible'; // Make visible before animation
	        target.style.animationDelay = animationDelay;
	        // Determine animation class (e.g., animate__fadeInUp) - assumes it's already on the element or add logic here if needed
	        target.classList.add('animate__animated'); 
	        observer.unobserve(target); // Optional: Stop observing once animated
	      }

	      // Handle ViewportChecker replacements based on data attributes or IDs
	      if (target.id === 'page-nav') {
	        target.classList.add('stop-svg-animate');
	        target.classList.remove('start-svg-animate');
	        observer.unobserve(target); 
	      } else if (target.id === 'stats') {
	        // Add classes defined in original viewportChecker setup or HTML data attributes
	        target.classList.remove('hidden-animation'); // Assuming this was initial state
	        target.classList.add('animation-begin', 'visible-animation'); 
	        // We might need to trigger the stat-bars animation from here too
	        const statBars = document.querySelector('#animate-stats');
	        if (statBars) {
	          statBars.classList.add('is-playing');
	          statBars.classList.remove('hidden-main-content'); // If it was hidden
	        }
	        observer.unobserve(target);
	      }
	      // Note: Direct handling for '.stat-bars' might be redundant if triggered by '#stats' intersection
	      
	    }
	  });
	};

	const animationObserver = new IntersectionObserver(animationCallback, animationObserverOptions);

	// Observe elements that need animation
	document.querySelectorAll('.wow, #page-nav, #stats').forEach(el => {
	  // Ensure 'wow' elements are initially hidden if using animate.css conventions
	  if (el.classList.contains('wow')) {
	    el.style.visibility = 'hidden'; 
	  }
	  animationObserver.observe(el);
	});

	// --- End Intersection Observer Setup ---


	// Animating on scroll position (Old viewportChecker logic - replaced by IntersectionObserver)
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

	// Removed animateStats function as IntersectionObserver handles this now.
	// The logic for adding 'is-playing' to '.stat-bars' is included 
	// within the IntersectionObserver callback when '#stats' becomes visible.
	// CSS animations/transitions should handle the visual effect.

	// $('#stats').addClass('hidden-animation'); // Initial state set via CSS or JS before observer
	// $('.stat-bars').addClass('hidden-main-content'); // Initial state set via CSS or JS before observer


	// Nav ScrollTo (Refactored to Vanilla JS)

	const navWrapper = document.querySelector('.nav-wrapper');
	const navHeight = navWrapper ? navWrapper.offsetHeight : 0; // Get height using offsetHeight

	const navLinks = document.querySelectorAll('.nav-main a.js-internal, .page-nav-svg, .js-section-btn'); // Use querySelectorAll

	// Add click listener to each nav link
	navLinks.forEach(link => {
	    link.addEventListener('click', function(e) {
	        const whereToScroll = this.getAttribute('href'); // Get href attribute

	        // Check if it's an internal link
	        if (whereToScroll && whereToScroll.startsWith('#')) {
	            // Smooth scrolling is handled by CSS 'scroll-behavior: smooth'
	            // We only need to handle the 'is-current' class logic

	            // Remove 'is-current' from all nav links
	            navLinks.forEach(navLink => navLink.classList.remove('is-current'));

	            // Add 'is-current' to the clicked link
	            this.classList.add('is-current');

	            // Special handling for #About link (refactored)
	            if (whereToScroll === '#About') {
	                const statsElement = document.getElementById('stats');
	                const statBarsElement = document.querySelector('.stat-bars'); // Assuming only one
	                if (statsElement) {
	                    statsElement.classList.remove('hidden-animation');
	                    statsElement.classList.add('animation-begin', 'visible-animation');
	                }
	                if (statBarsElement) {
	                    statBarsElement.classList.remove('hidden-main-content');
	                    statBarsElement.classList.add('is-playing');
	                }
	            }
	            
	            // Prevent default only for internal links to allow scrolling
	            // e.preventDefault(); // Removed to allow CSS smooth scroll
	        }
	        // Let default behavior handle external links or links without href
	    });
	});


	// Scroll event listener for navigation style changes (Vanilla JS)
	window.addEventListener('scroll', function() {
	    const navScroll = window.scrollY;
	    const scrollElement = document.querySelector('.js-scroll');
	    const navResetElement = document.querySelector('.js-nav-reset');

	    if (scrollElement) { // Check if element exists
	        if (navScroll >= 100) {
	            scrollElement.classList.add('planet-nav');
	            if (navResetElement) { // Check if element exists
	                navResetElement.style.height = '0';
	                // Remove potentially conflicting position style if needed when scrolled down
	                navResetElement.style.position = ''; 
	            }
	        } else {
	            scrollElement.classList.remove('planet-nav');
	            if (navResetElement) { // Check if element exists
	                navResetElement.style.height = 'auto';
	                navResetElement.style.position = 'absolute'; // Restore original position
	            }
	        }
	    }
	});

    

    // Updating Footer Copyright Year (Vanilla JS)
    var updateYear = function(){
        const footerYearElement = document.querySelector('.footerYear'); // Use querySelector
        if (footerYearElement) {
            footerYearElement.textContent = new Date().getFullYear(); // Use textContent instead of .html()
        }
    };
	updateYear();

	// Removed wow.init() - replaced by IntersectionObserver

	// --- Modal Logic (Refactored to Vanilla JS + Bootstrap 5 API) ---
	const experimentalModalElement = document.getElementById('experimentalModal');
	let experimentalModalInstance = null; 
	if (experimentalModalElement && typeof bootstrap !== 'undefined') { // Check if Bootstrap is loaded
	    experimentalModalInstance = new bootstrap.Modal(experimentalModalElement);
	}

	function countDown() {
		var timeleft = 4;
		var downloadTimer = null; // Initialize to null
		
		function refreshTime() {
			// Clear existing timer if any
			if (downloadTimer) {
				clearInterval(downloadTimer);
			}
			
			downloadTimer = setInterval(function(){
				if(timeleft <= 0){
					clearInterval(downloadTimer);
					downloadTimer = null; // Reset timer variable
					if (experimentalModalInstance) {
						experimentalModalInstance.toggle(); // Use Bootstrap API
					}
					Cookies.set('modal', 'viewed', {expires: 1});
				} else {
					// Optional: Update countdown display if needed
				}
				timeleft -= 1;
			}, 1000);
		}

		if (experimentalModalElement) {
			experimentalModalElement.addEventListener('show.bs.modal', function () {
				refreshTime();
			});

			experimentalModalElement.addEventListener('hide.bs.modal', function (e) {
				 if (downloadTimer) {
				 	clearInterval(downloadTimer);
				 	downloadTimer = null; // Reset timer variable
				 }
				 Cookies.set('modal', 'viewed', {expires: 1});
			});
		}
	};
	
	// Only run countdown if the modal exists
	if (experimentalModalElement) {
		countDown();
	}


	console.log('modal ready??'); // Keep console logs for debugging if desired

	const mainContentWrapper = document.getElementById('main-content-wrapper');
	if (mainContentWrapper) { // Check if element exists
		const observer = new MutationObserver(function (mutationsList, observer) {
			// We only care about class changes on the main wrapper
			for(const mutation of mutationsList) {
		        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
					// Check cookie and toggle modal if needed
					if (!Cookies.get('modal')) {
						console.log('modal entry via mutation observer??');
						setTimeout(function() {
							if (experimentalModalInstance) {
								experimentalModalInstance.toggle(); // Use Bootstrap API
							}
						}, 1200);
					}
					console.log('class that changed ' + mainContentWrapper.className); 
					// Potentially disconnect observer if only needed once, or add more logic
					// observer.disconnect(); 
					break; // Stop checking other mutations once class change is handled
		        }
		    }
		});

		observer.observe(mainContentWrapper, {
			attributes: true, 
			attributeFilter: ['class'],
			childList: false, 
			characterData: false
		});
	}

	// Removed duplicate observer.observe call that was causing an error

	// Removed commented-out jQuery modal logic

// --- End Modal Logic ---

// IIFE for Bible Verse - can run once DOM is ready
(function() {
  // No need for $(document).ready here as the outer listener handles it.
  getVerse();

  var getVerse = function() {
      // Attempt fetch for Bible Verse API (assuming CORS is enabled)
      // Note: Original used JSONP. Fetch requires CORS.
      const verseUrl = "https://labs.bible.org/api/?passage=votd&type=json"; // Removed callback param

      fetch(verseUrl)
        .then(response => {
          if (!response.ok) {
            // If CORS fails or other error, might need to revert to JSONP or find alternative
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(result => {
          const verseQuoteElement = document.getElementById("verseQuote"); // Use vanilla JS selector
          if (verseQuoteElement && result && result[0]) {
            verseQuoteElement.innerHTML = `
              <p class="panel-heading text-muted">${result[0].text}</p>
              <strong class="badge">
                ${result[0].bookname} ${result[0].chapter}:${result[0].verse}
              </strong>`;
          } else if (verseQuoteElement) {
            verseQuoteElement.textContent = 'Could not load verse.';
          }
        })
        .catch(error => {
          console.error('Error fetching Bible verse:', error);
          const verseQuoteElement = document.getElementById("verseQuote");
          if (verseQuoteElement) {
            verseQuoteElement.textContent = 'Could not load verse.';
          }
          // Consider adding fallback or alternative logic here if fetch consistently fails
        });
  }
})();

}); // End DOMContentLoaded listener
