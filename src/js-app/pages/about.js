"use strict";


function renderAboutPage(e, $target) {
    const breadcrumbsHTML = breadcrumbsComponent({
        pageTitle: translate('about_page_title'),
        imageClass: 'bg-breadcrumbs--about',
    });

    function template(data) {
        return (`
            ${ breadcrumbsHTML }

            <!-- Start About Area -->
            <div class="page-about about_area bg--white section-padding--lg">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section__title--3 text-center pb--30">
                                <h2>Our Process Skill Of High</h2>
                            </div>
                            <div class="content">
                                <p class="mt--20 mb--20">Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.</p>
                                <strong>London Address</strong>
                                <p>34 Parer Place via Musk Avenue Kelvin Grove, QLD, 4059</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End About Area -->

            <!-- Start Team Area -->
            <section class="wn__team__area pb--75 bg--white">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section__title--3 text-center">
                                <h2>Meet our team of experts</h2>
                                <p>the right people for your project</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <!-- Start Single Team -->
                        <div class="col-lg-3 col-md-3 col-sm-6 col-12">
                            <div class="wn__team">
                                <div class="thumb">
                                    <img src="images/about/team/1.jpg" alt="Team images">
                                </div>
                                <div class="content text-center">
                                    <h4>JOHN SMITH</h4>
                                    <p>Manager</p>
                                </div>
                            </div>
                        </div>
                        <!-- End Single Team -->
                        <!-- Start Single Team -->
                        <div class="col-lg-3 col-md-3 col-sm-6 col-12">
                            <div class="wn__team">
                                <div class="thumb">
                                    <img src="images/about/team/2.jpg" alt="Team images">
                                </div>
                                <div class="content text-center">
                                    <h4>ALICE KIM</h4>
                                    <p>Co-Founder</p>
                                </div>
                            </div>
                        </div>
                        <!-- End Single Team -->
                        <!-- Start Single Team -->
                        <div class="col-lg-3 col-md-3 col-sm-6 col-12">
                            <div class="wn__team">
                                <div class="thumb">
                                    <img src="images/about/team/3.jpg" alt="Team images">
                                </div>
                                <div class="content text-center">
                                    <h4>VICTORIA DOE</h4>
                                    <p>Marketer</p>
                                </div>
                            </div>
                        </div>
                        <!-- End Single Team -->
                        <!-- Start Single Team -->
                        <div class="col-lg-3 col-md-3 col-sm-6 col-12">
                            <div class="wn__team">
                                <div class="thumb">
                                    <img src="images/about/team/3.jpg" alt="Team images">
                                </div>
                                <div class="content text-center">
                                    <h4>VICTORIA DOE</h4>
                                    <p>Marketer</p>
                                </div>
                            </div>
                        </div>
                        <!-- End Single Team -->
                    </div>
                </div>
            </section>
            <!-- End Team Area -->
        `);
    }

    const page = template();

    console.log('renderAboutPage');
    global.$main.first().html(page);
    afterChangingTheDOM();

    function afterChangingTheDOM() {
        // Код, который нужно запустить после изменения DOM
    }
}