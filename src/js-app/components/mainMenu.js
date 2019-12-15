'use strict';

const mainMenuComponent = (data) => {
    const { items, additionalClasses = [] } = data;

    const itemsHTML = items.map(([hash, title]) => (`
        <li>
            <a class="mainmenu-link js-switch-page" href="${hash}">
                ${title}
            </a>
        </li>
    `)).join('');

    return (`
        <ul class="meninmenu ${ additionalClasses.join(' ') }">
            ${itemsHTML}
        </ul>
    `);
};