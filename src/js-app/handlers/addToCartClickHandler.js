'use strict';

const addToCartClickHandler = (e, $target) => {
    e.preventDefault();

    const $quantityField = global.$main.find('.qty');
    const productId = getProductIdFromDataSet($target);
    const quantity = parseInt($quantityField.val()) || 1;

    basket.add({
        id: productId,
        quantity,
    });
};