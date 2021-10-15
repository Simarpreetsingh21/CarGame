const score = document.querySelector('.score');
const startScreen = document.querySelector('.start-screen');
const gameArea = document.querySelector('.game-area'); 

console.log(score);

let player = { speed : 5, score: 0} // empty object for just the confirmation that player wants to play 

//  for the contionous loop + removing the play banner
startScreen.addEventListener('click', start);

function gamePlay(){
    // console.log("Game has started");

    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect(); // this will give the top left right and bottom pos of the road to fix the car on the road 

    moveLines();
    moveNpcCar(car);
 
    // it was called only once so copy the line and call it in the function so that it runs contiously
    if(player.start){

        //  for the car traffic to move from top to bottom 

        if(keys.ArrowUp && player.y > road.top + 70 ){ player.y -= player.speed}
        if(keys.ArrowDown && player.y < (road.bottom - 85)){ player.y += player.speed}
        if(keys.ArrowLeft && player.x > 0){ player.x -= player.speed} // 2 cond. for restricting the car on the road only
        if(keys.ArrowRight && player.x < (road.width - 60)){ player.x += player.speed} // should be less than 350 to restrict it from  right border

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay); 

        console.log(player.score++);

        player.score++;
        score.innerText = "Score: " + player.score;

        // below is for leveling up 

        if(player.score > 1000){
            player.speed = 6;
        }

        else if(player.speed > 2000){
            player.speed = 7;
        }
        
        else if(player.speed > 3000){
            player.speed = 8;
        }
        else if(player.speed > 4000){
            player.speed = 10;
        }



    }
}

function start(){
    // gameArea.classList.remove('hide');        // removing the hide of the gamearea after user clicks start
    startScreen.classList.add('hide');        // adding hide to the start menu 

    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay); // for the animation of the road   

    // adding the road line element
    
    for(x = 0; x < 5; x++){

        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x*150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }
    
    
    // adding the car element 
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    // car.innerText = "a car";
    gameArea.appendChild(car);    // adding the car element inside the div of game-area 
    


    player.x = car.offsetLeft;
    player.y = car.offsetTop;


    // console.log("top pos" + car.offsetTop);
    // console.log("left pos" + car.offsetLeft);

    // for producing the npc cars on the road same as that for road line

    for(x = 0; x < 4; x++){

        let npcCar = document.createElement('div');
        npcCar.setAttribute('class', 'npc');
        npcCar.y = ((x+1) * 350) * -1;
        npcCar.style.top = npcCar.y + "px";
        // npcCar.style.backgroundColor = 'blue';
        npcCar.style.left = Math.floor(Math.random() * 350) + "px"; // multiplied by 350 as the random no generated in points

        gameArea.appendChild(npcCar);
    }
 
    


}


let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


// function for finding the key pressed by user and marking true for the pressed one

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true; // only making the key pressed true in the console  
    // console.log(e.key); // to print the key user is pressing at the moment
    // console.log(keys);
}

function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
    // console.log(keys);
}

// function for the player's collision 
// a representing the position of the npc car and b no of npc cars 
function collision(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))

}




//  function for moving the road line 

function moveLines(){
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(item){

        // this is for making the road lines come back after reaching the 700 px height and making it animated, it will make a loop  

        if(item.y >= 600){
            item.y -= 650;
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })

}

// function for ending the game on hit 

function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> Score: " + player.score + "<br> Press here to restart! ";
}


function moveNpcCar(car){
    let npc = document.querySelectorAll('.npc');

    npc.forEach(function(item){


        if(collision(car, item)){
            console.log("HIT! ");
            endGame();
        }

        // this is for making the road lines come back after reaching the 700 px height and making it animated, it will make a loop  

        if(item.y >= 550){
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })

}