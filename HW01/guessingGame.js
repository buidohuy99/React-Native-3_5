let maxNum = 100;
let minNum = 1;
const maxGuesses = 10;
var guessesLeft = maxGuesses;
let generalNumber = Math.round(Math.random() * (maxNum - minNum) + minNum); 

const congrats = "Congratulations!! You guessed correctly number ";
const lower = "Guess lower. ";
const higher = "Guess higher. ";
const effectiveRange = "Number inside [" + minNum + "," + maxNum + "] range. ";

let guessButton = document.getElementById('guessButton');
let pastGuessesBox = document.getElementById('pastGuessesBox');
let inputBox = document.getElementById('inputBox');
let guessText = document.getElementById('guessText');

function guessButton_OnClick(){
	if(inputBox.value === "" || inputBox.value < minNum || inputBox.value > maxNum) return; 
	if(guessButton.value == "Guess"){
		let temp = guessButton.innerHTML;
		guessButton.innerHTML = guessButton.value;
		guessButton.value = temp;
		
		pastGuesses.innerHTML = "";
		inputBox.value = "";
		guessText.innerHTML = "Guess your number down here. " + effectiveRange + "You have " + maxGuesses + " tries left";
		guessText.style.backgroundColor = "white";
		
		generalNumber = Math.round(Math.random() * (maxNum - minNum) + minNum); 
		guessesLeft = maxGuesses;
		
		return;
	}
	
	let guessValue = inputBox.value;
	pastGuesses.innerHTML += " " + guessValue;
	guessText.style.backgroundColor = "red";
	guessesLeft--;
	
	let announceTries = "You have " + guessesLeft + " tries left!";
	
	if(guessValue == generalNumber){
		guessText.innerHTML = congrats + generalNumber;
		
		let temp = guessButton.innerHTML;
		guessButton.innerHTML = guessButton.value;
		guessButton.value = temp;
		
		guessText.style.backgroundColor = "green";
		return;
	}
	else if(guessValue < generalNumber)
		guessText.innerHTML = higher + announceTries;
	else guessText.innerHTML = lower + announceTries;
	
	if(guessesLeft <= 0){
		let temp = guessButton.innerHTML;
		guessButton.innerHTML = guessButton.value;
		guessButton.value = temp;
		
		guessText.innerHTML = "You failed to guessed the number " + generalNumber;
		return;
	}
	
}

guessText.innerHTML += effectiveRange + "You have " + maxGuesses + " tries left";

guessButton.addEventListener('click',guessButton_OnClick);