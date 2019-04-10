var scores, roundScore, activePlayer;
var isGameActive, noRoles;
init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if(!isGameActive)
        return;
    // 1. rnd nmbr

    var dice = Math.floor(Math.random() * 6) + 1;
    if(noRoles === 0)
        noRoles = 1;
    // 2. display result

    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // 3. update round scor if dice !== 1;

    if(dice !== 1) {
        roundScore += dice;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else         
        changePlayer();
    
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if(!isGameActive || !noRoles)
        return;
    scores[activePlayer] += roundScore;

    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    
    if(scores[activePlayer] >= 100) {
        document.querySelector("#name-" + activePlayer).textContent = "WINNER!"
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        
        isGameActive = false;
    } else 
        changePlayer();
});

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    isGameActive = true;
    noRoles = 0;
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    document.querySelector(".dice").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.querySelector(".player-0-panel").classList.add("active");
    
}

function changePlayer() {
    roundScore = 0;
    noRoles = 0;
    activePlayer = 1 - activePlayer;

    document.querySelector("#current-0").textContent = 0;
    document.querySelector("#current-1").textContent = 0;
    
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
}