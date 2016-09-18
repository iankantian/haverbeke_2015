/**
 * Created by joshuabrown on 9/17/16.
 */
// wow it's hard to move a slider!
function myApp(){
    var lastX;
    var rect = document.getElementById('bar');
    var newWidth = 0;
    var buttonPressed = function( event ){
        if( event.buttons == null ){
            return event.which != 0;
        }
        else{
            return event.buttons != 0;
        }
    };
    var moved = function( event ){
        if( !buttonPressed( event ) ){
            removeEventListener('mousemove', moved );
        }
        else{
            var dist = event.pageX - lastX;
            newWidth = Math.max( 10, rect.offsetWidth + dist );
            window.requestAnimationFrame( animateFunction );
            lastX = event.pageX;
        }
    };
    var rectMouseDown = function( event ){
        if( event.which === 1 || event.buttons === 1 ){
            lastX = event.pageX;
            addEventListener('mousemove', moved );
            event.preventDefault();
        }
    };
    var animateFunction = function(){
        rect.style.width = newWidth + 'px';
    };

    rect.addEventListener('mousedown', rectMouseDown );
}

var documentStartCheck = setInterval( function(){
    if( document.readyState === 'complete'){
        clearInterval(documentStartCheck);
        myApp();
    }
}, 100 );

