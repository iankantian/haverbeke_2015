/**
 * Created by joshuabrown on 6/10/16.
 */
'use strict';
(function () {
    function add_to_element( element, text, newline ) {
        element.innerHTML += text;
        if (newline) element.innerHTML += '<br>';
    }

    function add_to_body(str) {
        add_to_element( document.body, str, true );
    }
    function begin() {
        // this is some crazy stuff right here.  using 'this' is undefined in global scope on my computer
        // so substituting 'window' scope.  However, this means the namespace is global, which can cause
        // collision with other api's that want to use the global scope with same name, like 'weekDay'
        (function( exports ){
            var names = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            exports.name = function( number ){
                return names[ number ];
            };
            exports.number = function( name ){
                return names.indexOf( name );
            };
        })( window.weekDay = {} );

        add_to_body( 'weekDay.name( 0 ) returns ' + weekDay.name( 0 ) );
        add_to_body( '"this" outside a function is ', this ); // undefined on my computer when global

        //function evalAndReturnX( code ){
        //    eval( code );
        //    return x;
        //}
        //console.log( evalAndReturnX( "var x = 2" ) ); // undefined, can't do it per book,

        var plusOne = new Function('n', 'return n + 1;');  // this works fine though!
        add_to_body( 'plusOne( 4 ) returns ' + plusOne( 4 ) );

        // pretend 'readfile' function:
        function readFile ( str ){
            return str;
        }
        
        var weekDayModule = '' +
            'var names = [\'Sunday\',\'Monday\',\'Tuesday\',\'Wednesday\',\'Thursday\',\'Friday\',\'Saturday\'];' +
            ' exports.name = function( number ){ ' +
            '    return names[ number ];' +
            '}; '+
            'exports.number = function( name ){ '+
            '    return names.indexOf( name ); '+
            '};';
        
        // now make a stripped down 'require':
        function require( name ){
            var code = new Function( 'exports', readFile( name ) );
            var exports = {};
            code( exports );
            return exports;
        }
        add_to_body( '"require( weekDayModule ).name( 6 )" returns ' + require( weekDayModule ).name( 6 ) );

        //var weekDayModularized = require( weekDayModule );
        //add_to_body( 'now via variable weekday = require( \'weekday\' ); weekday.name( 6 ); // ' + weekDayModularized.name( 6 ) );

        // this allows more than just 'exports' to be exported, you could return functions or anything else!
        add_to_body( 'The following pattern is exemplified by CommonJS modules.  That is built in to Node.js.  Here\'s a trivial example:<br>' );
        function requireImproved( name ){
            if( name in require.cache )
                return require.cache[ name ];

            var code = new Function('exports, module', readFile( name ) );
            var exports= {}, module = { exports: exports };
            code( exports, module );
            require.cache[ name ] = module.exports;
            return module.exports;
        }
        requireImproved.cache = Object.create[ null ];

        add_to_body('That\'s cool and all, but it can create massive lag on page while the browser fetches all these modules.<br>' +
            'perhaps consider using Asynchronous Module Definition, in which a function wraps it in such a way as to allow<br>' +
            'the function to load in the background, executing after it\'s all loaded up! See Require.js for popular example.' );
    }
    let document_ready = setInterval( function () {
        if ( document.readyState === 'complete' ) {
            clearInterval( document_ready );
            begin();
        }
    }, 10 );
})();





