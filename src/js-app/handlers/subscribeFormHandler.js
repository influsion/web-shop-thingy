'use strict';

// import { isRegExp } from "util";

const contactFormSubmission = (e, $target) => {
    const $box = global.$main.find('#contact-form');
    const $firstName = $box.find('input[name="firstname"]');
    const $lastName = $box.find('input[name="lastname"]');
    const $inputEmail = $box.find('input[type="email"]');
    const $inputSubject = $box.find('input[name="subject"]');
    const $textareaSubject = $box.find('textarea[name="message"]');
    const $warningIcon = $box.find('.js-warning-icon');


    const getValue = $elem => $elem.val().trim();

    const firstNameString = getValue($firstName);
    const lastNameString = getValue($lastName);
    const emailString = getValue($inputEmail);
    const subjectString = getValue($inputSubject);
    const textareaString = getValue($textareaSubject);

    const isCorrectValue = {
        firstName: new RegExp(`^[ ]*[a-zA-Zа-яА-Я]+(([',. -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я][ ]*)*$`).test(firstNameString),
        lastName: new RegExp(`^[ ]*[a-zA-Zа-яА-Я]+(([',. -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я][ ]*)*$`).test(lastNameString),
        subject: new RegExp(`^[ ]*[a-zA-Zа-яА-Я]+(([',. -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я][ ]*)*$`).test(subjectString),
        email: new RegExp(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/, 'i').test(emailString),
    };

    if (isCorrectValue.email && isCorrectValue.firstName && isCorrectValue.lastName && isCorrectValue.subject) {
        $warningIcon.addClass('hide');
        postContactForm({firstNameString, lastNameString, emailString, subjectString, textareaString});
    } else {
        $firstName.val('');
        $lastName.val('');
        $inputEmail.val('');
        $inputSubject.val('');
    };

    if(isCorrectValue.email || isCorrectValue.firstName || isCorrectValue.lastName || isCorrectValue.subject) {
        $warningIcon.removeClass('hide');
    }

   


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


