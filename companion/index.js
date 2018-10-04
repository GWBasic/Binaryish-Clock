import { settingsStorage } from "settings";
import * as messaging from "messaging";

const enumSettings = ["upperLeft", "upperRight", "lowerLeft", "lowerRight"];

settingsStorage.onchange = function(evt) {
  
  console.log(`Updated setting: ${JSON.stringify(evt)}`);
  
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    
    //if (evt.key === "upperLeft" || evt.key === "lowerRight") {
    if (enumSettings.includes(evt.key)) {
      let data = JSON.parse(evt.newValue);
      console.log(`New Setting: ${evt.key}: ${data["values"][0].value}`);

      var message = {
        setting: evt.key,
        value: data["values"][0].value
      };

      messaging.peerSocket.send(message);
    } else if (evt.key == "bitText") {
      console.log(`New Setting: ${evt.key}: ${evt.newValue}`);
      
      var message = {
        setting: evt.key,
        value: evt.newValue == "true"
      };

      messaging.peerSocket.send(message);
    }
  }
}