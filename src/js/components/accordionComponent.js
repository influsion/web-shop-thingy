"use strict";

const accordionComponent = arrayOfItems => {
    const itemsHTML = arrayOfItems.reduce((accumulator, { question, answer }, i) => {
        const itemHTML = (`
            <div class="card" id="card${i}">
                <div class="acc-header" role="tab" id="heading${i}">
                    <h5 id="h5${i}">
                        <a id="question${i}" class="collapsed" data-toggle="collapse" href="#answer${i}" role="button" aria-expanded="false" aria-controls="answer${i}">
                            ${question}
                        </a>
                    </h5>
                </div>
                <div id="answer${i}" class="collapse" role="tabpanel" aria-labelledby="heading${i}" data-parent="#accordion">
                    <div class="card-body">${answer}
                    </div>
                </div>
            </div>
        `);

        return accumulator + itemHTML;
    }, '');

    return (`
        <div id="accordion" class="wn_accordion" role="tablist">${itemsHTML}</div>
    `);
};
