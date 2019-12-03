'use strict';

function categoriesComponent(data) {
    const { structure } = data;

    const makeCategoriesHTML = arr => {
        const makeCategoryHTML = obj => {
            const { productsQuantity, value: key } = obj;
            const name = localization.category_navigation[key];

            const subcategoriesHTML = makeSubcategoriesHTML(obj.subcategories);

            return (`
                <li>
                    <a class="js-switch-page js-change-category-or-subcategory" href="#shop" data-category="${key}">
                        <span>${name}</span>
                        <span>(${productsQuantity})</span>
                    </a>

                    ${subcategoriesHTML}
                </li>
            `);
        };

        const makeSubcategoriesHTML = arr => {
            const subcategories = arr
                .map(subcategoryItem => makeSubcategoryHTML(subcategoryItem))
                .join('');

            return `<ul>${subcategories}</ul>`;
        };

        const makeSubcategoryHTML = obj => {
            const { productsQuantity, value: key } = obj;
            const name = localization.subcategory_navigation[key];

            return (`
                <li>
                    <a class="js-switch-page js-change-category-or-subcategory" href="#shop" data-subcategory="${key}">
                        <span>${name}</span>
                        <span>(${productsQuantity})</span>
                    </a>
                </li>
            `);
        };

        const categories = arr
            .map(categoryItem => makeCategoryHTML(categoryItem))
            .join('');

        return `<ul>${categories}</ul>`
    };

    const categoriesHTML = makeCategoriesHTML(structure);

    const makeTemplateHTML = () => {
        return (`
            <aside class="wedget__categories poroduct--cat">
                <h3 class="wedget__title">en_Product Categories</h3>

                ${ categoriesHTML }
            </aside>
        `);
    };

    return makeTemplateHTML();
}