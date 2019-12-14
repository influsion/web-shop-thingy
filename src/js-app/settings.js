'use strict';

const global = {};
const globalPromiseList = PromiseList();
const basket = Basket();
const lang = 'en';
const qsDefaultParams = {
    arrayFormat: 'indices',
    format : 'RFC3986',
};
const serverURL = 'http://localhost:3000';
const reToExcludeSpecialCharacters = /^[^@#$%&|*^()=+\\\[\]/]+$/;
let localization = {};