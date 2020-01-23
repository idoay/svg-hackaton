(function(){
    'use strict';

    var $demo = $('#demo');
    var $handle = $('#handle');
    var fromAngle = Number($demo.attr('data-from')) || 0;
    var toAngle = Number($demo.attr('data-to')) || 360;

    /**
     * handle mouse events
     */
    $handle.on('mousedown', function(){

        var boxCenter=[$handle.offset().left + $handle.width()/2, $handle.offset().top + $handle.height()/2];
        boxCenter = [146, 176];

        $(document).on('mousemove', function(evt){

            var angle = Math.round(Math.atan2(evt.pageX - boxCenter[0], -(evt.pageY - boxCenter[1]) )*(180/Math.PI));

            //if(angle >= fromAngle && angle <= toAngle){

                var formattedAngle = 'rotate(' + angle + 'deg)';
                $handle.css({ 'transform': formattedAngle});
                $handle.css({ "-webkit-transform": formattedAngle });
                $handle.css({ '-moz-transform': formattedAngle });
            //}
        });

        $(document).on('mouseup', function(){
            $(document).off('mousemove');
        });
    });
})();