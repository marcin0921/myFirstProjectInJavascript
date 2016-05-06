/**
 * Created by Marcin on 2016-05-06.
 */


var fiat = {
    made: "Fiat",
    mark: "Punto",
    milleage: 15000,
    cabrio: false,
    fuel: 0,
    started: false,

    start: function () {
        if (!this.started) {
            this.started = true;
            console.log("Silnik odpalony!");
        }
        else
            console.log ("Silnik jest już włączony!");
    },

    stop: function () {
        if (this.started) {
            this.started = false;
            console.log("Silnik zgaszony!");
        }
    },

    drive: function () {
        if (this.started == true) {
            if (this.fuel > 0) {
                this.fuel = this.fuel - 1;
                console.log("Brum Brum Brum...");
            }
            else {
                console.log("Brak paliwa! Nie pojedziemy. Silnik gaśnie");
                this.stop();
            }
        }
        else
            console.log("Najpierw zapal silnik!");
    },

    refuel: function (amount) {
        this.fuel = this.fuel + amount;
        console.log("Zatankowano: " + amount + " litrów paliwa. W baku posiadasz: " + this.fuel + " litrów.");

    }
};

for (var z in fiat) {

    console.log(z + ": " + fiat[z]);

}


/* --------------------MAIN--------------------------------------------- TESTS--------------------*/
fiat.start();
console.log(fiat.started);
fiat.start();
fiat.stop();
console.log(fiat.started);
fiat.drive();
fiat.start();
fiat.drive();
console.log(fiat.started);

fiat.refuel(5);
fiat.refuel(10);
fiat.drive();
fiat.start();
fiat.drive();
fiat.drive();
fiat.drive();
fiat.drive();
fiat.drive();
fiat.refuel(1);