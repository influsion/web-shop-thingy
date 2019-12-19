'use strict';

const getAppSettings = function() {
    return fetch(`${serverURL}/settings`)
        .then(data => data.json())
        .catch(error => {
            console.error('fetch, getAppSettings: ', error);
        });
};

const getProducts = function(params) {
    const lang = languageSettings.getLanguageKey();

    return fetch(`${serverURL}/products/${lang}?${qs.stringify(params)}`)
        .then(data => data.json())
        .catch(error => {
            console.error('fetch, getProducts: ', error);
        });
};

const getLocalization = function() {
    const lang = languageSettings.getLanguageKey();

    console.log(lang, languageSettings.getLanguageKey());

    return fetch(`${serverURL}/localization/${lang}`)
        .then(data => data.json())
        .catch(error => {
            console.error('fetch, getLocalization: ', error);
        });
};

const getCategoriesStructure = function() {
    const lang = languageSettings.getLanguageKey();

    return fetch(`${serverURL}/categoriesstructure/${lang}`)
        .then(data => data.json())
        .catch(error => {
            console.error('fetch, getCategoriesStructure: ', error);
        });
};

const getFilterConditions = function(params) {
    return fetch(`${serverURL}/filterconditions?${qs.stringify(params)}`)
        .then(data => data.json())
        .catch(error => {
            console.error('fetch, getFilterConditions: ', error);
        });
};

const getPageData = function ({ page }) {
    const lang = languageSettings.getLanguageKey();

    return fetch(`${serverURL}/page/${page}/${lang}`)
        .then(data => data.json())
        .catch(error => {
            console.error('fetch, getPageData: ', error);
        });
};