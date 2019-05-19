'use strict'
/*window.addEventListener("DOMContentLoaded", PiTest);*/

function PiTest() {
  const canvas = document.querySelector('#myCanvas');
  const a = canvas.width; // square edge value
  const r = canvas.width/2; // circle radius value
  
/* Getting table cell names for the variables */  
  const numDiv = document.querySelector('#progress');
  const redPoints = document.querySelector('#number1');
  const redPointsPercent = document.querySelector('#number2');
  const PiValue = document.querySelector('#PiResult');
  
/*** Calculating dots position for canvas (numerical part of the test) ***/
  let coordinates = [];
  
  function* Dots() {
    let j = 0;
    
    /* Choosing sample size for test */
    let valueSelected= document.querySelector('#valueList');

    function selectedValues() {
      let listValue = valueSelected.value;
      let testNumber = parseInt(listValue);

      return testNumber;       
    }

    let putNumber = selectedValues();

    valueSelected.addEventListener('change', selectedValues);
    
    for (let i = 1; i <= putNumber; i++) {
      /* Double using Math.round() because x nad y values for point (x,y) must be calculate independent!! */
      let x = Math.round((Math.random()) * a);
      let y = Math.round((Math.random()) * a);
      
      let equation = Math.pow(x-r, 2) + Math.pow(y-r, 2);
      let point = Math.round(Math.sqrt(equation));
      
      coordinates.push(x,y);
      
/* Checking if point is inside the circle (including circle edge) */
            
      if (point <= r) {
          j++;
      }
      
      numDiv.textContent = (i / putNumber * 100).toFixed(0);
      redPoints.textContent = j;
      redPointsPercent.textContent = (j / putNumber * 100).toFixed(1);
      PiValue.textContent = (4 * (j/i)).toFixed(2);
                    
      yield coordinates;
    }
    return coordinates;
  }

  const dots = Dots();

/*** Drawing point into the canvas (graphical parts of the test) ***/

  function draw() {
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let xy = dots.next().value;
 
    // taking x and y from the array
    for (let i=0; i < (coordinates.length / 2); i++) {
    let X = coordinates[2*i];
    let Y = coordinates[2*i+1];
      
/* (0,0) point is moving to the center of canvas */
    let equation2 = Math.pow(X-r, 2) + Math.pow(Y-r, 2);      
    let points = Math.round(Math.sqrt(equation2));
      
 /* Make a right color for the points */
    if (points <= r) {
      ctx.fillStyle = 'red';
    }
    else {
      ctx.fillStyle = 'black';
    }    

/* dots defined as 1x1 pixels rectangles */
      ctx.fillRect(X, Y, 1, 1);
    }
    
    window.requestAnimationFrame(draw);
  }  
  
  draw();
}

let btn = document.querySelector('#testing');
btn.addEventListener('click', PiTest);

/** User can show/hide theoretical description of "Pi test". This saves a lot of document space - it is especially important for mobile devices **/

let showHideButton = document.querySelector('#savespace');

function ShowHideText(showHideButton) {
  let hiddenText = document.querySelector('.description');
  
  if (hiddenText.style.display === 'none') {
    hiddenText.style.display = 'block';
  } else {
    hiddenText.style.display = 'none';
  }
}

showHideButton.addEventListener('click', ShowHideText);