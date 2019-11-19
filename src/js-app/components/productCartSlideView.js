'use strict';

function productCartSlideViewComponents(data) {
    function template(data) {
        return (`
            <div class="product product__style--3">
                <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                    <div class="product__thumb">
                        <a class="first__img js-switch-page" href="#product" data-product-id="${'100'}"><img src="images/books/1.jpg" alt="product image"></a>
                        <a class="second__img animation1 js-switch-page" href="#product" data-product-id="${'100'}"><img src="images/books/2.jpg" alt="product image"></a>
                        <div class="hot__box">
                            <span class="hot-label">BEST SALLER</span>
                        </div>
                    </div>
                    <div class="product__content content--center">
                        <h4><a href="single-product.html">robin parrish</a></h4>
                        <ul class="prize d-flex">
                            <li></li>
                            <li>$35.00</li>
                            <!-- <li class="old_prize">$35.00</li> -->
                        </ul>
                        <div class="action">
                            <div class="actions_inner">
                                <ul class="add_to_links">
                                    <li><a class="cart js-switch-page" href="#cart" data-product-id="${'100'}"><i class="bi bi-shopping-bag4"></i></a></li>
                                    <li><a class="wishlist" href="wishlist.html"><i class="bi bi-shopping-cart-full"></i></a></li>
                                    <!-- <li><a class="compare" href="#"><i class="bi bi-heart-beat"></i></a></li> -->
                                    <li><a data-toggle="modal" title="Quick View" class="quickview modal-view detail-link" href="#productmodal"><i class="bi bi-search"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <!-- <div class="product__hover--content">
                            <ul class="rating d-flex">
                                <li class="on"><i class="fa fa-star-o"></i></li>
                                <li class="on"><i class="fa fa-star-o"></i></li>
                                <li class="on"><i class="fa fa-star-o"></i></li>
                                <li><i class="fa fa-star-o"></i></li>
                                <li><i class="fa fa-star-o"></i></li>
                            </ul>
                        </div> -->
                    </div>
                </div>
            </div>
        `);
    }

    return template(data);
}