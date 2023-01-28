var $start = document.querySelector('#start')/*я все присвоював через айді тоу все з рішіткою*/
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $result = document.querySelector('#result')
var $gameTime = document.querySelector('#game-time')
var one = document.querySelector('.one img')
var two = document.querySelector('.two img')
var three = document.querySelector('.three img')
var four = document.querySelector('.four img')
var five = document.querySelector('.five img')
var six = document.querySelector('.six img')
var seven = document.querySelector('.seven img')
var eight = document.querySelector('.eight img')
var nine = document.querySelector('.nine img')
var scoreText = document.querySelector('.score')
var startImg = '/img/12321-removebg-preview.png'
var randomChmonyas = '/img/chmonya.png'
var score = 0
var randomLocation
var timerShow = document.querySelector('h1.timer')
var timeMinut
var test = false

function randomSetLocation (){   //Функція яка рандомно обирає місце появи орка
    var a = Math.floor(Math.random() * 9)+1
    switch(a){
        case 1: randomLocation = one 
        break
        case 2: randomLocation = two
        break
        case 3: randomLocation = three
        break
        case 4: randomLocation = four
        break
        case 5: randomLocation = five
        break
        case 6: randomLocation = six
        break
        case 7: randomLocation = seven
        break
        case 8: randomLocation = eight
        break
        case 9: randomLocation = nine
        break
    }
    return randomLocation
}
function randmonImg (){
    var i = Math.floor(Math.random() * 4)+1
    switch(i){
        case 1: randomChmonyas = '/img/chmonya.png'
        break;
        case 2: randomChmonyas = '/img/chmonya2.png'
        break;
        case 3: randomChmonyas = '/img/chmonya3.png'
        break;
        case 4: randomChmonyas = '/img/chmonya4.png'
        break;

    }
    return randomChmonyas
}


randmonImg()
randomSetLocation()

$start.addEventListener('click', startGame)/*це можеш закоментити це функція для того щоб кнопка старт пропала але це ще відповідає за початок гри*/
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el){   /* це наче теж для кнопки його краще не чіпати*/
    $el.classList.remove('hide')
    }
    
    function hide($el) {
        $el.classList.add('hide')
    }
function addScore() {
    randomLocation.style.cursor = 'default'
        score = score + 1
        randomLocation.setAttribute('src', startImg)
        randomLocation.removeEventListener('click', addScore) 
        randmonImg()
        randomSetLocation()
}
function startGame() { /*основна функція для запуску гри*/
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true
    $game.style.backgroundColor = '#fff' 
    hide($start)
     
    
    var interval = setInterval(function(){
       var time = parseFloat($time.textContent)
        if (time <=0){
            clearInterval(interval)
            endGame()
        } else{
            
            if(randomLocation.getAttribute('src') == startImg){
                randomLocation.style.cursor = 'pointer'
                randomLocation.setAttribute('src', randmonImg())
                randomLocation.addEventListener('click', addScore) 
            }
            $time.textContent = (time - 0.1).toFixed(1)
        }
            
    }, 100)
    
    renderBox()
}

function setGameScore() { /*рекорд*/
    $result.textContent = score.toString()
}

function setGameTime() {
    var time = +$gameTime.value
    $time.textContent =  time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function endGame(){/*закінчення гри*/
    isGameStarted = false
    setGameScore ()
    $gameTime.removeAttribute('disabled')
    show($start)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)

}

function handleBoxClick(event){/*умова для рекорду в кінці*/
    if (!isGameStarted) {
        return 
    }
    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}

