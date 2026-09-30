
// SCRIPT FOR THE SNAKE GAME
  /* 
Developed by Divine Enow using template created by Learn Web Development Youtube channel:
 https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA 
 */ 

/* As of march 28 2020, this game is made up of so much redundant code
   I believe the code can be reduced by a factor of 2. 
*/

// this game doesn't run on microsoft egde (the problem is still to be found)
// the game was initially tested with firefox


//DECLARING GLOBAL VARIABLES
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// create the game unit 
const box = 32; 

//player class

//setting player class
class Player{
    constructor(name, score){
        this.name = name;
        this.score = score;
    }
    
    getplayerinfo(){
        return `${this.name} has a score of ${this.score}`;

    }

}



//setting framerate: the number of times per milli sec in which the game updates it's content
let pauseState = false;
 var framerate = 250;
var level = document.forms[1];
let divine = new Player("Divine",0);
let agnes = new Player("Agnes",0);

let alpha = new Player("Alpha hay", 0);


//setting current player. this has been repeated after addThisPlayer function [redundant code is not a good coding prac]
var currentPlayer = {};
var cplayer = document.forms[0];


// load images 

 
var ground = new Image(); 
ground.src = "ground.png";



var ground1 = new Image();
ground1.src="gameover.png";

  const foodImg = new Image(); 
 foodImg.src = "food.png"; 

 
// load audio files 
 
 
let dead = new Audio(); 
let eat = new Audio(); 
let up = new Audio(); 
let right = new Audio(); 
let left = new Audio(); 
let down = new Audio();  
 
 dead.src = "dead.mp3"; 
 eat.src = "eat.mp3"; 
 up.src = "audio/up.mp3"; 
 right.src = "audio/right.mp3"; 
 left.src = "audio/left.mp3"; 
 down.src = "audio/down.mp3"; 
 
 
 // create the snake 
 

 let snake = []; 
 
 
snake[0] = { 
   x : 9 * box, 
    y : 10 * box 
}; 
 
// create the food 
 
 let food = { 
     x : Math.floor(Math.random()*17+1) * box, 
     y : Math.floor(Math.random()*15+3) * box 
 } 
 
 
// create the score and player level var

 
var score = 0; 
var plevel = 0;

// creating level score boundary
var levelBoundary =20;

// taking note of game over state 
let isGameOver = false;


// function to change the colour of a particular image


//--- this function is not in use yet  -----

function setColourOnImage(imgId, colorInRgb){
    var img = new image();
    img.src = dicument.getElementById(imgId).scr;
    img.onload = function(){
        
        let canvas2 = document.createElement('canvas');
        canvas2.width = img.width;
        canvas2.height = img.height;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0,0);

        let imageData = ctx.getImageData(0,0, canvas2.width, canvas2.height);
        let data = imageData.data;

        for (let i = 0; i<data.length; i +=4){
            if (data[i+3] ==0) continue;
         }

        // if pixel is yellow, set to new colour
        if (data[i] > 200 && data[i+2] < 100){

            data[i] = colorInRgb[0];
            data[i+1] = colorInRgb[1];
            data[i+2] = colorInRgb[2];
        

         }
    }
}




//console.log(level)
for(let i = 0; i<level.length; i++){
    if (level[i].checked){
        framerate = level[i].value;
        
    }
}

//setting players


console.log(cplayer)
for(let i = 0; i<cplayer.length; i++){
    if (cplayer[i].checked){
        if(cplayer[i].value=='Divine') currentPlayer=divine;
        if(cplayer[i].value=='Agnes') currentPlayer=agnes;
        if(cplayer[i].value=='Abigail') currentPlayer=alpha;
        
    }
}


//adding new custom player function

function addThisPlayer(){
   let m = document.getElementById("add").value;
    localStorage.setItem("newplayer",m);

}

    

// loading previous loaded player. This has been repeated before addThisPlayer[redundant code is not a good coding prac]
let loadPlayerString = localStorage.getItem("newplayer");
document.getElementById("newPlayer").innerHTML =  loadPlayerString;
for(let i = 0; i<cplayer.length; i++){
    if (cplayer[i].checked){
        if(cplayer[i].value=='Divine') currentPlayer=divine;
        if(cplayer[i].value=='Agnes') currentPlayer.name = localStorage.getItem("newplayer") ;
        if(cplayer[i].value=='Abigail') currentPlayer=alpha;
        
    }
}


 


//load and save functions to save game progress
function save(what){
    if (what.name=='Divine') localStorage.setItem('dscore', JSON.stringify(score));
    else if(what.name=='Alpha hay') localStorage.setItem('bscore', JSON.stringify(score));
    else localStorage.setItem('gscore', JSON.stringify(score)); // this line has been modified 19/03/20
   //continue from here, you have created a player up
}

function load(what){
if(what.name=='Divine') return JSON.parse(localStorage.getItem('dscore'));
else if(what.name=='Alpha hay') return JSON.parse(localStorage.getItem('bscore'));
else return JSON.parse(localStorage.getItem('gscore'));
}

//player level function

function playerLevel(score){
    let level = 0;
    for (let i = 1; i++; i<=levelBoundary){
            if (score<i*levelBoundary) {
                plevel = i;
                break;
            }
    }

    level = document.getElementsByClassName("left");
    level[0].innerHTML= `<br><br><br><br>Hi <span style = "color: purple;">${currentPlayer.name},</span> You Are At<br>
    &ensp;&ensp;&ensp;&ensp; <span style = "color: black;"><u><b>Level ${plevel}</b></u></span>

    <br><br>Last Highest score: <span style = "color: purple;"><u><b>${load(currentPlayer)}</b></u></span>`;
}

// loading player level
plevel = load(currentPlayer)
playerLevel(plevel);






//resetting last score and level of current player

var cscore = document.forms[2];
console.log(cscore)
for(let i = 0; i<cscore.length; i++){
    if (cscore[i].checked){
        if(cscore[i].value=="Reset") {
            score = 0;
            save(currentPlayer);
            playerLevel(score);

        };
        
        
    }
}

 
//control the snake 

 
  
 
 //document.addEventListener("keydown",direction); 
 canvas.addEventListener("keydown",direction); 
let d;
 function direction(whatWasPressed){ 
      let key = whatWasPressed.keyCode;
      callPause(key); 
     if( key == 37 && d != "RIGHT"){ 
         left.play(); 
         d = "LEFT"; 
     }else if(key == 38 && d != "DOWN"){ 
         d = "UP"; 
         up.play(); 
     }else if(key == 39 && d != "LEFT"){ 
         d = "RIGHT"; 
         right.play(); 
     }else if(key == 40 && d != "UP"){ 
         d = "DOWN"; 
         down.play(); 
     } 
 }
 
 // defining pause game function

 function pauseGame(){
     
        if (!pauseState && !isGameOver){
           
            clearInterval(game);
            pauseState = true;

            let pause = "Game Paused, <br> press space to continue";
            let pa = document.createTextNode(pause);
            let p = document.createElement("p");
            p.innerHTML = pause;
            let temp = document.getElementsByClassName("left")[0];
            temp.appendChild(p);
            temp = document.getElementsByClassName("left")[0];
            
        }
        else if (pauseState && !isGameOver){
           
            game = setInterval(draw, framerate);
            pauseState = false;
            document.getElementsByClassName("left")[0].lastChild.remove();

        }

 }
 
 
 
 // check collision function: check when head collides with body or wall.
 function collision(head,array){ 
     for(let i = 0; i < array.length; i++){ 
         if(head.x == array[i].x && head.y == array[i].y){ 
             return true; 
         } 
     } 
     return false; 
 }
 

// DRAW EVERYTHING TO CANVAS

 let redEyeSnake = false; // is the snake's eye red?

 function draw(){ 
     
    ctx.drawImage(ground,0,0); 
        for( let i = 0; i < snake.length ; i++){ 
         ctx.fillStyle = ( i == 0 )? "red" : "green"; 
        ctx.fillRect(snake[i].x,snake[i].y,box,box); 
         
        ctx.strokeStyle = "red"; 
         ctx.strokeRect(snake[i].x,snake[i].y,box,box); 
     } 
      
     ctx.drawImage(foodImg, food.x, food.y); 
      
     // old head position 
     let snakeX = snake[0].x; 
     let snakeY = snake[0].y; 
      
     // which direction 
    // let d = direction()
     if( d == "LEFT") snakeX -= box; 
     if( d == "UP") snakeY -= box; 
     if( d == "RIGHT") snakeX += box; 
     if( d == "DOWN") snakeY += box; 

     // cheat to add scores by 10

     document.onkeydown = function(y){
                if(y.ctrlKey && y.altKey && y.shiftKey && y.keyCode == 38){
                    score +=10;
                }
            }
     
        // if the snake eats the food 
       
      if(snakeX == food.x && snakeY == food.y){ 
            score++;
            eat.play(); 
            food = { 
                x : Math.floor(Math.random()*17+1) * box, 
                y : Math.floor(Math.random()*15+3) * box 
            } 

            if (score>load(currentPlayer)) {

                playerLevel(score);
                save(currentPlayer); //saving score
        }

        if(!redEyeSnake){
            document.getElementById("img").src = "pic2.png";
            redEyeSnake = true;
        } 
        else {
            document.getElementById("img").src = "pic.png";
            redEyeSnake = false;
        }

         // we don't remove the tail 
     }else{ 
         // remove the tail 
         snake.pop(); 
     } 
      
     // add new Head 
      
     let newHead = { 
         x : snakeX, 
         y : snakeY 
     } 
      
     // game over 
     gameOverText = `GAME OVER`;
     
   if(snakeX < box || snakeX > 19 * box || snakeY < 2*box || snakeY > 19*box || collision(newHead,snake)){ 
         isGameOver = true;
    clearInterval(game); 
         dead.play(); 
         //ctx.drawImage(ground,0,0); 
        // ctx.drawImage(ground1,0,0); // for debugging only

       ctx.fillStyle = "red"; 
    ctx.font = "60px Changa one"; 
    ctx.fillText(gameOverText,4*box,304);
    ctx.fillText(currentPlayer.name.toUpperCase(),230,370);
         
    ctx.fillStyle = "red"; 
    ctx.font = "45px Changa one"; 
    ctx.fillText(score,2*box,1.6*box); 
     } 

      //create head of snake
     snake.unshift(newHead); 
     
     //putting score at the top canvas
     ctx.fillStyle = "red"; 
    ctx.font = "45px Changa one"; 
    ctx.fillText(score,2*box,1.6*box); 
} //end of draw function

// continue game after game is paused

function callPause(key){
    
 if (key == 32){
     
     pauseGame();
 }
 
}


// call draw function every 100 ms 
 
 let game = setInterval(draw,framerate); 
