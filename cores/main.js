var gradients = [
  { start: [128,179,171], stop: [30,41,58] },
  { start: [255,207,160], stop: [234,92,68] },
  { start: [212,121,121], stop: [130,105,151] }
];

var transitionTime = 10;
var currentIndex = 0;
var nextIndex = 1;
var stepsCount = 0;
var stepsTotal = Math.round(transitionTime * 60);
var rgbSteps = {
  start: [0,0,0],
  stop: [0,0,0]
};
var rgbValues = {
  start: [0,0,0],
  stop: [0,0,0]
};
var color1, color2;

function setNext(num) {
  return (num + 1 < gradients.length) ? num + 1 : 0;
}

function calcStepSize(a,b) {
  return (a - b) / stepsTotal;
}

function calcSteps() {
  for (var key in rgbValues) {
    if (rgbValues.hasOwnProperty(key)) {
      for(var i = 0; i < 3; i++) {
        rgbValues[key][i] = gradients[currentIndex][key][i];
        rgbSteps[key][i] = calcStepSize(
          gradients[nextIndex][key][i], rgbValues[key][i]
        );
      }
    }
  }
}

function updateGradient(){
  for (var key in rgbValues) {
    if (rgbValues.hasOwnProperty(key)) {
      for(var i = 0; i < 3; i++) {
        rgbValues[key][i] += rgbSteps[key][i];
      }
    }
  }

  var tColor1 = 'rgb('+(rgbValues.start[0] | 0)+','+(rgbValues.start[1] | 0)+','+(rgbValues.start[2] | 0)+')';
  var tColor2 = 'rgb('+(rgbValues.stop[0] | 0)+','+(rgbValues.stop[1] | 0)+','+(rgbValues.stop[2] | 0)+')';

  if (tColor1 != color1 || tColor2 != color2) {

    color1 = tColor1;
    color2 = tColor2;
    
    document.documentElement.style.setProperty('--grad-1', color1);
    document.documentElement.style.setProperty('--grad-2', color2);
  }

  stepsCount++;

  if (stepsCount > stepsTotal) {
    stepsCount = 0;
    currentIndex = setNext(currentIndex);
    nextIndex = setNext(nextIndex);
    calcSteps();
  }

  window.requestAnimationFrame(updateGradient);
}

calcSteps();

window.requestAnimationFrame(updateGradient);