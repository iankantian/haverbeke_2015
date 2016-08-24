/**
 * Created by joshuabrown on 6/10/16.
 */
'use strict';
(function(){
    function add_to_element( element, text, newline ){
        element.innerHTML += text;
        if( newline ) element.innerHTML += '<br>';
    }
    function add_to_body( str ){
        add_to_element( document.body, str, true );
    }
    function begin(){

        var array = [1,2,3];

        //function forEach(array, action){
        //    for( var i = 0; i< array.length; i++ ){
        //        action( array[ i ] );
        //    }
        //}

        //function filter( array, test ){
        //    var passed = [];
        //    for( var i = 0; i < array.length; i++ ){
        //        if( test( array[ i ] ) ){
        //            passed.push( array[ i ] );
        //        }
        //    }
        //    return passed;
        //}

        //function map( array, transform ) {
        //    var mapped = [];
        //    for( var i = 0; i< array.length; i++ ){
        //        mapped.push( transform( array[ i ] ) );
        //    }
        //    return mapped;
        //}

        var ancestry = JSON.parse(ANCESTRY_FILE);

        //var overNinety = ancestry.filter( function( person ){
        //    return person.died - person.born > 90;
        //});
        //
        //console.log( overNinety.map( function( person ){
        //    return person.name;
        //}));
        ////console.log( ancestry.filter( function( person ){
        ////    return person.father == 'Carel Haverbeke';
        ////}));
        //
        //var byName = {};
        //var byAge = {};
        //ancestry.forEach( function( person ){
        //    byAge[ person.died - person.born ] = person;
        //});
        //ancestry.forEach( function( person ){
        //    byName[ person.name ] = person;
        //});
        //console.log('byName!', byName['Jan van Brussel']);
        //console.log('byAge of 91!', byAge[91]);

        //function reduce( array, combine, start ){
        //    var current = start;
        //    for( var i = 0; i < array.length; i++ ){
        //        current = combine( current, array[ i ] );
        //    }
        //    return current;
        //}

        //console.log( ancestry.reduce( function( min, cur ){
        //    if( cur.born < min.born ) return cur;
        //    else return min
        //}) );

        function average( array ){
            function plus( a, b ){ return a + b; }
            return array.reduce( plus ) / array.length;
        }

        function age( p ){ return p.died - p.born; }
        function male( p ){ return p.sex == 'm'; }
        function female( p ){ return p.sex == 'f'; }
        function hasMother( p ){ return p.mother ? true : false; }
        var byName = {};
        function isHere( p ){ return byName[ p.mother ] ? true : false; }
        ancestry.forEach( function( person ){
            byName[ person.name ] = person;
        });


        add_to_body( 'dudes average lifespan: ' + average( ancestry.filter( male ).map( age )) );
        add_to_body( 'dudettes average lifespan: ' + average( ancestry.filter( female ).map( age )) );

        // find the average age of mothers when giving birth to their children.
        // easier to look at it from child's point of view
        //var theMothers = ancestry.filter( motherData).map( function( person ){ return person.mother; } );
        ////console.log( theMothers );
        //var mothersInFile = theMothers.filter( function( mother ){ return byName[ mother ] ? true : false; } );
        //console.log( mothersInFile );

        add_to_body( 'average age of giving birth, by various filters and maps of the ancestry data:  '  );
        add_to_body( average( ancestry.filter( hasMother).filter( isHere ).map( function( person ){
            return  person.born - byName[ person.mother].born;
        } ) ) );

    }

    let document_ready = setInterval(function() {
        if (document.readyState === 'complete') {
            clearInterval(document_ready);
            begin();
        }
    }, 10);
})();







