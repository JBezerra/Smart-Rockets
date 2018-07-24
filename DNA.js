// José Bezerra - 21/07/2018
// josebezerraneto@outlook.com


function DNA() {
    this.genes = [];
    for (var i = 0; i < lifespan; i++) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(0.2);
    }
}

DNA.prototype.crossover = function (partner) {
    var child = new DNA();
    var mid = random(this.genes.length);
    for (var i = 0; i < this.genes.length; i++) {
        if (i > mid) {
            child.genes[i] = this.genes[i];
        }
        else {
            child.genes[i] = partner.genes[i];
        }
    }
    child.mutation();
    return child;
}

DNA.prototype.mutation = function () {
    for (var i = 0; i < this.genes.length; i++) {
        if (random(1) < mutRate) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(0.2);
        }
    }
}