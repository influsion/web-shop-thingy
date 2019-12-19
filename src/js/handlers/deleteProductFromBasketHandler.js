'use strict';

const deleteProductFromBasketHandler = (e, $target) => {
    const $cartItem = $target.parents('.js-cart-item');
    const id = getProductIdFromDataSet($cartItem);

    basket.delete(id);
    $cartItem.remove();
    calcGrandTotalPriceOnCartPage();
    showOrHideCheckOutButton();
};
