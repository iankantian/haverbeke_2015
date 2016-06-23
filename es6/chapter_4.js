/**
 * Created by joshuabrown on 6/10/16.
 */
'use strict';
(function(){
    function add_to_element( element, text, newline ){
        element.innerHTML += text;
        if( newline ) element.innerHTML += '<br>';
    }

    function begin(){
        regexBenchtest('                  http://www.example.com/index.html                 ',
            /\r?\n|\r|\s?/g,
            /\s?/g,
            /\r/g,
            /[abc]/
        );
    }

    function regexBenchtest(){
        let finishTime, startTime, str, str_test, hA, hertz, difference, result;
        let fastest = 0;
        const iterations = 1000000;

        if( arguments[0] ){
            str = arguments[0];
            str_test = str + ' '; // break pointer to original string
            str_test.slice( 0,-1 ); // remove last character added above
        }
        else return 'nothing to test!';

        for( let j = 1; j < arguments.length; j++ ){
            startTime = Date.now();
            for( let i = 0; i < iterations; i++){
                str_test = str + ' ';
                str_test = str_test.replace( arguments[j], '');
            }
            finishTime = Date.now();

            difference = finishTime - startTime;
            hertz = iterations / ( difference / 1000 );

            if( fastest < hertz ){
                fastest = hertz.toFixed(2);
                result = arguments[j];
            }
            console.log( 'regex: ', arguments[j], hertz.toFixed(2) + ' Hz');
        }
        console.log('fastest regex = ' + result + ' at ' + fastest + ' Hz');
        return result;
    }



    let document_ready = setInterval(function() {
        if (document.readyState === 'complete') {
            clearInterval(document_ready);
            begin();
        }
    }, 10);
})();