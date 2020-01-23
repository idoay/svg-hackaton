'use-strict'

var platform = navigator.platform;
var path_delimiter;
var browserToPVM;


function init () {
    initializer();
}


function initializer() {
    console.log('Initializer() ON');
   
    String.prototype.format = function (){
        var args = arguments;
        return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (curlyBrack, index) {
            return ((curlyBrack == "{{") ? "{" : ((curlyBrack == "}}") ? "}" : args[index]));
        });
    };

    if (platform.indexOf('Win') >= 0) { path_delimiter = "\\"; }
    else { path_delimiter = "\/"; } //Mac
 
    browserToPVM = function (valString) {
    return window.external.BrowserToPVM(valString);
    }
};

const clickCallback2 = function() {	
	const sendMouseDownEvent = {
        "action": "mousedown",
        "id": "knob",
        "clientX": event.clientX,
        "clientY": event.clientY
    }
         
    browserToPVM(JSON.stringify(sendMouseDownEvent));
}


var pointerEle = null;

window.onload = function () {

    //alert("onload");
    var jObj = { "action": "onloadFinished"};
    //browserToPVM(JSON.stringify(jObj));
    $("#baseknob").click(clickCallback2);
    //$("#Rounded_Rectangle_1_copy").click(pointerClicked); 
    pointerEle = document.getElementById("Rounded_Rectangle_1_copy");
    pointerEle.addEventListener("mousedown", onMouseDown);
}

function onMouseDown() {
  document.addEventListener("mouseup", onMouseUp);
  document.addEventListener("mousemove", onMouseMove);
}

var angle = 0;

function onMouseUp(ev) {
  document.removeEventListener("mousemove", onMouseMove);

  //alert("angle:" + angle + "x:" + r*Math.cos(angle) + "y:" + r*Math.sin(angle));
  var angle = getNewAngle(ev)
  var newCor = calculateOriginalCoordinates(angle);
  sendNewCordinatesToPvm(newCor.newX, newCor.newY);
}

function getNewAngle(ev)
{
	const mycircle = document.getElementById("thecir");
	var rect = mycircle.getBoundingClientRect();
	var centerX = (rect.left + rect.right) / 2 ;
	var centerY = (rect.top + rect.bottom) / 2;
	var angle = calculateAngleInDegres(centerX,centerY, ev.clientX, ev.clientY);
	return angle;
}

function calculateAngleInDegres(newCenterX, newCenterY, mouseUpOnPointerX, mouseUpOnPointerY)
{
	return 180*Math.atan((newCenterY - mouseUpOnPointerY)/(newCenterX - mouseUpOnPointerX))/Math.PI;
}

function calculateOriginalCoordinates(userAngle)
{
  var cx = document.getElementById("thecir").attributes["cx"].value;
  var cy = document.getElementById("thecir").attributes["cy"].value;
  var r = document.getElementById("thecir").attributes["r"].value;
  var newX = +cx + r*Math.cos(userAngle);
  var newY = +cy + r*Math.sin(userAngle);
  const newCor = {newX, newY};
  return newCor
}

function sendNewCordinatesToPvm(newX, newY)
{
	var sendMouseDownEvent = {
        "action": "mousedown",
        "id": "knob",
        "clientX": newX,
        "clientY": newY
    }
         
    browserToPVM(JSON.stringify(sendMouseDownEvent));
}

function simulateClick(x, y) {
	var ele = document.elementFromPoint(x, y);
    alert(ele);
    alert(JSON.stringify(ele));
    //jQuery(document.elementFromPoint(x, y)).click();
}

function onMouseMove(event) {
  var y = event.clientY;
  var x = event.clientX;
  var cx = document.getElementById("thecir").attributes["cx"].value;
  var cy = document.getElementById("thecir").attributes["cy"].value;
  var r = document.getElementById("thecir").attributes["r"].value;
  
  var knob = Snap("#baseknob");
  var pointerg = knob.select("#Rounded_Rectangle_1_copy");
  
  angle = 360*Math.atan((y - cy)/(x - cx))/Math.PI;
  var str = 'r{0},{1},{2}'.format(angle, cx, cy);
  pointerg.attr({transform: str });
}


var move = 0;

function pointerClicked() {
	
	var knob = Snap("#baseknob");
	var pointerg = knob.select("#Rounded_Rectangle_1_copy");
	move = (move + 45) % 360;
	var cx = document.getElementById("thecir").attributes["cx"].value;;
	var cy = document.getElementById("thecir").attributes["cy"].value;
	
	var str = 'r{0},{1},{2}'.format(move, cx, cy);
	pointerg.attr({transform: str });
	//https://codepen.io/enxaneta/pen/QdOprr
}

window.onunload = function () {
    if (ws != null) {
        ws.close();
    }
}

function PVMToBrowser(jsonObj) {
    console.log("PVMToBrowser::", jsonObj);
	alert("PVMToBrowser");
	
    if (jsonObj.hasOwnProperty("action")) {
        var actionsName = jsonObj.action;
		
		console.log("PVMToBrowser " + actionsName + "RESPONSE: ", jsonObj);
		
        if (actionsName === "getWebSocketConfigData") {
            //connect_to_server(jsonObj);
        }
      }
}

$(document).ready(function(){
    //alert("ready");
});
