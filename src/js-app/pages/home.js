"use strict";

let popularProductsMock = [
	{
		"id": "2",
		"name": "Ноутбук HP 255 G7 (7DF20EA) Dark Ash",
		"image": "./images/products/hp_6bn09ea.jpg",
		"description": "Экран 15.6” (1920x1080) Full HD, матовый / AMD Ryzen 5 2500U (2.0 - 3.6 ГГц) / RAM 8 ГБ / SSD 256 ГБ / AMD Radeon Vega 8 / без ОД / LAN / Wi-Fi / Bluetooth / веб-камера / DOS / 1.78 кг / черный",
		"price": "10499",
		"category": "computers-notebooks",
		"subcategory": "notebooks",
		"brand": "hp",
		"origin": "china",
		"new": false,
		"popular": true
	}, {
		"id": "2",
		"name": "Ноутбук HP 255 G7 (7DF20EA) Dark Ash",
		"image": "./images/products/hp_6bn09ea.jpg",
		"description": "Экран 15.6” (1920x1080) Full HD, матовый / AMD Ryzen 5 2500U (2.0 - 3.6 ГГц) / RAM 8 ГБ / SSD 256 ГБ / AMD Radeon Vega 8 / без ОД / LAN / Wi-Fi / Bluetooth / веб-камера / DOS / 1.78 кг / черный",
		"price": "10499",
		"category": "computers-notebooks",
		"subcategory": "notebooks",
		"brand": "hp",
		"origin": "china",
		"new": false,
		"popular": true
	},

];

const populateProducts = (productsArray) => {
	let assembledHTML = "";
	productsArray.forEach((product) => {
		console.log("current product", product);
		assembledHTML += productCartSlideViewComponent(product);
	});
	return assembledHTML;
};


const topSlider = () => {

	return `<!-- Start Slider area -->
            <div class="slider-area brown__nav slider--15 slide__activation slide__arrow01 owl-carousel owl-theme">
                <!-- Start Single Slide -->
                <div class="slide animation__style10 bg-image--1 fullscreen align__center--left">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="slider__content">
                                    <div class="contentbox">
                                        <h2>Enjoy life<br>in color <span>with MEIZU</span></h2>
                                        <a class="shopbtn" href="#">shop now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Single Slide -->

                <!-- Start Single Slide -->
                <div class="slide animation__style10 bg-image--7 fullscreen align__center--left">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="slider__content">
                                    <div class="contentbox">
                                        <h2>A perfectly <span>balanced</span><br> image quality.<br></h2>
                                        <h3>As everything in life should be.</h3>
                                        <a class="shopbtn" href="#">shop now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Single Slide -->
            </div>
            <!-- End Slider area -->`
};


function template(data) {
	return (`
		${topSlider()}
            

            <!-- Start New product Area -->
            <section class="wn__product__area brown--color pt--80  pb--30">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section__title text-center">
                                <h2 class="title__be--2">New <span class="color--theme">Products</span></h2>
                                <p>Check out our new arrivals!</p>
                            </div>
                        </div>
                    </div>
                    <!-- Start Single Tab Content -->
                    <div class="furniture--4 border--round arrows_style owl-carousel owl-theme row mt--50">
                        ${populateProducts(popularProductsMock)}
                    </div>
                    <!-- End Single Tab Content -->
                </div>
            </section>
            <!-- Start New product Area -->

            <!-- Start NEwsletter Area -->
            <section class="wn__newsletter__area bg-image--2">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-7 offset-lg-5 col-md-12 col-12 ptb--150">
                            <div class="section__title text-center">
                                <h2>Stay With Us</h2>
                            </div>
                            <div class="newsletter__block text-center">
                                <p>Subscribe to our newsletters now and stay up-to-date with new collections, the latest lookbooks and exclusive offers.</p>
                                <form action="#">
                                    <div class="newsletter__box">
                                        <input type="email" placeholder="Enter your e-mail">
                                        <button>Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- End NEwsletter Area -->

            <!-- Start Popular product Area -->
            <section class="wn__popular-product__area brown--color pt--80  pb--30">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section__title text-center">
                                <h2 class="title__be--2">Popular <span class="color--theme">Products</span></h2>
                                <p>Popular products this month</p>
                            </div>
                        </div>
                    </div>
                    <!-- Start Single Tab Content -->
                    <div class="furniture--4 border--round arrows_style owl-carousel owl-theme row mt--50">
                        ${populateProducts(popularProductsMock)}
                    </div>
                    <!-- End Single Tab Content -->
                </div>
            </section>
            <!-- End Popular product Area -->
        `);
}


function renderHomePage(e, $target) {


	global.promises.addPromise("PopularProducts", getProducts({"popular": "true"}));

	Promise.all(global.promises).then(
		response => {
			console.log(response);
		}
	);

	const page = template();

	global.$main.first().html(page);
	afterChangingTheDOM();

	function afterChangingTheDOM() {
		// Код, который нужно запустить после изменения DOM

		/*=============  Slider Activation  ==============*/
		global.$main.find('.slide__activation').owlCarousel({
			loop: true,
			margin: 0,
			nav: true,
			autoplay: false,
			autoplayTimeout: 10000,
			items: 1,
			navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
			dots: false,
			lazyLoad: true,
			responsive: {
				0: {
					items: 1
				},

				1920: {
					items: 1
				}
			}
		});

		/*=============  Product List Activation  ==============*/
		global.$main.find('.furniture--4').owlCarousel({
			loop: false,
			margin: 0,
			nav: true,
			autoplay: false,
			autoplayTimeout: 10000,
			items: 4,
			navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
			dots: false,
			lazyLoad: true,
			responsive: {
				0: {items: 1},
				576: {items: 2},
				768: {items: 3},
				992: {items: 4},
				1920: {items: 4},
			}
		});
	}
}
