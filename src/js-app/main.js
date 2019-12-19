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
    // Settings
    global.$header.on('click', '.js-switcher-options', e => ((e, $target) => {
        const { currency = null, language = null } = $target.get(0).dataset;

        if (currency) {
            const name = currencySettings.getName(currency);

            name && switchItem({ name });
            name && currencySettings.setActiveKey(currency);
        }

        if (language) {
            const name = languageSettings.getName(language);

            name && switchItem({ name });
            name && languageSettings.setActiveKey(language);
        }

        function switchItem(params) {
            const $parent = $target.parent();
            $target.siblings('.active').removeClass('active');
            $target.addClass('active');

            $parent.removeClass('is-visible');
            $parent.siblings('[class*="-trigger"]').text(params.name);
        }
    })(e, $(e.currentTarget)));

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

    //form submission
    global.$app.on('click', '.newsletter__block button', e => formSubmission(e, $(e.currentTarget)));
    global.$app.on('keydown', '.newsletter__block input', e => inputEmail(e, $(e.currentTarget)));
    global.$app.on('mouseenter mouseleave', '.js-warning-icon', e => hoverMouse(e, $(e.currentTarget)));

    //contact form submission
    global.$app.on('click', '.contact-btn button', e => contactFormSubmission(e, $(e.currentTarget)));
    global.$app.on('keydown', '#contact-form input, textarea', e => keyPressContactForm(e, $(e.currentTarget)));
    global.$app.on('focus blur', '#contact-form input, textarea', e => focusInput(e, $(e.currentTarget)));

    // Switch page
    global.$app.on('click', '.js-switch-page', e => pageController.setActivePage(e, $(e.currentTarget)));

    // Add product to cart
    global.$app.on('click', '.js-add-to-cart', e => addToCartClickHandler(e, $(e.currentTarget)));
    global.$app.on('click', '.js-add-to-cart-and-switch-page', e => addToCartAndSwitchPageClickHandler(e, $(e.currentTarget)));
    global.$app.on('click', '.js-add-to-cart-quick', e => addToCartClickHandler(e, $(e.currentTarget)));

    //add Product to modal window
    global.$app.on('click', '.js-quick-view', e => quickViewHandler(e, $(e.currentTarget)));

    // Cart
    global.$app.on('change', '.js-input-quantity', e => changeQuantityOfProductHandler(e, $(e.currentTarget)));
    global.$app.on('click', '.js-delete-cart-item', e => deleteProductFromBasketHandler(e, $(e.currentTarget)));

    // Categories and Filter on Shop page
    global.$app.on('click', '.js-change-category-or-subcategory', e => categoriesHandler(e));
    global.$app.on('change', `form[name="brand-checkbox-group-form"] input`, { checkboxType: 'brand' }, e => filterCheckboxGroupHandler(e));
    global.$app.on('change', `form[name="origin-checkbox-group-form"] input`, { checkboxType: 'origin' }, e => filterCheckboxGroupHandler(e));
};

// Main
(() => {
    findElements();
    bindEvents();

    basket.syncWithLocalStorage();

    globalPromiseList.addPromise({
        name: 'appSettings',
        body: getAppSettings(),
    });

    globalPromiseList.addPromise({
        name: 'localization',
        body: getLocalization(),
    });

    globalPromiseList.allPromises(res => {
        const { appSettings } = res;
        localization = res.localization;

        // App settings
        languageSettings.init(appSettings.language);
        currencySettings.init(appSettings.currency);

        const appSettingsHTML = appSettingsComponent({
            language: languageSettings.get(),
            currency: currencySettings.get(),
        });

        global.$header.find('.js-setting__bar__icon').html(appSettingsHTML);

        (() => {
            const settingTrigger = global.$header.find('.setting__active');
            const settingContainer = global.$header.find('.setting__block');

            settingTrigger.on('click', e => {
              e.preventDefault();
              settingContainer.toggleClass('is-visible');
            });

            settingTrigger.on('click', e => {
              e.preventDefault();
              settingContainer.toggleClass('');
            });

            const settingItem = global.$header.find('.currency-trigger');

            settingItem.on('click', function () {
              $(this).siblings('.switcher-dropdown').toggleClass('is-visible');
            });
        })();

        //
        global.$app.find('.js-feedback-copy').text(translate('app_feedback_copy'));
        global.$app.find('.close__wrap span').text(translate('app_search_close'));
        global.$app.find('#js-search-field').attr({
            placeholder: translate('app_search_placeholder')
        });
        global.$header.find('.micart__close span').text(translate('cart_dropdown_close'));
        global.$header.find('.checkout__btn').text(translate('cart_dropdown_go_to_checkout'));
        global.$header.find('.cart__btn').text(translate('cart_dropdown_view_and_edit_cart'));

        // Step: Header Menu links
        const menuItems = [
            ['#home', localization.menu.home],
            ['#shop', localization.menu.shop],
            ['#faq', localization.menu.faq],
            ['#contact', localization.menu.contact],
            ['#about', localization.menu.about],
        ];

        global.$header.find('.mobilemenu__nav').html(mainMenuComponent({
            items: menuItems,
        }));

        global.$header.find('.mainmenu__nav').html(mainMenuComponent({
            items: menuItems,
            additionalClasses: [
                'd-flex',
                'justify-content-start',
            ],
        }));

        global.$menuLinks = global.$header.find('.mainmenu-link');
        pageController.init(global.$menuLinks);

        // Step: Change page
        pageController.setActivePage();
    });

    // Read cached page name
})();
