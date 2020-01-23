(function(){
    'use strict';

    var $demo = $('#demo');
    var $handle = $('#handle');
    var fromAngle = Number($demo.attr('data-from')) || 0;
    var toAngle = Number($demo.attr('data-to')) || 360;
    var $svg = $('#svg');

    var boxCenterX = 146; // * $svg.width() / 293;
    var boxCenterY = 176; // * $svg.height() /331;

    /**
     * set gauge angle
     * @param {number} angle in degrees
     */
    var setAngle = function(angle){

        var formattedAngle = 'rotate(' + angle + 'deg)';
        $handle.css({ 'transform': formattedAngle});
        $handle.css({ "-webkit-transform": formattedAngle });
        $handle.css({ '-moz-transform': formattedAngle });

        var origin = boxCenterX + 'px ' + boxCenterY + 'px';
        $handle.css({ '-webkit-transform-origin': origin });
        $handle.css({ '-ms-transform-origin': origin });
        $handle.css({ 'transform-origin': origin });
    };

    /**
     * entry point
     */
    $(document).ready(function() {

        // set initial from angle
        setAngle(fromAngle);

        /**
         * handle mouse events
         */
        $handle.on('mousedown', function(){

            var boxCenter=[$handle.offset().left + $handle.width()/2, $handle.offset().top + $handle.height()/2];
            boxCenter = [boxCenterX, boxCenterY];

            $(document).on('mousemove', function(evt){

                var angle = Math.round(Math.atan2(evt.pageX - boxCenter[0], -(evt.pageY - boxCenter[1]) )*(180/Math.PI));

                if(angle >= fromAngle && angle <= toAngle){
                    setAngle(angle);
                }
            });

            $(document).on('mouseup', function(){

                $(document).off('mousemove');
            });
        });
    });

})();