var magX = 1, magY = -1, magZ = 1;
var correctedX = 0, correctedY = 0, correctedZ = 0;

var sRoll=1; 
var sPitch=-1; 
var sYaw=1; 

var heading = 0;
var dip = 0;
var roll = 0;
var pitch = 0;
var yaw = 0;
//The following offsets are measured and calculated here: //https://docs.google.com/spreadsheets/d/1M0L_N8MFQ8PSXGs0zXdWhQW3ZVxIIyi9oo4iUECng74/edit#gid=0
var xOffset = -5114;
var yOffset = 4348;
var zOffset = -635;

//Read the magnetometer X,Y, and Z
var magMeasurement;
magMeasurement = Puck.mag();
magX = magMeasurement.x;
magY = magMeasurement.y;
magZ = magMeasurement.z;

correctedX = magX - xOffset;
correctedY = magY - yOffset;
correctedZ = magZ - zOffset;

//Assign the XYZ to roll pitch and yaw axis
roll = sRoll * correctedX; 
pitch = sPitch * correctedY; 
yaw = sYaw * correctedZ;

heading = 180/Math.PI * Math.atan2(pitch, roll) +90;
if(heading <0) heading+=360;
console.log("Heading= ", heading);

//dip=180/Math.PI * Math.atan(Math.sqrt(roll * roll + pitch * pitch), yaw);
//console.log("Dip= ", dip);