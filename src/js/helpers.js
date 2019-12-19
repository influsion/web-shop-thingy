// Create condition
const isKey = key => {
    const obj = Object.keys(key);
    obj[key] = true;

    return obj;
};

const getHash = $elem => $elem.get(0).hash || $elem.get(0).dataset.hash;

// Get value from data-product-id attr
const getProductIdFromDataSet = $elem => $elem.get(0).dataset.productId;

// get value from data-category or data-subcategory attr
const getCategoryFromDataSet = $elem => $elem.get(0).dataset.category;
const getSubcategoryFromDataSet = $elem => $elem.get(0).dataset.subcategory;

// Price template X.XX
const priceTemplate = price => Math.round(price * 100) / 100; // (Math.round(price * 100) / 100).toFixed(2)

// Alternative of typeof
const toType = val => {
    return ({}).toString
        .call(val)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase();
};

const translate = (key) => {
    const hasi18n = !!localization && !!localization.i18n;
    return hasi18n && !!localization.i18n[key] ? localization.i18n[key] : '';
};

// Reload page
const reloadPage = () => window.location = window.location;

const renderProductsOnShopPage = (params = {}) => {
    const promises = PromiseList();

    const { shopPage: pageParameters } = savedPagesParameters.get();
    const filterParameters = {};

    // Category or Subcategory
    filterParameters[pageParameters.menu.type] = pageParameters.menu.value;

    // Price
    pageParameters.price && (filterParameters.price = pageParameters.price);

    // Brand
    pageParameters.brand && (filterParameters.brand = pageParameters.brand);

    // Origin
    pageParameters.origin && (filterParameters.origin = pageParameters.origin);

    promises.addPromise({
        name: 'filteredDataOfProducts',
        body: getProducts(filterParameters),
    });

    promises.addPromise({
        name: 'filterConditions',
        body: getFilterConditions({
            categoryOrSubcategory: pageParameters.menu.value,
            price: pageParameters.price,
        }),
    });

    promises.allPromises(res => {
        const { filteredDataOfProducts, filterConditions } = res;

        const productsHTML = filteredDataOfProducts.map(productCartGridViewComponents);

        const filterHTML = filterComponent({
            i18n: {
                price: translate('price_filter_title'),
                brands: translate('brand_filter_title'),
                origin: translate('origin_filter_title'),
            },

            structure: filterConditions,

            state: {
                price: pageParameters.price || filterConditions.priceRange || [0, 0],
                brand: pageParameters.brand || [],
                origin: pageParameters.origin || [],
            }
        });

        // Show products
        global.$main.find('.js-filtered-products').html(productsHTML);

        // Show filter
        global.$main.find('.js-product-filter').html(filterHTML);

        /*====== Price Slider Active ======*/
        const $sliderRange = global.$main.find('#slider-range');
        const $amount = global.$main.find('#amount');

        const priceExtremeValues = $sliderRange.data('extremeValues').split(':').map(item => parseInt(item));
        const priceActiveValues = $sliderRange.data('activeValues').split(':').map(item => parseInt(item));

        const convert = currencySettings.convert.bind(currencySettings);
        const getCurrency = currencySettings.getCurrency.bind(currencySettings);

        const rangeString = (lowerPrice, topPrice) => {
            const section = price => `${ convert(price) } ${ getCurrency() }`;

            return `${ section(lowerPrice) } - ${ section(topPrice) }`
        };

        $sliderRange.slider({
            range: true,
            step: 1,
            min: priceExtremeValues[0],
            max: priceExtremeValues[1],
            values: priceActiveValues,
            slide: function(event, ui) {
                $amount.val(rangeString(ui.values[0], ui.values[1]));

                const pagesParameters = savedPagesParameters.get();
                pagesParameters.shopPage.price = ui.values;

                this._reload = function() {
                    savedPagesParameters.set(pagesParameters);

                    renderProductsOnShopPage();
                };
            }
        });


        $sliderRange.on('mousedown mouseup mouseleave', e => {
            const { _reload: reload, _hold: hold } = e.currentTarget;

            const is = Object.create(null);
            is[e.type] = true;

            if (is.mousedown) {
                e.currentTarget._hold = true;
            }

            if (is.mouseup || is.mouseleave && hold) {
                e.currentTarget._hold = false;

                // reload && $(e.currentTarget).slider( "destroy" );
                reload && reload();
            }
        });

        //! Set value $('#slider-range').slider( "values", 0, 0 );
        //! Set value $('#slider-range').slider( "option", "max", 50000 );

        $amount.val(rangeString($sliderRange.slider('values', 0), $sliderRange.slider('values', 1)));
    });
};

const renderProductsOnCartPage = (params = {}) => {
    const { productsData } = params;

    const cartTableItemHTML = productsData.reduce((accumulator, item, i) => {
        return accumulator + cartTableItemComponent(item);
    }, '');

    global.$main.find('.js-cart-table-list').html(cartTableItemHTML);
    calcGrandTotalPriceOnCartPage();
    showOrHideCheckOutButton();
};

const showOrHideCheckOutButton = () => {
    const grandTotalPrice = basket.getQuantityOfProducts();
    const checkoutButtonOnCartPage = global.$main.find('.cart__btn__list');

    if (grandTotalPrice) {
        checkoutButtonOnCartPage.removeClass('hide');
    } else {
        checkoutButtonOnCartPage.addClass('hide');
    }
};

const calcGrandTotalPriceOnCartPage = () => {
    const convert = currencySettings.convert.bind(currencySettings);
    const getCurrency = currencySettings.getCurrency.bind(currencySettings);
    const grandTotalPrice = basket.getGrandTotalPrice();

    global.$main.find('.js-grand-total-price').text(`${ convert(grandTotalPrice) } ${ getCurrency() }`);
}
