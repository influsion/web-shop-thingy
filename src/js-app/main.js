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

const snowFlake = (data) => {
    $(`#wrapper`).prepend(`<div class="snow-flake flake1"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake2"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake3"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake4"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake5"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake6"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake7"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake8"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake9"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake10"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake11"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake12"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake13"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake14"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake15"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake16"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake17"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake18"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake19"><img src="${data.src}" alt="icon"></div>`);
    $(`#wrapper`).prepend(`<div class="snow-flake flake20"><img src="${data.src}" alt="icon"></div>`);

    const fincSnowflake = (elem, top, left, x, y, yPos) => {
        setInterval(function() {
            top += 0.2;
            if (top >= x) top = 0;
            left += 0.08;
            if (left > 1200) left = 0;
            $(elem).css({"top": top, "left": left})
        }, 10);
    }
    
    fincSnowflake(".flake1", 0, 80, 1500, 90);
    fincSnowflake(".flake2", 150, 130, 1500, 190);
    fincSnowflake(".flake3", 400, 230, 1500, 290);
    fincSnowflake(".flake4", 50, 330, 1500, 390);
    fincSnowflake(".flake5", 680, 430, 1500, 490);
    fincSnowflake(".flake6", 0, 530, 1500, 590);
    fincSnowflake(".flake7", 360, 630, 1500, 690);
    fincSnowflake(".flake8", 240, 730, 1500, 790);
    fincSnowflake(".flake9", 550, 830, 1500, 890);
    fincSnowflake(".flake10", 0, 980, 1500, 990);
    fincSnowflake(".flake11", 0, 80, 1500, 90);
    fincSnowflake(".flake12", 150, 180, 500, 190);
    fincSnowflake(".flake13", 400, 280, 500, 290);
    fincSnowflake(".flake14", 50, 380, 500, 390);
    fincSnowflake(".flake15", 680, 480, 500, 490);
    fincSnowflake(".flake16", 0, 580, 500, 590);
    fincSnowflake(".flake17", 360, 680, 500, 690);
    fincSnowflake(".flake18", 240, 780, 500, 790);
    fincSnowflake(".flake19", 550, 880, 500, 890);
    fincSnowflake(".flake20", 0, 980, 500, 990);
};

snowFlake(dataIconSnow);

