const productCartGridViewComponents = data => {
    const isTrue = val => `${val}`.toLowerCase() === 'true';

    const labelComponent = data => {
        return (`
            <div class="hot__box">
                <span class="hot-label">${data.val}</span>
            </div>
        `);
    }

    const getLabel = () => {
        const isPopular = isTrue(data.popular);
        const isNew = isTrue(data.new);

        const val = isPopular
            ? translate('popular_label')
            : isNew
            ? translate('new_label')
            : null

        return isPopular || isNew ? labelComponent({ val }) : '' ;
    };

    const label = getLabel();

    return (`
        <div class="product product__style--3 col-lg-4 col-md-4 col-sm-6 col-12">
            <div class="product__thumb">
                <a class="first__img js-switch-page" href="#product" data-product-id="${data.id}"><img src="${data.image}" data-src="images/books/1.jpg" alt="${data.name}"></a>
                <a class="second__img animation1 js-switch-page" href="#product" data-product-id="${data.id}"><img src="${data.image}" data-src="images/books/2.jpg" alt="${data.name}"></a>
                ${label}
            </div>
            <div class="product__content content--center">
                <h4><a href="single-product.html">${data.name}</a></h4>
                <ul class="prize d-flex">
                    <li></li>
                    <li>${data.price}</li>
                    <!-- <li class="old_prize">$35.00</li> -->
                </ul>
                <div class="action">
                    <div class="actions_inner">
                        <ul class="add_to_links">
                            <li><a class="cart js-switch-page" href="#cart" data-product-id="${data.id}"><i class="bi bi-shopping-bag4"></i></a></li>
                            <li><a class="wishlist" href="wishlist.html"><i class="bi bi-shopping-cart-full"></i></a></li>

                            <li><a data-toggle="modal" title="Quick View" data-product-id="${data.id}" class="js-quick-view quickview modal-view detail-link" href="#productmodal"><i class="bi bi-search"></i></a></li>
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
    `);
};