let xPos=20;
let yPos=20;
var prevX,prevY;
const width=20;
const length=20;
var snakeLength=1;
var snakeXPos=[xPos];
var snakeYPos=[yPos];
var foodX;
var foodY;
var count=1;
document.addEventListener('DOMContentLoaded',function () {
  console.log("Entered function");
  var c=document.getElementById("mycanvas");
  console.log("Hello");
  var ctx=c.getContext("2d");
  ctx.beginPath();
  ctx.rect(xPos, yPos, width, length);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
  snakeXPos[0]=20;
  snakeYPos[0]=20;
  redrawFood();
});
document.addEventListener('keyup',function(event){
  const keyName=event.keyCode;
  if(keyName==39) {moveRight();}
  else if(keyName==40) {moveDown();}
  else if(keyName==37) {moveLeft();}
  else if(keyName==38) {moveUp();}
  else console.log("Unnecessary key has been pressed");
});
function moveUp(){
  prevX=snakeXPos[snakeLength-1]; prevY=snakeYPos[snakeLength-1];
  //yPos=yPos-width;
  var i;
  for(i=snakeLength-1;i>0;i--)
       {
         console.log(snakeXPos);
           snakeXPos[i] = snakeXPos[i-1];
           snakeYPos[i] = snakeYPos[i-1];
       }
       snakeYPos[0]=snakeYPos[0]-width;
  if(touchesFood()) {
    snakeLength++;
    var i;
    for(i=snakeLength-1;i>0;i--)
            {
                snakeXPos[i]=snakeXPos[i-1];
                snakeYPos[i]=snakeYPos[i-1];
            }
            snakeYPos[0]=snakeYPos[0]-width;
    redrawFood();
  }
  console.log("turned up");
  redrawCanvas();
}
function moveRight(){
  prevX=snakeXPos[snakeLength-1]; prevY=snakeYPos[snakeLength-1];
  //xPos=xPos+width;
  var i;
  for(i=snakeLength-1;i>0;i--) {
            snakeXPos[i] = snakeXPos[i - 1];
            snakeYPos[i] = snakeYPos[i - 1];
        }
        snakeXPos[0]=snakeXPos[0]+width;
  if(touchesFood()) {
    snakeLength++;
    var i;
    for(i=snakeLength-1;i>0;i--)
            {
                snakeXPos[i]=snakeXPos[i-1];
                snakeYPos[i]=snakeYPos[i-1];
            }
            snakeXPos[0]=snakeXPos[0]+width;
    redrawFood();}
  console.log("turned right");
  redrawCanvas();
}
function moveLeft() {
  prevX=snakeXPos[snakeLength-1]; prevY=snakeYPos[snakeLength-1];
  //xPos=xPos-width;
  var i;
  for(i=snakeLength-1;i>0;i--)
       {
           snakeXPos[i]=snakeXPos[i-1];
            snakeYPos[i]=snakeYPos[i-1];
       }
       snakeXPos[0]=snakeXPos[0]-width;
  if(touchesFood()) {
    snakeLength++;
    var i;
    for(i=snakeLength-1;i>0;i--)
            {
                snakeXPos[i]=snakeXPos[i-1];
                snakeYPos[i]=snakeYPos[i-1];
            }
            snakeXPos[0]=snakeXPos[0]-width;
    redrawFood();}
  console.log("turned left");
  redrawCanvas();
}
function moveDown() {
  prevX=snakeXPos[snakeLength-1]; prevY=snakeYPos[snakeLength-1];
  //yPos=yPos+width;
  var i;
  for(i=snakeLength-1;i>0;i--) {
            snakeXPos[i] = snakeXPos[i-1];
            snakeYPos[i] = snakeYPos[i-1];
        }
        snakeYPos[0]=snakeYPos[0]+width;
  if(touchesFood()) {
    snakeLength++;
    var i;
    for(i=snakeLength-1;i>0;i--)
     {
          snakeXPos[i]=snakeXPos[i-1];
          snakeYPos[i]=snakeYPos[i-1];
    }
    snakeYPos[0]=snakeYPos[0]+width;
    redrawFood();
  }
  console.log("turned down");
  redrawCanvas();
}
function redrawCanvas() {
  if(touchesTail() || touchesEdges()) {gameOver();}
  var c=document.getElementById("mycanvas");
  console.log("entered redrawCanvas");
  var ctx=c.getContext("2d");
  ctx.clearRect(0,0,500,500);
  ctx.closePath();
    ctx.beginPath();
    ctx.rect(foodX,foodY,width,length);
    ctx.fillStyle="yellow";
    ctx.fill();
    ctx.closePath();
  for(var i=0;i<snakeLength;i++)
  {
    ctx.beginPath();
    console.log(i);
    ctx.rect(snakeXPos[i], snakeYPos[i], width, length);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
}
function redrawFood(){
  var c=document.getElementById("mycanvas");
  var ctx=c.getContext("2d");
  ctx.beginPath();
  ctx.clearRect(foodX,foodY,width,length);
  ctx.closePath();
  var c=document.getElementById("mycanvas");
  var ctx=c.getContext("2d");
  ctx.beginPath();
  foodX=generateRandom();
  foodY=generateRandom();
  ctx.rect(foodX,foodY,width,length);
  ctx.fillStyle="yellow";
  ctx.fill();
  ctx.closePath();
}
function generateRandom() {
  var random =Math.floor(Math.random() * (+400 - +20)) + +20;
  return random;
  console.log(random);
}
function touchesFood(){
  if((snakeXPos[0] >=foodX && snakeXPos[0]<=foodX+20 && snakeYPos[0] <=foodY +20&& snakeYPos[0] >=foodY) ||
                (snakeXPos[0]+20 >=foodX && snakeXPos[0]+20<=foodX+20 && snakeYPos[0] <=foodY +20&& snakeYPos[0] >=foodY)||
                (snakeXPos[0] >=foodX && snakeXPos[0]<=foodX+20 && snakeYPos[0] +20 <=foodY +20&& snakeYPos[0]+20 >=foodY) ||
                (snakeXPos[0]+20 >=foodX && snakeXPos[0] +20<=foodX+20 && snakeYPos[0] +20<=foodY +20&& snakeYPos[0] +20 >=foodY))
  {
    count++;
    return true;
  }
  else return false;
}

function touchesEdges() {
  var i;
  for(i=0;i<snakeLength;i++)
  {
    if(snakeXPos[0]>500 || snakeYPos[0]>500 || snakeXPos[0]<0 || snakeYPos[0]<0)
    {console.log("touched edges");
    return true;}
  }
  return false;
}
function touchesTail(){
  var i;
  if(snakeLength>2)
  {for (i = 3; i < snakeLength; i++)
          {
              if ((snakeXPos[0] >= snakeXPos[i]) && (snakeXPos[0] <= snakeXPos[i] + width) && (snakeYPos[0] >= snakeYPos[i]) && (snakeYPos[0] <= snakeYPos[i] + width))
              {
                console.log(i);
                  return true;
              }
          }
        }
  return false;
}

function gameOver(){
alert("Game over! Your score is " + count.toString());
}
