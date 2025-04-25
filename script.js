var names = [
  "shell",
  "star",
  "bobomb",
  "mario",
  "luigi",
  "peach",
  "1up",
  "mushroom",
  "thwomp",
  "bulletbill",
  "coin",
  "goomba",
];

var imgs = [
  "imgs/blueshell.png",
  "imgs/star.png",
  "imgs/bobomb.png",
  "imgs/mario.png",
  "imgs/luigi.png",
  "imgs/peach.png",
  "imgs/1up.png",
  "imgs/mushroom.png",
  "imgs/thwomp.png",
  "imgs/bulletbill.png",
  "imgs/coin.png",
  "imgs/goomba.png",
];

var namesFull = names.concat(names);
var imgsFull = imgs.concat(imgs);

// Shuffle
for (var i = namesFull.length - 1; i > 0; i--) {
  var j = Math.floor(Math.random() * (i + 1));
  var tempName = namesFull[i];
  var tempImg = imgsFull[i];
  namesFull[i] = namesFull[j];
  imgsFull[i] = imgsFull[j];
  namesFull[j] = tempName;
  imgsFull[j] = tempImg;
}

var firstGuess = "";
var secondGuess = "";
var count = 0;
var previousTarget = null;
var delay = 1200;

var game = document.getElementById("game");
var grid = document.createElement("section");
grid.setAttribute("class", "grid");
game.appendChild(grid);

// Create cards
for (var i = 0; i < namesFull.length; i++) {
  var card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-name", namesFull[i]);

  var front = document.createElement("div");
  front.className = "front";

  var back = document.createElement("div");
  back.className = "back";
  back.style.backgroundImage = "url(" + imgsFull[i] + ")";

  card.appendChild(front);
  card.appendChild(back);
  grid.appendChild(card);
}

function match() {
  var selected = document.querySelectorAll(".selected");
  for (var i = 0; i < selected.length; i++) {
    selected[i].classList.add("match");
  }
}

function resetGuesses() {
  firstGuess = "";
  secondGuess = "";
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll(".selected");
  for (var i = 0; i < selected.length; i++) {
    selected[i].classList.remove("selected");
  }
}

grid.addEventListener("click", function (event) {
  var clicked = event.target;

  if (
    clicked.nodeName === "SECTION" ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains("selected") ||
    clicked.parentNode.classList.contains("match")
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.getAttribute("data-name");
      clicked.parentNode.classList.add("selected");
    } else {
      secondGuess = clicked.parentNode.getAttribute("data-name");
      clicked.parentNode.classList.add("selected");
    }

    if (firstGuess !== "" && secondGuess !== "") {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});
