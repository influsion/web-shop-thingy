'use strict';

const defaultPrevent = (e, $target) => {
    const $box = global.$main.find('.newsletter__box');
    const $inputEmail = $box.find('input');
    const value = $inputEmail.val().trim();
    const isCorrect = new RegExp(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/, 'i').test(value);
     
    if(isCorrect) {
        console.log(isCorrect, value);
        postEmail(value);
    } else {
        $inputEmail.attr('placeholder', 'Enter the correct email');
        $inputEmail.css('background', '1px solid red');
        alert('Are you sure your email address is entered correctly?');
        
        return;
    };
};