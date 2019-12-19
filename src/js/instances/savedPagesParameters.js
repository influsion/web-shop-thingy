'use strict';

const savedPagesParameters = {
    key: 'web-shop-thingy_pagesParameters',

    get() {
        return tempStorage.getItem(this.key) || {};
    },

    set(obj) {
        return tempStorage.setItem(this.key, obj);
    }
};