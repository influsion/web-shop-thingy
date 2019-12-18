'use strict';

const contactFormSubmission = (e, $target) => {
    const $box = global.$main.find('#contact-form');
    const $firstName = $box.find('input[name="firstname"]');
    const $lastName = $box.find('input[name="lastname"]');
    const $inputEmail = $box.find('input[type="email"]');
    const $inputSubject = $box.find('input[name="subject"]');
    const $textareaSubject = $box.find('textarea[name="message"]');
    // const $warningIcon = $box.find('.js-warning-icon');
    // // const value = $inputEmail.val().trim();
    // const isCorrect = new RegExp(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/, 'i').test(value);

    const getValue = $elem => $elem.val().trim();

        // valueFirstName,
        // valueLastName,
        // valueEmail, 
        // valueSubject



    // console.log(valueFirstName);
    // console.log(valueLastName);
    // console.log(valueEmail);
    // console.log(valueSubject);

    // console.log(`firstname ${$firstName.val()}`);
    // console.log(`lastname ${$lastName.val()}`);
    // console.log(`email ${$inputEmail.val()}`);
    // console.log(`subject ${$inputSubject.val()}`);
    // console.log(`subject ${$textareaSubject.val()}`);

    // if(isCorrect) {
    //     console.log(isCorrect, value);
    //     $warningIcon.addClass('hide');

    //     postEmail(value);
    // } else {
    //     $inputEmail.val('');
    //     $warningIcon.removeClass('hide');
    // };
};

// const inputName = (e, $target) => {
//     if (e.keyCode === 13) {
//         e.preventDefault();
//         formSubmission();

//         return;
//     }
// };


