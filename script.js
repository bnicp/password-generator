// Assignment Code -- first line PROVIDED BY TA
var generateBtn = document.querySelector("#generate");

// assigning global variables
var length = document.getElementById('numCharacters');
var lowercase = document.getElementById('incLowercase');
var uppercase = document.getElementById('incUppercase');
var numbers = document.getElementById('incNumbers');
var symbols = document.getElementById('incSymbols');
var form = document.getElementById('passwordForm');
var passwordText = document.getElementById('password'); 

// defining random choices for each character type
const randomChoices = {
  lowercase: getRandomLower,
  uppercase: getRandomUpper,
  numbers: getRandomNumber,
  symbols: getRandomSymbol
};

// Add event listener to generate button -- first line PROVIDED BY TA
generateBtn.addEventListener("click", () => {
 
//whether to include character types or not
  var numCharacters = +length.value;
  var incUppercase = uppercase.checked;
  var incLowercase = lowercase.checked;
  var incNumbers = numbers.checked;
  var incSymbols = symbols.checked;

// if a user enters the wrong number of characters / else run normally
if(numCharacters <8 || numCharacters >128) {
  return alert("Please enter a number from 8-128 characters.")
} else {
  passwordText.innerText = generatePassword(numCharacters, incLowercase, incUppercase, incNumbers, incSymbols);}

});

// generate password function
function generatePassword(length, lowercase, uppercase, numbers, symbols) {
  
// build password from strings
  let generatedPassword = '';

  var incParameters = lowercase + uppercase + numbers + symbols;
  
//don't include unchecked parameters
  var incArray = [{lowercase}, {uppercase}, {numbers}, {symbols}].filter(item => Object.values(item)[0])

  if(incArray === 0) {
    return '';
  }

// loop through length and generate each accepted parameter
  for(let i= 0; i < length; i+= incParameters) {
    incArray.forEach(type => {
      const incCharacters = Object.keys(type)[0];

      generatedPassword += randomChoices[incCharacters]();
    });
  }
//write to page
  const output = generatedPassword.slice(0, length);
	
	return output;
}


// random characater generator functions
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}