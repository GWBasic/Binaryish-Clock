import { settingsStorage } from "settings";
import * as messaging from "messaging";

settingsStorage.onchange = function(evt) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    let data = JSON.parse(evt.newValue);
    console.log(`New Setting: ${evt.key}: ${data["values"][0].value}`);
    
    var message = {
      setting: evt.key,
      value: data["values"][0].value
    };
    
    messaging.peerSocket.send(message);
  }
}