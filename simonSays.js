const boxes = document.querySelectorAll(".boxes");
const container = document.querySelector(".container");
const h1 = document.querySelector("#heading");
let randNumArray = [];
let userClickArray = [];
let isGameStarted = false;
let timing = 700;
let level = 1;
let isGameOver = false;

function recursiveFlashing(){
    h1.textContent = `Level - ${level}`;
    randomNum();
    randNumArray.forEach((item, index) => {
        let delay = (index + 1) * 1000;
        setTimeout(() => {
            if(isGameStarted){
                flash(boxes[item]);
            }
        }, delay)
    })
}

document.addEventListener("keydown", () => {
    if(!isGameStarted){
        container.addEventListener("click", handleClick);
        recursiveFlashing();
        isGameStarted = true; 
        isGameOver = false; 
    }
});

function handleClick(event) {
   if(isGameStarted){
        let clickedItem = Number(event.target.dataset.num);
        flash(event.target);
        userClickArray.push(clickedItem);
        matchOrNot(clickedItem);
   }
}

// Making boxes blink
function flash(target){
    target.classList.toggle("flash");
    setTimeout(() => {
        target.classList.toggle("flash");
    }, 250);
}

// Generating random numbers between 0-4 
function randomNum(){
    let randNum = Math.floor(Math.random() * 4);
    randNumArray.push(randNum);
    return randNum;
}

function resetGame(){
    h1.textContent = `Game Over! Your score was ${level - 1}, Press any key to restart`;
    isGameStarted = false;
    level = 1;
    randNumArray = [];
    clickedItem = "";
    userClickArray = [];
}

// Checking if clicked box is in same sequence or not.
function matchOrNot(clickedItem){
    
    if(!(clickedItem === randNumArray[userClickArray.length - 1])){
        isGameOver = true;
        resetGame();
    }

    else if(userClickArray.length === randNumArray.length && !isGameOver){
        level++;
        userClickArray = [];
        recursiveFlashing();
    }  
}