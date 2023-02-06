class FlowLine { 
  constructor(startX, startY, speed, hue) {
    this.holdMin = 30;      // minimal Time before switch direction
    this.holdMax = 90;      // minimal Time before switch direction
    this.startX = startX;   // 1: Startpoint X to trigger (Mouse or ML)
    this.startY = startY;   // 2: Startpoint Y to trigger (Mouse or ML)
    this.flPointsAll = [];  // Array for all points in Flowline
    this.flPoint = {x: this.startX, y: this.startY}; // Object with x and y position
    this.flSpeed = speed;   // 3: positiv to the right, negativ to the left
    this.straightDir = true; // Direction true if horizontal; default for all
    this.flWhere = 'horiz';   // Direction true if horizontal; default for array
    this.hue = hue;         // 4: Hue value for Line
    this.satValue = 100;    // set saturation value
    this.briValue = 100;    // set brightness value
    this.transp = 100;      // default transparency, reduce by end of life
    this.flCounter = 0;     // counter to trigger behavior, instead of frameCount
  }
  show() { // draw FlowLine
    noFill();
    stroke(this.hue, this.satValue, this.briValue, this.transp)
    strokeWeight(flowWeight) // variable before setup
    // FIXME: Glaub das muss ich umbauen
    beginShape();
    vertex(this.startX, this.startY) // set first/trigger point
    this.flPointsAll.forEach(point => vertex(point.x, point.y)) // loop trough array with points
    endShape();
  }
  behavior() { // Set flow behavior and then add points
    
    this.holdDir = int(random(this.holdMin, this.holdMax)) // hold direction time
    this.switchDir = ['horiz', 'up', 'down'] // possible directions
    this.counter = this.flCounter % this.holdDir // counter for switch direction
    this.flCounter += 1 // increase counter
    
    // Flow Horizontal, up or down
    if (this.counter == this.holdDir-1 && this.straightDir == true) {
      this.flWhere = this.switchDir[int(random(1, 3))] // choose between up or down
      this.straightDir = false
    } else if (this.counter == this.holdDir-1 && this.straightDir == false) {
      this.flWhere = this.switchDir[0] // stay horizontal
      this.straightDir = true
    } else {
      this.switchDir[0] // default behavior for safety 
    }

    // FIXME: Glaub das muss ich umbauen
    if (this.counter == 0) { // everytime the counter restarts...
      this.flPointsAll.push(this.flPoint); // ...ad new points to array
    }
  }
  // --> old methode for addpoints, moved to "behavior" for the counter
  // addPoint(x, y) { // Push vertex X and Y in Array
  // }
  move() { // move Points, speed can by positiv (to right) or negativ (to left)
    if (this.flWhere == 'horiz') {
      this.flPoint.x  += this.flSpeed
    } else if (this.flWhere == 'up') {
      this.flPoint.x  += this.flSpeed
      this.flPoint.y  -= this.flSpeed
    } else if (this.flWhere == 'down') {
      this.flPoint.x  += this.flSpeed
      this.flPoint.y  += this.flSpeed
    }
  }
  remove() {
    if (this.flPoint.x<0||this.flPoint.x>width || this.flPoint.y<0||this.flPoint.y>height){
      this.transp -= flowRemoveSpeed // reduce transparency if points reach borders
    }
    if (this.transp < 0) {
      // remove Array HIER NOCH EINBAUEN
    }
  }
}
// END of class "FlowLine", here for checking properties
// class FlowLine {
//   constructor(startX, startY, speed, hue) {

// --- variables for finetuning on stage
let flowSpeed;            // speed for FlowLine, can be pos or neg, change in mouse pressed
let flowWeight = 2;       // stroke thickness
let flowRemoveSpeed = 1;  // how fast the lines disapear when reaching borders
let hueValue;             // hue value in "draw" for random set

const colorfulls = [
  "5",    //#d53829
  "15",   //#ff541b
  "42",   //#e6ae2e
  "89",   //#80a25c
  "161",  //#009f6c
  "219",  //#387eff
  "258",  //#4e22b6
  "326",  //#ff2ea5
];
const colorAchro = [
  "198",  //#e7eef1
  "48"    //#1b1a16
];

const flowLines = []      // array for flowLines 

// --- Version with start of FlowLine by mouse click
function mousePressed() { // 
  if (Math.random() < 0.5) { // random switch right or left side
    flowSpeed = -1; // change here for adjusting speed
  } else {
    flowSpeed = 1;  // change here for adjusting speed, same value as above!
  }
  console.log(flowSpeed)
  
  // push class FlowLine in array
  flowLines.push(new FlowLine(mouseX, mouseY, flowSpeed, hueValue)) 
}

function setup() {
  colorMode(HSB, 360, 100, 100, 100); // set colormode to HSB
  createCanvas(windowWidth, 600);     // change on stage
}

function draw() {
  background(198, 4, 95, 100);      // Background color
  // Color Random or from array (comment out)
  hueValue = random(280, 360)         // Random color for Flowline

  const pick = (d) => d[floor(random() * d.length)];
  hueValue = pick(colorfulls)



  for (let flowLine of flowLines) {
    flowLine.behavior()
    flowLine.show()
    flowLine.move()
    flowLine.remove()
  }
}


// TODO:
// -- Vertex macht pro wechsel einen neuen Punkt! PRIO 1 / Schwierigste?
// - Linie verblasst vom Start her (Schweif-Effekt)
// - Ausgelöst durch ML Skeleton Trigger. Kann ich glaub kopieren von altem Projekt
// - ML Skeleton erkennt Richtung. Kann ich glaub kopieren von altem Projekt
