'use strict';

const intViewportWidth = jQuery(window).width();
const intViewportHeight = jQuery(window).height();


const snowFlake = (data) => {
    const quantity = 19;
    const $wrap = $(`#wrapper`);
    const elements = [];
    const fincSnowflake = ($elem, order, top, left) => {
        elements[order].setIntervalId = setInterval(function() {
            
            top += 0.2;

            if (top >= intViewportHeight) {
                top = -20;
            }

            left += 0.1;

            if (left > intViewportWidth) {
                left = -20;
            }

            $elem.css({ 'top': top, 'left': left });
        }, 10);
    }
    for (let i = 0; i < quantity + 1; i++) {
        const $element = $(`<div class="snow-flake flake${i}"><img src="${data.src}" alt="icon"></div>`);

        elements[i] = { $element };

        $wrap.prepend($element);
        fincSnowflake($element, i, randomInteger(0, intViewportHeight), randomInteger(0, intViewportWidth));
    }

    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
};
