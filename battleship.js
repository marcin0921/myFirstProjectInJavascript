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

    processGuess: function (guess) {
        var location = parseGuess(guess);   // sprawdza poprawność wprowadzonych współrzędnych
        if (location) {

            this.guesses++;
            var hit = model.fire(location);
            if(hit && model.shipsSunk === model.numShips) {
                view.displayMessage("Zatopiłeś wszystkie moje okręty w " + this.guesses + " próbach.");
            }

        }
    }

};

// Funkcja sprawdzająca poprawność wprowadzonych danych i konwersja litery na liczbe
function parseGuess (guess) {

    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if(guess === null || guess.length !== 2)   // sprawdzenie czy guess nie jest pusty lub nie ma wiecej czy mniej znakow niz 2
        alert("Ups, podaj literę oraz cyfrę!");
    else {
        var firstChar = guess.charAt(0);     // pobranie pierwszego znaku zmiennej guess
        var row = alphabet.indexOf(firstChar);   // na podstawie tablicy alfabetu przeksztalcenie litery na cyfre indexu tablicy
        var column = guess.charAt(1);

        if(isNaN(row) || isNaN(column))
            alert("Ups, to nie są współrzędne!");
        else if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize)
            view.displayMessage("Współrzędne poza planszą!");
        else
            return row + column;
    }
    return null;
}


// Procedura obsługi zdarzeń = Pobranie wartości z pola formularza
function handleFireButton () {

    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;

    controller.processGuess(guess);
    guessInput.value = "";
}

// Procedura obsługi zdarzeń = klikniecie entera powoduje klikniecie przycisku Ognia!
function handleKeyPress(e) {  // przeglądarka przekazuje argument do parametru E jaki został klawisz wcisnięty

    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {   // liczba 13 odpowiada enterowi
        fireButton.click();
        return false;  // zwracamy false aby upewnić się aby formularz nie robił nic więcej
    }
}


function init() {
    //reakcja na przycisk ognia!
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;

    //reakcja na enter bedac w polu formularza
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeydown = handleKeyPress;

    //Generowanie losowo statków na planszy
    model.generateShipLocations();
}
// Wywołanie funkcji init po załadowaniu strony!
window.onload = init;



