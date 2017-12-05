var kb = require("ble_hid_keyboard");
NRF.setServices(undefined, { hid : kb.report });

function btnPressed() {
  digitalWrite([LED1,LED2,LED3], 0); //reset all LEDs
  digitalWrite(LED2,1);
  var i = setTimeout(function()
    {
      kb.tap(kb.KEY.D, kb.MODIFY.CTRL);
      digitalWrite([LED1,LED2,LED3], 0); //turn off all LEDs
      digitalWrite(LED1,1);
    }, 5000);
}

// trigger btnPressed whenever the button is pressed
setWatch(btnPressed, BTN, {edge:"rising",repeat:true,debounce:50});
digitalWrite([LED1,LED2,LED3], 0);
