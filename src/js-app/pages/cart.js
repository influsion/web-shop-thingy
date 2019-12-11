"use strict";

const dataIconSnow = {src: 'images/icons/snowflake.svg'};


function renderCartPage(e, $target) {
    const breadcrumbsHTML = breadcrumbsComponent({
        pageTitle: 'en_Cart',
        image: 'bg-image--3',
    });

    function template(data, additional, icon) {
        return (`
            ${ breadcrumbsHTML }

            <!-- cart-main-area start -->
            <div class="cart-main-area section-padding--lg bg--white">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 col-sm-12 ol-lg-12">
                            <form action="#">
                                <div class="table-content wnro__table table-responsive">
                                    <table>
                                        <thead>
                                            <tr class="title-top">
                                                <th class="product-thumbnail">Image</th>
                                                <th class="product-name">Product</th>
                                                <th class="product-price">Price</th>
                                                <th class="product-quantity">Quantity</th>
                                                <th class="product-subtotal">Total</th>
                                                <th class="product-remove">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${additional.itemsHTML}
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                            <div class="cartbox__btn">
                                <ul class="cart__btn__list d-flex flex-wrap flex-md-nowrap flex-lg-nowrap justify-content-between">
                                    <li class="check-out"><a class="js-check-out" href="#">Check Out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 offset-lg-6">
                            <div class="cartbox__total__area">
                                <div class="cart__total__amount">
                                    <span>Grand Total</span>
                                    <span class="js-grand-total-price">${data.getTotalPrice()} ₴UAH</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- cart-main-area end -->
        `);
    }

    function cartItem(data) {
        if (!data.quantity) data.quantity = 1;

        return (`
            <tr class="js-cart-item" data-product-id="${data.id}">
                <td class="product-thumbnail"><a class="js-switch-page" href="#product" data-product-id="${data.id}"><img src="${data.image}" alt="${data.name}"></a></td>
                <td class="product-name"><a class="js-switch-page" href="#product" data-product-id="${data.id}">${data.name}</a></td>
                <td class="product-price"><span class="amount">${data.price} ₴UAH</span></td>
                <td class="product-quantity"><input class="js-input-quantity" type="number" value="${data.quantity}"></td>
                <td class="product-subtotal">${Math.round((+data.price * +data.quantity) * 100) / 100} ₴UAH</td>
                <td class="product-remove"><a href="#" class="js-delete-cart-item">X</a></td>
            </tr>
        `)
    };

    // const productIds = basket.map(item => item.id);

    // global.promises.addPromise({
    //     name: 'filteredDataOfProducts',
    //     body: getProducts({ id: productIds }),
    // });

    global.promises.all(res => {
        // const { filteredDataOfProducts } = res;

            const itemsHTML = basket.map(productObj => {
                if (basket.length) {
                    return cartItem(productObj);
                }
            });

            const pageHTML = template(basket, {itemsHTML});

            // console.log('renderCartPage');
            global.$main.first().html(pageHTML);
            afterChangingTheDOM();
        });


    function afterChangingTheDOM() {
        // Код, который нужно запустить после изменения DOM
    }
}
