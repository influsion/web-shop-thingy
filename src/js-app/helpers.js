// Create condition
const isKey = key => {
    const obj = Object.keys(key);
    obj[key] = true;

    return obj;
};

// Get value from data-product-id attr
const getProductIdFromDataSet = $elem => $elem.get(0).dataset.productId;

// get value from data-category or data-subcategory attr
const getCategoryOrSubcategoryFromDataSet = $elem => {
    const { category, subcategory } = $elem.get(0).dataset;
    return category || subcategory;
};


const getCategoryFromDataSet = $elem => $elem.get(0).dataset.category;
const getSubcategoryFromDataSet = $elem => $elem.get(0).dataset.subcategory;



// Alternative of typeof
const toType = val => {
    return ({}).toString
        .call(val)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase();
};

const PromiseList = function() {
    const order = [];

    const propss = {
        add: {
            writable: false,
            configurable: false,
            value: function(promiseName, promiseObject) {
                const promisePosition = this.push(promiseObject) - 1;

                order[promisePosition] = promiseName;
                console.log(order);
                console.log('promise name: ' + promiseName + ', ' + 'position: ' + promisePosition);

                return this;
            },
        },
        addPromise: {
            writable: false,
            configurable: false,
            value: function({ name: promiseName, body: promiseObject }) {
                const promisePosition = this.push(promiseObject) - 1;

                order[promisePosition] = promiseName;
                console.log(order);
                console.log('promise name: ' + promiseName + ', ' + 'position: ' + promisePosition);

                return this;
            }
        },
        response: {
            writable: false,
            configurable: false,
            value: {},
        },
        responses: {
            writable: false,
            configurable: false,
            value: function(promiseAllResponseArray) {

                promiseAllResponseArray.forEach((item, i) => {
                    const responseName = order[i];

                    this.response[responseName] = item;
                    console.log(order[i] + ":", item);
                });

                return this.response;
            },
        },
        all: {
            writable: false,
            configurable: false,
            value: function(responseFunction) {
                Promise.all(this)
                    .then(res => this.responses(res))
                    .then(res => responseFunction(res));

            },
        },
    };

    return Object.create([], propss);
};

const Basket = function() {
    const proto = {
        add: {
            writable: false,
            configurable: false,
            value: function(obj) {
                this.push(obj)

                return this;
            },
        },
    };

    return Object.create([], proto);
}

const getProducts = function(params) {
    return fetch(`${serverURL}/products?${qs.stringify(params)}`)
        .then(data => data.json());
};

const getLocalization = function(params = "en") {
    return fetch(`${serverURL}/localization/${params}`)
        .then(data => data.json());
};

const getCategoriesStructure = function() {
    return fetch(`${serverURL}/categoriesstructure`)
        .then(data => data.json());
};

const getFilterConditions = function(params) {
    return fetch(`${serverURL}/filterconditions/${params}`)
        .then(data => data.json());
};

const getFaq = function() {
    return fetch(`${serverURL}/faq`)
        .then(data => data.json());
};

const currentStoredProductID = {
    key: 'web-shop-thingy_currentProductID',

    seveToSessionStorage(productId) {
        return tempStorage.setItem(this.key, parseInt(productId));
    },

    getFromSessionStorage() {
        return tempStorage.getItem(this.key);
    },
};

// localStorage alternative
const storage = {
    getItem(key) {
        const dataJSON = localStorage.getItem(key);
        return (JSON.parse(dataJSON) || {}).value;
    },

    setItem(key, data) {
        const dataJSON = JSON.stringify({
            value: data,
        });

        return localStorage.setItem(key, dataJSON);
    },
};

// sessionStorage alternative
const tempStorage = {
    getItem(key) {
        const dataJSON = sessionStorage.getItem(key);
        return (JSON.parse(dataJSON) || {}).value;
    },

    setItem(key, data) {
        const dataJSON = JSON.stringify({
            value: data,
        });

        return sessionStorage.setItem(key, dataJSON);
    },
};

//! TODO: DELETE!!!
const storedFilterParameters = {
    key: 'web-shop-thingy_filterParameters',

    seveToSessionStorage(obj) {
        return tempStorage.setItem(this.key, obj);
    },

    getFromSessionStorage() {
        return tempStorage.getItem(this.key);
    },
};

const savedPagesParameters = {
    key: 'web-shop-thingy_pagesParameters',

    get() {
        return tempStorage.getItem(this.key);
    },

    set(obj) {
        return tempStorage.setItem(this.key, obj);
    }
};


const filterCheckboxGroupHandler = e => {
    const { checkboxType } = e.data;
    const $checkedInputs = $(e.currentTarget).parents('form').find('input:checked');
    const arrytOfValues = [];

    const pagesParameters = savedPagesParameters.get();
    pagesParameters.shopPage[checkboxType] = arrytOfValues;

    $checkedInputs.each((i, item) => arrytOfValues.push($(item).val()));

    savedPagesParameters.set(pagesParameters);

    console.log(pagesParameters, e);

    renderProductsOnShoppage();
};

const categoriesHandler = e => {
    const $target = $(e.currentTarget);

    $target.parents('.wedget__categories.poroduct--cat').find('a').removeClass('active');
    $target.addClass('active');
    const categoryAndSubcategory = {
        category: getCategoryFromDataSet($target),
        subcategory: getSubcategoryFromDataSet($target),
    };

    const pagesParameters = savedPagesParameters.get() || {};

    const type = categoryAndSubcategory.category
        ? 'category'
        : categoryAndSubcategory.subcategory
        ? 'subcategory'
        : null ;

    const value = categoryAndSubcategory.category || categoryAndSubcategory.subcategory || null;

    // if (!pagesParameters.shopPage) {
        pagesParameters.shopPage = {};
    // }

    pagesParameters.shopPage.menu = {
        type,
        value,
    };

    savedPagesParameters.set(pagesParameters);

    console.log(pagesParameters)

    renderProductsOnShoppage();
};

const renderProductsOnShoppage = (params = {}) => {
    const promises = new PromiseList();

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

    console.error(filterParameters);

    promises.addPromise({
        name: 'filteredDataOfProducts',
        body: getProducts(filterParameters),
    });

    promises.addPromise({
        name: 'filterConditions',
        body: getFilterConditions(pageParameters.menu.value),
    });

    promises.all(res => {
        const { filteredDataOfProducts, filterConditions } = res;

        const productsHTML = filteredDataOfProducts.map(productCartGridViewComponents);

        const filterHTML = filterComponent({
            i18n: {
                price: 'en_Price',
                brands: 'en_Brands',
                origin: 'en_Origin',
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

        // TODO: Show filter
        global.$main.find('.js-product-filter').html(filterHTML);

        /*====== Price Slider Active ======*/
        const $sliderRange = global.$main.find('#slider-range');
        const $amount = global.$main.find('#amount');

        const priceExtremeValues = $sliderRange.data('extremeValues').split(':').map(item => parseInt(item));
        const priceActiveValues = $sliderRange.data('activeValues').split(':').map(item => parseInt(item));

        $sliderRange.slider({
            range: true,
            step: 1,
            min: priceExtremeValues[0],
            max: priceExtremeValues[1],
            values: priceActiveValues,
            slide: function(event, ui) {
                $amount.val('$' + ui.values[0] + ' - $' + ui.values[1]);

                const pagesParameters = savedPagesParameters.get();
                pagesParameters.shopPage.price = ui.values;

                this._reload = function() {
                    savedPagesParameters.set(pagesParameters);

                    renderProductsOnShoppage();
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

        $amount.val(`$${ $sliderRange.slider('values', 0) } - $${ $sliderRange.slider('values', 1) }`);
    });
};

const translate = (key) => {
    const hasi18n = !!localization && !!localization.i18n;
    return hasi18n && !!localization.i18n[key] ? localization.i18n[key] : '';
};