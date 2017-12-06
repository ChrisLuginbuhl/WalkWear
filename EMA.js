var kb = require("ble_hid_keyboard");
NRF.setServices(undefined, { hid : kb.report });

const WORK_DURATION = 5000; //20mins
const REST_DURATION = 5000;
const START_WORK_ALERT_DURATION = 8000; //1 min

//const WORK_DURATION = 60*1000*20; //20mins
//const REST_DURATION = 60 * 1000 * 5; //5min
//const START_WORK_ALERT_DURATION = 60 * 1000 * 1; //1 min


var tomatoCounter = 0;
var a = 1;
var blink;
var work;

setWatch(function(btnPressed){
    var isLong = (btnPressed.time - btnPressed.lastTime) > 0.4;
    print(isLong.toString());
    if (isLong) lightsOff();
    else startWork();
  }, BTN, {repeat:true, debounce:50, edge:"falling"});

function lightsOff(){
  console.log("Turn off everything");
  digitalWrite([LED1,LED2,LED3], 0);
  clearInterval(work);
  blink = undefined;
}

function startBreak() {
    console.log("Start break");
    digitalWrite(LED1, 1); //Red LED
    digitalWrite(LED2, 0);
    kb.tap(kb.KEY.D, kb.MODIFY.CTRL);
    setTimeout(startWorkAlert, REST_DURATION);
}

function startWorkAlert() {
  console.log("Start work alert");
  LED1.write(0);
  blink = setInterval("digitalWrite(LED2, a=!a)", 333);
  var stopBlink = setTimeout(function () {
    clearInterval(blink);
    blink = undefined;
    digitalWrite([LED1,LED2,LED3], 0);  
    console.log("Start work alert timed out - shutting off");
  }, START_WORK_ALERT_DURATION);
  clearTimeout(stopBlink);
}

function startWork(){
  console.log("Start work");
  tomatoCounter += 1;
  console.log(blink);
  if (blink !== undefined) clearInterval(blink);
  digitalWrite(LED1, 0);
  digitalWrite(LED2, 1); //Green LED
  rest = setTimeout(startBreak, WORK_DURATION); 
}