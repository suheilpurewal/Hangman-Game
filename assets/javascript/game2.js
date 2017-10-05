
// List of all words
var wordList = ["atlantis", "challenger", "columbia", "discovery", "enterprise", "endeavour", "rza", "gza", "method man", "raekwon", "ghostface killah", "inspectah deck", "u god", "masta killa", "cappadonna", "ol dirty bastard"];
// Picks random word using math
var wordChoice = wordList[Math.floor(Math.random() * wordList.length)];
// Replaces word with appropriate number of dashes
var dashWord =  wordChoice.replace(/\w/g,"_ ");
// Letter array for word choice
var arrayLetters = [];
// Splits word into an array of letters
	// var letters = wordChoice.split("");
	// 	for(var i = 0; i < letters.length; i++);
// Alphabet of valid inputs
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// Not sure if i need most of these, but have them here just in case i need them
	// var wrongLetters = [];
	// var correctLetters = [];
	// var correctinorder = ""
	// var currentLetter = ""
	// var guessedLetters = [];
// remaining guesses in game/round
var guessesRemaining = 9;
var guessesMade = [];
// win/loss count
var loseCount = 0;
var winCount = 0;
var html = "<p><h1>";


// functions ¯\_(ツ)_/¯ maybe they'll work

// reset html variable
function resetHtml() {

	html="<p><h1>";

}

// log all necessary info to console
function consoleLogs() {
	console.log("wordChoice: " + wordChoice + "\n");
	console.log("guessesRemaining: " + guessesRemaining + "\n");
	console.log("guessesMade: " + guessesMade + "\n");
	console.log("arrayLetters: " + arrayLetters + "\n");
	console.log("winCount: " + winCount + "\n" + "losses: " + loseCount + "\n");
	console.log("--------------------------------");
}

// splits word into array
function splitWordIntoArray() {
	for (var i = 0, j = 0; i < wordChoice.length; i++) {
		arrayLetters[j] = wordChoice.charAt(i);
		j++
		if (wordChoice.charAt(i) != " ") {
			arrayLetters[j] = false;
		} else {
			arrayLetters[j] = true;
		}
		j++
	}
}

// updates HTML page with relevant info
function updateGame() {

	for (i = 0, j = 0; i < (arrayLetters.length / 2); i++) {
			if (arrayLetters[j+1] == true) {
			html += arrayLetters[j];
		} else {
			html += "_";
		}
		html += "&nbsp;";
		j=j+2;
	}
	html += "</h1></p>"	

	document.querySelector("#game").innerHTML = html;


	htmlStats = "<p><h3>Wins: " + winCount + " Losses: " + loseCount + " Guesses Left : " + guessesRemaining + "</h3></p>";
	document.querySelector("#stats").innerHTML = htmlStats;


	htmlGuesses = "<p><h3>"
	for (var i = 0; i < guessesMade.length; i++) {
		htmlGuesses += guessesMade[i] + "&nbsp;";
	}
	htmlGuesses += "</h3></p>";
	document.querySelector("#guessedletters").innerHTML = htmlGuesses;
}


// resets game allowing for additional playthroughs after loss or win
function resetGame() {

  guessesRemaining = 9;
  guessesMade = [];
  wordChoice = wordList[Math.floor(Math.random() * wordList.length)];

  arrayLetters = [];
  splitWordIntoArray();

  var htmlInstructions="<p><h3>Press any key to begin guessing</p></h3>";
  document.querySelector("#instructions").innerHTML = htmlInstructions;
  var htmlGameInitial = "<p><h1>";

  for (var i = 0; i < wordChoice.length; i++) {
    if (wordChoice.charAt(i) == " ") {
      htmlGameInitial += "&nbsp;&nbsp;";
    } else {
      htmlGameInitial += "_&nbsp;";
    }
  }


  htmlGameInitial += "</h1></p>"
  document.querySelector("#game").innerHTML = htmlGameInitial;
  var htmlStats = "<p><h3>" + "Wins: " + winCount + " Losses: " + loseCount + " Guesses Left : " + guessesRemaining + "</h3></p>";
  document.querySelector("#stats").innerHTML = htmlStats;
}



function validateUserGuess() {
  if (arrayLetters.indexOf(userGuess) < 0 && guessesMade.indexOf(userGuess) < 0 && alphabet.indexOf(userGuess) >= 0) {
    guessesRemaining--;
  }

  if (guessesMade.indexOf(userGuess) < 0 && alphabet.indexOf(userGuess) >= 0) {
    guessesMade[guessesMade.length]=userGuess;
  }

  for (var i = 0; i < arrayLetters.length; i++) {
    if (arrayLetters[i] === userGuess) {
      if (arrayLetters[i+1] == false)
      arrayLetters[i+1] = true;
    }
  } 
}

function hasUserWon() {
  if (arrayLetters.indexOf(false) < 0 ) {
    console.log("USER WINS");
    document.getElementById("rightword").innerHTML = wordChoice;
    alert("You Win!");
    winCount++;
    resetGame();

  } 
}

function hasUserLost() {
  if (guessesRemaining == 0) {
    console.log("USER LOSES");
    document.getElementById("rightword").innerHTML = wordChoice;
    alert("You Lost!");
    loseCount++;
    resetGame();
  }

}





splitWordIntoArray();


resetGame();


consoleLogs();

// start listening for keypress
document.onkeyup = function(event) {

	userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	validateUserGuess();
	updateGame();
	consoleLogs();
	resetHtml();
	hasUserWon();
	hasUserLost();
	consoleLogs();
}