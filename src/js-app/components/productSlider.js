"use strict";

const productSliderComponent = (data) => {
    const { i18n, slidesData } = data;

    const slides = slidesData.map(item => {
        return productCartSlideViewComponent({ i18n, componentData: item });
    }).join('');

    return (`
        <!-- Start Product Area -->
        <section class="wn__popular-product__area brown--color pt--80  pb--30">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section__title text-center">
                            <h2 class="title__be--2">${i18n.title_1} <span class="color--theme">${i18n.title_2}</span></h2>
                            <p>${i18n.subtitle}</p>
                        </div>
                    </div>
                </div>

                <!-- Start Single Tab Content -->
                <div class="furniture--4 border--round arrows_style owl-carousel owl-theme row mt--50">
                    ${slides}
                </div>
                <!-- End Single Tab Content -->
            </div>
        </section>
        <!-- End Product Area -->
    `);
};