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
        var journal = [];

        function addEntry(events, didITurnIntoASquirrel) {
            journal.push({
                events: events,
                squirrel: didITurnIntoASquirrel
            });
        }

        function phi(table) {
            return (table[3] * table[0] - table[2] * table[1]) /
                Math.sqrt((table[2] + table[3]) *
                    (table[0] + table[1]) *
                    (table[1] + table[3]) *
                    (table[0] + table[2]));
        }

        function hasEvent(event, entry) {
            return entry.events.indexOf(event) != -1;
        }

        function tableFor(event, journal) {
            var table = [0, 0, 0, 0];
            for (var i = 0; i < journal.length; i++) {
                var entry = journal[i], index = 0;
                if (hasEvent(event, entry)) index += 1;
                if (entry.squirrel) index += 2;
                table[index] += 1;
            }
            return table;
        }

        function gatherCorrelations(journal) {
            var phis = {};
            for (var entry = 0; entry < journal.length; entry++) {
                var events = journal[entry].events;
                for (var i = 0; i < events.length; i++) {
                    var event = events[i];
                    if (!(event in phis))
                        phis[event] = phi(tableFor(event, journal));
                }
            }
            return phis;
        }

        var correlations = gatherCorrelations(JOURNAL);

        for (var i = 0; i < JOURNAL.length; i++) {
            var entry = JOURNAL[i];
            if (hasEvent('peanuts', entry) && !hasEvent('brushed teeth', entry))
                entry.events.push('peanut teeth');
        }
    }

    let document_ready = setInterval(function() {
        if (document.readyState === 'complete') {
            clearInterval(document_ready);
            begin();
        }
    }, 10);

    var JOURNAL = [
        {'events':['carrot','exercise','weekend'],squirrel:false},
        {'events':['bread','pudding','brushed teeth','weekend','touched tree'],'squirrel':false},
        {'events':['carrot','nachos','brushed teeth','cycling','weekend'],'squirrel':false},
        {'events':['brussel sprouts','ice cream','brushed teeth','computer','weekend'],'squirrel':false},
        {'events':['potatoes','candy','brushed teeth','exercise','weekend','dentist'],'squirrel':false},
        {'events':['brussel sprouts','pudding','brushed teeth','running','weekend'],'squirrel':false},
        {'events':['pizza','brushed teeth','computer','work','touched tree'],'squirrel':false},
        {'events':['bread','beer','brushed teeth','cycling','work'],'squirrel':false},
        {'events':['cauliflower','brushed teeth','work'],'squirrel':false},
        {'events':['pizza','brushed teeth','cycling','work'],'squirrel':false},
        {'events':['lasagna','nachos','brushed teeth','work'],'squirrel':false},
        {'events':['brushed teeth','weekend','touched tree'],'squirrel':false},
        {'events':['lettuce','brushed teeth','television','weekend'],'squirrel':false},
        {'events':['spaghetti','brushed teeth','work'],'squirrel':false},
        {'events':['brushed teeth','computer','work'],'squirrel':false},
        {'events':['lettuce','nachos','brushed teeth','work'],'squirrel':false},
        {'events':['carrot','brushed teeth','running','work'],'squirrel':false},
        {'events':['brushed teeth','work'],'squirrel':false},
        {'events':['cauliflower','reading','weekend'],'squirrel':false},
        {'events':['bread','brushed teeth','weekend'],'squirrel':false},
        {'events':['lasagna','brushed teeth','exercise','work'],'squirrel':false},
        {'events':['spaghetti','brushed teeth','reading','work'],'squirrel':false},
        {'events':['carrot','ice cream','brushed teeth','television','work'],'squirrel':false},
        {'events':['spaghetti','nachos','work'],'squirrel':false},
        {'events':['cauliflower','ice cream','brushed teeth','cycling','work'],'squirrel':false},
        {'events':['spaghetti','peanuts','computer','weekend'],'squirrel':true},
        {'events':['potatoes','ice cream','brushed teeth','computer','weekend'],'squirrel':false},
        {'events':['potatoes','ice cream','brushed teeth','work'],'squirrel':false},
        {'events':['peanuts','brushed teeth','running','work'],'squirrel':false},
        {'events':['potatoes','exercise','work'],'squirrel':false},
        {'events':['pizza','ice cream','computer','work'],'squirrel':false},
        {'events':['lasagna','ice cream','work'],'squirrel':false},
        {'events':['cauliflower','candy','reading','weekend'],'squirrel':false},
        {'events':['lasagna','nachos','brushed teeth','running','weekend'],'squirrel':false},
        {'events':['potatoes','brushed teeth','work'],'squirrel':false},
        {'events':['carrot','work'],'squirrel':false},
        {'events':['pizza','beer','work','dentist'],'squirrel':false},
        {'events':['lasagna','pudding','cycling','work'],'squirrel':false},
        {'events':['spaghetti','brushed teeth','reading','work'],'squirrel':false},
        {'events':['spaghetti','pudding','television','weekend'],'squirrel':false},
        {'events':['bread','brushed teeth','exercise','weekend'],'squirrel':false},
        {'events':['lasagna','peanuts','work'],'squirrel':true},
        {'events':['pizza','work'],'squirrel':false},
        {'events':['potatoes','exercise','work'],'squirrel':false},
        {'events':['brushed teeth','exercise','work'],'squirrel':false},
        {'events':['spaghetti','brushed teeth','television','work'],'squirrel':false},
        {'events':['pizza','cycling','weekend'],'squirrel':false},
        {'events':['carrot','brushed teeth','weekend'],'squirrel':false},
        {'events':['carrot','beer','brushed teeth','work'],'squirrel':false},
        {'events':['pizza','peanuts','candy','work'],'squirrel':true},
        {'events':['carrot','peanuts','brushed teeth','reading','work'],'squirrel':false},
        {'events':['potatoes','peanuts','brushed teeth','work'],'squirrel':false},
        {'events':['carrot','nachos','brushed teeth','exercise','work'],'squirrel':false},
        {'events':['pizza','peanuts','brushed teeth','television','weekend'],'squirrel':false},
        {'events':['lasagna','brushed teeth','cycling','weekend'],'squirrel':false},
        {'events':['cauliflower','peanuts','brushed teeth','computer','work','touched tree'],'squirrel':false},
        {'events':['lettuce','brushed teeth','television','work'],'squirrel':false},
        {'events':['potatoes','brushed teeth','computer','work'],'squirrel':false},
        {'events':['bread','candy','work'],'squirrel':false},
        {'events':['potatoes','nachos','work'],'squirrel':false},
        {'events':['carrot','pudding','brushed teeth','weekend'],'squirrel':false},
        {'events':['carrot','brushed teeth','exercise','weekend','touched tree'],'squirrel':false},
        {'events':['brussel sprouts','running','work'],'squirrel':false},
        {'events':['brushed teeth','work'],'squirrel':false},
        {'events':['lettuce','brushed teeth','running','work'],'squirrel':false},
        {'events':['candy','brushed teeth','work'],'squirrel':false},
        {'events':['brussel sprouts','brushed teeth','computer','work'],'squirrel':false},
        {'events':['bread','brushed teeth','weekend'],'squirrel':false},
        {'events':['cauliflower','brushed teeth','weekend'],'squirrel':false},
        {'events':['spaghetti','candy','television','work','touched tree'],'squirrel':false},
        {'events':['carrot','pudding','brushed teeth','work'],'squirrel':false},
        {'events':['lettuce','brushed teeth','work'],'squirrel':false},
        {'events':['carrot','ice cream','brushed teeth','cycling','work'],'squirrel':false},
        {'events':['pizza','brushed teeth','work'],'squirrel':false},
        {'events':['spaghetti','peanuts','exercise','weekend'],'squirrel':true},
        {'events':['bread','beer','computer','weekend','touched tree'],'squirrel':false},
        {'events':['brushed teeth','running','work'],'squirrel':false},
        {'events':['lettuce','peanuts','brushed teeth','work','touched tree'],'squirrel':false},
        {'events':['lasagna','brushed teeth','television','work'],'squirrel':false},
        {'events':['cauliflower','brushed teeth','running','work'],'squirrel':false},
        {'events':['carrot','brushed teeth','running','work'],'squirrel':false},
        {'events':['carrot','reading','weekend'],'squirrel':false},
        {'events':['carrot','peanuts','reading','weekend'],'squirrel':true},
        {'events':['potatoes','brushed teeth','running','work'],'squirrel':false},
        {'events':['lasagna','ice cream','work','touched tree'],'squirrel':false},
        {'events':['cauliflower','peanuts','brushed teeth','cycling','work'],'squirrel':false},
        {'events':['pizza','brushed teeth','running','work'],'squirrel':false},
        {'events':['lettuce','brushed teeth','work'],'squirrel':false},
        {'events':['bread','brushed teeth','television','weekend'],'squirrel':false},
        {'events':['cauliflower','peanuts','brushed teeth','weekend'],'squirrel':false}
    ];
})();

function ranger( start, end, step ) {
    step = step ? step : 1;
    step = Math.abs( step );
    var seek = start;
    var result = [], i;
    if( end > start ){
        for( i = start; i <= end; i += step ){
            result.push( seek );
            seek += step;
        }
    }
    else{
        for( i = start; i >= end; i -= step ){
            result.push( seek );
            seek -= step;
        }
    }
    return result;
}

function arraySum(array){
    var sum = 0;
    for(var i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum;
}

function reverseArray( array ){
    var result = [];
    for( var i = array.length - 1; i >= 0; i-- ) {
        result.push( array[ i ] );
    }
    console.log(result);
    return result;
}

function reverseArrayInPlace( array ){
    var result = [];
    for( var i = array.length - 1; i >= 0; i-- ) {
        result.push( array[ i ] );
    }
    console.log(result);
    array = result;
    return array;
}


var list = {
    value: 1,
    rest: {
        value: 2,
        rest: {
            value: 3,
            rest: null
        }
    }
};

// haverbeke insists that lists are useful.
// seems needlessly complex with excessive risk of circular references.  Oh well.
function arrayToList( array, obj ){
    // declare empty object if there's no argument object
    obj = obj ? obj : {};
    // if there's some array left, do the parsing
    if( array.length > 0 ){
        // set the value property at this level in the list object
        obj.value = array[ 0 ];
        // declare an empty object for use in the next level of the list object
        obj.rest = {};
        // recurse until the last array element has been reached
        arrayToList( array.slice( 1 ), obj.rest );
        // this 'if' block is to clean up the end of the list, otherwise you end up
        // with a 'rest' property, with a 'rest' child of the value 'null'.
        if( array.length === 1 ){
            obj.rest = null;
        }
        return obj;
    }
    // the 'else' is so the margin condition of giving it an empty array won't break code
    return obj;
}

//console.log( arrayToList( [1, 3, 5] ) );

function listToArray( list, arr ){
    // if no array object, create it
    arr = arr ? arr : [];
    // if there's a value property, push onto the end of the array
    if( list.value ){
        arr.push( list.value );
        // only if there is something in 'rest' property other than 'null' do you recurse
        if( list.rest && list.rest !== null ){
            return listToArray( list.rest, arr );
        }
    }
    // if there isn't a value property, just returns an empty array
    return arr;
}

//console.log( 'list to array', listToArray( arrayToList( [ -1, 2, 3, 4, 5 ] ) ) );
//console.log( 'array to list', arrayToList( [ -1, 2, 3, 4, 5 ] ) );

function prependList( element, list ){
    var obj = {};
    obj.value = element;
    obj.rest = list;
    return obj;
}

function getNthOfList( list, nth ) {
    if( nth > 1 ){
        //console.log('nth > 0', nth, list);
        nth--;
        if( list.rest !== null ){
            return getNthOfList( list.rest, nth );
        }
        return undefined;
    }
    else{
        console.log('list is now', list);
        return list;
    }
}

//list = prependList( 55, list);
//console.log( 'get nth of list', getNthOfList( list, 4 ) );


function deepEqual( objA, objB ){
    // return true if all the properties are identical.  Otherwise, return false.
    var prop;
    var result = true;
    for( prop in objA ){
        if( objA.hasOwnProperty( prop ) && objB.hasOwnProperty( prop ) ){
            //console.log('both have prop', prop );
            if( typeof objA[ prop ] === 'object' && objA[ prop ] !== null ){
                //console.log('we need to go deeper', objA[ prop ], objB[ prop ]);
                result =  deepEqual( objA[ prop ], objB[ prop ] );
            }
            else{
                result = objA[prop] == objB[prop];
            }
        }
        else{
            result = false;
        }
    }
    for( prop in objB ){
        if( objA.hasOwnProperty( prop ) && objB.hasOwnProperty( prop ) ){
            //console.log('both have prop', prop );
            if( typeof objB[ prop ] === 'object' && objB[ prop ] !== null ){
                //console.log('we need to go deeper', objB[ prop ], objA[ prop ]);
                result =  deepEqual( objB[ prop ], objA[ prop ] );
            }
            else{
                result = objB[prop] == objA[prop];
            }
        }
        else{
            result = false;
        }
    }
    return result;
}

var one = { first: 'dicey', second: 'magic', third: { hello: 'mighty', piece: { buddy: 'oops' } } };
var another = { first: 'dicey', second: 'magic', third: { hello: 'mighty', piece: { buddy: 'nonexistent' } } };

console.log( deepEqual( one, another ) );


