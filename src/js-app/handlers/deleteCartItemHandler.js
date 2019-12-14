'use strict';

const deleteCartItemHandler = $target => {
    const $cartItem = $target.parents('.js-cart-item');
    const productId = getProductIdFromDataSet($cartItem);

    $cartItem.remove();
    basket.delete(productId);
};