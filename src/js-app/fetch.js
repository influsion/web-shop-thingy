'use strict';

// Get
const getProducts = function(params) {
    return fetch(`${serverURL}/products?${qs.stringify(params)}`)
        .then(data => data.json());
};

const getLocalization = function(params = "en") {
    return fetch(`${serverURL}/localization/${params}`)
        .then(data => data.json());
};

const getCategoriesStructure = function() {
    return fetch(`${serverURL}/categoriesstructure`)
        .then(data => data.json());
};

const getFilterConditions = function(params) {
    return fetch(`${serverURL}/filterconditions?${qs.stringify(params)}`)
        .then(data => data.json());
};

const getPageData = function ({ page, lang }) {
    return fetch(`${serverURL}/page/${page}/${lang}`)
        .then(data => data.json());
};


// Post
const postEmail = email => {
    return fetch(`${serverURL}/subscribe`, {
            method: 'post',
            body: JSON.stringify({value: email}),
            headers: new Headers({'Content-Type': 'application/json'}),
        })
        .then(response => response.json());
};

const postContactForm = (formData) => {
    return fetch(`${serverURL}/contacform`, {
            method: 'post',
            body: JSON.stringify(formData),
            headers: new Headers({'Content-Type': 'application/json'}),
        })
        .then(response => response.json());
};