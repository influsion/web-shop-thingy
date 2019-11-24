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
    };

    return Object.create([], proto);
};

const getProducts = function(params) {
    return fetch(`${serverURL}/products?${qs.stringify(params)}`)
        .then(data => data.json());
};

const getLocalization = function(params = "en") {
    return fetch(`${serverURL}/localization/${params}`)
        .then(data => data.json());
};

const getCategoriesStructure = function(params = "en") {
    return fetch(`${serverURL}/categoriesstructure/${params}}`)
        .then(data => data.json());
};
