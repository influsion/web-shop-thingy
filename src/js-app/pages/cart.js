"use strict";


function renderCartPage(e, $target) {
    const pagePromises = PromiseList();

    const breadcrumbsHTML = breadcrumbsComponent({
        pageTitle: translate('cart_page_title'),
        imageClass: 'bg-breadcrumbs--cart',
    });

    basket.syncWithLocalStorage();

    basket.getQuantityOfProducts() && pagePromises.addPromise({
        name: 'productsFromBasket',
        body: getProducts({ id: basket.getIdsOfProducts() }),
    });

    pagePromises.allPromises(res => {
        const { productsFromBasket = [] } = res;

        basket.mergeData(productsFromBasket);
        const productsData = basket.review();

        function pageTemplate() {
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
                                                    <th class="product-thumbnail"><!-- Image --></th>
                                                    <th class="product-name">${translate('cart_table_product_name')}</th>
                                                    <th class="product-price">${translate('cart_table_product_price')}</th>
                                                    <th class="product-quantity">${translate('cart_table_product_quantity')}</th>
                                                    <th class="product-subtotal">${translate('cart_table_product_total')}</th>
                                                    <th class="product-remove"><!-- Remove --></th>
                                                </tr>
                                            </thead>
                                            <tbody class="js-cart-table-list"></tbody>
                                        </table>
                                    </div>
                                </form>
                                <div class="cartbox__btn">
                                    <ul class="cart__btn__list d-flex flex-wrap flex-md-nowrap flex-lg-nowrap justify-content-between">
                                        <li class="check-out">
                                            <a class="js-switch-page js-check-out" href="#checkout">${translate('cart_page_check_out')}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 offset-lg-6">
                                <div class="cartbox__total__area">
                                    <div class="cart__total__amount">
                                        <span>${translate('cart_page_grand_total')}:</span>
                                        <span class="js-grand-total-price"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- cart-main-area end -->
            `);
        }

        const pageHTML = pageTemplate();

        console.log('renderCartPage');
        global.$main.first().html(pageHTML);

        afterChangingTheDOM({
            productsData,
        });
    });


    function afterChangingTheDOM(params) {
        const { productsData } = params;

        renderProductsOnCartPage({ productsData });
    }
}
