"use strict";


function renderContactPage(e, $target) {
	const pagePromise = PromiseList();

    const breadcrumbsHTML = breadcrumbsComponent({
        pageTitle: translate('contact_page_title'),
        imageClass: 'bg-breadcrumbs--contact',
	});

    pagePromise.addPromise({
		name: 'pageData',
		body: getPageData({ page: 'contact', lang }),
	});

    pagePromise.allPromises(res => {
        const { pageData } = res;

		function template(data) {
			return (`
				${ breadcrumbsHTML }

				<!-- Start Contact Area -->
				<section class="wn_contact_area bg--white pt--80 pb--80">
					<div class="google__map pb--80">
						<div class="container">
							<div class="row">
								<div class="col-md-12">
									<div id="googleMap"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="container">
						<div class="row">
							<div class="col-lg-8 col-12">
								<div class="contact-form-wrap">
									<h2 class="contact__title">${pageData.send_us_a_message}</h2>
									<!-- <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. </p> -->
									<form id="contact-form" action="#" method="post">
										<div class="single-contact-form space-between">

											<div class="block-contact-form warning">
												<div class="js-warning-text-form hide">
													${ translate('feedback_input_fail_first_name') }
												</div>
												<input type="text" name="firstname" placeholder="${pageData.form_first_name_placeholder}*">
											</div>

											<div class="block-contact-form warning">
												<div class="js-warning-text-form hide">
													${ translate('feedback_input_fail_last_name') }
												</div>
												<input type="text" name="lastname" placeholder="${pageData.form_last_name_placeholder}*">
											</div>

										</div>
										<div class="single-contact-form warning">
											<div class="js-warning-text-form hide">
												${ translate('feedback_input_fail_email') }
											</div>
											<input type="email" name="email" placeholder="${pageData.form_email_placeholder}*">
										</div>
										<div class="single-contact-form warning">
											<div class="js-warning-text-form hide">
												${ translate('feedback_input_fail_subject') }
											</div>
											<input type="text" name="subject" placeholder="${pageData.form_subject_placeholder}*">
										</div>
										<div class="single-contact-form message warning">
											<div class="js-warning-text-form hide">
												${ translate('feedback_input_fail_text') }
											</div>
											<textarea name="message" placeholder="${pageData.form_text_placeholder}"></textarea>
										</div>
										<div class="contact-btn">
											<button type="button">${pageData.form_send_email_button}</button>
										</div>
									</form>
								</div>
								<div class="form-output">
									<p class="form-messege">
								</div>
							</div>
							<div class="col-lg-4 col-12 md-mt-40 sm-mt-40">
								<div class="wn__address">
									<h2 class="contact__title">${pageData.get_office_info}</h2>
									<p>${pageData.get_office_info_text}</p>

									<div class="wn__addres__wreapper">
										<div class="single__address">
											<i class="icon-location-pin icons"></i>
											<div class="content">
												<span>${pageData.get_office_info_address_title}:</span>
												<p>${pageData.office_info_address}</p>
											</div>
										</div>

										<div class="single__address">
											<i class="icon-phone icons"></i>
											<div class="content">
												<span>${pageData.get_office_info_phone_title}:</span>
												<p>
													<a href="tel:${pageData.office_info_phone}">
														${pageData.office_info_phone}
													</a>
												</p>
											</div>
										</div>

										<div class="single__address">
											<i class="icon-envelope icons"></i>
											<div class="content">
												<span>${pageData.get_office_info_email_title}:</span>
												<p>
													<a href="mailto:${pageData.office_info_email}">
														${pageData.office_info_email}
													</a>
												</p>
											</div>
										</div>

										<div class="single__address">
											<i class="icon-globe icons"></i>
											<div class="content">
												<span>${pageData.get_office_info_website_title}:</span>
												<p>
													<a href="${pageData.office_info_website}">
														${pageData.office_info_website_short}
													</a>
												</p>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<!-- End Contact Area -->
			`);
		}

		const page = template();

		console.log('renderContactPage');
		global.$main.first().html(page);
		afterChangingTheDOM();
    });

    function afterChangingTheDOM() {
        // console.log(google);
		// When the window has finished loading create our google map below
        // google.maps.event.addDomListener(window, 'load', init);
        // init();

		function init() {
			// Basic options for a simple Google Map
			// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
			var mapOptions = {
				// How zoomed in you want the map to start at (always required)
				zoom: 16,

				scrollwheel: false,

				// The latitude and longitude to center the map (always required)
				// center: new google.maps.LatLng(23.7286, 90.3854),
				center: new google.maps.LatLng(46.479731, 30.747954),
			};

			// Get the HTML DOM element that will contain your map
			// We are using a div with id="map" seen below in the <body>
			var mapElement = document.getElementById('googleMap');

			// Create the Google Map using our element and options defined above
			var map = new google.maps.Map(mapElement, mapOptions);

			// Let's also add a marker while we're at it
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(46.479731, 30.747954),
				map: map,
				title: 'Hillel IT School',
				// icon: 'images/icons/map.png',
				animation:google.maps.Animation.BOUNCE

			});
		}

		init();
    }
}