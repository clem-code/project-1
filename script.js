const grid = document.querySelector(".grid");
const modal = document.querySelector(".modal");
const modalImg = document.getElementById("modID");
const startButton = document.querySelector("button");
const width = 20;
const cells = [];
const walls = [];
const manualWall = [
  "285",
  "294",
  "114",
  "105",
  "147",
  "152",
  "252",
  "247",
  "167",
  "227",
  "248",
  "251",
  "232",
  "151",
  "172",
  "148",
  "106",
  "107",
  "108",
  "125",
  "145",
  "165",
  "113",
  "112",
  "111",
  "134",
  "154",
  "174",
  "274",
  "254",
  "234",
  "293",
  "292",
  "291",
  "288",
  "287",
  "286",
  "265",
  "245",
  "225",
  "69",
  "49",
  "50",
  "70",
  "329",
  "349",
  "330",
  "350",
  "196",
  "197",
  "217",
  "216",
  "183",
  "182",
  "202",
  "203",
  "322",
  "323",
  "343",
  "342",
  "42",
  "43",
  "63",
  "62",
  "56",
  "57",
  "77",
  "76",
  "337",
  "336",
  "356",
  "357",
  "332",
  "333",
  "334",
  "354",
  "353",
  "352",
  "325",
  "326",
  "327",
  "347",
  "346",
  "345",
  "45",
  "46",
  "47",
  "67",
  "66",
  "65",
  "52",
  "53",
  "54",
  "74",
  "73",
  "72",
  "102",
  "122",
  "123",
  "143",
  "117",
  "137",
  "136",
  "156",
  "242",
  "262",
  "263",
  "283",
  "257",
  "277",
  "276",
  "296",
];
const sanctum = [
  "231",
  "149",
  "150",
  "129",
  "109",
  "110",
  "130",
  "169",
  "170",
  "171",
  "191",
  "189",
  "168",
  "188",
  "190",
  "211",
  "210",
  "209",
  "208",
  "228",
  "229",
  "230",
  "250",
  "249",
  "269",
  "270",
  "290",
  "289",
  "192",
  "212",
  "213",
  "214",
  "194",
  "193",
  "187",
  "186",
  "185",
  "207",
  "206",
  "205",
];
const tempArray = [];
const scoreSpan = document.getElementById("scoreSpan");
const lifeSpan = document.getElementById("lifeSpan");
const highScoreSpan = document.getElementById("highScore");
let curScore = 0;
let currentLives = 3;
scoreSpan.textContent = curScore;
lifeSpan.textContent = currentLives;
let highscore = localStorage.getItem("localHighscore");
highScoreSpan.textContent = highscore;
//creating grid
for (index = 0; index < width ** 2; index++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute("id", index);
  grid.appendChild(cell);
  cells.push(cell);
  cell.innerHTML = index;
  cell.style.width = 100 / width + "%";
  cell.style.height = 100 / width + "%";
  if (index < width) {
    walls.push(cell);
  }
  if (index % width === 0) {
    walls.push(cell);
  }
  if ((index + 1) % width === 0) {
    walls.push(cell);
  }
  if (index + width > width ** 2) {
    walls.push(cell);
  }
}
//building the walls
walls.forEach((wall) => {
  wall.classList.add("wall");
});
manualWall.forEach((wall) => {
  const idWall = Number(wall);
  document.getElementById(idWall).classList.add("wall");
});
//building sanctum
sanctum.forEach((cell) => {
  const idCell = Number(cell);
  document.getElementById(idCell).classList.add("sanctum");
});

startButton.addEventListener("click", () => {
  // gameIsPlaying();
  console.log(`${gameIsPlaying}`);
  startButton.style.display = "none";
});

//locating pacman
let pacman = 312;
let ghost1 = 168;
let ghost2 = 209;
let ghost3 = 266;
let ghost4 = 341;
cells[pacman].classList.add("pacman");
// locating ghost1
cells[ghost1].classList.add("ghost1");
cells[ghost2].classList.add("ghost2");
cells[ghost3].classList.add("ghost3");
cells[ghost4].classList.add("ghost4");
// adding the jewels
cells.forEach((cell) => {
  if (
    !cell.classList.contains("wall") &&
    !cell.classList.contains("sanctum") &&
    !cell.classList.contains("pacman")
  ) {
    cell.classList.add("jewel");
  }
});
// movement code
let directionOfTravel;
let directionOfTravelGhost1;
let directionOfTravelGhost2;
let directionOfTravelGhost3;
let directionOfTravelGhost4;
let keyControl;
const leftMov = -1;
const rightMov = 1;
const upMov = -width;
const downMov = width;
const movArray = [leftMov, rightMov, upMov, downMov];
document.addEventListener("keyup", (event) => {
  if (event.key === "w") {
    console.log(`You hit ${event.key}`);
    movChange(upMov);
  }
  if (event.key === "a") {
    console.log(`You hit ${event.key}`);
    movChange(leftMov);
  }
  if (event.key === "s") {
    console.log(`You hit ${event.key}`);
    movChange(downMov);
  }
  if (event.key === "d") {
    console.log(`You hit ${event.key}`);
    movChange(rightMov);
  }
});
function movChange(direction) {
  //checks if the move is legal
  if (cells[pacman + direction].classList.contains("wall")) {
    console.log("the fail safe has been triggered");
    return;
  }
  //if it is, trigger set interval
  else if (!cells[pacman + direction].classList.contains("wall")) {
    clearInterval(directionOfTravel);
    directionOfTravel = setInterval(() => {
      console.log("I am now moving");

      //rotation
      //to come
      //clears if hits an obstacle
      if (cells[pacman + direction].classList.contains("wall")) {
        clearInterval(directionOfTravel);
        console.log("interval cleared");
        keyControl = 0;
      }
      //continues if the way is clear
      if (!cells[pacman + direction].classList.contains("wall")) {
        console.log("the way is clear");
        cells[pacman].classList.remove("pacman");
        if (cells[pacman + direction].classList.contains("jewel")) {
          cells[pacman + direction].classList.remove("jewel");
          curScore++;
          scoreSpan.textContent = curScore;
        }
        const contactCheck = setInterval(() => {
          if (
            cells[pacman + direction].classList.contains("ghost1") ||
            cells[pacman + direction].classList.contains("ghost2") ||
            cells[pacman + direction].classList.contains("ghost3") ||
            cells[pacman + direction].classList.contains("ghost4")
          ) {
            cells[pacman + direction].classList.remove("pacman");
            cells[pacman].classList.remove("pacman");
            clearInterval(directionOfTravel);
            pacman = 314;
            currentLives--;
            lifeSpan.textContent = currentLives;
            clearInterval(contactCheck);
            if (currentLives === 0) {
              putinModal();
            } else {
              deathModal();
            }
            return;
          }
        }, 100);

        pacman += direction;
        cells[pacman].classList.add("pacman");
      }
    }, 300);
  }
}

//ghost movements -- random
const randomMovement = function () {
  let randomNum = Math.floor(Math.random() * 4);
  let randomMov = movArray[randomNum];
  return randomMov;
};
//ghost1
let ghostOneIsMoving = false;

function ghost1Mov(direction) {
  ghostOneIsMoving = true;
  // console.log(`${ghostOneIsMoving}`);
  if (cells[ghost1 + direction].classList.contains("wall")) {
    // console.log("the fail safe has been triggered");
    ghost1Mov(randomMovement());
    // console.log(`${ghostOneIsMoving}`);
    return;
  }
  //if it is, trigger set interval
  else if (!cells[ghost1 + direction].classList.contains("wall")) {
    clearInterval(directionOfTravelGhost1);
    directionOfTravelGhost1 = setInterval(() => {
      // console.log("I am now moving");

      //rotation
      //to come
      //clears if hits an obstacle
      if (cells[ghost1 + direction].classList.contains("wall")) {
        clearInterval(directionOfTravelGhost1);
        // console.log("interval cleared");
        // ghostOneIsMoving = false;
        ghost1Mov(randomMovement());
        // console.log(`${ghostOneIsMoving}`);
        keyControl = 0;
      }
      //continues if the way is clear
      if (!cells[ghost1 + direction].classList.contains("wall")) {
        // console.log("ghost says the way is clear");
        cells[ghost1].classList.remove("ghost1");
        ghost1 += direction;
        cells[ghost1].classList.add("ghost1");
      }
    }, 400);
  }
}
while (ghostOneIsMoving === false) {
  ghost1Mov(randomMovement());
}
//ghost will receive a random direction
//it will generate a set interval and go in that direction until it hits a wall
//when it hits a wall it will cancel the set interval
//and generate a new set interval with a new direction

//ghost 2
let ghostTwoIsMoving = false;

function ghost2Mov(direction) {
  ghostTwoIsMoving = true;
  // console.log(`${ghostTwoIsMoving}`);
  if (cells[ghost2 + direction].classList.contains("wall")) {
    // console.log("the fail safe has been triggered");
    ghost2Mov(randomMovement());
    // console.log(`${ghostTwoIsMoving}`);
    return;
  }
  //if it is, trigger set interval
  else if (!cells[ghost2 + direction].classList.contains("wall")) {
    clearInterval(directionOfTravelGhost2);
    directionOfTravelGhost2 = setInterval(() => {
      // console.log("Ghost 2 is now moving");

      //rotation
      //to come
      //clears if hits an obstacle
      if (cells[ghost2 + direction].classList.contains("wall")) {
        clearInterval(directionOfTravelGhost2);
        // console.log("interval cleared");
        // ghostOneIsMoving = false;
        ghost2Mov(randomMovement());
        // console.log(`${ghostTwoIsMoving}`);
        keyControl = 0;
      }
      //continues if the way is clear
      if (!cells[ghost2 + direction].classList.contains("wall")) {
        // console.log("ghost 2 says the way is clear");
        cells[ghost2].classList.remove("ghost2");

        ghost2 += direction;
        cells[ghost2].classList.add("ghost2");
      }
    }, 400);
  }
}
while (ghostTwoIsMoving === false) {
  ghost2Mov(randomMovement());
}
//ghost 3
let ghostThreeIsMoving = false;

function ghost3Mov(direction) {
  ghostThreeIsMoving = true;
  // console.log(`${ghostThreeIsMoving}`);
  if (cells[ghost3 + direction].classList.contains("wall")) {
    // console.log("the fail safe has been triggered");
    ghost3Mov(randomMovement());
    // console.log(`${ghostThreeIsMoving}`);
    return;
  }
  //if it is, trigger set interval
  else if (!cells[ghost3 + direction].classList.contains("wall")) {
    clearInterval(directionOfTravelGhost3);
    directionOfTravelGhost3 = setInterval(() => {
      // console.log("Ghost 3 is now moving");

      //rotation
      //to come
      //clears if hits an obstacle
      if (cells[ghost3 + direction].classList.contains("wall")) {
        clearInterval(directionOfTravelGhost3);
        // console.log("interval cleared");
        // ghostOneIsMoving = false;
        ghost3Mov(randomMovement());
        // console.log(`${ghostThreeIsMoving}`);
        keyControl = 0;
      }
      //continues if the way is clear
      if (!cells[ghost3 + direction].classList.contains("wall")) {
        // console.log("ghost 3 says the way is clear");
        cells[ghost3].classList.remove("ghost3");

        ghost3 += direction;
        cells[ghost3].classList.add("ghost3");
      }
    }, 400);
  }
}
while (ghostThreeIsMoving === false) {
  ghost3Mov(randomMovement());
}

//ghost 4
let ghostFourIsMoving = false;

function ghost4Mov(direction) {
  ghostFourIsMoving = true;
  // console.log(`${ghostFourIsMoving}`);
  if (cells[ghost4 + direction].classList.contains("wall")) {
    // console.log("the fail safe has been triggered");
    ghost4Mov(randomMovement());
    // console.log(`${ghostFourIsMoving}`);
    return;
  }
  //if it is, trigger set interval
  else if (!cells[ghost4 + direction].classList.contains("wall")) {
    clearInterval(directionOfTravelGhost4);
    directionOfTravelGhost4 = setInterval(() => {
      // console.log("Ghost 4 is now moving");

      //rotation
      //to come
      //clears if hits an obstacle
      if (cells[ghost4 + direction].classList.contains("wall")) {
        clearInterval(directionOfTravelGhost4);
        // console.log("interval cleared");
        // ghostOneIsMoving = false;
        ghost4Mov(randomMovement());
        // console.log(`${ghostFourIsMoving}`);
        keyControl = 0;
      }
      //continues if the way is clear
      if (!cells[ghost4 + direction].classList.contains("wall")) {
        // console.log("ghost 4 says the way is clear");
        cells[ghost4].classList.remove("ghost4");

        ghost4 += direction;
        cells[ghost4].classList.add("ghost4");
      }
    }, 400);
  }
}
while (ghostFourIsMoving === false) {
  ghost4Mov(randomMovement());
}
function deathModal() {
  modal.innerHTML = `💀 YOU LOST A LIFE 💀 `;
  modal.style.display = "block";
  setTimeout(() => {
    modal.style.display = "none";
    modal.innerHTML = "";
  }, 700);
}
function putinModal() {
  modal.style.display = "block";
  modal.innerHTML = `💀🏴‍☠️GAME☠️☠️OVER🏴‍☠️💀`;
  setTimeout(() => {
    modal.style.display = "none";
    modal.innerHTML = "";
  }, 700);
}
function calcHighScore() {
  if (curScore > highscore) {
    window.localStorage.setItem("localHighscore", curScore);
    localStorage.getItem("localHighscore");
  }
}
