class FlowLine {
  constructor(startX, startY, speed, hue) {
    this.holdMin = 70;
    this.holdMax = 90;
    this.startX = startX;
    this.startY = startY;
    this.flPointsAll = [];
    this.flPoint = {x: this.startX, y: this.startY};
    this.flSpeed = speed; // positiv to the right, negativ to the left
    this.straightDir = true;
    this.flWhere = 'horiz';
    this.hue = hue;
    this.transp = 100;
    this.flCounter = 0;
  }
  show() { // draw FlowLine
    noFill();
    stroke(this.hue, 100, 100, this.transp)
    strokeWeight(flowWeight)
    beginShape();
    vertex(this.startX, this.startY)
    this.flPointsAll.forEach(point => vertex(this.flPoint.x, this.flPoint.y))
    endShape();
    // console.log(this.flPoint)
  }
  addPoint(x, y) { // Push vertex X and Y in Array
    this.flPointsAll.push(this.flPoint);
  }
  behavior() { // Set flow behavior

    this.holdDir = int(random(this.holdMin, this.holdMax))
    this.switchDir = ['horiz', 'up', 'down']
    this.counter = this.flCounter % this.holdDir
    this.flCounter += 1

    // Flow Horizontal, up or down
    if (this.counter == this.holdDir-1 && this.straightDir == true) {
      this.flWhere = this.switchDir[int(random(1, 3))]
      this.straightDir = false
    } else if (this.counter == this.holdDir-1 && this.straightDir == false) {
      this.flWhere = this.switchDir[0]
      this.straightDir = true
    } else {
      this.switchDir[0]
    }
  }
  move() { // move Points
    if (this.flWhere == 'horiz') {
      this.flPoint.x  = this.flPoint.x + this.flSpeed
    } else if (this.flWhere == 'up') {
      this.flPoint.x  = this.flPoint.x + this.flSpeed
      this.flPoint.y  = this.flPoint.y - this.flSpeed
    } else if (this.flWhere == 'down') {
      this.flPoint.x  = this.flPoint.x + this.flSpeed
      this.flPoint.y  = this.flPoint.y + this.flSpeed
    }
  }
  remove() {
    if (this.flPoint.x<0||this.flPoint.x>width || this.flPoint.y<0||this.flPoint.y>height){
      this.transp -= flowRemoveSpeed
    }
    if (this.transp < 0) {
      // remove from Array HIER NOCH EINBAUEN
    }
  }
}
// ENDE der Klasse FlowLine
// class FlowLine {
//   constructor(startX, startY, speed, hue) {

let flowSpeed;
let flowWeight = 2;
let flowRemoveSpeed = 1;
let hueValue;


console.log(flowSpeed)

const flowLines = []
function mousePressed() {
  if (Math.random() < 0.5) {
    flowSpeed = -2;
  } else {
    flowSpeed = 2;
  }
  console.log(flowSpeed)
  flowLines.push(new FlowLine(mouseX, mouseY, flowSpeed, hueValue))
}

function setup() {
  colorMode(HSB, 360, 100, 100, 100);
  createCanvas(windowWidth, 600);
  // push()
  // noFill()
  // stroke(0)
  // strokeWeight(1)
  // rect(0, 0, width, height)
  // pop()
}

function draw() {
  background(180, 20, 100, 100);
  hueValue = random(280, 360)

  for (let flowLine of flowLines) {
    flowLine.addPoint()
    flowLine.show()
    flowLine.behavior()
    flowLine.move()
    flowLine.remove()
  }
}


// NOCH LÖSEN:
// - Vertex macht pro wechsel einen neuen Punkt
// - Linie verblasst vom Start her (Schweif-Effekt)
// - Ausgelöst durch ML Skeleton Trigger
// - ML Skeleton erkennt Richtung
