// José Bezerra - 21/07/2018
// josebezerraneto@outlook.com


function Population() {
    this.rockets = [];
    this.maxPop = maxPop;
    for (var i = 0; i < this.maxPop; i++) {
        this.rockets[i] = new Rocket();
    }
    this.maxFitness = 0;
    this.generations = 0;
    this.inTarget = 0;
    this.averageFitness = 0;
}

Population.prototype.show = function () {
    for (var i = 0; i < this.rockets.length; i++) {
        this.rockets[i].update();
        this.rockets[i].show();
    }
}

Population.prototype.calcFitness = function () {
    var maxFit = 0;
    this.inTarget = 0;

    for (var i = 0; i < this.rockets.length; i++) {
        this.rockets[i].calDist();
        if (maxFit < this.rockets[i].fitness) {
            maxFit = this.rockets[i].fitness;
        }
        
        //check completed rockets
        if(this.rockets[i].completed){
            this.inTarget++;
        }
    }
    this.maxFitness = maxFit;
}

Population.prototype.acceptReject = function () {
    while (true) {
        var n = random(this.maxFitness);
        var randomElem = random(this.rockets);
        if (n < randomElem.fitness) {
            return randomElem;
        }
    }

}

Population.prototype.naturalSelection = function () {
    var newpop = [];
    for (var i = 0; i < this.maxPop; i++) {
        var a = this.acceptReject();
        var b = this.acceptReject();
        var child = a.crossover(b);
        newpop.push(child);
    }
    this.rockets = newpop;
    this.generations++;
}