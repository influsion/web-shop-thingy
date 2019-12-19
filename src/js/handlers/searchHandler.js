'use strict';

const searchHandler = e => {
    const { target } = e;

    clearTimeout(target._setTimeoutId);
    target._setTimeoutId = setTimeout(() => processInputData(), 1000 / 2);

    async function processInputData() {
        const inputValue = $(target).val().trim().replace(/\s+/, ' ');

        if (target._lastInputValue === inputValue) {
            return;
        } else {
            target._lastInputValue = inputValue;
        }

        const isCorrectSearchQuery = new RegExp(reToExcludeSpecialCharacters).test(inputValue);

        const arrayOfProducts = isCorrectSearchQuery && inputValue.length > 1
            ? await getProducts({ name: inputValue, quantityOfReturned: 5, })
            : [] ;

        global.$searchResult.html(makeResultHTML(arrayOfProducts))
    }

    function makeResultHTML(arrayOfProducts) {
        const isEmpty = !arrayOfProducts.length;

        const processArray = () => {
            const list = arrayOfProducts.map(item => {
                const {
                    image,
                    price,
                    category,
                    subcategory,
                } = item;

                const labelHTML = `${item.popular}`.toLowerCase() === 'true'
                    ? `<span class="badge badge-danger">${translate('popular_label')}</span>`
                    : `${item.new}`.toLowerCase() === 'true'
                    ? `<span class="badge badge-success">${translate('new_label')}</span>`
                    : '';



                return (`
                    <li>
                        <a href="#product" data-product-id="${item.id}" data-mandatory="true" class="js-switch-page js-clear-search-field" title="${item.name}">
                            ${item.searchedName}
                            ${labelHTML}
                        </a>
                    </li>
                `);
            });

            return (`
                <ul>
                    ${list.join('')}
                </li>
            `)
        };

        return isEmpty ? '' : processArray() ;
    }
}