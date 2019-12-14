'use strict';

const cartTableItemComponent = data => {
    if (!componentData.quantity) componentData.quantity = 1;


    // function cartItem(data) {
    //     if (!componentData.quantity) componentData.quantity = 1;

    //     return (`
    //         <tr class="js-cart-item" data-product-id="${componentData.id}">
    //             <td class="product-thumbnail"><a class="js-switch-page" href="#product" data-product-id="${componentData.id}"><img src="${data.image}" alt="${data.name}"></a></td>
    //             <td class="product-name"><a class="js-switch-page" href="#product" data-product-id="${data.id}">${data.name}</a></td>
    //             <td class="product-price"><span class="amount">${data.price} ₴UAH</span></td>
    //             <td class="product-quantity"><input class="js-input-quantity" type="number" value="${data.quantity}"></td>
    //             <td class="product-subtotal">${Math.round((+data.price * +data.quantity) * 100) / 100} ₴UAH</td>
    //             <td class="product-remove"><a href="#" class="js-delete-cart-item">X</a></td>
    //         </tr>
    //     `)
    // };

    const subTotalPrice = Math.round((+componentData.price * +componentData.quantity) * 100) / 100;

    return (`
        <tr class="js-cart-item" data-product-id="${componentData.id}">
            <td class="product-thumbnail">
                <a class="js-switch-page" href="#product" data-product-id="${componentData.id}">
                    <img src="${componentData.image}" alt="${componentData.name}">
                </a>
            </td>
            <td class="product-name">
                <a class="js-switch-page" href="#product" data-product-id="${componentData.id}">${componentData.name}</a>
            </td>
            <td class="product-price">
                <span class="amount">${componentData.price}</span>
            </td>
            <td class="product-quantity">
                <input class="js-input-quantity" type="number" value="${componentData.quantity}">
            </td>
            <td class="product-subtotal">
                ${subTotalPrice}
            </td>
            <td class="product-remove">
                <a href="#" class="js-delete-cart-item">X</a>
            </td>
        </tr>
    `);
};