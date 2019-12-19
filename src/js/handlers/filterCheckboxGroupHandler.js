'use strict';

const filterCheckboxGroupHandler = e => {
    const { checkboxType } = e.data;
    const $checkedInputs = $(e.currentTarget).parents('form').find('input:checked');
    const arrytOfValues = [];

    const pagesParameters = savedPagesParameters.get();
    pagesParameters.shopPage[checkboxType] = arrytOfValues;

    $checkedInputs.each((i, item) => arrytOfValues.push($(item).val()));

    savedPagesParameters.set(pagesParameters);

    console.log(pagesParameters, e);

    renderProductsOnShopPage();
};
