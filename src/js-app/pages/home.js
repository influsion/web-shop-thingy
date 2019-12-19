"use strict";

function renderHomePage(e, $target) {
    const pagePromise = PromiseList();

	pagePromise.addPromise({
		name: "newProducts",
		body: getProducts({new: true}),
	});

	pagePromise.addPromise({
		name: "popularProducts",
		body: getProducts({popular: true}),
	});

	pagePromise.allPromises(res => {
		const { popularProducts, newProducts } = res;

        const topSliderHTML = topSliderComponent();

        const subscriptionHTML = subscriptionComponent();

        const popularSliderHTML = productSliderComponent({
            i18n: {
                title_1: translate('popular'),
                title_2: translate('products').toLowerCase(),
                subtitle: translate('popular_products_slider_subtitle'),
                label: translate('popular_label'),
            },
            slidesData: popularProducts,
        });

        const newSliderHTML = productSliderComponent({
            i18n: {
                title_1: translate('new'),
                title_2: translate('products').toLowerCase(),
                subtitle: translate('new_products_slider_subtitle'),
                label: translate('new_label'),
            },
            slidesData: newProducts,
        });


        const template = () => {
            return (`
                ${topSliderHTML}

                ${newSliderHTML}

                ${subscriptionHTML}

                ${popularSliderHTML}
            `);
        };

		const page = template();

		global.$main.first().html(page);
		afterChangingTheDOM();
	});


	function afterChangingTheDOM() {

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
