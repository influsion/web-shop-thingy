"use strict";

const subscriptionComponent = () => {
    return (`
        <!-- Start NEwsletter Area -->
        <section class="wn__newsletter__area bg-image--2">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7 offset-lg-5 col-md-12 col-12 ptb--150">
                        <div class="section__title text-center">
                            <h2>${ translate('subscription_title') }</h2>
                        </div>
                        <div class="newsletter__block text-center">
                            <p>${ translate('subscription_copy') }</p>
                            <form>
                                <div class="newsletter__box">
                                <img class="js-warning-icon hide" src="images/icons/warning_input.svg" alt="warning">
                                <div class="js-warning-text hide">${ translate('subscription_input_fail') }</div>
                                    <input type="email" placeholder="${ translate('subscription_placeholder') }">
                                    <button type="button">${ translate('subscription_button_text') }</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- End NEwsletter Area -->
    `);
};