// Setting Up game
const result = document.querySelector('.result')

const min = document.querySelector('#start')
const max = document.querySelector('#end')
const turns = document.querySelector('#numberOfGuess')

const start = document.querySelector('#startGame')

const gamingBox = document.querySelector('.game-box')
const setupBox = document.querySelector('.taking-range')

let minValue
let maxValue
let turnsValue

start.addEventListener('click',() => {

    minValue = Number(min.value)
    maxValue = Number(max.value)
    turnsValue = Number(turns.value)

    result.innerHTML = ''
    // Checking For null Values
    if(min.value === ''){
        printResult('Start value needed','red')
    }else if(max.value === ''){
        printResult('End value needed','red')
    }else if(turns.value === ''){
        printResult('Turns value needed','red')
    }else if(isNaN(minValue)){
        printResult('Start value must be a Number','red')
    }else if(isNaN(maxValue)){
        printResult('End value must be a Number','red')
    }else if(isNaN(turnsValue)){
        printResult('Turns value must be a Number','red')
    }else{
        checkValidity()
    }  
})

function checkValidity(){
    let turn = (maxValue-minValue)/2
    if((maxValue-minValue) < 10){
        printResult('Range should be greater than 10 (End - Start)','yellow')
    }else if(turnsValue > turn){
        printResult('Common !! Number of turns less that 50 persent of range','yellow')
    }else {
        setupBox.classList.toggle('hide')
        gamingBox.classList.toggle('hide')
        startGame()
    }
}

// Gaming Logic from here

const number = document.querySelector('#guessNumber')
const check = document.querySelector('#validate')
const remain = document.querySelector('#remain')
const previous = document.querySelector('#previous')
const abort = document.querySelector('.abort')
let randomNumber
let play = true
let currentTurn

function startGame(){
    startColorChange()
    result.innerHTML = ''
    remain.innerHTML = `${turnsValue}`
    randomNumber = generateNumber(minValue,maxValue)
    currentTurn = turnsValue
}

if(play){
    check.addEventListener('click',() => {
        result.innerHTML = ''
        let num = parseInt(number.value)
        if(number.value === ''){
            printResult('Enter Your Guessed Number','red')
        }else if(isNaN(num)){
            printResult('Enter valid Number','red')
        }else if(currentTurn === 1){
            printResult('Oops !! You Loose')
            endGame()
        }else{
            number.value = ''
            validateGame(num)
        }
    })
}

function validateGame(num){
    currentTurn--
    if(num === randomNumber){
        printResult('Well Done. I know this , You Won !!','green')
        endGame()
    }else if(num < randomNumber){
        printResult('You number is low','yellow')
        updateGame(num)
    }else {
        printResult('You number is high','yellow')
        updateGame(num)
    }

    
}

function updateGame(num){
    previous.innerHTML += `${num}  `
    remain.innerHTML = `${currentTurn}`
}

function generateNumber(min,max){
    let num = Math.floor(Math.random()*(max-min+1) + min)
    return num
}

function endGame(){
    stopColorChange()
    abort.classList.toggle('hide')
    previous.innerHTML = ''
    number.value = ''
    play = false
}


function printResult(message,type){
    result.innerHTML = `<h2>${message}</h2>`
    result.style.color = type
}

abort.addEventListener('click',() => {
    abort.classList.toggle('hide')
    play = true
    startGame()
})


// Color Change Function
const body = document.querySelector('body')
let colorChange = null
function startColorChange(){
    if(!colorChange){
        colorChange = setInterval(() => {
            body.style.backgroundColor = generateColor()
        },2000)
    }
}

function stopColorChange(){
    clearInterval(colorChange)
    colorChange = null
}

function generateColor(){
    // we take only numbers because we only want dark color
    const string = '0123456789'
    let color = '#'
    for(let i=0; i<6; i++){
        let num = generateNumber(0,10)
        color += string[num]
    }
    return color
}



