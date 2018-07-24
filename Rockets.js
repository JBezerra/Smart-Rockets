// José Bezerra - 21/07/2018
// josebezerraneto@outlook.com


function Rocket() {
    this.pos = createVector(width / 2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.dna = new DNA();
    this.fitness = 0;
    this.crashed = false;
    this.completed = false;
}

Rocket.prototype.crossover = function (partner) {
    var newDNA = this.dna.crossover(partner.dna);
    var child = new Rocket();
    child.dna = newDNA;
    return child;
}

Rocket.prototype.calDist = function () {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    var fitness = map(d, height, 0, 0, 1);
    if (this.completed) {
        fitness *= 10;
    }
    if (this.crashed) {
        fitness /= 10;
    }

    // make the fitness function exponencial
    fitness = pow(fitness,3);
    this.fitness = fitness;
}

//Graphic Implementations
Rocket.prototype.applyForce = function (force) {
    this.acc.add(force);
}

Rocket.prototype.update = function () {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < 10) {
        this.completed = true;
        this.pos = target.copy();
    }
    if (this.pos.x > width || this.pos.x < 0) {
        this.crashed = true;
    }
    if (this.pos.y > height || this.pos.y < 0) {
        this.crashed = true;
    }
    // Obstacle Logic
    if (mxBegin - mxEnd < 0){ //Negative number
        var temp = mxBegin;
        mxBegin = mxEnd;
        mxEnd = temp;
    }
    if (myBegin - myEnd < 0){ //Negative number
        var temp2 = myBegin;
        myBegin = myEnd;
        myEnd = temp2;
    }
    
    if( (this.pos.x > mxEnd && this.pos.x < mxBegin) && (this.pos.y > myEnd && this.pos.y < myBegin) ){
        this.crashed = true;
    }

    if (!this.crashed && !this.completed) {
        this.applyForce(this.dna.genes[count]);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.limit(4);
    }
}

Rocket.prototype.show = function () {
    if(this.completed){
        fill(0,255,0,210);
    }
    if(this.crashed){
        fill(255,0,0,210);
    }
    else if(!this.completed && !this.crashed){
        fill(255,255,255,210);
    }

    noStroke();

    // moviments
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5,0,20,20,0);
    pop();

}