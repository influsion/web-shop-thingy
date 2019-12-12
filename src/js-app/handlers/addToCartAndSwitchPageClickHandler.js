'use strict';

const addToCartAndSwitchPageClickHandler = (e, $target) => {
    const $quantityField = global.$main.find('.qty');
    const productId = getProductIdFromDataSet($target);
    const quantity = parseInt($quantityField.val()) || 1;

    !basket.has({productId}) && basket.add({
        id: productId,
        quantity,
    });

    pageController.setActivePage(e, $target);
};