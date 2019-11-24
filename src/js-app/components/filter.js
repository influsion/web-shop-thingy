'use strict';

const filterComponent = (data) => {
    return (`
        <aside class="wedget__categories pro--range">
            <h3 class="wedget__title">${data.title}</h3>
            <div class="content-shopby">
                <div class="price_filter s-filter clear">
                    <form action="#" method="GET">
                        <div id="slider-range"></div>
                        <div class="slider__range--output">
                            <div class="price__output--wrap">
                                <div class="price--output">
                                    <span>Price :</span><input type="text" id="amount" readonly="">
                                </div>
                                <div class="price--filter">
                                    <a href="#">Filter</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </aside>
    `);
};