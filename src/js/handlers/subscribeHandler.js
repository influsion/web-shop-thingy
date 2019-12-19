'use strict';

const formSubmission = (e, $target) => {
    const $box = global.$main.find('.newsletter__box');
    const $inputEmail = $box.find('input');
    const $warningIcon = $box.find('.js-warning-icon');
    const value = $inputEmail.val().trim();
    const isCorrect = new RegExp(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/, 'i').test(value);

    if(isCorrect) {
        console.log(isCorrect, value);
        $warningIcon.addClass('hide');

        postEmail(value);
        $inputEmail.val('');

    } else {
        $inputEmail.val('');
        $warningIcon.removeClass('hide');
    };
};

const inputEmail = (e, $target) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        formSubmission();

        return;
    }
};

const hoverMouse = (e, $target) => {
    const $warningText = global.$main.find('.js-warning-text');
    $warningText.toggleClass('hide');
;}

