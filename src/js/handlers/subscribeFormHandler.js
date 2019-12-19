'use strict';

// import { isRegExp } from "util";

const contactFormSubmission = (e, $target) => {
    const $box = global.$main.find('#contact-form');
    const $firstName = $box.find('input[name="firstname"]');
    const $lastName = $box.find('input[name="lastname"]');
    const $inputEmail = $box.find('input[type="email"]');
    const $inputSubject = $box.find('input[name="subject"]');
    const $textareaSubject = $box.find('textarea[name="message"]');
    const $warningIcon = $box.find('.js-warning-text-form');

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

    if (isCorrectValue.email && isCorrectValue.firstName && isCorrectValue.lastName && isCorrectValue.subject && textareaString !== '') {
        $warningIcon.addClass('hide');
        postContactForm({firstNameString, lastNameString, emailString, subjectString, textareaString});
        $firstName.val('');
        $lastName.val('');
        $inputEmail.val('');
        $inputSubject.val('');
        $textareaSubject.val('');
    };

    if(!isCorrectValue.email) {
        $firstName.siblings('.js-warning-text-form').removeClass('hide');
        $inputEmail.val('');
    };
    if(!isCorrectValue.firstName) {
        $lastName.siblings('.js-warning-text-form').removeClass('hide');
        $firstName.val('');
    };
    if(!isCorrectValue.lastName) {
        $inputEmail.siblings('.js-warning-text-form').removeClass('hide');
        $lastName.val('');
    };
    if(!isCorrectValue.subject) {
        $inputSubject.siblings('.js-warning-text-form').removeClass('hide');
        $inputSubject.val('');
    };
    if(textareaString === '') {
        $textareaSubject.siblings('.js-warning-text-form').removeClass('hide');
    };
};

const keyPressContactForm = (e, $target) => {
    if (e.keyCode === 13) {
        contactFormSubmission();
    }
};

const focusInput = (e, $target) => {
    const $warningIcon = global.$main.find('.js-warning-text-form');
    $warningIcon.addClass('hide');
}


