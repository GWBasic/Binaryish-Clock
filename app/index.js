import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as fs from "fs";
import * as util from "../common/utils";
import { today } from "user-activity";
import { user } from "user-profile";
import { display } from "display";
import * as messaging from "messaging";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let settings = loadSettings();

// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the <text> element
const lowerRightLabel = document.getElementById("lowerRight");
const upperLeftLabel = document.getElementById("upperLeft");

const TOTAL_SECONDS_IN_MINUTE = 60;
const TOTAL_SECONDS_IN_HOUR = 60 * 60;
const BINARY_SECONDS_RATIO = (60 * 60) / (64 * 64);

function getPowerObject(unit, power) {
  return {
    power: power,
    minuteElement: document.getElementById(`${unit}${power}`),
    onElement: document.getElementById(`${unit}${power}_On`),
    offElement: document.getElementById(`${unit}${power}_Off`),
  };
};

const hourBits = [
  getPowerObject("hour", 16),
  getPowerObject("hour", 8),
  getPowerObject("hour", 4),
  getPowerObject("hour", 2),
  getPowerObject("hour", 1)
];

const minuteBits = [
  getPowerObject("minute", 32),
  getPowerObject("minute", 16),
  getPowerObject("minute", 8),
  getPowerObject("minute", 4),
  getPowerObject("minute", 2),
  getPowerObject("minute", 1)
];

const secondBits = [
  getPowerObject("second", 32),
  getPowerObject("second", 16),
  getPowerObject("second", 8),
  getPowerObject("second", 4),
  getPowerObject("second", 2),
  getPowerObject("second", 1)
];

function updateBits(value, bits) {
  var remainingValue = value;
  
  bits.forEach(function(bit){
    if (remainingValue >= bit.power) {
      // On
      remainingValue -= bit.power;
      bit.onElement.style.visibility = "visible";
      bit.offElement.style.visibility = "hidden";
      
      // Use to force all bits on
      //bit.offElement.style.visibility = "visible";
    } else {
      // Off      
      bit.offElement.style.visibility = "visible";
      bit.onElement.style.visibility = "hidden";
      
      // Use to force all bits on
      //bit.onElement.style.visibility = "visible";
    }  
  });
}

clock.ontick = (evt) => {
  let date = evt.date;
  //console.log(`clock.ontick: ${date}`);
  
  render(date);
}

var scheduled = false;
function renderIfDisplayOn() {
  scheduled = false;
  if (display.on) {
    let date = new Date();
    //console.log(`renderIfDisplayOn: ${date}`);
    render(date);
  }
}

function render(date) {
  let hours24 = date.getHours();
  
  updateBits(hours24, hourBits);
  
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let milliseconds = date.getMilliseconds();
  
  let totalSecondsInHour = (minutes * TOTAL_SECONDS_IN_MINUTE) + seconds + (milliseconds / 1000);  
  
  let hourPercent = totalSecondsInHour / TOTAL_SECONDS_IN_HOUR;
  let binaryMinutes = hourPercent * 64;
  
  updateBits(binaryMinutes, minuteBits);
  
  let binaryMinutePercent = binaryMinutes - Math.floor(binaryMinutes);
  let binarySeconds = binaryMinutePercent * 64;
  
  updateBits(binarySeconds, secondBits);

  // update corners
  updateCorner(date, lowerRightLabel, settings.lowerRight)
  updateCorner(date, upperLeftLabel, settings.upperLeft)  
  
  if (!scheduled) {
    let binarySecondFraction = 1 - (binarySeconds - Math.floor(binarySeconds));
    let milisecondsToNextBinarySecond = 1000 * BINARY_SECONDS_RATIO * binarySecondFraction;
    //console.log(`binarySecondFraction: ${binarySecondFraction}, milisecondsToNextBinarySecond ${milisecondsToNextBinarySecond}`);
  
    setTimeout(function(){ renderIfDisplayOn(); }, milisecondsToNextBinarySecond + 50);
    scheduled = true;
  }
}

function updateCorner(date, label, setting) {
  if (setting == "time") {
    var hours24 = date.getHours();
    var hours;
    var amPm;
    if (preferences.clockDisplay === "12h") {
      // 12h format
      var pm = hours24 >= 12;
      hours = hours24 % 12 || 12;

      if (pm) {
        amPm = " PM";
      } else {
        amPm = " AM";
      }
    } else {
      // 24h format
      hours = util.zeroPad(hours24);
      amPm = "";
    }
    
    let minutesText = util.zeroPad(date.getMinutes());
    let secondsText = util.zeroPad(date.getSeconds());

    label.text = `${util.monoDigits(hours)}:${util.monoDigits(minutesText)}.${util.monoDigits(secondsText)}${amPm}`;

  } else if (setting == "date") {
    var dateString = date.toString();
    let yearString = date.getFullYear().toString();
    var indexOfYear = dateString.indexOf(yearString);

    dateString = dateString.substring(0, indexOfYear + yearString.length);
    label.text = dateString;
  } else {
    label.text = "";
  }
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = evt => {
  console.log(`Updated setting: ${evt.data.setting} = ${evt.data.value}`);
  
  settings[evt.data.setting] = evt.data.value;
  
  render(new Date());

  saveSettings();
}


function loadSettings() {
  try {
    var settings = fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
    console.log(`Loaded settings: ${JSON.stringify(settings)}`);
    return settings;
  } catch (ex) {
    // Defaults
    console.log(`Exception getting settings: ${ex}`);
    return {
      upperLeft:"date",
      lowerRight:"time"
    };
  }
}

function saveSettings() {
  console.log(`Saved settings: ${JSON.stringify(settings)}`);
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}
