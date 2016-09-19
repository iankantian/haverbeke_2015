/**
 * Created by joshuabrown on 9/17/16.
 */
function myApp(){
    var scale,
        targetAspectRatio = 30 / 23,
        maxStep = 0.05,
        wobbleSpeed = 8,
        wobbleDist = 0.07,
        playerXSpeed = 7,
        jumpSpeed = 17,
        gravity = 30,
        controlCodes = { 37: 'left', 38: 'up', 39: 'right', 27: 'escape', 'jumpButton': 'up', 'leftArrow': 'left', 'rightArrow': 'right'},
        controls;


    function elt( name, className ){
        var elt = document.createElement( name );
        if( className ){
            elt.className = className;
        }
        return elt;
    }
    function trackKeys( codes ){
        var pressed = Object.create( null );
        var down;
        function handler( event ){
            if( event.keyCode ) {
                if (codes.hasOwnProperty( event.keyCode.toString() ) ) {
                    down = event.type == 'keydown';
                    pressed[ codes[ event.keyCode ] ] = down;
                    event.preventDefault();
                }
            }
            if( codes.hasOwnProperty( event.target.id ) ){
                console.log( event );
                down = event.type == 'touchstart';
                pressed[ codes[ event.target.id ] ] = down;
                event.preventDefault();
            }
        }
        pressed.subscribe = function(){
            addEventListener( 'keydown', handler );
            addEventListener( 'keyup', handler );
            addEventListener( 'touchstart', handler );
            addEventListener( 'touchend', handler );
        };
        pressed.unsubscribe = function(){
            removeEventListener( 'keydown', handler );
            removeEventListener( 'keyup', handler );
            removeEventListener( 'touchstart', handler );
            removeEventListener( 'touchend', handler );
        };
        return pressed;
    }
    function scaleLevel(){
        var game = document.getElementsByClassName('game')[ 0 ];
        var width = window.innerWidth;
        var height = parseInt( screen.height);
        var aspectRatio =  width / height;
        if( aspectRatio < targetAspectRatio ){
            scale = Math.floor( width / 30 );
        }
        else{
            scale = Math.floor( height / 23 );
        }
        game.style.width = Math.floor( scale * 20 * targetAspectRatio ) + 'px';
        game.style.height = ( scale * 20 ) + 'px';
    }

    function runAnimation( frameFunc ){
        var lastTime = null;
        function frame( time ){
            var stop = false;
            if( lastTime != null ){
                var timeStep = Math.min( time - lastTime, 100 ) / 1000;
                stop = frameFunc( timeStep ) === false;
            }
            lastTime = time;
            if( !stop ){
                requestAnimationFrame( frame );
            }
        }
        requestAnimationFrame( frame );
    }

    var simpleLevelPlan = [
        '                    ',
        '             =      ',
        ' x         o o    x ',
        ' x         o o    x ',
        ' x @      xxxxx   x ',
        ' xxxxx            x ',
        '     x            x ',
        '     x            x ',
        '     x            x ',
        '     x            x ',
        '     x!!!!!!!!!!!!x ',
        '     x!!!!!!!!!!!!x ',
        '     x!!!!!!!!!!!!x ',
        '     x!!!!!!!!!!!!x ',
        '     xxxxxxxxxxxxxx ',
        '                    '

    ];
    var GAME_LEVELS = [
        ["                                                                                ",
            "                                                                                ",
            "                                                                                ",
            "                                                                                ",
            "                                                                                ",
            "                                                                                ",
            "                                                                  xxx           ",
            "                                                   xx      xx    xx!xx          ",
            "                                    o o      xx                  x!!!x          ",
            "                                                                 xx!xx          ",
            "                                   xxxxx                          xvx           ",
            "                                                                            xx  ",
            "  xx                                      o o                                x  ",
            "  x                     o                                                    x  ",
            "  x                                      xxxxx                             o x  ",
            "  x          xxxx       o                                                    x  ",
            "  x  @       x  x                                                xxxxx       x  ",
            "  xxxxxxxxxxxx  xxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxxxx     xxxxxxx   xxxxxxxxx  ",
            "                              x   x                  x     x                    ",
            "                              x!!!x                  x!!!!!x                    ",
            "                              x!!!x                  x!!!!!x                    ",
            "                              xxxxx                  xxxxxxx                    ",
            "                                                                                ",
            "                                                                                "],
           ["                                      x!!x                        xxxxxxx                                    x!x  ",
            "                                      x!!x                     xxxx     xxxx                                 x!x  ",
            "                                      x!!xxxxxxxxxx           xx           xx                                x!x  ",
            "                                      xx!!!!!!!!!!xx         xx             xx                               x!x  ",
            "                                       xxxxxxxxxx!!x         x                                    o   o   o  x!x  ",
            "                                                xx!x         x     o   o                                    xx!x  ",
            "                                                 x!x         x                                xxxxxxxxxxxxxxx!!x  ",
            "                                                 xvx         x     x   x                     !!!!!!!!!!!!!!!!!xx  ",
            "                                                             xx  |   |   |  xx           xxxxxxxxxxxxxxxxxxxxxx   ",
            "                                                              xx!!!!!!!!!!!xx            v                        ",
            "                                                               xxxx!!!!!xxxx                                      ",
            "                                               x     x            xxxxxxx        xxx         xxx                  ",
            "                                               x     x                           x x         x x                  ",
            "                                               x     x                             x         x                    ",
            "                                               x     x                             xx        x                    ",
            "                                               xx    x                             x         x                    ",
            "                                               x     x      o  o     x   x         x         x                    ",
            "               xxxxxxx        xxx   xxx        x     x               x   x         x         x                    ",
            "              xx     xx         x   x          x     x     xxxxxx    x   x   xxxxxxxxx       x                    ",
            "             xx       xx        x o x          x    xx               x   x   x               x                    ",
            "     @       x         x        x   x          x     x               x   x   x               x                    ",
            "    xxx      x         x        x   x          x     x               x   xxxxx   xxxxxx      x                    ",
            "    x x      x         x       xx o xx         x     x               x     o     x x         x                    ",
            "!!!!x x!!!!!!x         x!!!!!!xx     xx!!!!!!!!xx    x!!!!!!!!!!     x     =     x x         x                    ",
            "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxx     x!!!!!!!xx!     xxxxxxxxxxxxx xx  o o  xx                    ",
            "!!!!x x!!!!!!x         x!!!!!x    o                 xx!!!!!!xx !                    xx     xx                     ",
            "!!!!x x!!!!!!x         x!!!!!x                     xx!!!!!!xx  !                     xxxxxxx                      ",
            "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxxxxxx!!!!!!xx   !                                                  ",
            "!!!!x x!!!!!!x         x!!!!!!xxxxxxxxx!!!!!!!!!!!!!!!!!!xx    !                                                  ",
            "!!!!x x!!!!!!x         x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xx     !                                                  "],
        ["                                                                                                              ",
            "                                                                                                              ",
            "                                                                                                              ",
            "                                                                                                              ",
            "                                                                                                              ",
            "                                        o                                                                     ",
            "                                                                                                              ",
            "                                        x                                                                     ",
            "                                        x                                                                     ",
            "                                        x                                                                     ",
            "                                        x                                                                     ",
            "                                       xxx                                                                    ",
            "                                       x x                 !!!        !!!  xxx                                ",
            "                                       x x                 !x!        !x!                                     ",
            "                                     xxx xxx                x          x                                      ",
            "                                      x   x                 x   oooo   x       xxx                            ",
            "                                      x   x                 x          x      x!!!x                           ",
            "                                      x   x                 xxxxxxxxxxxx       xxx                            ",
            "                                     xx   xx      x   x      x                                                ",
            "                                      x   xxxxxxxxx   xxxxxxxx              x x                               ",
            "                                      x   x           x                    x!!!x                              ",
            "                                      x   x           x                     xxx                               ",
            "                                     xx   xx          x                                                       ",
            "                                      x   x= = = =    x            xxx                                        ",
            "                                      x   x           x           x!!!x                                       ",
            "                                      x   x    = = = =x     o      xxx       xxx                              ",
            "                                     xx   xx          x                     x!!!x                             ",
            "                              o   o   x   x           x     x                xxv        xxx                   ",
            "                                      x   x           x              x                 x!!!x                  ",
            "                             xxx xxx xxx xxx     o o  x!!!!!!!!!!!!!!x                   vx                   ",
            "                             x xxx x x xxx x          x!!!!!!!!!!!!!!x                                        ",
            "                             x             x   xxxxxxxxxxxxxxxxxxxxxxx                                        ",
            "                             xx           xx                                         xxx                      ",
            "  xxx                         x     x     x                                         x!!!x                xxx  ",
            "  x x                         x    xxx    x                                          xxx                 x x  ",
            "  x                           x    xxx    xxxxxxx                        xxxxx                             x  ",
            "  x                           x           x                              x   x                             x  ",
            "  x                           xx          x                              x x x                             x  ",
            "  x                                       x       |xxxx|    |xxxx|     xxx xxx                             x  ",
            "  x                xxx             o o    x                              x         xxx                     x  ",
            "  x               xxxxx       xx          x                             xxx       x!!!x          x         x  ",
            "  x               oxxxo       x    xxx    x                             x x        xxx          xxx        x  ",
            "  x                xxx        xxxxxxxxxxxxx  x oo x    x oo x    x oo  xx xx                    xxx        x  ",
            "  x      @          x         x           x!!x    x!!!!x    x!!!!x    xx   xx                    x         x  ",
            "  xxxxxxxxxxxxxxxxxxxxxxxxxxxxx           xxxxxxxxxxxxxxxxxxxxxxxxxxxxx     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ",
            "                                                                                                              ",
            "                                                                                                              "],
        ["                                                                                                  xxx x       ",
            "                                                                                                      x       ",
            "                                                                                                  xxxxx       ",
            "                                                                                                  x           ",
            "                                                                                                  x xxx       ",
            "                          o                                                                       x x x       ",
            "                                                                                             o o oxxx x       ",
            "                   xxx                                                                                x       ",
            "       !  o  !                                                xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx       ",
            "       x     x                                                x   x x   x x   x x   x x   x x   x x           ",
            "       x= o  x            x                                   xxx x xxx x xxx x xxx x xxx x xxx x xxxxx       ",
            "       x     x                                                  x x   x x   x x   x x   x x   x x     x       ",
            "       !  o  !            o                                  xxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxxxx       ",
            "                                                                                                              ",
            "          o              xxx                              xx                                                  ",
            "                                                                                                              ",
            "                                                                                                              ",
            "                                                      xx                                                      ",
            "                   xxx         xxx                                                                            ",
            "                                                                                                              ",
            "                          o                                                     x      x                      ",
            "                                                          xx     xx                                           ",
            "             xxx         xxx         xxx                                 x                  x                 ",
            "                                                                                                              ",
            "                                                                 ||                                           ",
            "  xxxxxxxxxxx                                                                                                 ",
            "  x         x o xxxxxxxxx o xxxxxxxxx o xx                                                x                   ",
            "  x         x   x       x   x       x   x                 ||                  x     x                         ",
            "  x  @      xxxxx   o   xxxxx   o   xxxxx                                                                     ",
            "  xxxxxxx                                     xxxxx       xx     xx     xxx                                   ",
            "        x=                  =                =x   x                     xxx                                   ",
            "        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   x!!!!!!!!!!!!!!!!!!!!!xxx!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
            "                                                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "                                                                                                              "]
    ];

    var actorChars = {
        '@': Player,
        'o': Coin,
        '=': Lava,
        '|': Lava,
        'v': Lava
    };
    function Level( plan ){
        this.width = plan[ 0 ].length; // assumes that the whole grid is square.
        this.height = plan.length;
        this.grid = [];
        this.actors = [];
        var height, width, y, x, fieldType, line, Actor, gridLine, ch;
        for( y = 0, height = this.height; y < height; y += 1 ){
            line = plan[ y ];
            gridLine = [];
            for( x = 0, width = this.width; x < width; x += 1 ){
                ch = line[ x ];
                fieldType = null;
                Actor = actorChars[ ch ];
                if( Actor ){
                    this.actors.push( new Actor( new Vector( x, y ), ch ) );
                }
                else if( ch == 'x'){
                    fieldType = 'wall';
                }
                else if( ch == '!'){
                    fieldType = 'lava';
                }
                gridLine.push( fieldType );
            }
            this.grid.push( gridLine );
        }

        this.player = this.actors.filter( function( actor ){
            return actor.type == 'player';
        })[ 0 ];
        this.status = this.finishDelay = null;
    }
    Level.prototype.isFinished = function(){
        return this.status != null && this.finishDelay < 0;
    };
    Level.prototype.obstacleAt = function( pos, size ){
        var xStart = Math.floor( pos.x );
        var xEnd = Math.ceil( pos.x + size.x );
        var yStart = Math.floor( pos.y );
        var yEnd = Math.ceil( pos.y + size.y );

        if( xStart < 0 || xEnd > this.width || yStart < 0 ){
            return 'wall';
        }
        if( yEnd > this.height ){
            return 'lava'; // fall into lava if gone too far down?
        }
        for( var y = yStart; y < yEnd; y += 1 ){
            for( var x = xStart; x < xEnd; x += 1 ){
                var fieldType = this.grid[ y ][ x ];
                if( fieldType ) return fieldType;
            }
        }
    };
    Level.prototype.actorAt = function( actor ){
        var i, length;
        for( i = 0, length = this.actors.length;  i < length; i += 1 ){
            var other = this.actors[ i ];
            if( other != actor &&
                actor.pos.x + actor.size.x > other.pos.x &&
                actor.pos.x < other.pos.x + other.size.x &&
                actor.pos.y + actor.size.y > other.pos.y &&
                actor.pos.y < other.pos.y + other.size.y ){
                return other;
            }
        }
    };
    Level.prototype.animate = function( step, keys ){
        if( this.status != null ){
            this.finishDelay -= step;
        }
        while( step > 0 ){
            var thisStep = Math.min( step, maxStep );
            this.actors.forEach( function( actor ){
                actor.act( thisStep, this, keys );
            }, this );

            step -= thisStep;
        }
    };
    Level.prototype.playerTouched = function( type, actor ) {
        if( type == 'lava' && this.status == null ){
            this.status = 'lost';
            this.finishDelay = 1;
        }
        else if( type == 'coin' ){
            this.actors = this.actors.filter( function( other ){
                // using filter to remove element from actor array
                return other != actor;
            } );
            if( !this.actors.some( function( actor ){
                    return actor.type == 'coin';
                } ) ){
                this.status = 'won';
                this.finishDelay = 1;
            }
        }
    };

    function Player( pos ){
        this.pos = pos.plus( new Vector( 0, -0.5 ));
        this.size = new Vector( 0.8, 1.5 );
        this.speed = new Vector( 0, 0 );
    }
    Player.prototype.type = 'player';
    Player.prototype.moveX = function( step, level, keys ){
        this.speed.x = 0;
        var motion, newPos, obstacle;
        if( level.status != 'lost' ){
            if( keys.left ) this.speed.x -= playerXSpeed;
            if( keys.right ) this.speed.x += playerXSpeed;
        }
        motion = new Vector( this.speed.x * step, 0 );
        newPos = this.pos.plus( motion );
        obstacle = level.obstacleAt( newPos, this.size );
        if( obstacle ){
            level.playerTouched( obstacle );
        }
        else{
            this.pos = newPos;
        }
    };
    Player.prototype.moveY = function( step, level, keys ) {
        this.speed.y += step * gravity;
        var motion = new Vector( 0, this.speed.y * step );
        var newPos = this.pos.plus( motion );
        var obstacle = level.obstacleAt( newPos, this. size );
        if( obstacle ){
            level.playerTouched( obstacle );
            if( keys.up && this.speed.y > 0 && level.status != 'lost' ){
                this.speed.y = -jumpSpeed;
            }
            else{
                this.speed.y = 0;
            }
        }
        else{
            this.pos = newPos;
        }
    };
    Player.prototype.act = function( step, level, keys ) {
        this.moveX( step, level, keys );
        this.moveY( step, level, keys );

        var otherActor = level.actorAt( this );
        if( otherActor ){
            level.playerTouched( otherActor.type, otherActor );
        }
        // you lost, you loser!
        if( level.status == 'lost' ){
            this.pos.y += step;
            this.size.y -=step;
        }
    };

    function Vector( x, y ){
        this.x = x;
        this.y = y;
    }
    Vector.prototype.plus = function( other ){
        return new Vector( this.x + other.x, this.y + other.y );
    };
    Vector.prototype.times = function( factor ){
        return new Vector( this.x * factor, this.y * factor );
    };

    function Lava( pos, ch ){
        this.pos = pos;
        this.size = new Vector( 1, 1 );
        if( ch == '=' ){
            this.speed = new Vector( 3, 0 );
        }
        else if( ch == '|' ){
            this.speed = new Vector( 0, 2 );
        }
        else if( ch == 'v' ){
            this.speed = new Vector( 0, 2 );
            this.repeatPos = pos;
        }
    }
    Lava.prototype.type = 'lava';
    Lava.prototype.act = function( step, level ){
        var newPos = this.pos.plus( this.speed.times( step ) );
        if( !level.obstacleAt( newPos, this.size ) ){
            this.pos = newPos;
        }
        else if( this.repeatPos ){
            this.pos = this.repeatPos;
        }
        else{
            this.speed = this.speed.times( -1 );
        }
    };

    function Coin( pos ){
        this.basePos = this.pos = pos.plus( new Vector( 0.2, 0.1 ) );
        this.size = new Vector( 0.6, 0.6 );
        this.wobble = Math.random() * Math.PI * 2;
    }
    Coin.prototype.type = 'coin';
    Coin.prototype.act = function( step ){
        this.wobble += step * wobbleSpeed;
        var wobblePos = Math.sin( this.wobble ) * wobbleDist;
        this.pos = this.basePos.plus( new Vector( 0, wobblePos ) );
    };

    function DOMDisplay( parent, level ){
        this.wrap = parent.appendChild( elt( 'div', 'game' ) );
        scaleLevel();
        this.level = level;
        this.wrap.appendChild( this.drawBackground() );
        this.actorLayer = null;
        this.drawFrame();
    }
    DOMDisplay.prototype.drawBackground = function(){
        var table = elt( 'table', 'background' );
        table.style.width = this.level.width * scale + 'px';
        this.level.grid.forEach( function( row ){
            var rowElt = table.appendChild( elt( 'tr' ) );
            rowElt.style.height = scale + 'px';
            row.forEach( function( type ){
                rowElt.appendChild( elt( 'td', type ) );
            } );
        } );
        return table;
    };
    DOMDisplay.prototype.drawActors = function(){
        var wrap = elt('div');
        this.level.actors.forEach( function( actor ){
            var rect = wrap.appendChild( elt( 'div', 'actor ' + actor.type ) );
            rect.style.width = actor.size.x * scale + 'px';
            rect.style.height = actor.size.y * scale + 'px';
            rect.style.left = actor.pos.x * scale + 'px';
            rect.style.top = actor.pos.y * scale + 'px';
        } );
        return wrap;
    };
    DOMDisplay.prototype.drawFrame = function(){
        if( this.actorLayer ){
            this.wrap.removeChild( this.actorLayer );
        }
        this.actorLayer = this.wrap.appendChild( this.drawActors() );
        this.wrap.className = 'game ' + ( this.level.status || '' );
        this.scrollPlayerIntoView();
    };
    DOMDisplay.prototype.scrollPlayerIntoView = function(){
        var width = this.wrap.clientWidth;
        var height = this.wrap.clientHeight;
        var marginWidth = width / 3;
        var marginHeight = height / 3;
        var left = this.wrap.scrollLeft;
        var right = left + width;
        var top = this.wrap.scrollTop;
        var bottom = top + height;
        var player = this.level.player;
        var center = player.pos.plus( player.size.times( 0.5 ) ).times( scale );

        if( center.x < left + marginWidth ){
            this.wrap.scrollLeft = center.x - marginWidth;
        }
        else if( center.x > right - marginWidth ){
            this.wrap.scrollLeft = center.x + marginWidth - width;
        }
        if( center.y < top + marginHeight ){
            this.wrap.scrollTop = center.y - marginHeight;
        }
        else if( center.y > bottom - marginHeight ){
            this.wrap.scrollTop = center.y + marginHeight - height;
        }
    };
    DOMDisplay.prototype.clear = function(){
        this.wrap.parentNode.removeChild( this.wrap );
    };

    controls = trackKeys( controlCodes );

    function runLevel( level, Display, andThen ){
        var display = new Display( document.body, level );
        var paused = false;
        var pauseDelay = .5;
        var remainingPauseDelay = 0;
        controls.subscribe();
        runAnimation( function( step ){
            if( !paused ){
                level.animate( step, controls );
            }
            if( controls.escape ){
                if( remainingPauseDelay <= 0 ){
                    remainingPauseDelay = pauseDelay;
                    paused = !paused;
                }
            }
            remainingPauseDelay -= step;

            display.drawFrame( step );
            if( level.isFinished() ){
                display.clear();
                controls.unsubscribe();
                if( andThen ){
                    andThen( level.status );
                }
                return false;
            }
        } );
    }

    function runGame( plans, Display ){
        function startLevel( n ){
            runLevel( new Level( plans[ n ] ), Display, function( status ){
                if( status == 'lost' ){
                    startLevel( n );
                }
                else if( n < plans.length -1 ){
                    startLevel( n + 1 );
                }
                else{
                    alert('you Win, starting over again!');
                    startLevel( 0 );
                }
            } );
        }
        startLevel( 3 );
    }

    runGame( GAME_LEVELS , DOMDisplay );
}


var documentStartCheck = setInterval( function(){
    if( document.readyState === 'complete'){
        clearInterval(documentStartCheck);
        myApp();
    }
}, 100 );

