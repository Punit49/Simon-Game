const boxes = document.querySelectorAll(".boxes");
const container = document.querySelector(".container");
const h1 = document.querySelector("#heading");
const highest = document.querySelector("#high");
let randNumArray = [];
let userClickArray = [];
let isGameStarted = false;
let timing = 700;
let level = 1;
let isGameOver = false;
const clickSound = new Audio('./mixkit-select-click-1109.wav');
const gameOverSound = new Audio('./game-over-deep-male-voice-clip-352695.mp3');
gameOverSound.playbackRate = 2.0;
let highestScore;

// localStorage.clear()

const updateHighestScore = () => {
    highestScore++;
    localStorage.setItem("highestScore", JSON.stringify(highestScore));
}

const getHighScore = () => {
    highestScore = JSON.parse(localStorage.getItem("highestScore")) || 0;
    highest.textContent = `Highest Score - ${highestScore}`;
}
getHighScore();

const setScore = () => {
    if(level > highestScore + 1){
        updateHighestScore();
        getHighScore();
    }
}

function headBg(){
    h1.classList.toggle("levelUp");
    setTimeout(() => {
        h1.classList.toggle("levelUp");
    }, 300);
}

const levelUp = () => {
    h1.textContent = `LEVEL - ${level}`;
    let random = randomNum();
    setTimeout(() => {
        flash(boxes[random]);
        clickSound.play();
        clickSound.currentTime = 0;
    }, 600);
}

document.addEventListener("keydown", () => {
    if(!isGameStarted){
        levelUp();
        container.addEventListener("click", handleClick);
        headBg();
        isGameStarted = true; 
        isGameOver = false; 
    }
});

function handleClick(event) {
   if(isGameStarted){
        let clickedItem = Number(event.target.dataset.num);
        flash(event.target);
        clickSound.play();
        clickSound.currentTime = 0;
        userClickArray.push(clickedItem);
        matchOrNot(clickedItem);
   }
}

function flash(target){
    target.classList.toggle("flash");
    setTimeout(() => {
        target.classList.toggle("flash");
    }, 250);
}

const body = document.querySelector("body");
const flashBody = () => {
    body.classList.toggle("red");
    setTimeout(() => {
        body.classList.toggle("red");
    }, 250);
}

function randomNum(){
    let randNum = Math.floor(Math.random() * 4);
    randNumArray.push(randNum);
    return randNum;
}

function resetGame(){
    h1.innerHTML = `GAME OVER YOUR SCORE WAS <big><b> ${level - 1} </b></big> </br> PRESS ANY KEY TO RESTART`;
    isGameStarted = false;
    level = 1;
    randNumArray = [];
    // clickedItem = "";
    userClickArray = [];
}

function matchOrNot(clickedItem){
    if(!(clickedItem === randNumArray[userClickArray.length - 1])){
        gameOverSound.play();
        flashBody();
        isGameOver = true;
        resetGame();
    }

    else if(userClickArray.length === randNumArray.length && !isGameOver){
        headBg();
        level++;
        userClickArray = [];
        levelUp();
        setScore();
    }  
}