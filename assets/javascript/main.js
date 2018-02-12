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
		console.log(wordInPlay.charAt(i));
		wordInPlayLetters.push(wordInPlay.charAt(i));
	}
	console.log(wordInPlayLetters);

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
		userNewPick = event.key;
		if (playedLetters.length < numberOfTurns) {
			// Find out if the litter has already been played
			if (playedLetters.includes(userNewPick)) {
				//Display message that letter has been played already
				console.log("this has already been played");
			}else{
				//Add letter played to array
				playedLetters.push(userNewPick);
				//Add letter to played letters display
				var listItem = document.createElement("LI");
				var placeHolder = document.createTextNode(userNewPick);
				listItem.appendChild(placeHolder);
				document.getElementById("playedLettersDisplay").appendChild(listItem);
			}
			
			console.log(playedLetters);
			console.log("----");
			
			// Check against Already played letters

			

			// for (var i = 0; i < playedLetters.length; i++){
			// 	if (playedLetters[i] === event.key) {
			// 		console.log("yep " + playedLetters[i] + " = " + event.key);
			// 		console.log("----");
			// 	}else{
			// 		console.log("nope");
			// 		console.log("----");
			// 	}
			// }
		}
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

function endGame() {
	console.log("Game Over");
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