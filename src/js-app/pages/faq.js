"use strict";


function renderFaqPage(e, $target) {
    const pagePromise = PromiseList();

    const breadcrumbsHTML = breadcrumbsComponent({
        pageTitle: translate('faq_page_title'),
        image: 'bg-image--4'
    });

    pagePromise.addPromise({
		name: 'faqPageData',
		body: getFaq(),
	});

    pagePromise.allPromises(res => {
        const { faqPageData: faq } = res;
        // console.log(faq);

        const pageTemplate = () => {
            return (`
                ${ breadcrumbsHTML }

                <!-- Start Faq Area -->
                <section class="wn__faq__area bg--white pt--80 pb--60">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="wn__accordeion__content">
                                    <h2>Below are frequently asked questions, you may find the answer for yourself</h2>
                                    <!--<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id erat sagittis, faucibus metus malesuada, eleifend turpis. Mauris semper augue id nisl aliquet, a porta lectus mattis. Nulla at tortor augue. In eget enim diam. Donec gravida tortor sem, ac fermentum nibh rutrum sit amet. Nulla convallis mauris vitae congue consequat. Donec interdum nunc purus, vitae vulputate arcu fringilla quis. Vivamus iaculis euismod dui.</p>-->
                                </div>
                                <div id="accordion" class="wn_accordion" role="tablist">
                                    <!--
                                    <div class="card">
                                        <div class="acc-header" role="tab" id="headingOne">
                                            <h5>
                                                <a data-toggle="collapse" href="#collapseOne" role="button" aria-expanded="true" aria-controls="collapseOne">Mauris congue euismod purus at semper. Morbi et vulputate massa?</a>
                                            </h5>
                                        </div>
                                        <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div class="card-body">Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem</div>
                                        </div>
                                    </div>
                                    -->
                                </div>
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

        const showFaq = () => {
            for(let i = 0; i < faq.length; i++){
                $('<div>', {
                    id: 'card' + i,
                    class: 'card',
                }).appendTo('#accordion');

                $('<div>', {
                    id: 'heading' + i,
                    class: 'acc-header',
                    'role': 'tab'
                }).appendTo('#card' + i);

                $('<h5>', {
                    id: 'h5' + i,
                }).appendTo('#heading' + i);

                $('<a>', {
                    id: 'question' + i,
                    class: 'collapsed',
                    text: faq[i].question,
                    'data-toggle': 'collapse',
                    'href': '#answer' + i,
                    'role': 'button',
                    'aria-expanded': 'false',
                    'aria-controls': 'answer' + i
                }).appendTo('#h5' + i);

                $('<div>', {
                    id: 'answer' + i,
                    class: 'collapse',
                    'role': 'tabpanel',
                    'aria-labelledby': 'heading' + i,
                    'data-parent': '#accordion'
                }).appendTo('#accordion');

                $('<div>', {
                    class: 'card-body',
                    text: faq[i].answer
                }).appendTo('#answer' + i);
            }
        };
        showFaq();
    });



    function afterChangingTheDOM() {
        // Код, который нужно запустить после изменения DOM
    }
}