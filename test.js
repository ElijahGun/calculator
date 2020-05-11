class Truck {
    constructor(make,model,year) {
        this.make = make
        this.model = model
        this.year = year
    }

    horn() {
        console.log(`${sound} ${this.make}`);
        
    }

    changeTruck(trucks) {
        this.make = trucks
    }

    profile() {
        console.log(`this is a ${this.year} ${this.make} ${this.model} truck`);
        
    }
}

var sound = 'beep!'

const ranger = new Truck('Ford','Ranger', 1994);
const dakota = new Truck('dodge', 'dakota', 2011);


ranger.horn()
dakota.horn();

console.log(dakota.year);

ranger.profile();

