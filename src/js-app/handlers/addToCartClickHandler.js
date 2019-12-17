'use strict';

const addToCartClickHandler = (e, $target) => {
    e.preventDefault();

    const productId = getProductIdFromDataSet($target);

    basket.add({
        id: productId,
        quantity: 1,
    });
};