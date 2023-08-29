let currentRoll, previousRoll, credits = [3, 3], betAmount, scoreHistory = [], gameStarted = false, currentPlayer = 1;

// Define the dice faces
const diceFaces = {
    1: 'assets/dice1.svg',
    2: 'assets/dice2.svg',
    3: 'assets/dice3.svg',
    4: 'assets/dice4.svg',
    5: 'assets/dice5.svg',
    6: 'assets/dice6.svg'
};


function rollDice() {
    previousRoll = currentRoll;
    currentRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById(`dice1-player${currentPlayer}`).src = diceFaces[currentRoll];
    currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch player after each roll
    displayCurrentPlayer(); // Display the current player after each roll
    displayCredits(); // Display the credits for each player after each roll
}

function displayCurrentPlayer() {
    document.getElementById('current-player').textContent = `Player ${currentPlayer}'s turn`;
}

function displayCredits() {
    document.getElementById('credits-player1').textContent = `Credits: ${credits[0]}`;
    document.getElementById('credits-player2').textContent = `Credits: ${credits[1]}`;
}

document.getElementById('start').addEventListener('click', function() {
    if (!gameStarted) {
        gameStarted = true;
        rollDice();
    }
});

document.getElementById('higher').addEventListener('click', function() {
    if (!gameStarted) return;
    rollDice();
    if (currentRoll > previousRoll) {
        credits[currentPlayer - 1] += 1;
    } else {
        credits[currentPlayer - 1] -= 1;
    }
    updateScore();
});

document.getElementById('lower').addEventListener('click', function() {
    if (!gameStarted) return;
    rollDice();
    if (currentRoll < previousRoll) {
        credits[currentPlayer - 1] += 1;
    } else {
        credits[currentPlayer - 1] -= 1;
    }
    updateScore();
});

function updateScore() {
    document.getElementById('credits').textContent = credits[currentPlayer - 1];
    scoreHistory.push({roll: currentRoll, credits: credits[currentPlayer - 1]});
    displayScoreHistory();
}

document.getElementById('bet-amount').addEventListener('change', function() {
    betAmount = parseInt(this.value);
    if (isNaN(betAmount) || betAmount > credits[currentPlayer - 1]) {
        alert('Invalid bet amount');
        this.value = '';
    }
});

// Check if the user has run out of credits
if (credits[currentPlayer - 1] <= 0) {
    alert('Game over! You have run out of credits.');
    gameStarted = false;
}