const boxes = document.querySelectorAll(".boxes");
const container = document.querySelector(".container");
const h1 = document.querySelector("#heading");
const highest = document.querySelector("#high");
const startBtn = document.querySelector("#startBtn");
const body = document.querySelector("body"); 

const clickSound = new Audio('./mixkit-select-click-1109.wav');
const gameOverSound = new Audio('./game-over-deep-male-voice-clip-352695.mp3');
gameOverSound.playbackRate = 2.0;

let sequence = [];
let playerSequence = [];
let isGameStarted = false;
let timing = 700;
let level = 1;
let isGameOver = false;
let highestScore;

const loadHighScore = () => {
    highestScore++;
    localStorage.setItem("highestScore", JSON.stringify(highestScore));
}

const getHighScore = () => {
    highestScore = JSON.parse(localStorage.getItem("highestScore")) || 0;
    highest.textContent = `Highest Score - ${highestScore}`;
}
getHighScore();

const setScore = () => {
    if(level - 1 > highestScore){
        loadHighScore();
        getHighScore(); 
    }
}

const flashElement = (element, className) => {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
    }, 250);
}

const levelUp = () => {
    h1.textContent = `LEVEL - ${level}`;
    let random = randomNum();
    setTimeout(() => {
        flashElement(boxes[random], "flash");
        clickSound.play();
        clickSound.currentTime = 0; // d
    }, 600);
}

startBtn.addEventListener("click", () => {
    if(!isGameStarted){
        levelUp();
        container.addEventListener("click", handleClick);
        flashElement(h1, "levelUp");
        isGameStarted = true; 
        isGameOver = false; 
    }
});

function handleClick(event) {
   if(isGameStarted){
        let clickedBox = event.target.closest('.boxes');
        let clickedItem = Number(clickedBox.dataset.num); // d
        flashElement(event.target, "flash");
        clickSound.play();
        clickSound.currentTime = 0;
        playerSequence.push(clickedItem);
        matchOrNot(clickedItem);
   }
}

function randomNum(){
    let randNum = Math.floor(Math.random() * boxes.length);
    sequence.push(randNum);
    return randNum;
}

function resetGame(){
    h1.innerHTML = `GAME OVER YOUR SCORE WAS <big><b> ${level - 1} </b></big> </br> PRESS ANY KEY TO RESTART`;
    isGameStarted = false;
    level = 1;
    sequence = [];
    playerSequence = [];
}

const handleGameOver = () => {
    gameOverSound.play();
    flashElement(body, "red");
    isGameOver = true;
    resetGame();
}
const handleWin = () => {
    level++;
    playerSequence = [];
    levelUp();
    setScore();
}

function matchOrNot(clickedItem){
    if(!(clickedItem === sequence[playerSequence.length - 1])){
        handleGameOver();
        return;
    }

    else if(playerSequence.length === sequence.length && !isGameOver){
        flashElement(h1, "levelUp");
        handleWin();
        return;
    }  
}

// optimizations -
// 1. Changed highscore condition
// 2. created flashElement function
// problem - not working on phone
