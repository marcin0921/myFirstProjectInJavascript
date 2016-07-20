/**
 * Created by Marcin on 2016-05-13.
 */

/* Widok odpowiedzialny za ukazywanie wiadomosci odnosnie trafienia oraz wyswietlenie pola na planszy */
var view = {
    
    displayMessage: function (msg) {
        
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },

    displayHit: function (location) {

        var location = document.getElementById(location);
        location.setAttribute("class", "hit");

    },
    
    displayMiss: function (location) {

        var location = document.getElementById(location);
        location.setAttribute("class", "miss")

    }
    
};
/* testy dla obiektu widow
view.displayMessage("halo, czy to działa?!?!?!");
view.displayHit("11");
view.displayMiss("25"); */


var model = {

    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLength: 3,

    ships:
        [{location: [0, 0, 0], hits: ["", "", ""]},
        {location: [0, 0, 0], hits: ["", "", ""]},
        {location: [0, 0, 0], hits: ["", "", ""]}],

    fire: function (guess) {

        for(var i = 0; i < this.numShips; i++) {  // pętla po wszystkich statkach
            var ship = this.ships[i];          // zmienna referencyjna ship wskazana na obiekt danego statku

            var index = ship.location.indexOf(guess);  /* indexOf zwraca wartość -1 w przypadku nie znalezienia zmiennej guess */
            if(index >= 0) {
                ship.hits[index] = "hit";         // indexOf zwraca miejsce w tablicy znalezionego trafienia i przypisuje mu string hit
                view.displayHit(guess);
                view.displayMessage("Trafiony!");

                if(this.ifsunk(ship)) {         // sprawdzenie czy statek nie jest zatopiony
                    this.shipsSunk++;
                    view.displayMessage("Zatopiłeś mój okręt!");
                }
                return true;
            }

        }
        view.displayMiss(guess);
        view.displayMessage("Spudłowałeś!");
        return false;

    },

    ifsunk: function (ship) {

        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit")
                return false;
        }
        return true;
    },

    // Funkcja rozmieszczania statkow losowo
    generateShipLocations: function () {

        var locations;
        for(var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            }while (this.collision(locations));

            this.ships[i].location = locations;
        }
    },


    generateShip: function () {

        // Losowanie pierwszego pola statku w poziomie lub pionie tak aby zmiescil sie w planszy (dlatego odjete shipLenght)
        var direction = Math.floor(Math.random() * 2);
        var row, col;
        if (direction === 1) {  // Jeśli 1 to rozmieszczamy poziomo
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));

        }else  // rozmieszczamy pionowo
        {
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }

        // Generowanie wspolrzednych statku
        var newShipLocations = [];
        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            }else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },

    // Funkcja sprawdzajaca czy generowany statek nie koliduje juz z istniejacymi wspolrzednymi statkow
    collision: function (locations) {

        for (var i = 0; i < this.numShips; i++) {
            var ship = model.ships[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.location.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }

};
/* testy dla obiektu model
var test1 = model.ships[2].location[2];    // test stosowania łańcucha odwołań
console.log("Współrzędne trzeciego statku i trzeciego pola to: " + test1);
model.fire("44");
model.fire("11");
model.fire("01");
model.fire("03");
model.fire("02");
model.fire("00");
model.fire("20");
model.fire("10");
model.fire("12");
model.fire("22"); */


var controller = {

    guesses: 0,
    arrayGuesses: [],
    checkBeforeGuess: function (guess) {


        if (controller.arrayGuesses.indexOf(guess) >= 0) {
            view.displayMessage("Strzelałeś już w tę pozycję!");
            return false;
        }else
            controller.arrayGuesses.push(guess);
            controller.processGuess(guess);


    },

    processGuess: function (guess) {
        if (guess) {
            this.guesses++;
            var hit = model.fire(guess);
            if(hit && model.shipsSunk === model.numShips) {
                view.displayMessage("Zatopiłeś wszystkie moje okręty w " + this.guesses + " próbach.");
                //ponizej wypelnienie pozostalych pol i usuniecie zdarzenia onclick

                for (var i=0; i<=6; i++) {
                    for (var j = 0; j <= 6; j++) {
                        if (controller.arrayGuesses.indexOf([i] + "" + [j]) < 0) {
                            view.displayMiss([i] + "" + [j])
                        }
                        var clickFire = document.getElementById([i] + [j]);
                        clickFire.removeEventListener("click", handleClickFire, false);

                    }
                }

                //wyswietlenie napisu jeszcze raz
                document.getElementById("but").style.display='block';

            }

        }
    }

};


// Procedura obsługi zdarzeń = kliknięcie na tabele html
function handleClickFire(e) {
    controller.checkBeforeGuess(e.target.id);
}


function init() {
    //Generowanie losowo statków na planszy
    model.generateShipLocations();

    //reakcja na klikniecie myszka
    for (var i=0; i<=6; i++) {
        for (var j = 0; j <= 6; j++) {
            var clickFire = document.getElementById([i] + [j]);
            clickFire.addEventListener("click", handleClickFire, false);
        }
    }


}
// Wywołanie funkcji init po załadowaniu strony!
window.onload = init;



