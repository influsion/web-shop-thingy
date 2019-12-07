const productSortingPanelComponent = (data) => {
    return (`
        <div class="col-lg-12">
            <div class="shop__list__wrapper d-flex flex-wrap flex-md-nowrap justify-content-between">
                <div class="shop__list nav justify-content-center" role="tablist">
                    <a class="nav-item nav-link active" data-toggle="tab" href="#nav-grid" role="tab"><i class="fa fa-th"></i></a>
                    <a class="nav-item nav-link" data-toggle="tab" href="#nav-list" role="tab"><i class="fa fa-list"></i></a>
                </div>
                <p>Showing 1-12 of 40 results</p>
                <div class="orderby__wrapper">
                    <span>Sort By</span>
                    <select class="shot__byselect">
                        <option>Default sorting</option>
                        <option>HeadPhone</option>
                        <option>Furniture</option>
                        <option>Jewellery</option>
                        <option>Handmade</option>
                        <option>Kids</option>
                    </select>
                </div>
            </div>
        </div>
    `);
};