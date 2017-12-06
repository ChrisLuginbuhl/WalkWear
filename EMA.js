var kb = require("ble_hid_keyboard");
NRF.setServices(undefined, { hid : kb.report });
//var timeout_inactivity;
var tomatoCounter = 0;

setWatch(function(btnPressed){
    var isLong = (btnPressed.time - btnPressed.lastTime) > 0.4;
    print(isLong.toString());
    if (isLong) lightsOff();
    else startWork();
  }, BTN, {repeat:true, debounce:50, edge:"falling"});

function lightsOff(){
  console.log("Turn off everything");
  digitalWrite([LED1,LED2,LED3], 0);
  //setTimeout(function () { digitalWrite(D23,0); }, 1000);
}

function startWork(){
  console.log("Start work");
  tomatoCounter += 1;
  digitalWrite(LED1, 0);
  digitalWrite(LED2, 1); //Green LED
  setTimeout(function () {
    digitalWrite(LED1, 1); //Red LED
    digitalWrite(LED2, 0);
    kb.tap(kb.KEY.D, kb.MODIFY.CTRL);
  }, 5000);
}
