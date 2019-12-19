'use strict';

const quickViewHandler = (e, $target) => {
    const pagePromise = PromiseList();
    const productId = getProductIdFromDataSet($target);


    pagePromise.addPromise({
            name: 'currentProduct',
            body: getProducts({ id: productId }),
    });

    pagePromise.allPromises(res => {
        const { currentProduct } = res;
        console.log(currentProduct[0]);

        const quickTemplate = data => {
            const convert = currencySettings.convert.bind(currencySettings);
            const getCurrency = currencySettings.getCurrency.bind(currencySettings);

            const labelHTML = `${data.popular}`.toLowerCase() === 'true'
                ? `<span class="badge badge-danger product-label">${translate('popular_label')}</span>`
                : `${data.new}`.toLowerCase() === 'true'
                ? `<span class="badge badge-success product-label">${translate('new_label')}</span>`
                : '';

            return (`
                <div class="modal-product">
                    <div class="product-images">
                        <div class="main-image images">
                            <img alt="big images" src="${data.image}">
                        </div>
                    </div>
                    <div class="product-info">
                        <h1>${data.name}</h1>

                        ${labelHTML}

                        <div class="quick-desc">
                           ${data.description}
                        </div>

                        <div class="s-price-box">
                            <span class="new-price">
                                ${ translate('price') }: ${ convert(data.price) } ${ getCurrency() }
                            </span>
                        </div>

                        <div class="addtocart-btn">
                            <a href="#" class="js-add-to-cart-quick" data-product-id="${data.id}">Add to cart</a>
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
            `);
        };

        const quickViewHTML = quickTemplate(currentProduct[0]);

        global.$app.find('#quickview-wrapper .modal-body').html(quickViewHTML);
    });
};
