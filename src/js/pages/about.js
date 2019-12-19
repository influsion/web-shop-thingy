'use strict';

function renderAboutPage(e, $target) {
    const pagePromise = PromiseList();

    const breadcrumbsHTML = breadcrumbsComponent({
        pageTitle: translate('about_page_title'),
        imageClass: 'bg-breadcrumbs--about',
    });

    const teamComponent = (pageData) => {
        const expertsHTML = Object.values(pageData.experts).reduce((accumulator, { name, position, image }, i) => {
            const itemHTML = (`
                <!-- Start Single Team -->
                <div class="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div class="wn__team">
                        <div class="thumb">
                            <img src="${image}" alt="${name}">
                        </div>
                        <div class="content text-center">
                            <h4>${name}</h4>
                            <p>${position}</p>
                        </div>
                    </div>
                </div>
                <!-- End Single Team -->
            `);

            return accumulator + itemHTML;
        }, '');

        return (`
            <!-- Start Team Area -->
            <section class="wn__team__area pb--75 bg--white">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section__title--3 text-center">
                                <h2>${ pageData.meet_the_expert_team }</h2>
                                <p>${ pageData.the_right_people_for_your_project }</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        ${ expertsHTML }
                    </div>
                </div>
            </section>
            <!-- End Team Area -->
        `);
    };

    pagePromise.addPromise({
		name: 'pageData',
		body: getPageData({ page: 'about', lang }),
    });

    pagePromise.allPromises(res => {
        const { pageData } = res;



        const teamHTML = teamComponent(pageData);

        function template(data) {
            return (`
                ${ breadcrumbsHTML }

                <!-- Start About Area -->
                <div class="page-about about_area bg--white section-padding--lg">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="section__title--3 text-center pb--30">
                                    <h2>${ pageData.someheaderonaboutpage }</h2>
                                </div>
                                <div class="content">
                                    ${ pageData.sometextonaboutpage }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End About Area -->

                ${ teamHTML }
            `);
        }

        const page = template();

        console.log('renderAboutPage');
        global.$main.first().html(page);
        afterChangingTheDOM();
    });

    function afterChangingTheDOM() {}
}