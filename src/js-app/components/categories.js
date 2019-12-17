'use strict';

function categoriesComponent(data) {
    const { structure, state: { menu } = {}, jump = null } = data;

    const checkItemForActivity = params => {
        const { target, source } = params;

        const thisType = target.type === source.type;
        const thisValue = target.value === source.value;

        return thisType && thisValue ? 'active' : '' ;
    };

    const makeCategoriesHTML = arr => {
        const makeCategoryHTML = obj => {
            const { productsQuantity, value: key } = obj;
            const name = localization.category_navigation[key];

            const subcategoriesHTML = makeSubcategoriesHTML(obj.subcategories);
            const activeClass = menu && checkItemForActivity({
                target: {
                    type: menu.type,
                    value: menu.value,
                },

                source: {
                    type: 'category',
                    value: key,
                },
            });

            return (`
                <li>
                    <a class="${!(jump === true) ? 'js-switch-page' : ''} js-change-category-or-subcategory ${ activeClass || '' }" href="#shop" data-category="${key}">
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

            const activeClass = menu && checkItemForActivity({
                target: {
                    type: menu.type,
                    value: menu.value,
                },

                source: {
                    type: 'subcategory',
                    value: key,
                },
            });

            return (`
                <li>
                    <a class="${!(jump === true) ? 'js-switch-page' : ''} js-change-category-or-subcategory ${ activeClass || '' }" href="#shop" data-subcategory="${key}">
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
                <h3 class="wedget__title">${ translate('product_categories') }</h3>

                ${ categoriesHTML }
            </aside>
        `);
    };

    return makeTemplateHTML();
}