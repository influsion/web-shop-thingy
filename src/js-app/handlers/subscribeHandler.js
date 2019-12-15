'use strict';

const defaultPrevent = (e, $target) => {
    e.preventDefault();
    const $inputEmail = global.$main.find('.newsletter__box input');
    $inputEmail.attr('class', 'input');
    const $value = $inputEmail.val();
    console.log($value);

    const correctEmail = $value.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
    if (!correctEmail) {
        $inputEmail.attr('placeholder', 'Are you sure your email address is entered correctly?');
        $inputEmail.css('background', '1px solid red');
        alert('Are you sure your email address is entered correctly?')
        return false
    }
};