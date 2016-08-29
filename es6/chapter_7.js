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

    function updateDomWorld( str ){
        document.getElementById('world').innerHTML = str;
    }

    function begin() {
        var plan = [
            '############################',
            '#      #    #      o      ##',
            '#               x          #',
            '#          #####           #',
            '##   xx    #   #    ##     #',
            '###           ##     #     #',
            '#           ###      #     #',
            '#   ####         x         #',
            '#   ##       o             #',
            '# o  #    x    o       ### #',
            '#    #                     #',
            '############################'];

        var valley = [
            "############################",
            "#####                 ######",
            "##   **                 **##",
            "#   *##**         **  O  *##",
            "#    ***     O    ##**    *#",
            "#       O         ##***    #",
            "#                 ##**     #",
            "#   O       #*             #",
            "#*          #**       O    #",
            "#***        ##**    O    **#",
            "##****     ###***       *###",
            "############################"
        ];

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
        Grid.prototype.forEach = function( f, context ){
            for( var y = 0; y < this.height; y++ ){
                for( var x = 0; x < this.width; x++ ){
                    var value = this.space[ x + y * this.width ];
                    if( value != null )
                        f.call( context, value, new Vector( x, y ) );
                }
            }
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

        var directionNames = 'n ne e se s sw w nw'.split(' '); // seems clever, but you could save a step var d = ['n', 'ne' ... ]

        function BouncingCritter(){
            this.direction = randomElement( directionNames );
        }
        BouncingCritter.prototype.act = function( view ){
            if( view.look( this.direction ) != ' ' ){
                this.direction = view.find( ' ' ) || 's';
            }
            return{ type: 'move', direction: this.direction };
        };

        function dirPlus( dir, n ){
            var index = directionNames.indexOf( dir );
            var resIndex = ( index + n + 8 ) % 8;
            var res = directionNames[ resIndex ];
            return res;
        }

        function WallFollower(){
            this.dir = 's';
        }
        WallFollower.prototype.act = function( view ){
            var start = this.dir;
            if( view.look( dirPlus( this.dir, -3 ) ) != ' ' ){
                start = this.dir = dirPlus( this.dir, -2 );
            }
            while( view.look( this.dir ) != ' ' ){
                this.dir = dirPlus( this.dir, 1 );
                if( this.dir == start ) break;
            }
            return { type: 'move', direction: this.dir };
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
        World.prototype.checkDestination = function( action, vector ){
            if( directions.hasOwnProperty( action.direction ) ) {
                var dest = vector.plus(directions[action.direction]);
                if (this.grid.isInside(dest))
                    return dest;
            }
        };
        World.prototype.letAct = function( critter, vector ){
            var action = critter.act( new View( this, vector ) );
            if( action && action.type == 'move'){
                var dest = this.checkDestination( action, vector );
                if( dest && this.grid.get( dest ) == null ){
                    this.grid.set( vector, null );
                    this.grid.set( dest, critter );
                }
            }
        };
        World.prototype.turn = function(){
            var acted = [];
            this.grid.forEach( function( critter, vector ){
                if( critter.act && acted.indexOf( critter ) == -1 ){
                    acted.push( critter );
                    this.letAct( critter, vector );
                }
            }, this );
        };

        function View( world, vector ){
            this.world = world;
            this.vector = vector;
        }
        View.prototype.look = function( dir ){
            var target = this.vector.plus( directions[ dir ] );
            if( this.world.grid.isInside( target ) ){
                return charFromElement( this.world.grid.get( target ) );
            }
            else{
                return '#';
            }
        };
        View.prototype.findAll = function( ch ){
            var found = [];
            for( var dir in directions ){
                if( this.look( dir ) == ch ){
                    found.push( dir );
                }
            }
            return found;
        };
        View.prototype.find = function ( ch ){
            var found = this.findAll( ch );
            if( found.length == 0 ) return null;
            return randomElement( found );
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

        function LifelikeWorld( map, legend ){
            World.call( this, map, legend );
        }
        LifelikeWorld.prototype = Object.create( World.prototype );

        var actionTypes = Object.create( null );

        LifelikeWorld.prototype.letAct = function( critter, vector ){
            var action = critter.act( new View( this, vector ) );
            var handled = action &&
                    action.type in actionTypes &&
                    actionTypes[ action.type ].call( this, critter, vector, action );
            if( !handled ){
                critter.energy -= 0.2;
                if( critter.energy <= 0 ){
                    this.grid.set( vector, null );
                }
            }
        };

        actionTypes.grow = function( critter ){
            critter.energy += 0.5;
            return true;
        };

        actionTypes.move = function( critter, vector, action ){
            var dest = this.checkDestination( action, vector );
            if( dest == null || critter.energy <= 1 || this.grid.get( dest ) != null ){
                return false;
            }
            critter.energy -= 1;
            this.grid.set( vector, null );
            this.grid.set( dest, critter );
            return true;
        };

        actionTypes.eat = function( critter, vector, action ){
            var dest = this.checkDestination( action, vector );
            var atDest = dest != null && this.grid.get( dest );
            if( !atDest || atDest.energy == null ){
                return false;
            }
            critter.energy += atDest.energy;
            this.grid.set( dest, null );
            return true;
        };

        actionTypes.reproduce = function( critter, vector, action ){
            var baby = elementFromChar( this.legend, critter.originChar );
            var dest = this.checkDestination( action, vector );
            if( dest == null || critter.energy <= 2 * baby.energy || this.grid.get( dest ) != null ){
                return false;
            }
            critter.energy -= 2 * baby.energy;
            this.grid.set( dest, baby );
            return true;
        };

        function Plant(){
            this.energy = 3 + Math.random() * 4;
        }
        Plant.prototype.act = function( context ){
            if( this.energy > 15 ){
                var space = context.find( ' ' );
                if( space )
                    return { type: 'reproduce', direction: space };
            }
            if( this.energy < 20 ){
                return { type: 'grow' };
            }
        };

        function PlantEater(){
            this.energy = 20;
        }
        PlantEater.prototype.act = function( context ){
            var space = context.find(' ');
            if( this.energy > 60 && space )
                return { type: 'reproduce', direction: space };
            var plant = context.find( '*' );
            if( plant )
                return { type: 'eat', direction: plant };
            if( space )
                return { type: 'move', direction: space };
        };

        var world = new LifelikeWorld( valley, {
            '#': Wall,
            'O': PlantEater,
            '*': Plant
        } );

        function frame(){
            world.turn();
            updateDomWorld( world.toDom() );
        }

        setInterval( function(){
            frame();
        }, 100 );
    }

    let document_ready = setInterval( function () {
        if ( document.readyState === 'complete' ) {
            clearInterval( document_ready );
            begin();
        }
    }, 10 );
})();







