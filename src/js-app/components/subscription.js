"use strict";

const subscriptionComponent = () => {
    return (`
        <!-- Start NEwsletter Area -->
        <section class="wn__newsletter__area bg-image--2">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7 offset-lg-5 col-md-12 col-12 ptb--150">
                        <div class="section__title text-center">
                            <h2>Stay With Us</h2>
                        </div>
                        <div class="newsletter__block text-center">
                            <p>Subscribe to our newsletters now and stay up-to-date with new collections, the latest lookbooks and exclusive offers.</p>
                            <form metod="post" action="#">
                                <div class="newsletter__box">
                                    <input type="email" placeholder="Enter your e-mail">
                                    <button type="button">Subscribe</button>
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