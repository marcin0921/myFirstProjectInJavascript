/**
 * Created by Marcin on 2016-05-02.
 */
// Funkcja drukująca i sprawdzająca największą wartość
function printAndCheckHighScore (scores) {

for (var i=0; i < scores.length; i++) {
    var highScore = scores[0];
    console.log("Próbka nr " + i + " wynosi: " + scores[i]);
    if (scores[i] > highScore) {

        highScore = scores[i];
    }

}
return highScore;
}
// KONIEC FUNKCJI

//Funkcja zapisująca próbki z największą wartością
function checkHighScoreSamples(scores, highScore) {

var j = 0;
var bestSamples = [];
for (var i=0; i < scores.length; i++) {

    if (scores[i] == highScore) {

        bestSamples[j] = i;
        j++;
    }

}
return bestSamples;
}
// KONIEC FUNKCJI

//Funkcja sprawdzająca która z najlepszych próbek jest najtańsza
function whichIsTheCheapest(bestSamples, prices) {

    var index = 0;
    var sampleCheapest = 100;
    for (var i=0; i < bestSamples.length; i++) {

        if (sampleCheapest> prices[bestSamples[i]]) {

            sampleCheapest = prices[bestSamples[i]];
            index = bestSamples[i];
        }
    }
    return index;
}
// KONIEC FUNKCJI

// ----------------------------------  MAIN  -----------------------------------------------------
var scores = [60, 62, 23, 12, 69, 32, 4, 2, 53, 69];
var prices = [20, 53, 32, 64, 33, 54, 7, 4, 54, 25]; // tablice równoległe
var highScore = printAndCheckHighScore(scores);
var bestSamples = checkHighScoreSamples(scores, highScore);
var index = whichIsTheCheapest(bestSamples, prices);
console.log("Największa wartość to: " + highScore);
console.log("Najlepsze próbki to nr: " + bestSamples);
console.log("Najtańsza próbka to nr: " + index);