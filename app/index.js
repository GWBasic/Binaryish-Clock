import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { today } from "user-activity";
import { user } from "user-profile";

// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the <text> element
const hoursLabel = document.getElementById("hours");
const smallTimeLabel = document.getElementById("smallTime");
const smallDateLabel = document.getElementById("smallDate");
const smallStepsLabel = document.getElementById("smallSteps");
const smallRestingHeartRateLabel = document.getElementById("smallRestingHeartRate");
const smallFloorsLabel = document.getElementById("smallFloors");
const smallCaloriesLabel = document.getElementById("smallCalories");

var stepsStringPattern = smallStepsLabel.text;
var restingHeartRateStringPattern = smallRestingHeartRateLabel.text;
var floorsStringPattern = smallFloorsLabel.text;
var caloriesStringPattern = smallCaloriesLabel.text;

const TOTAL_SECONDS_IN_MINUTE = 60;
const TOTAL_SECONDS_IN_HOUR = 60 * 60;

const bits = [
  {
    power: 32,
    minuteGroup: document.getElementById("minute32")
  },
  {
    power: 16,
    minuteGroup: document.getElementById("minute16")
  },
  {
    power: 8,
    minuteGroup: document.getElementById("minute8")
  },
  {
    power: 4,
    minuteGroup: document.getElementById("minute4")
  },
  {
    power: 2,
    minuteGroup: document.getElementById("minute2")
  },
  {
    power: 1,
    minuteGroup: document.getElementById("minute1")
  },
];

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let date = evt.date;
  let hours = date.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let minutesText = util.zeroPad(date.getMinutes());
  let secondsText = util.zeroPad(date.getSeconds());
  
  hoursLabel.text = `${hours}`;
  
  let totalSecondsInHour = (minutes * TOTAL_SECONDS_IN_MINUTE) + seconds;  
  
  let hourPercent = totalSecondsInHour / TOTAL_SECONDS_IN_HOUR;
  let binaryMinutes = hourPercent * 64;
  
  var remainingBinaryMinutes = binaryMinutes;
  
  bits.forEach(function(bit){
    if (remainingBinaryMinutes >= bit.power) {
      remainingBinaryMinutes -= bit.power;
      bit.minuteGroup.style.visibility = "visible";
    } else {
      bit.minuteGroup.style.visibility = "hidden";
    }  
  });

  var dateString = date.toString();
  let yearString = date.getFullYear().toString();
  var indexOfYear = dateString.indexOf(yearString);
  dateString = dateString.substring(0, indexOfYear + yearString.length);
  
  var steps = today.local.steps || 0;
  smallStepsLabel.text = stepsStringPattern.replace("##", steps);
  
  var bpm = user.restingHeartRate || "?";
  smallRestingHeartRateLabel.text = restingHeartRateStringPattern.replace("##", bpm);
  
  var floors = today.local.elevationGain || 0;
  smallFloorsLabel.text = floorsStringPattern.replace("##", floors);

  var calories = today.local.calories || 0;
  smallCaloriesLabel.text = caloriesStringPattern.replace("##", calories);
  
  smallDateLabel.text = dateString;
  smallTimeLabel.text = `${monoDigits(hours)}:${monoDigits(minutesText)}.${monoDigits(secondsText)}`;
}

// Convert a number to a special monospace number
function monoDigits(num, pad = true) {
  let monoNum = '';
  if (typeof num === 'number') {
    num |= 0;
    if (pad && num < 10) {
      monoNum = c0 + monoDigit(num);
    } else {
      while (num > 0) {
        monoNum = monoDigit(num % 10) + monoNum;
        num = (num / 10) | 0;
      }
    }
  } else {
    let text = num.toString();
    let textLen = text.length;
    for (let i = 0; i < textLen; i++) {
      monoNum += monoDigit(text.charAt(i));
    }
  }
  return monoNum;
}

const c0 = String.fromCharCode(0x10);
const c1 = String.fromCharCode(0x11);
const c2 = String.fromCharCode(0x12);
const c3 = String.fromCharCode(0x13);
const c4 = String.fromCharCode(0x14);
const c5 = String.fromCharCode(0x15);
const c6 = String.fromCharCode(0x16);
const c7 = String.fromCharCode(0x17);
const c8 = String.fromCharCode(0x18);
const c9 = String.fromCharCode(0x19);

function monoDigit(digit) {
  switch (digit) {
    case 0: return c0;
    case 1: return c1;
    case 2: return c2;
    case 3: return c3;
    case 4: return c4;
    case 5: return c5;
    case 6: return c6;
    case 7: return c7;
    case 8: return c8;
    case 9: return c9;
    case '0': return c0;
    case '1': return c1;
    case '2': return c2;
    case '3': return c3;
    case '4': return c4;
    case '5': return c5;
    case '6': return c6;
    case '7': return c7;
    case '8': return c8;
    case '9': return c9;
    default: return digit;
  }
}
