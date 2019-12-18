const productCartGridViewComponents = data => {
    const convert = currencySettings.convert.bind(currencySettings);
    const getCurrency = currencySettings.getCurrency.bind(currencySettings);

    const isTrue = val => `${val}`.toLowerCase() === 'true';

    const labelComponent = data => {
        return (`
            <div class="hot__box">
                <span class="hot-label">${data.val}</span>
            </div>
        `);
    };

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
                    <li>${ convert(data.price) } ${ getCurrency() }</li>
                    <!-- <li class="old_prize">$35.00</li> -->
                </ul>
                <div class="action">
                    <div class="actions_inner">
                        <ul class="add_to_links">
                            <li>
                                <a class="js-add-to-cart" href="#" data-product-id="${data.id}">
                                    <!-- <i class="bi bi-shopping-cart-full"></i> -->
                                    <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="cart-plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-cart-plus fa-w-18 fa-2x"><path fill="currentColor" d="M551.991 64H129.28l-8.329-44.423C118.822 8.226 108.911 0 97.362 0H12C5.373 0 0 5.373 0 12v8c0 6.627 5.373 12 12 12h78.72l69.927 372.946C150.305 416.314 144 431.42 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-17.993-7.435-34.24-19.388-45.868C506.022 391.891 496.76 384 485.328 384H189.28l-12-64h331.381c11.368 0 21.177-7.976 23.496-19.105l43.331-208C578.592 77.991 567.215 64 551.991 64zM464 416c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32zm-256 0c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32zm294.156-128H171.28l-36-192h406.876l-40 192zM272 196v-8c0-6.627 5.373-12 12-12h36v-36c0-6.627 5.373-12 12-12h8c6.627 0 12 5.373 12 12v36h36c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12h-36v36c0 6.627-5.373 12-12 12h-8c-6.627 0-12-5.373-12-12v-36h-36c-6.627 0-12-5.373-12-12z" class=""></path></svg>
                                </a>
                            </li>
                            <li>
                                <a class="js-add-to-cart-and-switch-page cart" href="#cart" data-product-id="${data.id}">
                                    <!-- <i class="bi bi-shopping-bag4"></i> -->
                                    <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="cart-arrow-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-cart-arrow-down fa-w-18 fa-2x"><path fill="currentColor" d="M551.991 64H129.28l-8.329-44.423C118.822 8.226 108.911 0 97.362 0H12C5.373 0 0 5.373 0 12v8c0 6.627 5.373 12 12 12h78.72l69.927 372.946C150.305 416.314 144 431.42 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-17.993-7.435-34.24-19.388-45.868C506.022 391.891 496.76 384 485.328 384H189.28l-12-64h331.381c11.368 0 21.177-7.976 23.496-19.105l43.331-208C578.592 77.991 567.215 64 551.991 64zM240 448c0 17.645-14.355 32-32 32s-32-14.355-32-32 14.355-32 32-32 32 14.355 32 32zm224 32c-17.645 0-32-14.355-32-32s14.355-32 32-32 32 14.355 32 32-14.355 32-32 32zm38.156-192H171.28l-36-192h406.876l-40 192zm-106.641-75.515l-51.029 51.029c-4.686 4.686-12.284 4.686-16.971 0l-51.029-51.029c-7.56-7.56-2.206-20.485 8.485-20.485H320v-52c0-6.627 5.373-12 12-12h8c6.627 0 12 5.373 12 12v52h35.029c10.691 0 16.045 12.926 8.486 20.485z" class=""></path></svg>
                                </a>
                            </li>
                            <li>
                                <a data-toggle="modal" title="Quick View" data-product-id="${data.id}" class="js-quick-view quickview modal-view detail-link" href="#productmodal">
                                    <!-- <i class="bi bi-search"></i> -->
                                    <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-eye fa-w-18 fa-2x"><path fill="currentColor" d="M288 288a64 64 0 0 0 0-128c-1 0-1.88.24-2.85.29a47.5 47.5 0 0 1-60.86 60.86c0 1-.29 1.88-.29 2.85a64 64 0 0 0 64 64zm284.52-46.6C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 96a128 128 0 1 1-128 128A128.14 128.14 0 0 1 288 96zm0 320c-107.36 0-205.46-61.31-256-160a294.78 294.78 0 0 1 129.78-129.33C140.91 153.69 128 187.17 128 224a160 160 0 0 0 320 0c0-36.83-12.91-70.31-33.78-97.33A294.78 294.78 0 0 1 544 256c-50.53 98.69-148.64 160-256 160z" class=""></path></svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `);
};