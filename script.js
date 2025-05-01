// List of character names used for matching logic
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

// Corresponding image paths for each character
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

// Duplicate each item to create matching pairs
var namesFull = names.concat(names);
var imgsFull = imgs.concat(imgs);

// Shuffle the cards using randomization algorithm
for (var i = namesFull.length - 1; i > 0; i--) {
  var j = Math.floor(Math.random() * (i + 1));
  var tempName = namesFull[i];
  var tempImg = imgsFull[i];
  namesFull[i] = namesFull[j];
  imgsFull[i] = imgsFull[j];
  namesFull[j] = tempName;
  imgsFull[j] = tempImg;
}

// Game state variables
var firstGuess = "";
var secondGuess = "";
var count = 0;
var previousTarget = null;
var delay = 1200;
var matchCount = 0;
var totalPairs = names.length;

// Create grid and attach to game container
var game = document.getElementById("game");
var grid = document.createElement("section");
grid.setAttribute("class", "grid");
game.appendChild(grid);

// Dynamically generate card elements and add them to the grid
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

// Add .match class to matched cards and check for game completion
function match() {
  var selected = document.querySelectorAll(".selected");
  for (var i = 0; i < selected.length; i++) {
    selected[i].classList.add("match");
  }

  matchCount++;

  // If all pairs are matched, show the completion modal
  if (matchCount === totalPairs) {
    setTimeout(showCompletionModal, 500);
  }
}

// Show Bootstrap modal to indicate game completion
function showCompletionModal() {
  var completionModal = new bootstrap.Modal(
    document.getElementById("completionModal")
  );
  completionModal.show();
}

// Reset guesses and clear selected cards
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

// Main event listener for handling card clicks and game logic
grid.addEventListener("click", function (event) {
  var clicked = event.target;

  // Ignore invalid clicks: background, same card, already selected or matched
  if (
    clicked.nodeName === "SECTION" ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains("selected") ||
    clicked.parentNode.classList.contains("match")
  ) {
    return;
  }

  // Allow only 2 cards to be selected at a time
  if (count < 2) {
    count++;

    if (count === 1) {
      // First card selected
      firstGuess = clicked.parentNode.getAttribute("data-name");
      clicked.parentNode.classList.add("selected");
    } else {
      // Second card selected
      secondGuess = clicked.parentNode.getAttribute("data-name");
      clicked.parentNode.classList.add("selected");
    }

    // If two cards have been selected, check for a match
    if (firstGuess !== "" && secondGuess !== "") {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay); // Match found
      }
      setTimeout(resetGuesses, delay); // Always reset guesses
    }

    // Store the last clicked element to avoid double-click matching
    previousTarget = clicked;
  }
});
