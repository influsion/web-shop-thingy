"use strict";

function renderHomePage(e, $target) {
    const pagePromise = new PromiseList();

	pagePromise.addPromise({
		name: "popularProducts",
		body: getProducts({popular: true}),
	});

	pagePromise.addPromise({
		name: "newProducts",
		body: getProducts({new: true}),
	});

	pagePromise.all(res => {
		const { popularProducts, newProducts } = res;

        const topSliderHTML = topSliderComponent();

        const subscriptionHTML = subscriptionComponent();

        const popularSliderHTML = productSliderComponent({
            i18n: {
                title_1: 'Popular',
                title_2: 'products',
                subtitle: 'Popular products this month',
                label: 'Popular',
            },
            slidesData: popularProducts,
        });

        const newSliderHTML = productSliderComponent({
            i18n: {
                title_1: 'New',
                title_2: 'products',
                subtitle: 'Check out our new arrivals!',
                label: 'New',
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

		// console.log(popularSliderHTML, newSliderHTML);

		const page = template();

		global.$main.first().html(page);
		afterChangingTheDOM();
	});


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
