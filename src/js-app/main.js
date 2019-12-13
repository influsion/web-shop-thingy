'use strict';

let localization = {};
const globalPromiseList = PromiseList();
const basket = Basket();
const lang = 'en';
const qsDefaultParams = {
    arrayFormat: 'indices',
    format : 'RFC3986',
};
const serverURL = 'http://localhost:3000';


const findElements = function() {
    global.$app = $('#wrapper');
    global.$header = $('#wn__header');
    global.$main = global.$app.find('.main');



    // Header Search btn
    global.$headerSearchBtn = global.$header.find('.shop_search > a');

    // Header Shopcart btn
    global.$headerCartBtn = global.$header.find('.shopcart > a');
    global.$headerCartCounter = global.$headerCartBtn.find('.product_qun');
};

const bindEvents = function() {
    // Switch page
    global.$app.on('click', '.js-switch-page', e => pageController.setActivePage(e, $(e.currentTarget)));

    // Add product to cart
    global.$app.on('click', '.js-add-to-cart', e => addToCartClickHandler(e, $(e.currentTarget)));
    global.$app.on('click', '.js-add-to-cart-and-switch-page', e => addToCartAndSwitchPageClickHandler(e, $(e.currentTarget)));


    // Cart
    global.$app.on('change', '.js-input-quantity', e => changeTotalPrice($(e.currentTarget)));
    global.$app.on('click', '.js-delete-cart-item', e => deleteCartItemHandler($(e.currentTarget)));
    global.$app.on('change', '.js-input-quantity', e => changeGradTotalPrice($(e.currentTatget)));

    // Categories and Filter on Shop page
    global.$app.on('click', '.js-change-category-or-subcategory', e => categoriesHandler(e));
    global.$app.on('change', `form[name="brand-checkbox-group-form"] input`, { checkboxType: 'brand' }, e => filterCheckboxGroupHandler(e));
    global.$app.on('change', `form[name="origin-checkbox-group-form"] input`, { checkboxType: 'origin' }, e => filterCheckboxGroupHandler(e));
};

// Main
(() => {
    console.log('----------------------------');
    findElements();
    bindEvents();

    basket.syncWithLocalStorage();

    // Step: Header Menu links
    global.$menuLinks = global.$header.find('.mainmenu-link');
    pageController.init(global.$menuLinks);

    globalPromiseList.addPromise({
        name: 'localization',
        body: getLocalization(),
    });

    globalPromiseList.allPromises(res => {
        localization = res.localization;

        // TODO: Step: Here is render menu with js

        // Step: Change page
        pageController.setActivePage();
    });

    // Read cached page name

})();

// const snowFlake = (data) => {
//     const quantity = 19;

//     const $wrap = $(`#wrapper`);

//     const flakesPositionsParams = [
//         [ 0, 80, 1500, 1200 ],
//         [ 150, 130, 1500, 1200 ],
//         [ 400, 230, 1500, 1200 ],
//         [ 50, 330, 1500, 1200 ],
//         [ 680, 430, 1500, 1200 ],
//         [ 0, 530, 1500, 1200 ],
//         [ 360, 630, 1500, 1200 ],
//         [ 240, 730, 1500, 1200 ],
//         [ 550, 830, 1500, 1200 ],
//         [ 0, 980, 1500, 1200 ],
//         [ 0, 80, 1500, 1200 ],
//         [ 150, 180, 500, 1200 ],
//         [ 400, 280, 500, 1200 ],
//         [ 50, 380, 500, 1200 ],
//         [ 680, 480, 500, 1200 ],
//         [ 0, 580, 500, 1200 ],
//         [ 360, 680, 500, 1200 ],
//         [ 240, 780, 500, 1200 ],
//         [ 550, 880, 500, 1200 ],
//         [ 0, 980, 500, 1200 ],
//     ];

//     const elements = [];

//     const fincSnowflake = ($elem, order, top, left, _x, _y) => {
//         elements[order].setIntervalId = setInterval(function() {
//             const intViewportWidth = window.innerWidth;
//             const intViewportHeight = window.innerHeight;

//             const y = randomInteger(0, intViewportWidth);
//             const x = randomInteger(0, intViewportHeight);

//             console.log('1111', x,y);

//             // top += 0.2;

//             // if (top >= x) {
//             //     top = 0;
//             // }

//             // left += 0.08;

//             // if (left > y) {
//             //     left = 0;
//             // }

//             $elem.css({ 'top': x, 'left': y });
//         }, 1000);
//     }

//     for (let i = 0; i < quantity + 1; i++) {
//         const $element = $(`<div class="snow-flake flake${i}"><img src="${data.src}" alt="icon"></div>`);

//         elements[i] = { $element };

//         $wrap.prepend($element);
//         fincSnowflake($element, i, ...flakesPositionsParams[i]);
//     }

//     function randomInteger(min, max) {
//         let rand = min + Math.random() * (max + 1 - min);
//         return Math.floor(rand);
//     }
// };

// snowFlake({
//     src: 'images/icons/snowflake.svg'
// });
