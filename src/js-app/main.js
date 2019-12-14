'use strict';

const findElements = function() {
    global.$app = $('#wrapper');
    global.$header = $('#wn__header');
    global.$main = global.$app.find('.main');

    global.$search = global.$app.find('#js-search-field');
    global.$searchResult = global.$app.find('.js-search-result');
    global.$searchContainer = global.$app.find('.search_active');



    // Header Search btn
    global.$headerSearchBtn = global.$header.find('.shop_search > a');

    // Header Shopcart btn
    global.$headerCartBtn = global.$header.find('.shopcart > a');
    global.$headerCartCounter = global.$headerCartBtn.find('.product_qun');
};

const bindEvents = function() {
    // Serach
    global.$app.on('click', '.search__active', e => {
        e.preventDefault();
        global.$searchContainer.toggleClass('is-visible');
    });

    global.$app.on('click', '.close__wrap', () => {
        global.$searchContainer.removeClass('is-visible');
        global.$search.val('');
        global.$search.trigger('change');
    });

    global.$search.on('keydown keyup change', searchHandler);

    global.$searchResult.on('click', '.js-clear-search-field', () => global.$app.find('.close__wrap').trigger('click'));

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


// snowFlake({
//     src: 'images/icons/snowflake.svg'
// });

