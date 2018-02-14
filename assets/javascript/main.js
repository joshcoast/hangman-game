var wordList = ["eloquent", "javascript", "second", "edition"];
var wordInPlayLetters = [];
var numberOfTurns = 5;
var turnsTaken = 0;
var playedLetters = [];
var loseRecord = 0;
var winRecord = 0;
var winningLetters = [];
var winningMatch = [];
var forTheWin = false;



// Press Any Key To Start
document.onkeypress = function (event) {
	// Push any key to start display -> "Press any key to get started!" -> run gameStart()
	if (document.body.classList.contains("gameintro")) {
		document.body.classList.replace("gameintro", "gamerunning");
		//remove intro screen
		var sel = document.getElementById("intro");
		sel.remove(1);
		setBoard();
	}
};

// Setup Board
function setBoard() {

	//reset variables
	turnsTaken = 0;
	wordInPlayLetters = [];
	playedLetters = [];
	winningLetters = []
	winningMatch = []
	forTheWin = false;

	//Clear old Letter Tiles and Letters Played lists
	removeChildElements(document.getElementById("letterTiles"));
	removeChildElements(document.getElementById("playedLettersDisplay"));

	// Randomly pic a new word form the wordList
	var wordInPlay = wordList[Math.floor(Math.random() * wordList.length)];
	console.log(wordInPlay);
	console.log("---------");

	// Separate wordInPlay letters into wordInPlayLetters array
	for (var i = 0; i < wordInPlay.length; i++) {
		wordInPlayLetters.push(wordInPlay.charAt(i));
	}
	
	// Create the placeHolder tiles
	for (var i = 0; i < wordInPlayLetters.length; i++) {
		var listItem = document.createElement("li");
		var placeHolder = document.createTextNode("_");
		listItem.appendChild(placeHolder);
		document.getElementById("letterTiles").appendChild(listItem);
	}

	document.getElementById("turnsTaken").innerHTML = numberOfTurns;

	gamePlay()
}

// Removes all Child elements
function removeChildElements(rootEl) {
	while ( rootEl.firstChild ) {
		rootEl.removeChild( rootEl.firstChild );
	}
}

function gamePlay() {
	// Get the user input and process 
	document.onkeypress = function (event) {
		userGuess = event.key;
		// Find out if the letter has already been played
		if (playedLetters.includes(userGuess)) {
			//Display message that letter has been played already
			letterAlreadyPlayed();
		} else {
			//Keep track of played letters and display
			trackPlayedLetters()
			if (wordInPlayLetters.indexOf(userGuess) > -1) {
				//Guess was right
				correctGuess();
			} else {
				// No Match
				incorrectGuess();
			}
		}
		document.getElementById("turnsTaken").innerHTML = numberOfTurns - turnsTaken;
	}

	function letterAlreadyPlayed() {
		console.log(userGuess + " has already been played -- letterAlreadyPlayed()");
	}

	function trackPlayedLetters() {
		playedLetters.push(userGuess);
		//Add letter to played letters display
		var listItem = document.createElement("LI");
		var placeHolder = document.createTextNode(userGuess);
		listItem.appendChild(placeHolder);
		document.getElementById("playedLettersDisplay").appendChild(listItem);
		//console.log(playedLetters + " -- trackPlayedLetters()");
	}

	function correctGuess() {
		// Get the ul list that holds the word tiles
		var letterTilesList = document.getElementById('letterTiles');
		// Get an array of those list items so we can loop though and replace the _ with the userGuess
		var letterTilesItems = letterTilesList.getElementsByTagName('li');
		// Loop through wordInPlayLetters and replace the ones that match the userGuess
		for (var i = 0; i < wordInPlayLetters.length; i++) {
			if (wordInPlayLetters[i] == userGuess) {
				letterTilesItems[i].innerHTML = userGuess;
				winningMatch[i] = userGuess;
			}
		}
		if (winningMatch.toString() === wordInPlayLetters.toString()) {
			gameWon();
		}

		// Split takes a sting makes into an array

	}

	function incorrectGuess() {
		turnsTaken = turnsTaken + 1;
		if (turnsTaken === numberOfTurns) {
			gamelost();
		}
	}

	function gameWon() {
		document.onkeypress = undefined;
		winRecord = winRecord + 1;
		document.querySelector("#winRecord").innerHTML = winRecord;
		document.querySelector("#alertBox").innerHTML = "Winner Winner Chicken Dinner!"
		setBoard();
	}

	function gamelost() {
		// Stop gamePlay()'s onkeypress from running
		document.onkeypress = undefined;
		loseRecord = loseRecord + 1;
		document.querySelector("#loseRecord").innerHTML = loseRecord;
		// Alert 
		document.getElementById("alertBox").innerHTML = "Loser Loser Such a Snoozer!";
		setBoard();
	}


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