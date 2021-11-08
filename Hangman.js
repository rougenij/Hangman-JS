//You should write your code in your IDE(vcode or somthing else)
//and paste it here after you test it, this question will graded separately.
//write your code here
const welcomeMessage = `
=== Welcome to Hangman ===
I am going to give you some empty fields
you would guess the word in question by typing one letter at a time -:)
You only have 10 mistakes! Soo, Watch out what you guess! Enjoy`;
// The Game Code starts here

function askQuestion(query) {
  var readline = require('readline');

  var read = null;
  read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false 
  });

  return new Promise(resolve => read.question(query, ans => {
    read.close();
    resolve(ans);
  }))
} 

var wordsingame = ["JavaScript" , "HTML" , "Gaming" , "AppleSeeds" , "Programming" , "Computer" , "Laptop"]; // Words in the Array for Hangman
var mistakes = 0; // User starts with 0 Mistakes and has up to 10 mistakes to do

beginGame();
// The Game Begins here

async function beginGame() {
	var pickedword = wordsingame[Math.floor(Math.random() * wordsingame.length)]; //Goes over the Array and picks a random word.
	var wArr = [];
	var chkArr = [];
	for (var m = 0; m < pickedword.length; m++) {
		wArr.push(pickedword[m]);
		chkArr.push(false);
	}
	console.log(welcomeMessage);
	
	var ifgameisbeaten = false;
	while(mistakes < 10 && !ifgameisbeaten) {
		console.log("\n You have " + mistakes  + " Out of 10 mistake(s)!");
			var wStr = "";
			console.log("The word is:-");
		for (m = 0; m < wArr.length; m++) {
			if (chkArr[m]) {
				wStr += wArr[m];
			} else {
				wStr += "*";
			}
		}
		console.log(wStr);
		var letterChecker = false;
		const guess = await askQuestion("Please type your guess\n");
		if (guess.length === 1 && guess.match(/[a-z]/i)) {
			for (m = 0; m < wArr.length; m++) {
				if (wArr[m] == guess || wArr[m] == guess.toUpperCase() || wArr[m] == guess.toLowerCase()) {
					chkArr[m] = true;
					letterChecker = true;
				}
			}
			if (!letterChecker) {
				mistakes++;
			}
		} else {
			console.log("HEY! No cheating! only letters allowed!");
		}
		if (checkifgamebeaten(chkArr)) {
				ifgameisbeaten = true;
		}
	}
	
	if (ifgameisbeaten) {
		console.log("\n LETS GOOOO! You have won the game! Lets goooo! Thank you for your time and Thank you for playing! The Word was:" +  pickedword);
	} 
	else {
		console.log("\n Sadly... You lost the game , You did nto guess the word correctly, Better luck next time! The Word was:" + pickedword);
	}
	process.exit()
}

function checkifgamebeaten (arr) {
	for (m = 0; m < arr.length; m++) {
		if (arr[m] == false) {
			return false;
		}
	}
	return true;
}