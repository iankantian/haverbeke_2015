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
        let str = ''; // the string that will define what's added to the body of the document.

        str += 'Closure<br>' +
        '"The ability to treat functions as values, combined with the fact that local variables are "re-created"'+
        'every time a function is called, brings up an interesting question. What happens to local variables when '+
        'the function call that created them is no longer active?"<br>'+'        -Haverbeke, 2015<br>';

        add_to_element( body, str, true);

        function multiplier(factor){
            return function(number){ // this is 'closure' as it's a function that 'closes over' some local variable
                return number * factor;
            };
        }

        let four_times = multiplier(4);
        let two_times = multiplier(2);

        str = '';

        str += 'function multiplier(factor){<br>' +
            '&emsp;return function(number){<br>' +
            '&emsp;&emsp;return number * factor;<br>' +
            '&emsp;};<br>'+
            '}<br><br>' +
            'let four_times = multiplier(4);<br>' +
            'let two_times = multiplier(2);<br><br>' +
            'console.log(four_times(2));&emsp;//&ensp;' + four_times(2) + '<br>' +
            'console.log(two_times(2));&emsp;//&ensp;'+ two_times(2) + '<br><br>';

        str += '"This feature-being able to refrence a specifice instance of a local variable in an enclosing '+
        'function-is called closure.  A function that "closes over" some local variable is called a closure. '+
        'This behavior not only frees you from having to worry about lifetimes of variables but also allows for '+
        'some creative use of function values."';
        add_to_element( body, str, true);


        // recursion, pg 50.
        function find_solution(target){
                function find(start,history){
                    if(start===target){
                        return history;
                    }
                    else if(start>target){
                        return null;
                    }
                    else{
                       return find(start + 5, '(' + history +' + 5)') || // if adding 5 results in going over the target,
                               find(start *3, '(' + history +' * 3)'); // try muliplying, if that also goes over it's null
                    }
                }
            return find(1, '1');
        }

        str = '<br>A string returned by a recursive function:<br>' + find_solution(24) + '<br>';

        add_to_element( body, str, true);

    }

    let document_ready = setInterval(function() {
        if (document.readyState === 'complete') {
            clearInterval(document_ready);
            begin();
        }
    }, 10);
})();