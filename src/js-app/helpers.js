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
    };

    return Object.create([], propss);
};

const Basket = function() {
    const key = 'web-shop-thingy_basket';

    const saveToLocalStorage = arr => storage.setItem(key, arr);
    
    const proto = {
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

                saveToLocalStorage(this);

                return this;
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

                saveToLocalStorage(this);

                return this;
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
                
                return Math.round(totalPrice * 100) / 100;
            },
        },
        grandTotalPrice: {
            writable: false,
            configurable: false,
            value: function() {
                const totalPrice = this.reduce((accumulator, productObject) => {
                    let { price, quantity } = productObject;
                    price = parseInt(price);
                    quantity = parseInt(quantity);
                    accumulator++;
                    return accumulator += price * quantity;
                }, 0);
                
                return Math.round(totalPrice * 100) / 100;
            },
        },
        change: {
            writable: false,
            configurable: false,
            value: function() {
                
            },
        }
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

const deleteCartItemHandler = $target => {
    const $cartItem = $target.parents('.js-cart-item');
    const productId = getProductIdFromDataSet($cartItem);
    
    $cartItem.remove();
    basket.delete(productId)
    // TODO: Call basket getTotal method
    // const totalPrice = ;
    // global.$main.find('').text('totalPrice');
};

const addToCartClickHandler = $target => {
    const productId = getProductIdFromDataSet($target);
    const quantity = parseInt(global.$main.find('.qty').val());

    const handlerPromises = new PromiseList();

    handlerPromises.add('filteredDataOfProducts', getProducts({ id: productId }));

    Promise.all(handlerPromises)
        .then(res => handlerPromises.responses(res))
        .then(res => {
            const currentProduct = res.filteredDataOfProducts[0];

            basket.add({
                ...currentProduct,
                quantity,
            });
        });
};

 

