/**
 * Created by joshuabrown on 9/17/16.
 */
var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
    return dpr / bsr;
})();

var createHiDPICanvas = function(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
};

//Create canvas with the device resolution.

//Create canvas with a custom resolution.
var myCustomCanvas = createHiDPICanvas(500, 200, 4);

function trek(){
    var ctx = document.querySelector('canvas').getContext('2d');
    ctx.beginPath();
    ctx.moveTo( 10, 90 );
    ctx.quadraticCurveTo( 60, 10, 90, 90 );
    ctx.lineTo( 60, 10);
    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.stroke();
}

var results = [
    { name: 'Satisfied', count: 1043, color: 'lightblue' },
    { name: 'Neutral', count: 563, color: 'lightgreen' },
    { name: 'Unsatisfied', count: 510, color: 'pink' },
    { name: 'No Comment', count: 175, color: 'silver' }
];

function pie( inputs ){
    var canvas = createHiDPICanvas( 200, 200 );
    document.body.appendChild( canvas );
    var ctx = canvas.getContext('2d');
    var total = inputs.reduce( function( sum, choice ){
        console.log( typeof ( sum + choice.count ), choice.count );
        return sum + choice.count;
    }, 0 );

    var currentAngle = -.5 * Math.PI;
    results.forEach( function( result ){
        var sliceAngle = ( result.count / total ) * 2 * Math.PI;
        ctx.beginPath();
        ctx.arc( 100, 100, 100, currentAngle, currentAngle + sliceAngle );
        currentAngle += sliceAngle;
        ctx.lineTo( 100, 100 );
        ctx.fillStyle = result.color;
        ctx.fill();
    } );
}

function snail(){
    var canvas = document.createElement('canvas'),
        spriteW = 80, spriteH = 80,
        ctx = canvas.getContext('2d'),
        img = document.createElement('img');
    canvas.width = 80;
    canvas.height = 320;

    document.body.appendChild( canvas );

    img.src = 'media/images/JumpingSnail6.png';
    img.addEventListener('load', function(){
        var cycle = 0;
        var cycleArray = [ 0, 1, 2, 3, 2, 1 ];
        var jumpRight = 240;
        var jumpLeft = 160;
        var moveLeft = 80;
        var moveRight = 0;
        setInterval( function(){
            if( cycleArray[ cycle + 1 ] ){
                cycle++;
            }
            else{
                cycle = 0;
            }
            ctx.clearRect( 0, 0, spriteW, jumpRight + spriteH );
            ctx.drawImage( img,
                cycleArray[ cycle ] * spriteW, 0, spriteW, spriteH + jumpRight,
                0, 0, spriteW, jumpRight + spriteH );
        }, 250);
    } );

}

var documentStartCheck = setInterval( function(){
    if( document.readyState === 'complete'){
        clearInterval(documentStartCheck);
        snail();
    }
}, 100 );

