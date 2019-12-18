'use strict';

// Get
const getAppSettings = function() {
    return fetch(`${serverURL}/settings`)
        .then(data => data.json())
        .catch(error => {
            console.error('fetch, getAppSettings: ', error);
        });
};

const getProducts = function(params) {
    return fetch(`${serverURL}/products?${qs.stringify(params)}`)
        .then(data => data.json())
        .catch(error => {
            console.error('fetch, getProducts: ', error);
        });
};

const getLocalization = function(params = "en") {
    return fetch(`${serverURL}/localization/${params}`)
        .then(data => data.json())
        .catch(error => {
            console.error('fetch, getLocalization: ', error);
        });
};

const getCategoriesStructure = function() {
    return fetch(`${serverURL}/categoriesstructure`)
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

const getPageData = function ({ page, lang }) {
    return fetch(`${serverURL}/page/${page}/${lang}`)
        .then(data => data.json())
        .catch(error => {
            console.error('fetch, getPageData: ', error);
        });
};


// Post
const postEmail = email => {
    return fetch(`${serverURL}/subscribe`, {
        method: 'post',
        body: JSON.stringify({value: email}),
        headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(response => response.json())
    .catch(error => {
        console.error('fetch, postEmail: ', error);
    });
};