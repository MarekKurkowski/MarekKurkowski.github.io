import $ from 'jquery';
window.jQuery=$;
import 'bootstrap';
import '../scss/index.scss';
import '../css/main.css';
import SmoothScroll from 'smooth-scroll';


(function(jQuery) {

	document.addEventListener('DOMContentLoaded', () => {

		const elements = {
			siteHeader: document.querySelector('#header'),
			navbar: document.querySelector('.navbar'),
			navLink: document.querySelectorAll('.navbar .nav-item .nav-link'),
			logo: document.querySelector('#logoSteely'),
			estimateBtn: document.querySelector('.estimate'),
			productList: document.querySelector('.product-list'),
			targetEl: ""
		}

	// Use the Fetch graphic
	fetch('data.json')
		.then(data=>data.json())
		.then(result => {
			productsTemplate(result.products);
			// conferencesTemplate(result.conferences)
			// addFiltering();
		});

		const productsTemplate = products => {
			products.forEach((product, index) => {
				// Increase by 1, to match the image name;
				let id = index +1;

				// Create HTML structure
				const productHTML = document.createElement('li');

				// add some classes
				productHTML.classList.add('col-sm-6', 'col-lg-3');

				// build html
				productHTML.innerHTML = `
					<div class="product-image">
						<img src="${product.link}" alt="" class="img-fluid">
					</div>
					<div class="product-info py-3 text-center">
						<h3 class="text-uppercase">${product.name}</h3>
						<p>${product.description}</p>
					</div>
				`;

				elements.productList.appendChild(productHTML);

			});
		};

		//SmoothScroll
		const scroll = new SmoothScroll('a[href*="#"]', {
		/// options
			speed: 1000,
			updateURL: false,
			offset:100
		});

		// Fixed navigation on the top
		const changeNavbar = () => {
			let hitTarget = 1500;
			let transition = 'all 2s ease-out';

			if (window.innerWidth > hitTarget) {
				window.onscroll = () => {
					if (window.scrollY > elements.siteHeader.clientHeight) {

						elements.navbar.classList.add('effect');
						elements.navLink.forEach(e => {
							Object.assign(e.style,{'font-size':'1rem','transition':`${transition}`})
						})
						Object.assign(elements.logo.style,{height:"5rem",transition:`${transition}`})
						Object.assign(elements.estimateBtn.style,{'font-size':'1rem','transition':`${transition}`})
					} else if (window.scrollY ===0 ) {
						elements.navbar.classList.remove('effect');
						elements.navLink.forEach(e => {
							Object.assign(e.style,{'font-size':'1.3rem','transition':`${transition}`});
						})
						Object.assign(elements.logo.style,{height:"7rem",transition:`${transition}`});
						Object.assign(elements.estimateBtn.style,{'font-size':'1.3rem','transition':`${transition}`});
					}
				}
			} else {
				elements.navbar.classList.remove('effect');
			}
		}

		changeNavbar();
		window.addEventListener('resize', changeNavbar());


		// values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
		let i = 0,
		    a = 0,
		    isBackspacing = false,
		    isParagraph = false;

		// Typerwrite text content. Use a pipe to indicate the start of the second line "|".
		const textArray = [
			"Professional blacksmithing services | STEELY sets the standard for architectural and bespoke metalwork design craftsmanship and ingenuity. Our experience gives us a pedigree in crafting exquisite metalwork, from intricate architectural features in steel and bronze to bold, elaborate ironwork. Whether we are creating complex and challenging new metalwork or restoring iconic heritage features, we apply the same skills, attention to detail and artistry to every project.",
			"Blacksmithing is just our passion | We guarantee that cooperation with STEELY will be successful. We always make every effort to ensure that the project is carried out in accordance with the client's needs. Blacksmithing is just our passion. We design and create products with commitment, which is best demonstrated by our work."
		];

		// Speed (in milliseconds) of typing.
		const speedForward = 50, //Typing Speed
		    speedWait = 2000, // Wait between typing and backspacing
		    speedBetweenLines = 1000, //Wait between first and second lines
		    speedBackspace = 25; //Backspace Speed

		const typeWriter = (id, ar) => {
		  let element = $("#" + id),
		      aString = ar[a],
		      eHeader = element.children(".steely-main"), //Header element
		      eParagraph = element.children(".steely-text"); //Subheader element

		  // Determine if animation should be typing or backspacing
		  if (!isBackspacing) {

		    // If full string hasn't yet been typed out, continue typing
		    if (i < aString.length) {

		      // If character about to be typed is a pipe, switch to second line and continue.
		      if (aString.charAt(i) == "|") {
		        isParagraph = true;
		        eHeader.removeClass("cursor");
		        eParagraph.addClass("cursor");
		        i++;
		        setTimeout(function(){ typeWriter(id, ar); }, speedBetweenLines);

		      // If character isn't a pipe, continue typing.
		      } else {
		        // Type header or subheader depending on whether pipe has been detected
		        if (!isParagraph) {
		          eHeader.text(eHeader.text() + aString.charAt(i));
		        } else {
		          eParagraph.text(eParagraph.text() + aString.charAt(i));
		        }
		        i++;
		        setTimeout(function(){ typeWriter(id, ar); }, speedForward);
		      }

		    // If full string has been typed, switch to backspace mode.
		    } else if (i == aString.length) {

		      isBackspacing = true;
		      setTimeout(function(){ typeWriter(id, ar); }, speedWait);

		    }

		  // If backspacing is enabled
		  } else {

		    // If either the header or the paragraph still has text, continue backspacing
		    if (eHeader.text().length > 0 || eParagraph.text().length > 0) {

		      // If paragraph still has text, continue erasing, otherwise switch to the header.
		      if (eParagraph.text().length > 0) {
		        eParagraph.text(eParagraph.text().substring(0, eParagraph.text().length - 1));
		      } else if (eHeader.text().length > 0) {
		        eParagraph.removeClass("cursor");
		        eHeader.addClass("cursor");
		        eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
		      }
		      setTimeout(function(){ typeWriter(id, ar); }, speedBackspace);

		    // If neither head or paragraph still has text, switch to next quote in array and start typing.
		    } else {

		      isBackspacing = false;
		      i = 0;
		      isParagraph = false;
		      a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
		      setTimeout(function(){ typeWriter(id, ar); }, 50);

		    }
		  }
		}

		//Run the loop
		typeWriter("text", textArray);
	});

	/// jQuery
	$(document).ready(function() {

		/*Form validation*/



		// $('#contact-form').submit(e => {
		// 	let form = document.getElementById('contact-form');
		// 	let name = document.getElementById('validationCustom01');
		// 	let email = document.getElementById('validationCustom02');
		// 	let phone = document.getElementById('validationCustom03');
		// 	let message = document.getElementById('validationCustom04');
		//
		// 	console.log(form);
		// 	form.action = "https://formspree.io/kurkowski.m.a@gmail.com";
		// 	form.method = "POST";
		// 	console.log(form);
		//
		// 	if (!message.value) {
		// 		message.value = message.placeholder;
		// 	}
		//
		// 	if (!name.value || !email.value ) {
		// 		console.log('Please check your entries');
		// 	} else {
		// 			// $.ajax ({
		// 			// 	url: "//formspree.io/kurkowski.m.a@gmail.com",
		// 			// 	method: "POST",
		// 			// 	data: {
		// 			// 		name: name.value,
		// 			// 		email: email.value,
		// 			// 		phone: phone.value,
		// 			// 		message: message.value
		// 			// 	},
		// 			// 	dataType: "json"
		// 			// });
		//
		// 		e.preventDefault();
		// 		name = "";
		// 		email = "";
		// 		phone = "";
		// 		message = "";
		// 		console.log('Message sent!');
		//
		// 		}
		// });


			// $('#contact-form').on('success.form.bv', function(e) {
			// 	e.preventDefault();
			//
			// 	var $form = $(e.target);
			// 	console.log($form);
			//
			// 	var bv = $form.data('');
			// 	console.log(bv);
			//
			// 	$.post($form.attr('action'), $form.serialize(), function(result) {
			// 		console.log(result);
			//
			// 		console.log("correct");
			// 	},'json' );
			// });
		});

})($);
