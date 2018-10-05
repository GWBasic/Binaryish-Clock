import { settingsStorage } from "settings";
import * as messaging from "messaging";

const enumSettings = ["upperLeft", "upperRight", "lowerLeft", "lowerRight"];

// Uncomment to clear settings
/*
settingsStorage.removeItem("bitText");
settingsStorage.removeItem("upperLeft");
settingsStorage.removeItem("upperRight");
settingsStorage.removeItem("lowerLeft");
settingsStorage.removeItem("lowerRight");*/

setDefaultSetting("bitText", true);
setDefaultSetting("upperLeft", {"values":[{"name":"Date","value":"date"}],"selected":[0]});
setDefaultSetting("upperRight", {"values":[{"name":"(Empty)","value":null}],"selected":[6]});
setDefaultSetting("lowerLeft", {"values":[{"name":"(Empty)","value":null}],"selected":[6]});
setDefaultSetting("lowerRight", {"values":[{"name":"Time","value":"time"}],"selected":[1]});

function setDefaultSetting(key, value) {
  let extantValue = settingsStorage.getItem(key);
  if (extantValue == null) {
    console.log(`Set default value ${key}: ${JSON.stringify(value)}`);
    settingsStorage.setItem(key, JSON.stringify(value));
  } else {
    console.log(`Loaded ${key}: ${JSON.stringify(extantValue)}`);
  }
}

settingsStorage.onchange = function(evt) {
  
  console.log(`Updated setting: ${JSON.stringify(evt)}`);
  //console.log(`New Setting: ${evt.key}: ${evt.newValue}`);
  
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
