'use strict';

const defaultPrevent = ($target) => {
    $target.preventDefault();
    const $inputEmail = global.$main.find('.newsletter__box input');
    const $value = $inputEmail.val();
    console.log($value);

    /*const correctEmail = email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
    if (!correctEmail) {
        alert('Are you sure your email address is entered correctly?')
        return false
    }*/
};