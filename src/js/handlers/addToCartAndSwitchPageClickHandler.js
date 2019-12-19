'use strict';

const addToCartAndSwitchPageClickHandler = (e, $target) => {
    const productId = getProductIdFromDataSet($target);

    !basket.has({productId}) && basket.add({
        id: productId,
        quantity: 1,
    });

    pageController.setActivePage(e, $target);
};