let player1 = {
  name: 'PLAYER1',
  dot: false,
  score: 0,
  current: 0,
  bold: false,
};

let player2 = {
  name: 'PLAYER2',
  dot: false,
  score: 0,
  current: 0,
  bold: false,
};

player1.otherPlayer = player2;
player2.otherPlayer = player1;

game = [player1, player2];

let gameInProgress = false;
let scoreToWin = 100;

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
const dices = document.getElementsByClassName('dice')

player1.idDot = dotPlayer1;
player1.idName = namePlayer1;
player1.txtScore = txtScore1;
player1.txtCurrent = txtCurrent1;

player2.idDot = dotPlayer2;
player2.idName = namePlayer2;
player2.txtScore = txtScore2;
player2.txtCurrent = txtCurrent2;

btnHold.disabled = true;
btnRoll.disabled = true;


function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isNewGameConfirmed() {
  return (confirm("A game is in progress. Do you want to restart ?"));
}

function andTheWinnerIs(num) {
  gameInProgress = false;
  if (confirm('The Winner is ' + game[num].name + '.\nAnother game ?')) {
    newGame();
  }
}

function initPlayer(player) {
  player.score = 0;
  player.current = 0;
  refresh(player);
}

function refresh(player) {
  player.txtScore.textContent = player.score;
  player.txtCurrent.textContent = player.current;
}

function changeToPlayer(player) {
  player.idDot.style.display = "block";
  player.idName.style.fontWeight = "bold";
  player.otherPlayer.idDot.style.display = "none";
  player.otherPlayer.idName.style.fontWeight = "200";
}

function initGame() {
  btnHold.disabled = true;
  btnRoll.disabled = false;
  initPlayer(player1);
  initPlayer(player2);

  playerLap = getRandomNum(0, game.length - 1)
  changeToPlayer(game[playerLap]);
}

function holdGain() {
  btnHold.disabled = true;
  btnRoll.disabled = true;

  game[playerLap].score += game[playerLap].current;
  initCurrentScore(game[playerLap]);

  if (game[playerLap].score >= scoreToWin) {
    setTimeout(() => andTheWinnerIs(playerLap), 100);
  } else {
    btnRoll.disabled = false;
    alternatePlayer();
  }
}

function diceRoll() {
  gameInProgress = true;
  const diceValue = getRandomNum(1, 6);
  Array.from(dices).forEach((element, index) => {
    if ((index + 1) === diceValue) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
  return diceValue;
}

function initCurrentScore(player) {
  player.current = 0;
  refresh(player);
}

function alternatePlayer() {
  playerLap = nextPlayer(playerLap);
  changeToPlayer(game[playerLap]);
}

function nextPlayer(num) {
  return (++num >= game.length) ? 0 : num;
}

function rollDice() {
  const diceValue = diceRoll();

  if (diceValue === 1) {
    btnHold.disabled = true;
    initCurrentScore(game[playerLap]);
    alternatePlayer();
  } else {
    btnHold.disabled = false;

    game[playerLap].current += diceValue;
    refresh(game[playerLap]);
  }
}

function newGame() {
  if (gameInProgress) {
    if (isNewGameConfirmed()) {
      initGame();
    }
  }
  else {
    initGame();
  }
}

function changeName(element) {
  const name = element.target.value;
  if (name === '') {
    alert('Renseignez un nom de joueur.');
  } else {
    Array.from(game).forEach((player, index) => {
      if (player.idName.id == element.target.id) {
        player.name = name;
      }
    })
  }
}

btnHold.addEventListener('click', holdGain);
btnRoll.addEventListener('click', rollDice);
btnNewGame.addEventListener('click', newGame);
namePlayer1.addEventListener('blur', changeName);
namePlayer2.addEventListener('blur', changeName);
