const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spin");
const wheelSound = new Audio("../Game/assets/wheel.mp3");

const card = document.getElementById("card");
const prize = document.getElementById("prize");
const claim = document.getElementById("claim");
const claimSound = new Audio("../Game/assets/claimed.mp3");

const won = document.getElementById("won");
const content = document.getElementById("content");

const head = document.querySelector(".head");

const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");

card.style.display = "none";

const wheelParts = [one, two, three, four, five, six, seven, eight];
const wonFortunes = [];

const fortunes = [
  "../Game/assets/prize/beg.png",
  "../Game/assets/prize/bere.png",
  "../Game/assets/prize/chips.png",
  "../Game/assets/prize/doro.png",
  "../Game/assets/prize/nut.png",
  "../Game/assets/prize/pc.png",
  "../Game/assets/prize/shinkurt.png",
  "../Game/assets/prize/vitz.png",
  "../Game/assets/prize/ertib.png",
];

let shuffledFortunes = [...fortunes];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const setItems = () => {
  shuffleArray(shuffledFortunes);

  wheelParts.forEach((part, index) => {
    part.src = shuffledFortunes[index];
  });
};

setItems();

let isSpinning = false;
let rotationDegree = 0;

spinButton.addEventListener("click", () => {
  if (isSpinning) return;

  isSpinning = true;
  spinButton.innerHTML = "Good Luck...";
  wheelSound.play();

  let duration = 9;
  let totalRotation = Math.random() * 360 + (360 * 15);

  wheel.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
  rotationDegree += totalRotation;
  wheel.style.transform = `rotate(${rotationDegree}deg)`;

  setTimeout(() => {
    const segmentSize = 360 / wheelParts.length;
    const finalRotation = rotationDegree % 360;
    const winningIndex = Math.floor(
      ((360 - (finalRotation % 360) + segmentSize / 2) % 360) / segmentSize
    );
    isSpinning = false;
    spinButton.innerHTML = "Spin";

    card.style.display = "block";
    prize.src = shuffledFortunes[winningIndex];
  }, duration * 1000);
});

claim.addEventListener("click", () => {
  claimSound.play();

  card.style.display = "none";

  wheel.style.transition = "transform 0s";
  wheel.style.transform = `rotate(${rotationDegree % 360}deg)`;

  won.style.display = "block";
  wonFortunes.push(prize.src);

  content.innerHTML = "";
  wonFortunes.reverse();
  wonFortunes.forEach((item) => {
    const img = document.createElement("img");
    img.src = item;
    content.appendChild(img);
  });

  setItems();
});

head.addEventListener("click", () => {
  won.style.zIndex = "-1";
  head.style.zIndex = "10";
});

won.addEventListener("click", () => {
  won.style.zIndex = "10";
  head.style.zIndex = "-1";
});
