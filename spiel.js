// ==UserScript==
// @name         Games in Browser!
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Play your favourite games in the browser in a small window!
// @author       Coolie09
// @match        https://*/*
// @require      http://code.jquery.com/jquery-latest.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @copyright    Coolie09 2022-2022
// ==/UserScript==

"use strict"
let $ = window.jQuery;
var j = $.noConflict();

let information = {

    styles: {
        pingPong: ' *, *::before, *::after {  box-sizing: border-box; margin: 0; } .pingPong > h1 { position: relative; top: 20%;  left: 50%;} .pingPong > img { position: relative; top: 10%; left: 40%;} .pingPong {font-family: \'Poppins\' sans-serif;z-index: 5000000000; border: solid black 3px; box-shadow: 0 0 3px black; width: 300px;  position: absolute; top: 0%; right: 0%; background-color: #fff;} .pingPong > button { position: relative; top: 0%; left: 10%; border: solid black 3px;} .pingPong > button:first-of-type { left: 1%;}',
        flap: { 
            html: ` <div id="game"><div id="block"></div><div id="hole"></div><div id="character"></div></div>`,
            css: ` *, *::before, *::after {  box-sizing: border-box; margin: 0; } .pingPong > h1 { position: relative; top: 20%;  left: 50%;} .pingPong > img { position: relative; top: 10%; left: 40%;} .pingPong {font-family: \'Poppins\' sans-serif;z-index: 5000000000; border: solid black 3px; box-shadow: 0 0 3px black; width: 300px;  position: absolute; top: 0%; right: 0%; background-color: #fff;} .pingPong > button { position: relative; top: 0%; left: 10%; border: solid black 3px;} .pingPong > button:first-of-type { left: 1%;}*{padding:0;margin:0}#game{width:300px;height:300px;border:1px solid #000;margin:auto;overflow:hidden}#block{width:40px;height:300px;background-color:#000;position:relative;left:325px;animation:block 2s infinite linear}@keyframes block{0%{left:325px}100%{left:-50px}}#hole{width:40px;height:100px;background-color:#fff;position:relative;left:325px;top:-300px;animation:block 2s infinite linear}#character{width:10px;height:10px;background-color:red;position:absolute;top:100px;border-radius:50%}`
        }
    },
    content: {
        font: '<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\"><link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin><link href=\"https://fonts.googleapis.com/css2?family=Poppins&family=Prompt&display=swap\" rel=\"stylesheet\">',
        pingPong: "<img src=\"https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/128/000000/external-cookie-christmas-flatart-icons-lineal-color-flatarticons.png\"/><br><h1>0</h1><button>Start Timer </button> <button> Reset Cookies </button>"
    }
}

window.addEventListener("keydown", e => {
    console.log(e.key);
    if (e.key == "g") {
       let gameObject = new createBoard(choose().trim());
       gameObject.check();
       console.log(gameObject);
    }
})

function choose() {
    let game = prompt("Please choose a game. Games avaiable: \n Ping-Pong \n Tetris \n Cookie Clicker! \n Spaceship, ships comming soon!", "Ping-Pong") ?? Error("No game has been choosen!");
    return game
}


class createBoard {
    constructor (game) {
        this.game = game;
    }

    check() {
        if (this.game == "Ping-Pong") this._createPingPong()
        else if (this.game == "Tetris") this._createTetris()
        else if (this.game == "Cookie Clicker") this._createCookieCklicker()
        else if (this.game == "Flap") this._createFlap()
        else console.error(Error("Game is unknown! Please choose another one of the given list!"))
    }

    _createPingPong() {
        let sty = document.createElement("style");
        sty.textContent = information.styles.flap.css
        document.body.insertAdjacentElement("afterbegin", sty)
        let element = document.createElement("div");
        element.setAttribute("class", `pingPong`);
        document.body.insertAdjacentElement("afterbegin",element);
        // element.insertAdjacentHTML("afterbegin", `<canvas></canvas>`)
        let canvas = document.createElement("canvas");
        
        element.insertAdjacentElement("afterbegin",canvas);
        const canvasEl=document.querySelector("canvas");const canvasContext=canvasEl.getContext("2d");canvasEl.width=300;canvasEl.height=300;let RIScore=new Audio();let AIScore=new Audio();let hit=new Audio();let wall=new Audio();hit.src="sounds/hit.mp3";wall.src="sounds/wall.mp3";AIScore.src="sounds/AIScore.mp3";RIScore.src="sounds/RIScore.mp3";const playerPaddleRI={xP:0,yP:canvasEl.height/2-100/2,height:100,width:10,color:"#d2e603",score:0,};const playerPaddleAI={xP:canvasEl.width-10,yP:canvasEl.height/2-100/2,height:100,width:10,color:"orange",score:0,};const ball={xP:canvasEl.width/2,yP:canvasEl.height/2,radius:10,speed:7,xV:5,yV:5,color:"white",};const net={xP:canvasEl.width/2-1,yP:0,width:2,height:10,color:"white",};function drawRect(xP,yP,width,height,color){canvasContext.fillStyle=color;canvasContext.fillRect(xP,yP,width,height)}
        function drawCircle(xP,yP,radius,color){canvasContext.fillStyle=color;canvasContext.beginPath();canvasContext.arc(xP,yP,radius,0,Math.PI*2);canvasContext.fill()}
        function drawText(content,xP,yP,color){canvasContext.fillStyle=color;canvasContext.font="35px sans-serif";canvasContext.fillText(content,xP,yP)}
        function drawNet(){for(let i=0;i<canvasEl.height;i+=15){drawRect(net.xP,net.yP+i,net.width,net.height,net.color)}}
        function runGame(){drawRect(0,0,canvasEl.width,canvasEl.height,"#4683a0");drawNet();drawText(playerPaddleRI.score,(1*canvasEl.width)/4,(1*canvasEl.height)/10,"white");drawText(playerPaddleAI.score,(3*canvasEl.width)/4,(1*canvasEl.height)/10,"white");drawRect(playerPaddleRI.xP,playerPaddleRI.yP,playerPaddleRI.width,playerPaddleRI.height,playerPaddleRI.color);drawRect(playerPaddleAI.xP,playerPaddleAI.yP,playerPaddleAI.width,playerPaddleAI.height,playerPaddleAI.color);drawCircle(ball.xP,ball.yP,ball.radius,ball.color)}
        canvasEl.addEventListener("mousemove",movePaddle);function movePaddle(e){let canvasRect=canvasEl.getBoundingClientRect();playerPaddleRI.yP=e.clientY-canvasRect.top-playerPaddleRI.height/2}
        function paddleColliDete(BALL,PADDLE){BALL.top=BALL.yP-BALL.radius;BALL.bottom=BALL.yP+BALL.radius;BALL.left=BALL.xP-BALL.radius;BALL.right=BALL.xP+BALL.radius;PADDLE.top=PADDLE.yP;PADDLE.bottom=PADDLE.yP+PADDLE.height;PADDLE.left=PADDLE.xP;PADDLE.right=PADDLE.xP+PADDLE.width;return(BALL.right>PADDLE.left&&BALL.bottom>PADDLE.top&&BALL.left<PADDLE.right&&BALL.top<PADDLE.bottom)}
        function resetBall(){ball.xP=canvasEl.width/2;ball.yP=canvasEl.height/2;ball.speed=7}
        function everythingManager(){ball.xP+=ball.xV;ball.yP+=ball.yV;let intelligenceLevel=0.1;playerPaddleAI.yP+=(ball.yP-(playerPaddleAI.yP+playerPaddleAI.height/2))*intelligenceLevel;if(ball.yP+ball.radius>canvasEl.height||ball.yP-ball.radius<0){ball.yV=-ball.yV;wall.play()}
        let player=ball.xP+ball.radius<canvasEl.width/2?playerPaddleRI:playerPaddleAI;if(paddleColliDete(ball,player)){hit.play();let collisionPoint=ball.yP-(player.yP+player.height/2);collisionPoint=collisionPoint/(player.height/2);let bounceAngle=(collisionPoint*Math.PI)/4;let direction=ball.xP+ball.radius<canvasEl.width/2?1:-1;ball.xV=direction*ball.speed*Math.cos(bounceAngle);ball.yV=ball.speed*Math.sin(bounceAngle);ball.speed+=0.1}
        if(ball.xP+ball.radius<0){playerPaddleAI.score++;AIScore.play();resetBall()}else if(ball.xP-ball.radius>canvasEl.width){playerPaddleRI.score++;RIScore.play();resetBall()}}
        function gameInit(){everythingManager();runGame()}
        const FPS=60;setInterval(gameInit,1000/FPS)
        document.addEventListener("keydown", e => {if (e.key == "Dead") this._endGame()}, {once: true})
    }

    _createFlap() {
        let sty = document.createElement("style");
        sty.textContent = information.styles.flap.css
        document.body.insertAdjacentElement("afterbegin",sty);
        let element = document.createElement("div");
        element.setAttribute("class", `pingPong`);
        document.body.insertAdjacentElement("afterbegin",element);
        document.querySelector("div.pingPong").insertAdjacentHTML("afterbegin", information.styles.flap.html)
        

       
        let block = document.querySelector("#block");
        let hole = document.querySelector("#hole");
        let cha = document.getElementById("character");
        let jumping = 0;
       
        hole.addEventListener("animationiteration", () => { 
            let random = -((Math.random()*200)+100);
            hole.style.top = random + "px";
        })
       
       
        setInterval(function () { 
            let charactertop = parseInt(window.getComputedStyle(cha).top);
           if (jumping == 0) {
            cha.style.top = (charactertop+1)+"px";
           }
           let overlap = ((((window.scrollX + cha.getBoundingClientRect().left) == (window.scrollX + block.getBoundingClientRect().left)) && ((window.scrollY + cha.getBoundingClientRect().top) == (window.scrollY + block.getBoundingClientRect().top))) && ((window.scrollX + cha.getBoundingClientRect().left) == (window.scrollX + hole.getBoundingClientRect().left) && (window.scrollY + cha.getBoundingClientRect().top) == (window.scrollY + hole.getBoundingClientRect().top)));
           if (overlap) alert("Game over!")
           if (charactertop >= 300 ) { 
               alert("Game over!");
               cha.style.top = 100 + "px"
           } 
         
            if (charactertop <= 0){ 
               alert("Game over!")
               cha.style.top = 100 + "px"
           }
         
        },10)
       
        
           function jump() {
               jumping = 1
               let jumpCount = 0;
               let charactertop = parseInt(window.getComputedStyle(cha).top);
               var jumpInterval = setInterval(() => { 
                   if (charactertop > 6 && jumpCount == 15) { 
                       cha.style.top = (charactertop-20)+"px";
                   }
                  
                   if (jumpCount > 20) {clearInterval(jumpInterval); jumpCount = 0; jumping = 0;}
                   jumpCount++
               }, 10)
           }

           let f  = document.querySelector("div.pingPong")
           f.addEventListener("click", jump)
           j(box).draggable();
           document.addEventListener("keydown", e => {if (e.key == "Dead") this._endGame()}, {once: true})
    }

    _createTetris() {
        alert("Tetris Board created!")
    }

    _createCookieCklicker() {
        document.head.insertAdjacentHTML("afterend", information.content.font)
        let sty = document.createElement("style");
        // let fButton = document.createElement("button");
        // let sButton = document.createElement("button");
        // fButton.textContent = "Start Timer"
        // sButton.textContent = "Reset Clicks"

        sty.textContent = information.styles.pingPong
        let element = document.createElement("div");
        element.innerHTML = information.content.pingPong
        element.setAttribute("class", `pingPong`);
        document.body.insertAdjacentElement("afterbegin", sty)
        document.body.insertAdjacentElement("afterbegin",element);
        // document.querySelector("div[class='pingPong']").insertAdjacentElement("afterend",fButton);
        // document.querySelector("div[class='pingPong']").insertAdjacentElement("afterend",sButton);
        let box = document.querySelector("div.pingPong")
        document.querySelector("img[src]").addEventListener("click", () => {document.querySelector("h1").textContent = (parseInt(document.querySelector("h1").textContent) + 1).toString()})
        j(box).draggable();
        document.addEventListener("keydown", e => {if (e.key == "Dead") this._endGame()}, {once: true})
    }
    _endGame() {
        location.reload()
    }
}

