/**
 * Created by joshuabrown on 6/10/16.
 */
'use strict';
(function(){
    function self_destruct(time) {
        return new Promise(function (resolve, reject) {
            let destruction_display = document.getElementById('destruction_display');
            destruction_display.innerHTML = `Promise of self_destruct given. ${time} seconds until detonation!` + '<br>' + `Press Right Arrow to cancel self_destruct!\nPress Left Arrow if you want to get it over with!`;
            let timer = setTimeout(function () {
                document.body.style.backgroundColor = 'red';
                destruction_display.innerHTML = 'Detonation! self_destruct Promise fulfilled by resolution';
                resolve('Detonation! Promise of self_destruct resolved at scheduled time!');
            }, time * 1000);
            let listener = function (event) {
                if (event.keyCode == 39) {
                    // Right was pressed, cancel it
                    clearTimeout(timer);
                    destruction_display.innerHTML = 'Cancelling self_destruct, Promise fulfilled by rejection';
                    reject(listener);
                }
                else if (event.keyCode == 37) {
                    // Left was pressed, do it now!
                    clearTimeout(timer);
                    document.body.style.backgroundColor = 'red';
                    destruction_display.innerHTML = 'Immediate self_destruct, Promise fulfilled by resolving';
                    resolve(listener);
                }
            };
            document.addEventListener( 'keydown', listener );
        });
    }

    function init( time ){
        self_destruct( time ).then(
            // resolution!
            function (listener) {
                // clean up those events
                document.removeEventListener('keydown', listener);
            },
            // rejection!
            function (listener) {
                // clean up those events
                document.removeEventListener('keydown', listener);
            }
        );
    }

    let readyStateCheckInterval = setInterval(function() {
        if (document.readyState === 'complete') {
            clearInterval(readyStateCheckInterval);
            init( 15 );
        }
    }, 10);
})();