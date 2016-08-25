/**
 * Created by joshuabrown on 6/10/16.
 */
'use strict';
(function () {
    function add_to_element(element, text, newline) {
        element.innerHTML += text;
        if (newline) element.innerHTML += '<br>';
    }

    function add_to_body(str) {
        add_to_element(document.body, str, true);
    }

    function begin() {
        var whiteRabbit = {
            type: 'white',
            fear: 'late',
            speak: speak
        };
        //    var fatRabbit = {
        //        type: 'fat',
        //        fear: 'hungry',
        //        speak: speak
        //    };
        //    whiteRabbit.speak('Oh my ears');
        //    fatRabbit.speak('Carrots, now');
        //    speak.apply(whiteRabbit, ['By my whiskers']);
        //    speak.apply(fatRabbit, ['Burp']);
        //    speak.call({ type: 'brown', fear: ''}, 'Whazzap!');
        //    speak('Whazzap!');

        var protoRabbit = {
            speak: speak
        };

        var killerRabbit = Object.create(protoRabbit);
        killerRabbit.type = 'killer';
        killerRabbit.speak('SKREEEE!');

        function Rabbit(type) {
            this.type = type;
        }

        Rabbit.prototype.speak = speak;

        var killerRabbit2 = new Rabbit('killer2');
        killerRabbit2.speak('I must destroy you');

        function speak(line) {
            add_to_body('The ' + this.type + ' rabbit says "' + line + '"');
        }

        // Object.prototype.hasOwnProperty = 42; // ruin your website!  Redefine some crap!
        add_to_body(whiteRabbit.hasOwnProperty('fear'));

        // Worried someone else might have messed up with the basic prototypes?  You could try:
        //for( var name in obj ){
        //    if( obj.hasOwnProperty( name ) ){
        //        // your code on the property name
        //    }
        //}
        // However, they could have redefined the basic prototypes.  How to get clean slate:
        // Prototype-less Objects.
        var newthing = Object.create(null);
        newthing['pizza'] = 6.28;
        add_to_body('toString' in newthing); // returns 'false', thus 'newthing' is truly new, without preconceived prototypes


        function rowHeights( rows ) {
            return rows.map(function ( row ) {
                return row.reduce(function ( max, cell ) {
                    return Math.max( max, cell.minHeight() );
                }, 0);
            });
        }

        function colWidths(rows) {
            return rows[0].map(function (_, i) {
                return rows.reduce(function ( max, row ) {
                    return Math.max( max, row[i].minWidth() );
                }, 0);
            });
        }

        function drawTable(rows) {
            var heights = rowHeights( rows );
            var widths = colWidths( rows );

            function drawLine( blocks, lineNo ) {
                return blocks.map(function ( block ) {
                    return block[ lineNo ];
                }).join('&nbsp');
            }

            function drawRow(row, rowNum) {
                var blocks = row.map(function ( cell, colNum ) {
                    return cell.draw( widths[ colNum ], heights[ rowNum ]);
                });
                return blocks[ 0 ].map( function ( _, lineNo ) {
                    return drawLine( blocks, lineNo );
                }).join( '<br>' );
            }
            return rows.map( drawRow ).join( '<br>' );
        }

        function repeat( string, times ){
            var result = '';
            for( var i = 0; i < times; i++ ){
                result += string;
            }
            return result;
        }


        function TextCell( text ){
            this.text = text.split('<br>');
        }
        TextCell.prototype.minWidth = function(){
            return this.text.reduce( function( width, line ){
                return Math.max( width, line.length );
            }, 0 );
        };
        TextCell.prototype.minHeight = function(){
            // if there are carriage returns in the text, the height increases to contain them.
            return this.text.length;
        };
        TextCell.prototype.draw = function( width, height ){
            var result = [];
            for( var i = 0; i < height; i++ ){
                var line = this.text[ i ] || '';
                result.push( line + repeat( '&nbsp', width - line.length ) );
            }
            return result;
        };


        function RTextCell( text ){
            TextCell.call( this, text );
        }
        RTextCell.prototype = Object.create( TextCell.prototype );
        RTextCell.prototype.draw = function( width, height ){
            var result = [];
            for( var i = 0; i < height; i++ ){
                var line = this.text[ i ] || '';
                result.push( repeat( '&nbsp', width - line.length ) + line );
            }
            return result;
        };

        function UnderlinedCell( inner ){
            this.inner = inner;
        }
        UnderlinedCell.prototype.minWidth = function(){
            return this.inner.minWidth();
        };
        UnderlinedCell.prototype.minHeight = function(){
            return this.inner.minHeight() + 1;
        };
        UnderlinedCell.prototype.draw = function( width, height ){
            return this.inner.draw( width, height - 1 )
                .concat( [ repeat( '-', width ) ] );
        };

        function dataTable( data ){
            var keys = Object.keys( data[ 0 ] );    // grab the first line for the keys of the table
            var headers = keys.map( function( name ){
                return new UnderlinedCell( new TextCell( name ) );
            } );
            var body = data.map( function( row ){
               return keys.map( function( name ){
                   var value = row[ name ];
                   if( typeof value == 'number' ){
                       return new RTextCell( String( value ) );
                   }
                   else{
                       return new TextCell( String( value ) );
                   }
               } );
            } );
            return [ headers].concat( body );
        }

        add_to_body( 'Haverbeke uses the console, in the first half of the book the suggested environment is Node.js<br>I\'m too impatient, wanting to see it on a web page, so I tweaked the code and dumped it here:<br>' );
        add_to_body( drawTable( dataTable( MOUNTAINS ) ) );


        // A Vector type
        function Vector2 ( x, y ){
            this.x = x;
            this.y = y;
            return this;
        }
        Vector2.prototype.plus = function( vector ){
            var resultant = new Vector2( 0, 0 );
            resultant.x = this.x + vector.x;
            resultant.y = this.y + vector.y;
            return resultant;
        };
        Vector2.prototype.minus = function( vector ){
            var resultant = new Vector2( 0, 0 );
            resultant.x = this.x - vector.x;
            resultant.y = this.y - vector.y;
            return resultant;
        };
        var Q = new Vector2( 1, 2 );
        var R = new Vector2( -1, -2 );
        console.log(Q );
        console.log(R );
    }

    let document_ready = setInterval(function () {
        if ( document.readyState === 'complete' ) {
            clearInterval( document_ready );
            begin();
        }
    }, 10);
})();







