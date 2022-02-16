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
            css: ` *, *::before, *::after {  box-sizing: border-box; margin: 0; } .pingPong > h1 { position: relative; top: 20%;  left: 50%;} .pingPong > img { position: relative; top: 10%; left: 40%;} .pingPong {font-family: \'Poppins\' sans-serif;z-index: 5000000000; border: solid black 3px; box-shadow: 0 0 3px black; width: 300px;  position: absolute; top: 0%; right: 0%; background-color: #fff;} .pingPong > button { position: relative; top: 0%; left: 10%; border: solid black 3px;} .pingPong > button:first-of-type { left: 1%;}*{padding:0;margin:0}#game{width:325px;height:300px;border:1px solid #000;margin:auto;overflow:hidden}#block{width:40px;height:300px;background-color:#000;position:relative;left:325px;animation:block 2s infinite linear}@keyframes block{0%{left:325px}100%{left:-50px}}#hole{width:40px;height:100px;background-color:#fff;position:relative;left:325px;top:-300px;animation:block 2s infinite linear}#character{width:10px;height:10px;background-color:red;position:absolute;top:100px;border-radius:50%}`
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
       return
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

