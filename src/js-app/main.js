'use strict';


const global = {
    promises: new PromiseList(),
};
let localization = {};
const basket = new Basket();
const lang = 'en';
const qsDefaultParams = {
    arrayFormat: 'indices',
    format : 'RFC3986',
};
const serverURL = 'http://localhost:3000'


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
    global.$app.on('click', '.js-add-to-cart', e => addToCartClickHandler($(e.currentTarget)));

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

    // Step: Header Menu links
    global.$menuLinks = global.$header.find('.mainmenu-link');
    pageController.init(global.$menuLinks);

    global.promises.addPromise({
        name: 'localization',
        body: getLocalization(),
    });

    global.promises.all(res => {
        localization = res.localization;

        // TODO: Step: Here is render menu with js

        // Step: Change page
        pageController.setActivePage();
    });

    // Read cached page name
})();

const intViewportWidth = jQuery(window).width();
const intViewportHeight = jQuery(window).height();


const snowFlake = (data) => {
    const quantity = 19;
    const $wrap = $(`#wrapper`);
    const elements = [];
    const fincSnowflake = ($elem, order, top, left) => {
        elements[order].setIntervalId = setInterval(function() {
            
            top += 0.3;

            if (top >= intViewportHeight) {
                top = 0;
            }

            left += 0.1;

            if (left > intViewportWidth) {
                left = 0;
            }

            $elem.css({ 'top': top, 'left': left });
        }, 10);
    }
    for (let i = 0; i < quantity + 1; i++) {
        const $element = $(`<div class="snow-flake flake${i}"><img src="${data.src}" alt="icon"></div>`);

        elements[i] = { $element };

        $wrap.prepend($element);
        fincSnowflake($element, i, randomInteger(0, intViewportHeight), randomInteger(0, intViewportWidth));
    }

    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
};

snowFlake({
    src: 'images/icons/snowflake.svg'
});

