// José Bezerra - 21/07/2018
// josebezerraneto@outlook.com


var rockets;
var target;
var lifespan = 200;
var count = 0;
var maxPop = 50;
var mutRate = 0.01;

var lifespanP;
var genP;
var inTargetP;
var avgFitP;

let pressed, done = false;
var mxBegin, myBegin, mxEnd, myEnd;

function setup() {
    createCanvas(1000, 500);
    rockets = new Population();
    target = createVector(width / 2, 40);

    lifespanP = createP();
    genP = createP();
    inTargetP = createP();

    HTMLStuffs();
}

function draw() {
    background(0);
    rockets.show();
    if (count >= lifespan) {
        rockets.calcFitness();
        rockets.naturalSelection();
        rockets.maxPop = maxPop;

        count = 0;
    }

    fill(255);
    ellipse(target.x, target.y, 20, 20);
    count++;
    displayInfos();

    //draw obstacles
    if (pressed && !done) {
        fill(0, 0, 255, 180);
        stroke(255);
        rect(mxBegin, myBegin, mouseX - mxBegin, mouseY - myBegin);
    }
    if (!pressed && done) {
        done = false;
    }
    if (!pressed && !done) {
        fill(0, 0, 255);
        stroke(255);
        strokeWeight(2);
        rect(mxBegin, myBegin, mxEnd - mxBegin, myEnd - myBegin);
    }
}

// Started Interaction
function mousePressed() {
    mxEnd = 0;
    myEnd = 0;
    mxBegin = mouseX;
    myBegin = mouseY;
    pressed = true;
}

// Stopped Interaction
function mouseReleased() {
    mxEnd = mouseX;
    myEnd = mouseY;
    pressed = false;
    done = true;
}

function displayInfos() {
    lifespanP.html(count + "<br>");

    var textP = "";
    textP += "Rockets in Target: " + rockets.inTarget + "<br><br>";
    textP += "Generation: " + rockets.generations + "<br>";
    textP += "population size: " + maxPop + "<br>";
    textP += "Mutation rate: " + mutRate + "<br>";
    textP += "Lifespan: " + lifespan;

    genP.html(textP);
}

function HTMLStuffs() {
    createElement("h2", "Change Parameters")
    createP("here are some values you can play with")

    // Change Pop Size
    createElement("h3", "Change Population Size")

    popMinus = createButton("-");
    popPlus = createButton('+');
    popPlus.mousePressed(plusPopSize);
    popMinus.mousePressed(minusPopSize);

    // Change Mut Rate
    createElement("h3", "Change Mutation Rate")

    mutMinus = createButton("-");
    mutPlus = createButton('+');
    mutPlus.mousePressed(plusMutRate);
    mutMinus.mousePressed(minusMutRate);

    // Change Lifespan
    createElement("h3", "Change Lifespan")

    popMinus = createButton("-");
    popPlus = createButton('+');
    popPlus.mousePressed(plusLifespan);
    popMinus.mousePressed(minusLifespan);
}


function plusPopSize() {
    maxPop += 10;
}
function minusPopSize() {
    if (maxPop - 10 > 0) {
        maxPop -= 10;
    }
}

function plusMutRate() {
    mutRate += 0.01;
}
function minusMutRate() {
    mutRate -= 0.01;
}

function plusLifespan() {
    lifespan += 50;
}
function minusLifespan() {
    lifespan -= 50;
}


