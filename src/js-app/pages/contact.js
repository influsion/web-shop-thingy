function renderContactPage(e, $target) {
    function template(data) {
        return (`
            <!-- Start Bradcaump area -->
            <div class="ht__bradcaump__area bg-image--6">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="bradcaump__inner text-center">
                                <h2 class="bradcaump-title">Contact Us</h2>
                                <nav class="bradcaump-content">
                                <a class="breadcrumb_item" href="index.html">Home</a>
                                <span class="brd-separetor">/</span>
                                <span class="breadcrumb_item active">Contact Us</span>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Bradcaump area -->

            <!-- Start Contact Area -->
            <section class="wn_contact_area bg--white pt--80 pb--80">
                <div class="google__map pb--80">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div id="googleMap"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 col-12">
                            <div class="contact-form-wrap">
                                <h2 class="contact__title">Get in touch</h2>
                                <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. </p>
                                <form id="contact-form" action="#" method="post">
                                    <div class="single-contact-form space-between">
                                        <input type="text" name="firstname" placeholder="First Name*">
                                        <input type="text" name="lastname" placeholder="Last Name*">
                                    </div>
                                    <div class="single-contact-form space-between">
                                        <input type="email" name="email" placeholder="Email*">
                                        <input type="text" name="website" placeholder="Website*">
                                    </div>
                                    <div class="single-contact-form">
                                        <input type="text" name="subject" placeholder="Subject*">
                                    </div>
                                    <div class="single-contact-form message">
                                        <textarea name="message" placeholder="Type your message here.."></textarea>
                                    </div>
                                    <div class="contact-btn">
                                        <button type="submit">Send Email</button>
                                    </div>
                                </form>
                            </div>
                            <div class="form-output">
                                <p class="form-messege">
                            </div>
                        </div>
                        <div class="col-lg-4 col-12 md-mt-40 sm-mt-40">
                            <div class="wn__address">
                                <h2 class="contact__title">Get office info.</h2>
                                <p>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. </p>
                                <div class="wn__addres__wreapper">

                                    <div class="single__address">
                                        <i class="icon-location-pin icons"></i>
                                        <div class="content">
                                            <span>address:</span>
                                            <p>666 5th Ave New York, NY, United</p>
                                        </div>
                                    </div>

                                    <div class="single__address">
                                        <i class="icon-phone icons"></i>
                                        <div class="content">
                                            <span>Phone Number:</span>
                                            <p>716-298-1822</p>
                                        </div>
                                    </div>

                                    <div class="single__address">
                                        <i class="icon-envelope icons"></i>
                                        <div class="content">
                                            <span>Email address:</span>
                                            <p>716-298-1822</p>
                                        </div>
                                    </div>

                                    <div class="single__address">
                                        <i class="icon-globe icons"></i>
                                        <div class="content">
                                            <span>website address:</span>
                                            <p>716-298-1822</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- End Contact Area -->
        `);
    }

    const page = template();

    console.log('renderContactPage');
    global.$main.first().html(page);
    afterChangingTheDOM();

    function afterChangingTheDOM() {
    }
}