"use strict";


function renderProductPage(e, $target) {
    const pagePromise = PromiseList();

    const breadcrumbsHTML = breadcrumbsComponent({
        pageTitle: translate('product_page_title'),
        imageClass: 'bg-breadcrumbs--product',
    });

    const productId = (() => {
        const valueFromTarget = getProductIdFromDataSet($target);
        const valueFromSessionStorage = (savedPagesParameters.get().productPage || {}).productId;

        return valueFromTarget || valueFromSessionStorage || null ;
    })();

    const pagesParameters = savedPagesParameters.get();

    if (!pagesParameters.productPage) {
        pagesParameters.productPage = {};
    }

    pagesParameters.productPage.productId = productId;
    savedPagesParameters.set(pagesParameters);

    pagePromise.addPromise({
		name: 'filteredDataOfProducts',
		body: getProducts({ id: productId }),
    });

    pagePromise.addPromise({
        name: 'categoriesStructure',
        body: getCategoriesStructure(),
    });

    pagePromise.allPromises(res => {
        const { filteredDataOfProducts: [ currentProduct ], categoriesStructure } = res;

        const categoriesHTML = categoriesComponent({
            structure: categoriesStructure,
            jump: true,
        });

        currentStoredProductID.seveToSessionStorage(currentProduct.id);

        const pageTemplate = data => {
            const convert = currencySettings.convert.bind(currencySettings);
            const getCurrency = currencySettings.getCurrency.bind(currencySettings);

            const labelHTML = `${data.popular}`.toLowerCase() === 'true'
                ? `<span class="badge badge-danger product-label">${translate('popular_label')}</span>`
                : `${data.new}`.toLowerCase() === 'true'
                ? `<span class="badge badge-success product-label">${translate('new_label')}</span>`
                : '';

            return (`
                ${ breadcrumbsHTML }

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
                                                    <a><img src="${data.image}" alt=""></a>
                                                    <!--
                                                    <a href="2.jpg"><img src="images/product/2.jpg" alt=""></a>
                                                    <a href="3.jpg"><img src="images/product/3.jpg" alt=""></a>
                                                    <a href="4.jpg"><img src="images/product/4.jpg" alt=""></a>
                                                    <a href="5.jpg"><img src="images/product/5.jpg" alt=""></a>
                                                    <a href="6.jpg"><img src="images/product/6.jpg" alt=""></a>
                                                    <a href="7.jpg"><img src="images/product/7.jpg" alt=""></a>
                                                    <a href="8.jpg"><img src="images/product/8.jpg" alt=""></a>
                                                    -->
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-12">
                                            <div class="product__info__main">
                                                <h1>${data.name}</h1>

                                                <!--
                                                <div class="product-reviews-summary d-flex">
                                                    <ul class="rating-summary d-flex">
                                                        <li><i class="zmdi zmdi-star-outline"></i></li>
                                                        <li><i class="zmdi zmdi-star-outline"></i></li>
                                                        <li><i class="zmdi zmdi-star-outline"></i></li>
                                                        <li class="off"><i class="zmdi zmdi-star-outline"></i></li>
                                                        <li class="off"><i class="zmdi zmdi-star-outline"></i></li>
                                                    </ul>
                                                </div>
                                                -->

                                                ${labelHTML}

                                                <div class="product__overview">
                                                    <p>${data.description}</p>
                                                </div>

                                                <div class="box-tocart d-flex">
                                                    <div class="price-box">
                                                        <span>
                                                            ${ translate('price') }: ${ convert(data.price) } ${ getCurrency() }
                                                        </span>
                                                    </div>

                                                    <div class="addtocart__actions">
                                                        <button class="tocart js-add-to-cart" data-product-id="${data.id}" type="submit" title="Add to Cart">Add to Cart</button>
                                                    </div>
                                                    <div class="product-addto-links clearfix">
                                                        <a class="js-add-to-cart-and-switch-page switch-to-cart" href="#cart" data-product-id="${data.id}">
                                                            <!-- <i class="bi bi-shopping-bag4"></i> -->
                                                            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="cart-arrow-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-cart-arrow-down fa-w-18 fa-2x"><path fill="currentColor" d="M551.991 64H129.28l-8.329-44.423C118.822 8.226 108.911 0 97.362 0H12C5.373 0 0 5.373 0 12v8c0 6.627 5.373 12 12 12h78.72l69.927 372.946C150.305 416.314 144 431.42 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-17.993-7.435-34.24-19.388-45.868C506.022 391.891 496.76 384 485.328 384H189.28l-12-64h331.381c11.368 0 21.177-7.976 23.496-19.105l43.331-208C578.592 77.991 567.215 64 551.991 64zM240 448c0 17.645-14.355 32-32 32s-32-14.355-32-32 14.355-32 32-32 32 14.355 32 32zm224 32c-17.645 0-32-14.355-32-32s14.355-32 32-32 32 14.355 32 32-14.355 32-32 32zm38.156-192H171.28l-36-192h406.876l-40 192zm-106.641-75.515l-51.029 51.029c-4.686 4.686-12.284 4.686-16.971 0l-51.029-51.029c-7.56-7.56-2.206-20.485 8.485-20.485H320v-52c0-6.627 5.373-12 12-12h8c6.627 0 12 5.373 12 12v52h35.029c10.691 0 16.045 12.926 8.486 20.485z" class=""></path></svg>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="product_meta">
                                                    <span class="posted_in">${ translate('category') }:
                                                        <a class="js-change-category-or-subcategory" href="#shop" data-category="${data.category}">
                                                            ${localization.category_navigation[data.category]}
                                                        </a>
                                                    </span>
                                                </div>
                                                <div class="product_meta">
                                                    <span class="posted_in">${ translate('subcategory') }:
                                                        <a class="js-change-category-or-subcategory" href="#shop" data-subcategory="${data.subcategory}">
                                                            ${localization.subcategory_navigation[data.subcategory]}
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--
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
                                -->
                            </div>
                            <div class="col-lg-3 col-12 md-mt-40 sm-mt-40">
                                <div class="shop__sidebar">
                                    ${categoriesHTML}

                                    ${`<!-- <aside class="wedget__categories sidebar--banner">
                                            <img src="images/others/banner_left.jpg" alt="banner images">
                                            <div class="text">
                                                <h2>new products</h2>
                                                <h6>save up to <br> <strong>40%</strong>off</h6>
                                            </div>
                                        </aside> -->`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End main Content -->
            `);
        };

        const pageHTML = pageTemplate(currentProduct);

        console.log('renderProductPage');
        global.$main.first().html(pageHTML);
        afterChangingTheDOM();
    });

    function afterChangingTheDOM() {}
}
