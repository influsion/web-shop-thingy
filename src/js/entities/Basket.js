'use strict';

const Basket = function() {
    const _this = [];

    const key = 'web-shop-thingy_basket';
    const $quantityIndicator = $('.shopcart .product_qun');
    const $checkoutButton = $('.checkout__btn.js-switch-page');


    const saveToLocalStorage = arr => storage.setItem(key, arr);
    const getFromLocalStorage = () => storage.getItem(key);

    const updateQuantityIndicator = quantityOfProducts => $quantityIndicator.text(quantityOfProducts);
    const showOrHideCheckOutButton = quantityOfProducts => {
        if (quantityOfProducts) {
            $checkoutButton.removeClass('hide');
        } else {
            $checkoutButton.addClass('hide');
        }
    };

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

    const findIndex = (targetObject, targetId) => {
        const result = {
            index: -1,
            foundIndex: -1,
        };

        for (const { id } of targetObject) {
            result.index++;

            if (+id === +targetId) {
                result.foundIndex = result.index;
                break;
            }
        }

        return result.foundIndex;
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
                showOrHideCheckOutButton(this.getQuantityOfProducts());
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
                showOrHideCheckOutButton(this.getQuantityOfProducts());

                return this;
            },
        },
        update: {
            writable: false,
            configurable: false,
            value: function(objectOfUpdating) {
                const { id, quantity } = objectOfUpdating;
                const index = findIndex(this, id);

                this[index].quantity = quantity;

                updateQuantityIndicator(this.getQuantityOfProducts());
                saveToLocalStorage(this);
                showOrHideCheckOutButton(this.getQuantityOfProducts());

                return this;
            },
        },
        mergeData: {
            writable: false,
            configurable: false,
            value: function(arrayOfProductsData) {
                arrayOfProductsData.forEach(item => {
                    const productIndex = findIndex(this, item.id);

                    this[productIndex] = {
                        ...this[productIndex],
                        ...item,
                    }
                });

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
            value: function(id) {
                const foundIndex = findIndex(this, id);

                if (foundIndex > -1) {
                   this.splice(foundIndex, 1);
                }

                updateQuantityIndicator(this.getQuantityOfProducts());
                saveToLocalStorage(this);
                showOrHideCheckOutButton(this.getQuantityOfProducts());

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
        getGrandTotalPrice: {
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