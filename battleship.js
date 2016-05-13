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
        [{location: ["00", "01", "02"], hits: ["", "", ""]},
        {location: ["10", "11", "12"], hits: ["", "", ""]},
        {location: ["20", "21", "22"], hits: ["", "", ""]}],

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
    }
};
/* testy dla obiektu model */
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
model.fire("22");


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
            alert("Współrzędne poza planszą!");
        else
            return row + column;
    }
    return null;
}






