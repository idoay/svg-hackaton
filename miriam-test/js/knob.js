(function(){
    'use strict';

    var $demo = $('#demo');
    var $handle = $('#handle');

    var fromAngle = Number($demo.attr('data-from')) || 0;
    var toAngle = Number($demo.attr('data-to')) || 360;

    var $svg = $('#svg');
    var svgWidth = Number($svg.attr('width')) || 0;
    var svgHeight = Number($svg.attr('height')) || 0;
    var svgLeft = $svg.offset().left;
    var svgTop = $svg.offset().top;

    var boxCenterX = 146;
    var boxCenterY = 176;
    var initialWidth = 293;
    var initialHeight = 331;

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

            $(document).on('mousemove', function(evt){

                var centerX = svgWidth * boxCenterX / initialWidth + svgLeft;
                var centerY = svgHeight * boxCenterY / initialHeight + svgTop;

                var angle = Math.round(Math.atan2(evt.pageX - centerX, -(evt.pageY - centerY) )*(180/Math.PI));

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