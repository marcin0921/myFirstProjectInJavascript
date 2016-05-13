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
/* testy dla obiektu widow */
view.displayMessage("halo, czy to działa?!?!?!");
view.displayHit("11");
view.displayMiss("25");


var model = {

    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLenght: 3,

    ships:
        [{location: ["00", "01", "02"], hits: ["hit", "", ""]},
        {location: ["10", "11", "22"], hits: ["", "", ""]},
        {location: ["20", "21", "22"], hits: ["", "", "miss"]}],

    fire: function (guess) {

        for(var i = 0; i < this.ships; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if(index >= 0) {
                ship.hits[index] = "hit";
                return true;
            }

        }
        return false;
    }




};
/* testy dla obiektu model */

var test1 = model.ships[2].location[2];
console.log("Współrzędne trzeciego statku i trzeciego pola to: " + test1);