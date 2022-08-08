let player1 = {
  name: 'PLAYER1', 
  dot: false,
  score: 11, 
  current: 12,
  bold: false,
}
let player2 = {
  name: 'PLAYER2', 
  dot: false, 
  score: 21,
  current: 22,
  bold: false,
}

player1.otherPlayer = player2
player2.otherPlayer = player1


game = [player1, player2]

let countRoll = 0;

const btnHold = document.getElementById('btn-hold');
const btnRoll = document.getElementById('btn-roll');
const btnNewGame = document.getElementById('btn-newgame');
const txtScore1 = document.getElementById('score1');
const txtScore2 = document.getElementById('score2');
const txtCurrent1 = document.getElementById('current1');
const txtCurrent2 = document.getElementById('current2');
const dotPlayer1 = document.getElementById('dotPlayer1');
const dotPlayer2 = document.getElementById('dotPlayer2');
const namePlayer1 = document.getElementById('namePlayer1');
const namePlayer2 = document.getElementById('namePlayer2');

player1.idDot = dotPlayer1;
player2.idDot = dotPlayer2;
player1.idName = namePlayer1;
player2.idName = namePlayer2;


function getRandomNumPlayer() {
  return Math.floor(Math.random() * 2);
}

function isNewGameConfirmed() {  
  return   (confirm("Une partie est en cours. Voulez-vous la recommencer ?"));
}

function isGameInProgress () {
  if (countRoll !== 0) {
    return true
   } else {
    return false
  }
}

function andTheWinnerIs () {
  alert('The Winner is XXX')
  countRoll = 0;
}

function initPlayer (player) {
  player.score = 0
  player.current = 0
  refresh(player);
}

function refresh(player) {
  txtScore1.innerHTML = player.score;
  txtCurrent1.innerHTML = player.current;
}

function changeToPlayer (player) {
  player.idDot.style.display = "block";
  player.idName.style.fontWeight = "bold";
  player.otherPlayer.idDot.style.display = "none";
  player.otherPlayer.idName.style.fontWeight = "200";
}
  

function initGame() {
  //enableBtn(Roll);
  initPlayer(player1)
  initPlayer(player2)
  
  playerLap = getRandomNumPlayer()
  changeToPlayer(game[playerLap]);
  //disableBtn(Hold)
}

function holdGain() {

}

function rollDice() {

}

function newGame() {
  if (isGameInProgress()) {
    if (isNewGameConfirmed()) {
      initGame();
    }
  }
  else {
    initGame()
  }
}


btnHold.addEventListener('click', holdGain);
btnRoll.addEventListener('click', rollDice);
btnNewGame.addEventListener('click', newGame);
