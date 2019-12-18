'use strict';

const changeQuantityOfProductHandler = (e, $target) => {
    const $cartItem = $target.parents('.js-cart-item');
    const id = getProductIdFromDataSet($cartItem);
    const quantity = +$target.val();

    (quantity < 1) && $target.val(1);

    if (quantity > 0) {
        basket.update({ id, quantity });
        calcGrandTotalPriceOnCartPage();
    }
};
