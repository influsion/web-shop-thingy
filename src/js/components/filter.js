'use strict';

const filterComponent = (data) => {
    const {
        i18n,
        state,
        structure: {
            brands,
            origin,
            priceRange,
        }
    } = data;

    const priceRangeIsDisplayed = parseInt(priceRange[0]) !== parseInt(priceRange[1]);
    const brandsIsDisplayed = brands.length;
    const originIsDisplayed = origin.length;

    const checkboxList = ({ list, checkboxName, localization }) => {
        return list.map(item => {
            const inputId = `checkbox-${checkboxName}-${item}`;
            const checkedAttr = state[checkboxName].includes(item) ? `checked="checked"` : ``;

            return (`
                <div>
                    <label for="${inputId}" class="label-for-checkbox">
                        <input id="${inputId}" class="input-checkbox" name="${checkboxName}" value="${item}" type="checkbox" ${checkedAttr}>
                        <span>${localization[item]}</span>
                    </label>
                </div>
            `);
        }).join('');
    };

    const priceRangeTemplate = () => {
        return (`
            <aside class="wedget__categories pro--range">
                <h3 class="wedget__title">${i18n.price}</h3>

                <div class="content-shopby">
                    <div class="price_filter s-filter clear">
                        <form>
                            <div id="slider-range"
                                data-extreme-values="${priceRange[0]}:${priceRange[1]}"
                                data-active-values="${state.price[0]}:${state.price[1]}">
                            </div>
                            <div class="slider__range--output">
                                <div class="price__output--wrap">
                                    <div class="price--output">
                                        <span>${ translate('price') }: </span>
                                        <input type="text" id="amount" readonly="">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </aside>
        `);
    };

    const brandsTemplate = () => {
        return (`
            <aside class="wedget__categories pro--brands">
                <h3 class="wedget__title">${i18n.brands}</h3>

                <div class="content-shopby">
                    <form name="brand-checkbox-group-form">
                        ${
                            checkboxList({
                                checkboxName: 'brand',
                                list: brands,
                                localization: localization.brand,
                            })
                        }
                    </form>
                </div>
            </aside>
        `);
    };

    const originTemplate = () => {
        return (`
            <aside class="wedget__categories pro--origin">
                <h3 class="wedget__title">${i18n.origin}</h3>

                <div class="content-shopby">
                    <form name="origin-checkbox-group-form">
                        ${
                            checkboxList({
                                checkboxName: 'origin',
                                list: origin,
                                localization: localization.origin,
                            })
                        }
                    </form>
                </div>
            </aside>
        `);
    };

    return (`
        ${ priceRangeIsDisplayed ? priceRangeTemplate() : '' }
        ${ brandsIsDisplayed ? brandsTemplate() : '' }
        ${ originIsDisplayed ? originTemplate() : '' }
    `);
};
