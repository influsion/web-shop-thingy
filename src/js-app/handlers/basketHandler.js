'use strict';

const changeGradTotalPrice = $target => {
    // TODO: Call basket getTotal method
    const totalPrice = basket.getTotalPrice();
    global.$main.find('.js-grand-total-price').text(`${totalPrice} ₴UAH`);
};

const changeTotalPrice = $target => {
    const $cartItem = $target.parents('.js-cart-item');
    const productId = getProductIdFromDataSet($cartItem);
    const quantity = $target.val();
    (quantity < 1) && $target.val(1);
    if (quantity > 0) {
       const index = basket.findIndex(item => item.id === productId);
       basket[index].quantity = quantity;
       $cartItem.find('.product-subtotal').text(`${Math.round((+basket[index].price * +basket[index].quantity) * 100) / 100} ₴UAH`);
    }

}
