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
        var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

        var valley = new LifelikeWorld(
            ["############################",
                "#####                 ######",
                "##   ***                **##",
                "#   *##**         **  O  *##",
                "#    ***     O    ##**    *#",
                "#       O         ##***    #",
                "#                 ##**     #",
                "#   O       #*             #",
                "#*          #**       O    #",
                "#***        ##**    O    **#",
                "##****     ###***       *###",
                "############################"],
            {"#": Wall,
                "O": PlantEater,
                "*": Plant}
        );


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
    }

    let document_ready = setInterval(function () {
        if ( document.readyState === 'complete' ) {
            clearInterval( document_ready );
            begin();
        }
    }, 10);
})();







