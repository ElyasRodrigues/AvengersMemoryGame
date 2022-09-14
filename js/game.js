const cardsContainer = document.querySelector(".cardsContainer");
const namePlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");

const characters = [
  "thor",
  "ironMan",
  "captain",
  "hulk",
  "spiderMan",
  "thanos",
  "natasha",
  "drStrange",
  "wanda",
  "blackPanther",
];

//function that will be used to create elements, already with class
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

// function to ask if the player wants to play again, if it is "true", the page reloads, if it is "false", it displays an alert and returns to the login menu
let confirmation;
const reloadGame = () => {
  confirmation = confirm(`${namePlayer.innerHTML}, deseja jogar novamente?`);
  if (confirmation) {
    location.reload;
  } else {
    alert(`Obrigado por jogar. S2`);
    window.location = "../index.html";
  }
};

//function to check the end of the game, checking all the cards, looking for the "disabledCard" class, if found in all, the timer stops and the game ends
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabledCard");

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(
      `Mandou bem, ${namePlayer.innerHTML}!! \nSeu tempo foi: ${timer.innerHTML}`
    );

    reloadGame();
  }
};

//function to check if the cards are the same, if it is, add the "disabledCard" class and after that call the checkEndGame function to check if there are still cards available
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter == secondCharacter) {
    firstCard.firstChild.classList.add("disabledCard");
    secondCard.firstChild.classList.add("disabledCard");

    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("revealCard");
      secondCard.classList.remove("revealCard");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

//function to reveal the card by adding the "revealCard" class (handled in css) and then call the checkCards function to analyze if they are the same
const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("revealCard")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("revealCard");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("revealCard");
    secondCard = target.parentNode;

    checkCards();
  }
};

//function to create the cards, calling the created function createElement, to create the card already with the chosen element and the class
const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url("../images/${character}.jpg")`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);

  return card;
};

//function to start the game, in it we do the duplication of the cards and the random distribution in the container
const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    cardsContainer.appendChild(card);
  });
};

//function to perform a count, just like a stopwatch and put on the page
const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};


window.onload = () => {
  namePlayer.innerHTML = localStorage.getItem("player")
  startTimer()
  loadGame()
}