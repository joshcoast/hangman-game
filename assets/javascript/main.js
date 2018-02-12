var wordList = ["eloquent", "javascript", "second", "edition"];
var wordInPlayLetters = [];
var numberOfTurns = 5;
var turnsTaken = 0;
var playedLetters = [];
var loseRecord = 0;
var winRecord = 0;
var winningLetters = [];



// Press Any Key To Start
document.onkeypress = function (event) {
	// Push any key to start display -> "Press any key to get started!" -> run gameStart()
	if (document.body.classList.contains("gameintro")) {
		document.body.classList.replace("gameintro", "gamerunning");
		//remove intro screen
		var sel = document.getElementById("intro");
		sel.remove(1);
		//gamePlay()
		setBoard();
	} else {}
};

// Setup Board
function setBoard() {
	// Randomly pic a word form an array
	var wordInPlay = wordList[Math.floor(Math.random() * wordList.length)];
	console.log(wordInPlay);
	console.log("---------");

	// separate out word letters into an array
	for (var i = 0; i < wordInPlay.length; i++) {
		wordInPlayLetters.push(wordInPlay.charAt(i));
	}

	for (var i = 0; i < wordInPlayLetters.length; i++) {
		var listItem = document.createElement("LI");
		var placeHolder = document.createTextNode("_");
		listItem.appendChild(placeHolder);
		document.getElementById("letterTiles").appendChild(listItem);
	}
	gamePlay()
}

function gamePlay() {
	// Get the user input and process 
	document.onkeypress = function (event) {
		userGuess = event.key;
		if (turnsTaken < numberOfTurns) {
			// Find out if the letter has already been played
			if (playedLetters.includes(userGuess)) {
				//Display message that letter has been played already
				letterAlreadyPlayed();
			} else {
				//Keep track of played letters and display
				trackPlayedLetters()
				if (wordInPlayLetters.indexOf(userGuess) > -1) {
					//Guess was right
					correctGuess()
				} else {
					// No Match
					incorrectGuess();
				}
			}
		} else {
			// Game is over
			endGame();
		}
	}

	function letterAlreadyPlayed() {
		console.log(userGuess + " has already been played -- letterAlreadyPlayed()");
	}

	function trackPlayedLetters() {
		turnsTaken = turnsTaken + 1;
		playedLetters.push(userGuess);
		//Add letter to played letters display
		var listItem = document.createElement("LI");
		var placeHolder = document.createTextNode(userGuess);
		listItem.appendChild(placeHolder);
		document.getElementById("playedLettersDisplay").appendChild(listItem);
		//console.log(playedLetters + " -- trackPlayedLetters()");
	}

	function correctGuess() {
		if (turnsTaken >= 0 ) {
			// You can't have negative turns
			turnsTaken = turnsTaken + -1;
		}
		// Get the ul list that holds the word tiles
		var letterTilesList = document.getElementById('letterTiles');
		// Get an array of those list items so we can loop though and replace the _ with the userGuess
		var letterTilesItems = letterTilesList.getElementsByTagName('li');		
		for (var i = 0; i < wordInPlayLetters.length; i++) {
			if (wordInPlayLetters[i] ==  userGuess) {
				letterTilesItems[i].innerHTML = userGuess;
			}
		}
		console.log(userGuess + " is a match correctGuess()");
	}

	function incorrectGuess() {
		console.log(userGuess + " does not match -- incorrectGuess()");
	}

	function endGame() {
		// Stop gamePlay()'s onkeypress from running
		document.onkeypress = undefined;
		// Alert 
		console.log("Game Over");
	}


	// for (i=0; i < numberOfTurns; i++ )

	// Get the user input. 
	// userKey

	// If letter is already played, display "you already played X, choose a new letter" return to loop. 

	// else if letter matches
	/*
	if (wordInPlay.indexOf(userKey) > -1)
	{
		// replace that letter in the "_" display
		// Add 1 to winningLetters var
	}
	*/

	// else letter doesn't match

	// If word is complete (winningLetters == wordLetters.length), run gameEnds("win")

	// If turns are less than 1, run gameEnds("lose")
}



// gameEnds(result)

// Reset NumberOfTurns
// Reset playedLetters array 

// If result === win, 
// display you win screen
// Add one to win record
// start over

// If result === lose, 
// display you lose screen
// Add one to loose record