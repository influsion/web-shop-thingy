'use strict';

const breadcrumbsComponent = (data) => {
    return (`
        <!-- Start Breadcrumbs area -->
        <div class="ht__bradcaump__area ${ data.imageClass || '' }">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="bradcaump__inner text-center">
                            <h2 class="bradcaump-title">${data.pageTitle}</h2>
                            <nav class="bradcaump-content">
                            <a class="breadcrumb_item js-switch-page" href="#home">${ translate('home_page_title') }</a>
                            <span class="brd-separetor">/</span>
                            <span class="breadcrumb_item active">${data.pageTitle}</span>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Breadcrumbs area -->
    `);
};