"use strict"
/*window.addEventListener('DOMContentLoaded', PiTest(), false);*/

function PiTest() {
  // Pi = 3.14 (approx)
  const r = 300; // radius value    
  
  const numDiv = document.getElementById("progress");
  const pointsDrew = document.getElementById('number1');
  const pointsInside = document.getElementById('number2');
  const PiValue = document.getElementById('PiResult');  
  
  function* Dots() {
    let coordinates = new Array();
    let j = 0;
    
    let valueSel = document.getElementById('valueList');
    let testNumber = valueSel.value;
    
    let ListOptions = function() {
      if (valueSel.selectedIndex === 0) {
        return;
      }
      return testNumber;
    };
        
    valueSel.addEventListener('change', ListOptions, false);
    
    for (let i = 1; i <= testNumber; i++) {
      /* Double using Math.round() because x nad y value for (x,y) must be calculated separately! */
      let x = Math.round(Math.random() * r);
      let y = Math.round(Math.random() * r);
      coordinates.push(x,y);
      let point = Math.round(Math.sqrt(x * x + y * y));      
      if (point <= r) {
          j++;
      }
      
      numDiv.innerText = (i / testNumber * 100).toFixed(0);
      pointsDrew.innerText = i;
      pointsInside.innerText = j;
      PiValue.innerText = (4 * (j/i)).toFixed(2);
                    
      yield coordinates;
    }
    return coordinates;
  }

  const dots = Dots();

  function draw() {
    /* Dimensions of canvas are in the HTML id */
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let coordinates = dots.next().value;
 
    // taking x and y from the array
    for (let i=0; i <= (coordinates.length / 2); i++) {
    let Y = r - coordinates[2*i+1]; // y axis direction change

    // dots as a 1px rectangle
    ctx.fillRect(coordinates[2*i], Y, 1, 1);
    }
    
    window.requestAnimationFrame(draw);
  }  
  
  draw();
}

let clicks = document.getElementById("testing");
if(clicks) {
  clicks.addEventListener('click', PiTest, false);
}