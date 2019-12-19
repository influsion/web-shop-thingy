'use strict';

const categoriesHandler = e => {
    const $target = $(e.currentTarget);

    $target.parents('.wedget__categories.poroduct--cat').find('a').removeClass('active');
    $target.addClass('active');

    const categoryAndSubcategory = {
        category: getCategoryFromDataSet($target),
        subcategory: getSubcategoryFromDataSet($target),
    };

    const pagesParameters = savedPagesParameters.get();

    const type = categoryAndSubcategory.category
        ? 'category'
        : categoryAndSubcategory.subcategory
        ? 'subcategory'
        : null ;

    const value = categoryAndSubcategory.category || categoryAndSubcategory.subcategory || null;

    pagesParameters.shopPage = {};

    pagesParameters.shopPage.menu = {
        type,
        value,
    };

    savedPagesParameters.set(pagesParameters);

    console.log(pagesParameters);

    pageController.setActivePage(e, $target);
    renderProductsOnShopPage();
};
