'use strict';

function renderShopPage(e, $target) {
    const breadcrumbsHTML = breadcrumbsComponent({
        pageTitle: 'en_Shop'
    });

    const filterHTML = filterComponent({
        title: 'en_Filter'
    });

    const productsSortingTemplate = () => {
        return (`
            <div class="row">
                <div class="col-lg-12">
                    <div class="shop__list__wrapper d-flex flex-wrap flex-md-nowrap justify-content-between">
                        <div class="shop__list nav justify-content-center" role="tablist">
                            <a class="nav-item nav-link active" data-toggle="tab" href="#nav-grid" role="tab"><i class="fa fa-th"></i></a>
                            <a class="nav-item nav-link" data-toggle="tab" href="#nav-list" role="tab"><i class="fa fa-list"></i></a>
                        </div>
                        <p>Showing 1-12 of 40 results</p>
                        <div class="orderby__wrapper">
                            <span>Sort By</span>
                            <select class="shot__byselect">
                                <option>Default sorting</option>
                                <option>HeadPhone</option>
                                <option>Furniture</option>
                                <option>Jewellery</option>
                                <option>Handmade</option>
                                <option>Kids</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        `);
    };

    const productsTemplate = () => {
        const arr = [];

        for (let i = 0; i < 12; i++) {
            arr.push(productCartGridViewComponents({}))
        }

        return (`
            ${ arr.join('') }
        `);
    };

    const centralColumnTemplate = () => {
        return (`
            ${ productsSortingTemplate() }

            <div class="row">
                ${ productsTemplate() }
            </div>

            <!-- <ul class="wn__pagination">
                <li class="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#"><i class="zmdi zmdi-chevron-right"></i></a></li>
            </ul> -->
        `);
    };




    //! TODO: Check filter params
    const filterParameters = storedFilterParameters.getFromSessionStorage();

    if (filterParameters) {
        global.promises.add('filteredDataOfProducts', getProducts(filterParameters));
    }

    global.promises.add('categoriesStructure', getCategoriesStructure());


    Promise.all(global.promises)
        .then(promises => {
            const filteredDataOfProducts = filterParameters && promises[global.promises.order.filteredDataOfProducts];

            //! TODO: run render products
            const centralColumnHTML = filterParameters
                ? centralColumnTemplate()
                : 'en_Empty';

            const categoriesStructure = promises[global.promises.order.categoriesStructure];

            // Categories Component
            const categoriesHTML = categoriesComponent({
                structure: categoriesStructure,
            });

            const pageTemplate = () => {
                return (`
                    ${ breadcrumbsHTML }

                    <!-- Start Shop Page -->
                    <div class="page-shop-sidebar left--sidebar bg--white section-padding--lg">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-3 col-12 order-2 order-lg-1 md-mt-40 sm-mt-40">
                                    <div class="shop__sidebar">
                                        ${ categoriesHTML }
                                        ${ filterHTML }

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
                                    ${ centralColumnHTML }
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
        // Код, который нужно запустить после изменения DOM
    };
};
