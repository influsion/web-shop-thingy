"use strict";


function renderProductPage(e, $target) {
    const breadcrumbsHTML = breadcrumbsComponent({
        pageTitle: 'en_Shop'
    });
    const pageTemplate = data => {
        return (`
            <!-- Start Bradcaump area -->
            ${ breadcrumbsHTML };
            <!--<div class="ht__bradcaump__area bg-image--4">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="bradcaump__inner text-center">
                                <h2 class="bradcaump-title">Shop Single</h2>
                                <nav class="bradcaump-content">
                                <a class="breadcrumb_item" href="index.html">Home</a>
                                <span class="brd-separetor">/</span>
                                <span class="breadcrumb_item active">Shop Single</span>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>-->
            <!-- End Bradcaump area -->

            <!-- Start main Content -->
            <div class="maincontent bg--white pt--80 pb--55">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-9 col-12">
                            <div class="wn__single__product">
                                <div class="row">
                                    <div class="col-lg-6 col-12">
                                        <div class="wn__fotorama__wrapper">
                                            <div class="fotorama wn__fotorama__action" data-nav="thumbs">
                                                <a href="1.jpg"><img src="${data.image}" alt=""></a>
                                                <a href="2.jpg"><img src="images/product/2.jpg" alt=""></a>
                                                <a href="3.jpg"><img src="images/product/3.jpg" alt=""></a>
                                                <a href="4.jpg"><img src="images/product/4.jpg" alt=""></a>
                                                <a href="5.jpg"><img src="images/product/5.jpg" alt=""></a>
                                                <a href="6.jpg"><img src="images/product/6.jpg" alt=""></a>
                                                <a href="7.jpg"><img src="images/product/7.jpg" alt=""></a>
                                                <a href="8.jpg"><img src="images/product/8.jpg" alt=""></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-12">
                                        <div class="product__info__main">
                                            <h1>${data.name}</h1>
                                            <!-- <div class="product-reviews-summary d-flex">
                                                <ul class="rating-summary d-flex">
                                                    <li><i class="zmdi zmdi-star-outline"></i></li>
                                                    <li><i class="zmdi zmdi-star-outline"></i></li>
                                                    <li><i class="zmdi zmdi-star-outline"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star-outline"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star-outline"></i></li>
                                                </ul>
                                            </div> -->
                                            <div class="price-box">
                                                <span>Price: ${data.price} UAH</span>
                                            </div>
                                            <div class="product__overview">
                                                <p>${data.description}</p>
                                            </div>
                                            <div class="box-tocart d-flex">
                                                <span>Qty</span>
                                                <input id="qty" class="input-text qty" name="qty" min="1" value="1" title="Qty" type="number">
                                                <div class="addtocart__actions">
                                                    <button class="tocart js-add-to-cart" type="submit" title="Add to Cart">Add to Cart</button>
                                                </div>
                                                <div class="product-addto-links clearfix">
                                                    <a class="js-switch-page switch-to-cart" href="#cart" data-product-id="${data.id}">
                                                        <i class="bi bi-shopping-bag4"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="product_meta">
                                                <span class="posted_in">Categories:
                                                    <a href="#">${data.category}</a>
                                                </span>
                                            </div>
                                            <!--<div class="product-share">
                                                <ul>
                                                    <li class="categories-title">Share :</li>
                                                    <li>
                                                        <a href="#">
                                                            <i class="icon-social-twitter icons"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i class="icon-social-tumblr icons"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i class="icon-social-facebook icons"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <i class="icon-social-linkedin icons"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="product__info__detailed">
                                <div class="review-fieldset">
                                    <h3>Comments:</h3>

                                    <div class="review_form_field">
                                        <div class="input__box">
                                            <span>Nickname</span>
                                            <input id="nickname_field" type="text" name="nickname">
                                        </div>
                                        <div class="input__box">
                                            <span>Summary</span>
                                            <input id="summery_field" type="text" name="summery">
                                        </div>
                                        <div class="input__box">
                                            <span>Review</span>
                                            <textarea name="review"></textarea>
                                        </div>
                                        <div class="review-form-actions">
                                            <button>Submit Review</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-12 md-mt-40 sm-mt-40">
                            <div class="shop__sidebar">
                                <aside class="wedget__categories poroduct--cat">
                                    <h3 class="wedget__title">Product Categories</h3>
                                    <ul>
                                        <li><a href="#">Biography <span>(3)</span></a></li>
                                        <li><a href="#">Business <span>(4)</span></a></li>
                                        <li><a href="#">Cookbooks <span>(6)</span></a></li>
                                        <li><a href="#">Health & Fitness <span>(7)</span></a></li>
                                        <li><a href="#">History <span>(8)</span></a></li>
                                        <li><a href="#">Mystery <span>(9)</span></a></li>
                                        <li><a href="#">Inspiration <span>(13)</span></a></li>
                                        <li><a href="#">Romance <span>(20)</span></a></li>
                                        <li><a href="#">Fiction/Fantasy <span>(22)</span></a></li>
                                        <li><a href="#">Self-Improvement <span>(13)</span></a></li>
                                        <li><a href="#">Humor Books <span>(17)</span></a></li>
                                        <li><a href="#">Harry Potter <span>(20)</span></a></li>
                                        <li><a href="#">Land of Stories <span>(34)</span></a></li>
                                        <li><a href="#">Kids' Music <span>(60)</span></a></li>
                                        <li><a href="#">Toys & Games <span>(3)</span></a></li>
                                        <li><a href="#">hoodies <span>(3)</span></a></li>
                                    </ul>
                                </aside>


                                ${`<aside class="wedget__categories sidebar--banner">
                                        <img src="images/others/banner_left.jpg" alt="banner images">
                                        <div class="text">
                                            <h2>new products</h2>
                                            <h6>save up to <br> <strong>40%</strong>off</h6>
                                        </div>
                                    </aside>`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End main Content -->
        `);
    }


    const productId = getProductIdFromDataSet($target);

    global.promises.add('filteredDataOfProducts', getProducts({ id: productId }));

    global.promises.all(res => {
        const { filteredDataOfProducts: [ currentProduct ] } = res;

        currentStoredProductID.seveToSessionStorage(currentProduct.id);

        const pageHTML = pageTemplate(currentProduct)

        console.log('renderProductPage');
        global.$main.first().html(pageHTML);
        afterChangingTheDOM();
    });

    function afterChangingTheDOM() {
        // Код, который нужно запустить после изменения DOM
    }
}

function addToCartClickHandler() {
    basket.add({
        id: currentStoredProductID.getFromSessionStorage(),
        quantity: parseInt(global.$main.find('.qty').val()),
    });
}