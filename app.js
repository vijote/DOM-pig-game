// declaration of score variables and buttons
var roundScore, currentPlayer, scores, rand=2, rand2nd=2,
    theme = true, previous, winningScore = 30,
    roll = document.querySelector('.btn-roll'),
    hold = document.querySelector('.btn-hold');

// Adding of event listeners to buttons
roll.addEventListener('click', rollDice);
hold.addEventListener('click', holdScore);
document.querySelector('.btn-new').addEventListener('click', startAgain);
document.querySelector('.btn-switch').addEventListener('click',changeTheme);
document.querySelector('input').addEventListener('keyup', function(event){
    if(event.key === 'Enter' && document.querySelector('input').value){
        winningScore = document.querySelector('input').value;
    }
})

// Set all values to 0
init();
setTheme();

// Declaration of function to hold score
function holdScore(){
    // Add roundScore to actual score and display it
    scores[currentPlayer] += roundScore;
    document.getElementById('score-'+currentPlayer).textContent = scores[currentPlayer];
    
    //Check if player wins
    if(scores[currentPlayer] >= winningScore){ // Display the winner and hide buttons
        document.getElementById('name-'+currentPlayer).textContent = 'WINNER!';
        document.querySelector('.player-'+currentPlayer+'-panel').classList.toggle('active');
        document.querySelector('.player-'+currentPlayer+'-panel').classList.toggle('winner');
        document.querySelector('.dice').style.display = 'none';
        roll.style.display = 'none';
        hold.style.display = 'none';
    } else { // Or switch players
        roundScore = 0;
        document.getElementById('current-'+currentPlayer).textContent = roundScore;
        switchPlayer();
    }
}

// Declaration of the function to roll the dice
function rollDice(){
    // Pick a random number and display the image
    previous = rand;
    rand = Math.floor(Math.random() *6)+1;
    rand2nd = Math.floor(Math.random() *6)+1;
    var img = document.querySelector('.dice');
    img.style.display = 'block';
    img.src='dice-'+rand+'-'+(theme ? 'light' : 'dark')+'.png';

    document.querySelector('.dice-2nd').style.display = 'block';
    document.querySelector('.dice-2nd').src = 'dice-'+rand2nd+'-'+(theme ? 'light' : 'dark')+'.png';
    
    if (rand === 1 || rand2nd === 1) { // If it's 1 then hide the image and switch player
        roundScore = 0;
        document.getElementById('current-'+currentPlayer).textContent = roundScore;
        switchPlayer();
    } else if (rand === 6 && previous === 6) {
        scores[currentPlayer]=0;
        roundScore=0;
        document.getElementById('score-'+currentPlayer).textContent = 0;
        document.getElementById('current-'+currentPlayer).textContent = 0;
        switchPlayer();
    } else { // Else the value of that dice will get added
        roundScore += rand;
    } 
    // Display the actual score
    document.getElementById('current-'+currentPlayer).textContent = roundScore;
}

//Declaration of the function to replay
function startAgain(){
    // Display hidden buttons
    roll.style.display = 'block';
    hold.style.display = 'block';

    // Change from winner to player
    document.getElementById('name-'+currentPlayer).textContent = 'PLAYER '+(currentPlayer+1);
    document.querySelector('.player-'+currentPlayer+'-panel').classList.remove('winner');

    //And initialize a new game
    init();
}

// Declaration of the function to switch players
function switchPlayer(){
    currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2nd').style.display = 'none';
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
}

function init(){
    scores = [0,0];
    roundScore = 0;
    currentPlayer = 0;

    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2nd').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
}

function changeTheme(){
    theme = !theme;
    setTheme();
}

function setTheme(){
    if (theme) {
        document.querySelector('.btn-switch').innerHTML = '<img src=light.png style="width: 45px;">';
        document.querySelector('link:nth-of-type(3)').href = 'style-light.css';
        img = document.querySelector('.dice').src='dice-'+rand+'-'+(theme ? 'light' : 'dark')+'.png';
        document.querySelector('.dice-2nd').src = 'dice-'+rand2nd+'-'+(theme ? 'light' : 'dark')+'.png';
    } else {
        document.querySelector('link:nth-of-type(3)').href = 'style.css';
        document.querySelector('.btn-switch').innerHTML = '<img src=dark.png style="width: 50px;">';
        img = document.querySelector('.dice').src='dice-'+rand+'-'+(theme ? 'light' : 'dark')+'.png';
        document.querySelector('.dice-2nd').src = 'dice-'+rand2nd+'-'+(theme ? 'light' : 'dark')+'.png';
    }
}