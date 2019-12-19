'use strict';

const PromiseList = function() {
    const order = [];

    const propss = {
        addPromise: {
            writable: false,
            configurable: false,
            value: function({ name: promiseName, body: promiseObject }) {
                const promisePosition = this.push(promiseObject) - 1;

                order[promisePosition] = promiseName;
                console.log(order);
                console.log('promise name: ' + promiseName + ', ' + 'position: ' + promisePosition);

                return this;
            }
        },
        response: {
            writable: false,
            configurable: false,
            value: {},
        },
        responses: {
            writable: false,
            configurable: false,
            value: function(promiseAllResponseArray) {

                promiseAllResponseArray.forEach((item, i) => {
                    const responseName = order[i];

                    this.response[responseName] = item;
                    console.log(order[i] + ":", item);
                });

                return this.response;
            },
        },
        allPromises: {
            writable: false,
            configurable: false,
            value: function(responseFunction) {
                Promise.all(this)
                    .then(res => this.responses(res))
                    .then(res => responseFunction(res));

            },
        },
    };

    return Object.create([], propss);
};