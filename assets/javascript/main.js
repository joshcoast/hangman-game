var wordList = ["macintosh", "jobs", "computer", "waz", "thinkdifferent", "apple", "lisa", "appleii", "quadra", "powerbook", "iphone", "ipod", "ipad", "newton", "macbook","performa", "powermac", "imac", "ibook", "macmini", "macbookair", "iwatch", ];
var wordInPlay;
var wordInPlayLetters = [];
var numberOfTurns = 8;
var turnsTaken = 0;
var playedLetters = [];
var loseRecord = 0;
var winRecord = 0;
var winningLetters = [];
var winningMatch = [];

//Sounds 
var laugh = new Audio('assets/sounds/laugh.wav');
var startup = new Audio('assets/sounds/startup2.wav');
var single_click = new Audio('assets/sounds/single_click.wav');
var moof = new Audio('assets/sounds/moof.wav');
var temple = new Audio('assets/sounds/temple.wav');


// Press Any Key To Start
document.onkeypress = function (event) {
	// Push any key to start display -> "Press any key to get started!" -> run gameStart()
	if (document.body.classList.contains("gameintro")) {
		document.body.classList.replace("gameintro", "gamerunning");

		//Remove intro screen
		var intro = document.getElementById("intro");
		intro.remove(1);
		setBoard();
	}
  startup.play();
};

// Setup Board
function setBoard() {

	//reset variables
	turnsTaken = 0;
	wordInPlayLetters = [];
	playedLetters = [];
	winningLetters = []
	winningMatch = []

	//Clear old Letter Tiles and Letters Played lists
	removeChildElements(document.getElementById("letterTiles"));
	removeChildElements(document.getElementById("playedLettersDisplay"));

	//Clear Image classes 
	var gallows = document.querySelector(".gallows");
	for (var i = 1; i <= numberOfTurns; i++ ) {
		gallows.classList.remove('image' + i);
	}

	// Randomly pic a new word form the wordList
	wordInPlay = wordList[Math.floor(Math.random() * wordList.length)];
	console.log(wordInPlay);
	console.log("---------");
	

	// Separate wordInPlay letters into wordInPlayLetters array
	for (var j = 0; j < wordInPlay.length; j++) {
		wordInPlayLetters.push(wordInPlay.charAt(j));
	}
	
	// Create the placeHolder tiles
	for (var k = 0; k < wordInPlayLetters.length; k++) {
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
		document.querySelector("#alertMessage").innerHTML = "Derp, <span>" + userGuess + "</span> has already been played.";
		laugh.play();
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
		single_click.play();
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
	}

	function incorrectGuess() {
		turnsTaken = turnsTaken + 1;
		document.querySelector(".gallows").classList.add('image' + turnsTaken);
		if (turnsTaken === numberOfTurns) {
			gamelost();
		}
	}

	function gameWon() {
		document.onkeypress = undefined;
		winRecord = winRecord + 1;
		temple.play();
		document.querySelector("#winRecord").innerHTML = winRecord;
		document.querySelector("#alertMessage").innerHTML = "<p>You got it, the word was <span>" + wordInPlay + "</span></p><p>Winner Winner Chicken Dinner!</p>"
		setBoard();
	}

	function gamelost() {
		// Stop gamePlay()'s onkeypress from running
		document.onkeypress = undefined;
		loseRecord = loseRecord + 1;
		moof.play();
		document.querySelector("#loseRecord").innerHTML = loseRecord;
		// Alert 
		document.getElementById("alertMessage").innerHTML = "<p>The word was <span>" + wordInPlay + "</span></p> <p>Loser Loser Such a Snoozer!</p>";
		console.log("here " + wordInPlay + " end");
		setBoard();
	}
}
