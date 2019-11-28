"use strict";

function renderCartPage(e, $target) {
    function template(data, additional) {
        return (`
            <!-- Start Bradcaump area -->
            <div class="ht__bradcaump__area bg-image--3">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="bradcaump__inner text-center">
                                <h2 class="bradcaump-title">Shopping Cart</h2>
                                <nav class="bradcaump-content">
                                <a class="breadcrumb_item" href="index.html">Home</a>
                                <span class="brd-separetor">/</span>
                                <span class="breadcrumb_item active">Shopping Cart</span>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Bradcaump area -->

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
                                            <!-- <tr>
                                                <td class="product-thumbnail"><a class="js-switch-page" href="#product" data-product-id="${'100'}"><img src="images/product/sm-3/1.jpg" alt="product img"></a></td>
                                                <td class="product-name"><a class="js-switch-page" href="#product" data-product-id="${'100'}">Natoque penatibus</a></td>
                                                <td class="product-price"><span class="amount">$165.00</span></td>
                                                <td class="product-quantity"><input type="number" value="1"></td>
                                                <td class="product-subtotal">$165.00</td>
                                                <td class="product-remove"><a href="#">X</a></td>
                                            </tr>
                                            <tr>
                                                <td class="product-thumbnail"><a class="js-switch-page" href="#product" data-product-id="${'100'}"><img src="images/product/sm-3/2.jpg" alt="product img"></a></td>
                                                <td class="product-name"><a class="js-switch-page" href="#product" data-product-id="${'100'}">Quisque fringilla</a></td>
                                                <td class="product-price"><span class="amount">$50.00</span></td>
                                                <td class="product-quantity"><input type="number" value="1"></td>
                                                <td class="product-subtotal">$50.00</td>
                                                <td class="product-remove"><a href="#">X</a></td>
                                            </tr>
                                            <tr>
                                                <td class="product-thumbnail"><a class="js-switch-page" href="#product" data-product-id="${'100'}"><img src="images/product/sm-3/3.jpg" alt="product img"></a></td>
                                                <td class="product-name"><a class="js-switch-page" href="#product" data-product-id="${'100'}">Vestibulum suscipit</a></td>
                                                <td class="product-price"><span class="amount">$50.00</span></td>
                                                <td class="product-quantity"><input type="number" value="1"></td>
                                                <td class="product-subtotal">$50.00</td>
                                                <td class="product-remove"><a href="#">X</a></td>
                                            </tr> -->
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                            <div class="cartbox__btn">
                                <ul class="cart__btn__list d-flex flex-wrap flex-md-nowrap flex-lg-nowrap justify-content-between">
                                    <li class="check-out"><a href="#">Check Out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 offset-lg-6">
                            <div class="cartbox__total__area">
                                <div class="cart__total__amount">
                                    <span>Grand Total</span>
                                    <span>$140</span>
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
            <tr>
                <td class="product-thumbnail"><a class="js-switch-page" href="#product" data-product-id="${data.id}"><img src="${data.image}" alt="${data.name}"></a></td>
                <td class="product-name"><a class="js-switch-page" href="#product" data-product-id="${data.id}">${data.name}</a></td>
                <td class="product-price"><span class="amount">$${data.price}</span></td>
                <td class="product-quantity"><input class="js-input-quantity" type="number" value="${data.quantity}"></td>
                <td class="product-subtotal">$${data.price * data.quantity}</td>
                <td class="product-remove"><a href="#">X</a></td>
            </tr>
        `)
    };

    const basket = [
      {
        id:2,
        quantity: 1,
      },
      {
        id:6,
        quantity: 3,
      },
      {
        id:3,
        quantity: 5,
      },
      {
        id: 8,
        quantity: 6,
      },
      {
        id: 7,
        quantity: 2,
      }
    ];

    const productIds = basket.map(item => item.id);

    global.promises.add('filteredDataOfProducts', getProducts({ id: productIds }));
    global.promises.add('categoriesStructure', getCategoriesStructure());

    global.promises.all(res => {
        const { categoriesStructure, filteredDataOfProducts } = res;

        const itemsHTML = filteredDataOfProducts.map(productObj => cartItem(productObj));
        const pageHTML = template({}, {itemsHTML});





        let totalPrice = function() {

            $('.main').on('click', '.js-input-quantity', function(event) {
                let target = event.target;
                let quantity = $(target).val();


                (quantity < 1) && $(target).val(1);

                if (quantity > 0) console.log(quantity);
            });
            return;
        };

        totalPrice(basket, filteredDataOfProducts);
        console.log($target.get(0).dataset.productId);



        console.log('renderCartPage');
        global.$main.first().html(pageHTML);
        afterChangingTheDOM();
    });

    function afterChangingTheDOM() {
        // Код, который нужно запустить после изменения DOM
    }
}

const calcTotalPriceOnCart = e => {
    //! TODO: Need to finish
    const productId = getProductIdFromDataSet($(e.currentTarget));
};