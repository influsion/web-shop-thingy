'use strict';

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

const postContactForm = formData => {
    return fetch(`${serverURL}/contacform`, {
            method: 'post',
            body: JSON.stringify(formData),
            headers: new Headers({'Content-Type': 'application/json'}),
        })
        .then(response => response.json())
        .catch(error => {
            console.error('fetch, postContactForm: ', error);
        });
};