const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

let player = {
    speed : 5,
    score : 0
};

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(keys);
    // console.log(e.key);
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(keys);
    // console.log(e.key);
}

function isColliede(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (
        aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveLines(){
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(item){
        if(item.y >= 940){
            item.y -= 992;
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';
    })
}

function gameEnd(){
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = 'Game Over <br> Your final score is : ' + player.score + '<br> Press here to restart the game';
}

function moveEnemyCars(car){
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function(item){

        if(isColliede(car,item)){
            gameEnd();
        }

        if(item.y >= 992){
            item.style.left = Math.floor(Math.random() * 400) + 'px';
            item.y = -302;
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';
    })
}

function gamePlay() {

    // console.log('Hey am clicked');
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    // console.log(road);
    moveLines();
    moveEnemyCars(car);
    if (player.start) {
        player.speed = 5;

        if(keys.ArrowUp && player.y > (road.top + 75)){
            player.y -= player.speed
        }
        if(keys.ArrowDown && player.y < (road.bottom - 90)){
            player.y += player.speed
        }
        if(keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed
        }
        if(keys.ArrowRight && player.x < (road.width - 65)){
            player.x += player.speed
        }

        if(player.score >= 500){
            player.speed = 7
        }
        if(player.score >= 1000){
            player.speed = 9
        }
        if(player.score >= 1500){
            player.speed = 11
        }
        if(player.score >= 2500){
            player.speed = 14
        }
        if(player.score >= 4000){
            player.speed = 18
        }
        if(player.score >= 6500){
            player.speed = 20
        }
        if(player.score >= 8500){
            player.speed = 23
        }

        car.style.top = player.y + 'px';
        car.style.left = player.x + 'px';

        window.requestAnimationFrame(gamePlay);
        player.score++;
        score.innerText = 'Score : ' + player.score;
    }
}

function start() {
    startScreen.classList.add('hide');
    gameArea.innerHTML = '';

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);
    
    for(x=0; x<10; x++){
        let roadLines = document.createElement('div');
        roadLines.setAttribute('class', 'lines');
        roadLines.y = (x*170);
        roadLines.style.top = roadLines.y + 'px';
        gameArea.appendChild(roadLines);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for(x=0; x<3; x++){
        let enemyCars = document.createElement('div');
        enemyCars.setAttribute('class', 'enemy');
        enemyCars.y = ((x+1) * 350) * -1;
        enemyCars.style.top = enemyCars.y + 'px';
        enemyCars.style.backgroundColor = randomColor();
        enemyCars.style.left = Math.floor(Math.random() * 400) + 'px';
        gameArea.appendChild(enemyCars);
    }
}

function randomColor(){
    function hex(){
        let hexCode = Math.floor(Math.random() * 256).toString(16);
        return ('0' + String(hexCode)).substr(-2);
    }
    return '#' + hex() + hex() + hex();
}

startScreen.addEventListener('click', start);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);