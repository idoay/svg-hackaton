String.prototype.format = function() {
  a = this;
  for (k in arguments) {
    a = a.replace("{" + k + "}", arguments[k])
  }
  return a
}

var s = Snap("#baseknob"); 

Snap.load("baseknob.svg", onSVGLoaded );
								   
function onSVGLoaded( data )
{
	s.append( data );
	//s.transform("r0, 0 , 0");
	s.click(clickCallback);
}

var move = 0;

var clickCallback = function(event) {

	//s.transform('');
	//move = (move + 90) % 360;
	//var str = 'r{0},0,0'.format(move);
	//this.attr({transform: str });
};
