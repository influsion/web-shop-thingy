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

// Reload page
const reloadPage = () => window.location = window.location;

const PromiseList = function() {
    const order = [];

    const propss = {
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
        allPromises: {
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
    return fetch(`${serverURL}/filterconditions?${qs.stringify(params)}`)
        .then(data => data.json());
};

const fetchPageData = function ({ page, lang }) {
    return fetch(`${serverURL}/page/${page}/${lang}`)
        .then(data => data.json());
};

const postEmail = email => {
    return fetch(`${serverURL}/subscribe`, {
        method: 'post',
        body: JSON.stringify({value: email}),
        headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(response => response.json());
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

const savedPagesParameters = {
    key: 'web-shop-thingy_pagesParameters',

    get() {
        return tempStorage.getItem(this.key);
    },

    set(obj) {
        return tempStorage.setItem(this.key, obj);
    }
};



const renderProductsOnShoppage = (params = {}) => {
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

        // TODO: Show filter
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

        $amount.val(rangeString($sliderRange.slider('values', 0), $sliderRange.slider('values', 1)));
    });
};

const translate = (key) => {
    const hasi18n = !!localization && !!localization.i18n;
    return hasi18n && !!localization.i18n[key] ? localization.i18n[key] : '';
};

const Basket = function() {
    const _this = [];

    const key = 'web-shop-thingy_basket';
    const $quantityIndicator = $('.shopcart .product_qun');

    const saveToLocalStorage = arr => storage.setItem(key, arr);
    const getFromLocalStorage = () => storage.getItem(key);

    const updateQuantityIndicator = quantityOfProducts => $quantityIndicator.text(quantityOfProducts);

    const excludeDuplicates = (arrayOfProducts = []) => {
        const unicIds = [];
        const newArrayOfProducts = [];
        arrayOfProducts = Object.values(arrayOfProducts);

        for (const productObject of arrayOfProducts) {
            const id = +productObject.id;

            if (!id) {
                continue;
            }

            const isUnic = !unicIds.includes(id);

            if (isUnic) {
                unicIds.push(id);
                newArrayOfProducts.push(productObject);
            }
        }

        return newArrayOfProducts;
    };

    const proto = {
        syncWithLocalStorage: {
            writable: false,
            configurable: false,
            value: function() {
                this.splice(0);

                const arrayOfProducts = excludeDuplicates(getFromLocalStorage());

                arrayOfProducts.forEach(item => {
                    this.push(item);
                });

                saveToLocalStorage(this);
                updateQuantityIndicator(this.getQuantityOfProducts());
            },
        },
        has: {
            writable: false,
            configurable: false,
            value: function({productId}) {
                productId = +productId;

                for (const {id} of this) {
                    const areIdentical = +id === productId;

                    if (areIdentical) {
                        return areIdentical;
                    }
                }
            },
        },
        getIdsOfProducts: {
            writable: false,
            configurable: false,
            value: function() {
                return this.map(item => item.id);
            },
        },
        add: {
            writable: false,
            configurable: false,
            value: function(obj) {
                const foundIndex = this.findIndex(item => parseInt(item.id) === parseInt(obj.id));

                if (foundIndex > -1) {
                   this[foundIndex].quantity += obj.quantity;
                } else {
                    this.push(Object.assign({}, obj));
                }

                updateQuantityIndicator(this.getQuantityOfProducts());
                saveToLocalStorage(this);

                return this;
            },
        },
        review: {
            writable: false,
            configurable: false,
            value: function() {
                return Object.values(this).filter(item => toType(item) === 'object');
            },
        },
        delete: {
            writable: false,
            configurable: false,
            value: function(productId) {
                const foundIndex = this.findIndex(item => parseInt(item.id) === parseInt(productId));

                if (foundIndex > -1) {
                   this.splice(foundIndex, 1);
                }

                updateQuantityIndicator(this.getQuantityOfProducts());
                saveToLocalStorage(this);

                return this;
            },
        },
        getQuantityOfProducts: {
            writable: false,
            configurable: false,
            value: function() {
                return this.reduce((accumulator, { quantity }) => accumulator + parseInt(quantity), 0)
            },
        },
        getTotalPrice: {
            writable: false,
            configurable: false,
            value: function() {
                const totalPrice = this.reduce((accumulator, productObject) => {
                    let { price, quantity } = productObject;
                    price = parseInt(price);
                    quantity = parseInt(quantity);

                    return accumulator += price * quantity;
                }, 0);
                saveToLocalStorage(this);

                return Math.round(totalPrice * 100) / 100;
            },
        },
    };

    return Object.create(_this, proto);
};

const currencySettings = {
    key: 'web-shop-thingy_currency-settings',

    init(settingsObject) {
        this._settings = { ...settingsObject };

        const savedKey = this.getFromLocalStorage();
        const { key: newKey = this._settings.default } = this._settings.available.find(item => item.key === savedKey) || {};

        this._settings.active = newKey;
        this.saveToLocalStorage(newKey);
    },
    getFromLocalStorage() {
        return storage.getItem(this.key);
    },
    saveToLocalStorage(val) {
        return storage.setItem(this.key, val);
    },
    getName(key) {
        const { name = null } = this._settings.available.find(item => item.key === key) || {};
        return name;
    },
    setActiveKey(key) {
        // this._settings.active = key;
        this.saveToLocalStorage(key);

        reloadPage();
    },
    get() {
        return { ...this._settings };
    },
    convert(price) {
        const { active, available } = this._settings;
        const { rate } = available.find(item => item.key === active);

        return priceTemplate(+rate * +price);
    },
    getCurrency() {
        const { active, available } = this._settings;
        const { name } = available.find(item => item.key === active);

        return name;
    }
};

const languageSettings = {
    key: 'web-shop-thingy_language-settings',

    init(settingsObject) {
        this._settings = { ...settingsObject };

        const savedKey = this.getFromLocalStorage();
        const { key: newKey = this._settings.default } = this._settings.available.find(item => item.key === savedKey) || {};

        this._settings.active = newKey;
        this.saveToLocalStorage(newKey);
    },
    getFromLocalStorage() {
        return storage.getItem(this.key);
    },
    saveToLocalStorage(val) {
        return storage.setItem(this.key, val);
    },
    getName(key) {
        const { name = null } = this._settings.available.find(item => item.key === key) || {};
        return name;
    },
    setActiveKey(key) {
        // this._settings.active = key;
        this.saveToLocalStorage(key);

        reloadPage();
    },
    get() {
        return { ...this._settings };
    },
};