"use strict";


function renderFaqPage(e, $target) {
    const pagePromise = PromiseList();

    const breadcrumbsHTML = breadcrumbsComponent({
        pageTitle: translate('faq_page_title'),
        imageClass: 'bg-breadcrumbs--faq',
    });

    pagePromise.addPromise({
		name: 'pageData',
		body: getPageData({ page: 'faq', lang }),
    });

    pagePromise.allPromises(res => {
        const { pageData } = res;

        const accordionHTML = accordionComponent(Object.values(pageData.accordion));

        const pageTemplate = () => {
            return (`
                ${ breadcrumbsHTML }

                <!-- Start Faq Area -->
                <section class="wn__faq__area bg--white pt--80 pb--60">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="wn__accordeion__content">
                                    <h2>${pageData.explanation}</h2>
                                    <!--<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat sagittis, faucibus metus malesuada, eleifend turpis. Mauris semper augue id nisl aliquet, a porta lectus mattis. Nulla at tortor augue. In eget enim diam. Donec gravida tortor sem, ac fermentum nibh rutrum sit amet. Nulla convallis mauris vitae congue consequat. Donec interdum nunc purus, vitae vulputate arcu fringilla quis. Vivamus iaculis euismod dui.</p>-->
                                </div>

                                ${accordionHTML}
                            </div>
                        </div>
                    </div>
                </section>
                <!-- End Faq Area -->
            `);
        };

        const pageHTML = pageTemplate();

        global.$main.first().html('renderFaqPage');
        global.$main.first().html(pageHTML);
        afterChangingTheDOM();
    });

    function afterChangingTheDOM() {}
}