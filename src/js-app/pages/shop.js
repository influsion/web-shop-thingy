'use strict';

function renderShopPage(e, $target) {
    const pagePromise = PromiseList();

    const breadcrumbsHTML = breadcrumbsComponent({
        pageTitle: translate('shop_page_title'),
        imageClass: 'bg-breadcrumbs--shop',
    });

    //! TODO: Панень сортировки
    // const productSortingPanelHTML = productSortingPanelComponent({});


    const pagesParameters = savedPagesParameters.get() || {};
    const pageParametersAreExisting = pagesParameters.shopPage || null;


    pagePromise.addPromise({
        name: 'categoriesStructure',
        body: getCategoriesStructure(),
    });

    pagePromise.allPromises(res => {
        const { categoriesStructure = null, } = res;

        // Categories Component
        const categoriesComponentParams = {
            structure: categoriesStructure,
        };

        pageParametersAreExisting && (categoriesComponentParams.state = {
            menu: pagesParameters.shopPage.menu,
        });

        const categoriesHTML = categoriesComponent(categoriesComponentParams);

        const pageTemplate = () => {
            return (`
                ${ breadcrumbsHTML }

                <!-- Start Shop Page -->
                <div class="page-shop-sidebar left--sidebar bg--white section-padding--lg">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3 col-12 order-2 order-lg-1 md-mt-40 sm-mt-40">
                                <div class="shop__sidebar">
                                    <div>${ categoriesHTML }</div>
                                    <div class="js-product-filter _filterHTML_"></div>

                                    <!-- // TODO: Banner -->
                                    <!-- <aside class="wedget__categories sidebar--banner">
                                        <img src="images/others/banner_left.jpg" alt="banner images">
                                        <div class="text">
                                            <h2>new products</h2>
                                            <h6>save up to <br> <strong>40%</strong>off</h6>
                                        </div>
                                    </aside> -->
                                </div>
                            </div>
                            <div class="col-lg-9 col-12 order-1 order-lg-2">
                                <div class="row js-sort-panel _productSortingPanelComponent_"></div>

                                <div class="row js-filtered-products _productsTemplate_"></div>

                                <!-- <ul class="wn__pagination">
                                    <li class="active"><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">4</a></li>
                                    <li><a href="#"><i class="zmdi zmdi-chevron-right"></i></a></li>
                                </ul> -->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Shop Page -->
            `);
        };

        const pageHTML = pageTemplate();
        global.$main.first().html(pageHTML);
        console.log('renderShopPage');
        afterRendering();
    });

    const afterRendering = function() {
        // render products
        pageParametersAreExisting && renderProductsOnShopPage();
    };
};
