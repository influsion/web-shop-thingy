// Create condition
const isKey = key => {
    const obj = Object.keys(key);
    obj[key] = true;

    return obj;
};

// Get value from data-product-id attr
const getProductIdFromDataSet = $elem => $elem.get(0).dataset.productId;

// Alternative of typeof
const toType = val => {
    return ({}).toString
        .call(val)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase();
};

const PromiseList = function() {
    const proto = {
        order: {
            writable: false,
            configurable: false,
            value: {},
        },
        add: {
            writable: false,
            configurable: false,
            value: function(promiseName, promiseObject) {
                this.order[promiseName] = this.push(promiseObject) - 1;

                return this;
            },
        },
        extract: {
            writable: false,
            configurable: false,
            value: function(promiseName, promiseResponseArray) {
                return promiseResponseArray[this.order[promiseName]];
            },
        },
    };

    return Object.create([], proto);
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

const storedFilterParameters = {
    key: 'web-shop-thingy_filterParameters',

    seveToSessionStorage(obj) {
        return tempStorage.setItem(this.key, obj);
    },

    getFromSessionStorage() {
        return tempStorage.getItem(this.key);
    },
}