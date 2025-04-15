// --- DOM Element References ---
const guessInputElement = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const resetButton = document.getElementById("resetButton");
const messageElement = document.getElementById("message");
const attemptsCountElement = document.getElementById("attemptsCount");
const minNumElement = document.getElementById("min-num"); // If you want to dynamically set range
const maxNumElement = document.getElementById("max-num"); // If you want to dynamically set range

// --- Game Configuration ---
const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

// --- Game State Variables ---
let secretNumber;
let numberOfGuesses;
let gameActive; // To control if guessing is allowed

// --- Function to Initialize or Reset the Game ---
function initializeGame() {
  // Generate new secret number
  secretNumber =
    Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
  console.log(`(Psst... the secret number is ${secretNumber})`); // For testing

  // Reset game state
  numberOfGuesses = 0;
  gameActive = true;

  // Update UI
  messageElement.textContent = "Enter your guess below:";
  messageElement.className = "message"; // Reset message style
  attemptsCountElement.textContent = numberOfGuesses;
  guessInputElement.value = ""; // Clear input field
  guessInputElement.disabled = false; // Enable input
  guessButton.disabled = false; // Enable guess button
  resetButton.classList.add("hidden"); // Hide reset button
  minNumElement.textContent = MIN_NUMBER; // Update range display if needed
  maxNumElement.textContent = MAX_NUMBER; // Update range display if needed

  guessInputElement.focus(); // Set focus to input field
}

// --- Function to Handle a Player's Guess ---
function handleGuess() {
  if (!gameActive) {
    return; // Do nothing if game is over
  }

  const guessString = guessInputElement.value;
  const guessNumber = parseInt(guessString);

  // --- Input Validation ---
  if (guessString === "" || isNaN(guessNumber)) {
    setMessage("Please enter a valid number.", "error");
    guessInputElement.value = ""; // Clear invalid input
    guessInputElement.focus();
    return;
  }

  if (guessNumber < MIN_NUMBER || guessNumber > MAX_NUMBER) {
    setMessage(
      `Please enter a number between ${MIN_NUMBER} and ${MAX_NUMBER}.`,
      "error"
    );
    guessInputElement.value = ""; // Clear invalid input
    guessInputElement.focus();
    return;
  }

  // --- Process Valid Guess ---
  numberOfGuesses++;
  attemptsCountElement.textContent = numberOfGuesses;

  if (guessNumber < secretNumber) {
    setMessage("Too low! Try guessing higher.", "error");
    guessInputElement.value = ""; // Clear input for next guess
    guessInputElement.focus();
  } else if (guessNumber > secretNumber) {
    setMessage("Too high! Try guessing lower.", "error");
    guessInputElement.value = ""; // Clear input for next guess
    guessInputElement.focus();
  } else {
    // Correct Guess!
    setMessage(
      `Correct! The number was ${secretNumber}. You got it in ${numberOfGuesses} attempts!`,
      "success"
    );
    gameActive = false; // End the game
    guessInputElement.disabled = true; // Disable input
    guessButton.disabled = true; // Disable guess button
    resetButton.classList.remove("hidden"); // Show reset button
    resetButton.focus(); // Focus on reset button
  }
}

// --- Helper Function to Update the Message Area ---
function setMessage(text, type) {
  messageElement.textContent = text;
  messageElement.className = `message ${type}`; // Set class for styling (e.g., 'message error')
}

// --- Event Listeners ---
guessButton.addEventListener("click", handleGuess);
resetButton.addEventListener("click", initializeGame);

// Allow pressing Enter key in the input field to submit guess
guessInputElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && gameActive) {
    handleGuess();
  }
});

// --- Start the Game on Page Load ---
initializeGame();
