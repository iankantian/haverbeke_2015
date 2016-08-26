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
        var plan = [
            '############################',
            '#      #    #      o      ##',
            '#                          #',
            '#          #####           #',
            '##         #   #    ##     #',
            '###           ##     #     #',
            '#           ###      #     #',
            '#   ####                   #',
            '#   ##       o             #',
            '# o  #         o       ### #',
            '#    #                     #',
            '############################'];

        //var valley = new LifelikeWorld(
        //    ["############################",
        //        "#####                 ######",
        //        "##   ***                **##",
        //        "#   *##**         **  O  *##",
        //        "#    ***     O    ##**    *#",
        //        "#       O         ##***    #",
        //        "#                 ##**     #",
        //        "#   O       #*             #",
        //        "#*          #**       O    #",
        //        "#***        ##**    O    **#",
        //        "##****     ###***       *###",
        //        "############################"],
        //    {"#": Wall,
        //        "O": PlantEater,
        //        "*": Plant}
        //);


        // A 2D Vector type
        function Vector ( x, y ){
            this.x = x;
            this.y = y;
        }
        Vector.prototype.plus = function( vector ){
            var resultant = new Vector( 0, 0 );
            resultant.x = this.x + vector.x;
            resultant.y = this.y + vector.y;
            return resultant;
        };
        Vector.prototype.minus = function( vector ){
            var resultant = new Vector( 0, 0 );
            resultant.x = this.x - vector.x;
            resultant.y = this.y - vector.y;
            return resultant;
        };

        function Grid( width, height ){
            this.space = new Array( width * height );
            this.width = width;
            this.height = height;
        }
        Grid.prototype.isInside = function( vector ){
            return vector.x >=0 && vector.x < this.width &&
                    vector.y >=0 && vector.y < this.height;
        };
        Grid.prototype.get = function( vector ){
            // Using an actual 2d vector would have a helper that's twice the complexity here!
            return this.space[ vector.x + this.width * vector.y ];
        };
        Grid.prototype.set = function( vector, value ){
            this.space[ vector.x + this.width * vector.y ] = value;
        };

        var directions = {
            n: new Vector( 0, -1 ),
            ne: new Vector( 1, -1 ),
            e: new Vector( 1, 0 ),
            se: new Vector( 1, 1 ),
            s: new Vector( 0, 1 ),
            sw: new Vector( -1, 1 ),
            w: new Vector( -1, 0 ),
            nw: new Vector( -1, -1 )
        };

        function randomElement( array ){
            return array[ Math.floor( Math.random() * array.length ) ];
        }

        var directionNames = 'n ne se s sw w nw'.split(' '); // seems clever, but you could save a step var d = ['n', 'ne' ... ]

        function BouncingCritter(){
            this.direction = randomElement( directionNames );
        }
        BouncingCritter.prototype.act = function( view ){
            if( view.look( this.direction ) != ' ' ){
                this.direction = view.find( ' ' ) || 's';
            }
            return{ type: 'move', direction: this.direction };
        };

        function elementFromChar( legend, ch ){
            if( ch == ' ' ){
                return null;
            }
            var element = new legend[ ch ]();
            element.originChar = ch;
            return element;
        }

        function World( map, legend ){
            var grid = new Grid( map[ 0 ].length, map.length );
            this.grid = grid;
            this.legend = legend;

            map.forEach( function( line, y ){
               for( var x = 0; x < line.length; x++ ){
                   grid.set( new Vector( x, y ),
                       elementFromChar( legend, line[ x ] ) );
               }
            });
        }
        World.prototype.toString = function() {
            var output = '';
            for (var y = 0; y < this.grid.height; y++) {
                for (var x = 0; x < this.grid.width; x++) {
                    var element = this.grid.get(new Vector(x, y));
                    output += charFromElement(element);
                }
                output += '\n';
            }
            return output;
        };
        World.prototype.toDom = function() {
            var output = '';
            output += '<br>';
            for ( var y = 0; y < this.grid.height; y++ ) {
                for (var x = 0; x < this.grid.width; x++ ) {
                    var element = this.grid.get( new Vector( x, y ) );
                    var staging = charFromElement( element );
                    output += ( staging == ' ' ) ? '&nbsp' : staging;
                }
                output += '<br>';
            }
            return output;
        };

        function Wall(){} // no methods, it just occupies space.

        function charFromElement( element ){
            if( element == null ){
                return ' ';
            }
            else{
                return element.originChar;
            }
        }

        var world = new World( plan,{
            '#': Wall,
            'o': BouncingCritter
        } );
        console.log( world.toString() );
        add_to_body( 'Behold the World!' + world.toDom() );

    }

    let document_ready = setInterval(function () {
        if ( document.readyState === 'complete' ) {
            clearInterval( document_ready );
            begin();
        }
    }, 10);
})();







