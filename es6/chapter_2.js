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
        let body = document.body;

        // FizzBuzz
        add_to_element( body, 'Print a Triangle<br>', true );

        let str = '';
        for( let i = 0; i < 7; i++ ){
            str = '';
            for(let j = 0; j <= i; j++ ){
                str += '#';
            }
            add_to_element( body, str, true );
        }

        // FizzBuzz
        add_to_element( body, '', true );
        add_to_element( body, 'FizzBuzz<br>', true );

        for( let i = 1; i <= 100; i++ ){
            let Fizz = false;
            let Buzz = false;
            if( i % 3 === 0 ){
                Fizz = true;
            }
            if( i % 5 === 0 ){
                Buzz = true;
            }
            if( Fizz && Buzz ) add_to_element( body, 'FizzBuzz' + ', ' );
            else if( Fizz ) add_to_element( body, 'Fizz' + ', ' );
            else if( Buzz ) add_to_element( body, 'Buzz' + ', ' );
            else add_to_element( body, i + ', ' );
        }
        add_to_element( body, '', true );


        // Chess Board
        str = '';
        str += '<p style="line-height: 100%"><br>Chess Board<br><br>';
        let side = 8;
        let color = true;
        for(let i = 0; i < side; i++){
            for(let j = 0; j < side; j++) {
                // add a black full block in unicode
                if (color === true)  str += '\u2588';
                // add a full em space
                else str += '\u2003';
                color = !color;
            }
            color = !color;
            str += '<br>';
        }
        str += '</p>';
        add_to_element( body, str);

    }

    let document_ready = setInterval(function() {
        if (document.readyState === 'complete') {
            clearInterval(document_ready);
            begin();
        }
    }, 10);
})();