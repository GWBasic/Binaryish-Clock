import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the <text> element
const hoursLabel = document.getElementById("hours");
const minutesLabel = document.getElementById("minutes");
const smallTimeLabel = document.getElementById("smallTime");

const TOTAL_SECONDS_IN_MINUTE = 60;
const TOTAL_SECONDS_IN_HOUR = 60 * 60;

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let minutesText = util.zeroPad(today.getMinutes());
  let secondsText = util.zeroPad(today.getSeconds());
  
  hoursLabel.text = `${hours}`;
  
  smallTimeLabel.text = `${hours}:${minutesText}.${secondsText}`;
  
  let totalSecondsInHour = (minutes * TOTAL_SECONDS_IN_MINUTE) + seconds;  
  minutesLabel.text = `${totalSecondsInHour}`;
  
  let hourPercent = totalSecondsInHour / TOTAL_SECONDS_IN_HOUR;
  let binaryMinutes = hourPercent * 64;
  minutesLabel.text = `${Math.round(binaryMinutes * 100) / 100}`;
  
  var binaryMinutesText = "";
  var remainingBinaryMinutes = binaryMinutes;
  
  [32, 16, 8, 4, 2].forEach(function(bit){
    if (remainingBinaryMinutes >= bit) {
      remainingBinaryMinutes -= bit;
      binaryMinutesText += "o"
    } else {
      binaryMinutesText += "_";
    }  
  });
  
  minutesLabel.text = `${binaryMinutesText}`;
}
