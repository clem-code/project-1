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
for (let index = 0; index < width ** 2; index++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute("id", index);
  cell.setAttribute("row", Math.floor(index / width));

  cell.setAttribute("column", Math.floor(index % width));
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
//rows
const row1 = cells.filter((cell) => cell.id < 20);
const row2 = cells.filter((cell) => cell.id >= 20 && cell.id < 40);
const row3 = cells.filter((cell) => cell.id >= 40 && cell.id < 60);
const row4 = cells.filter((cell) => cell.id >= 60 && cell.id < 80);
const row5 = cells.filter((cell) => cell.id >= 80 && cell.id < 100);
const row6 = cells.filter((cell) => cell.id >= 100 && cell.id < 120);
const row7 = cells.filter((cell) => cell.id >= 120 && cell.id < 140);
const row8 = cells.filter((cell) => cell.id >= 140 && cell.id < 160);
const row9 = cells.filter((cell) => cell.id >= 160 && cell.id < 180);
const row10 = cells.filter((cell) => cell.id >= 180 && cell.id < 200);
const row11 = cells.filter((cell) => cell.id >= 200 && cell.id < 220);
const row12 = cells.filter((cell) => cell.id >= 220 && cell.id < 240);
const row13 = cells.filter((cell) => cell.id >= 240 && cell.id < 260);
const row14 = cells.filter((cell) => cell.id >= 260 && cell.id < 280);
const row15 = cells.filter((cell) => cell.id >= 280 && cell.id < 300);
const row16 = cells.filter((cell) => cell.id >= 300 && cell.id < 320);
const row17 = cells.filter((cell) => cell.id >= 320 && cell.id < 340);
const row18 = cells.filter((cell) => cell.id >= 360 && cell.id < 380);
const row19 = cells.filter((cell) => cell.id >= 380 && cell.id < 400);
// const row20 = cells.filter((cell) => cell.id >= 400 && cell.id < 420);
//columns
const column1 = cells.filter((cell) => cell.id % width === 0);
const column2 = cells.filter((cell) => cell.id % width === 1);
const column3 = cells.filter((cell) => cell.id % width === 2);
const column4 = cells.filter((cell) => cell.id % width === 3);
const column5 = cells.filter((cell) => cell.id % width === 4);
const column6 = cells.filter((cell) => cell.id % width === 5);
const column7 = cells.filter((cell) => cell.id % width === 6);
const column8 = cells.filter((cell) => cell.id % width === 7);
const column9 = cells.filter((cell) => cell.id % width === 8);
const column10 = cells.filter((cell) => cell.id % width === 9);
const column11 = cells.filter((cell) => cell.id % width === 10);
const column12 = cells.filter((cell) => cell.id % width === 11);
const column13 = cells.filter((cell) => cell.id % width === 12);
const column14 = cells.filter((cell) => cell.id % width === 13);
const column15 = cells.filter((cell) => cell.id % width === 14);
const column16 = cells.filter((cell) => cell.id % width === 15);
const column17 = cells.filter((cell) => cell.id % width === 16);
const column18 = cells.filter((cell) => cell.id % width === 17);
const column19 = cells.filter((cell) => cell.id % width === 18);
const column20 = cells.filter((cell) => cell.id % width === 19);

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
//designating junction cells
//a junction is where a column and a row meets
//logic -- create an array of all cells that aren't walls
//for each cell make an array containing the neighbouring cells: -1 +1 -width width
//delete from the array any cells that are a wall
//if the cell neighbours array contains a column and a row -- then that cell gets a junction class
const notBarrier = cells.filter((cell) => {
  return !cell.classList.contains("wall");
});
notBarrier.forEach((wall) => {
  return wall.classList.add("notBarrier");
});

for (let cellLoc = 0; cellLoc < cells.length; cellLoc++) {
  let neighbours = [];
  let neighbourUp = cells[cellLoc - width];
  let neighbourDown = cells[cellLoc + width];
  let neighbourLeft = cells[cellLoc - 1];
  let neighbourRight = cells[cellLoc + 1];
  if (neighbourUp !== undefined) {
    if (!neighbourUp.classList.contains("wall")) {
      neighbours.push(neighbourUp);
    }
  }

  if (neighbourDown !== undefined) {
    if (!neighbourDown.classList.contains("wall")) {
      neighbours.push(neighbourDown);
    }
  }
  if (neighbourLeft !== undefined) {
    if (!neighbourLeft.classList.contains("wall")) {
      neighbours.push(neighbourLeft);
    }
  }
  if (neighbourRight !== undefined) {
    if (!neighbourRight.classList.contains("wall")) {
      neighbours.push(neighbourRight);
    }
  }

  if (neighbours.length > 2) {
    cells[cellLoc].classList.add("junction");
  }
}
cells.forEach((cell) => {
  if (cell.classList.contains("wall") && cell.classList.contains("junction")) {
    return cell.classList.remove("junction");
  }
});

//create a list of neighbouring cells that aren't walls
// if (cells[cellLoc - width].classList.contains("wall")) {
//   console.log("this cell above me is a wall!");
// }

//locating pacman
let pacman = 315;
let pacManLoc = cells[pacman];
let ghost1 = 168;
let ghost2 = 209;
let ghost3 = 266;
let ghost4 = 341;
pacManLoc.classList.add("pacman");
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

//pacman locator
//pseudo code
//find pacman location

// create two loops: one counting up from Pacman index to the end of the array, the other counting down to beginning of the array
function sonar() {
  console.log("sonar fired");
  function clearSonar() {
    cells.forEach((cell) => {
      if (cell.classList.contains("pacmanClose")) {
        return cell.classList.remove("pacmanClose");
      }
    });
  }
  clearSonar();
  let pacManRowArr = cells.filter((cell) => {
    if (
      parseInt(cell.getAttribute("row")) ===
      parseInt(cells[pacman].getAttribute("row"))
    ) {
      return cell;
    }
  });
  let pacmanRowArrPosition = parseInt(cells[pacman].getAttribute("column"));

  let pacManColumnArr = cells.filter((cell) => {
    if (
      parseInt(cell.getAttribute("column")) ===
      parseInt(cells[pacman].getAttribute("column"))
    ) {
      return cell;
    }
  });
  let pacmanColumnArrPosition = parseInt(cells[pacman].getAttribute("row"));
  function rowLeft() {
    for (let index = pacmanRowArrPosition; index >= 0; index--) {
      const cell = pacManRowArr[index];

      if (cell.classList.contains("wall")) {
        console.log("i am a wall");
        return;
      }
      if (cell.classList.contains("junction")) {
        console.log("i am a junction");
      }
      cell.classList.add("pacmanClose");
    }
  }
  function rowRight() {
    for (
      let index = pacmanRowArrPosition;
      index < pacManRowArr.length;
      index++
    ) {
      const cell = pacManRowArr[index];

      if (cell.classList.contains("wall")) {
        console.log("i am a wall");
        return;
      }
      if (cell.classList.contains("junction")) {
        console.log("i am a junction");
      }
      cell.classList.add("pacmanClose");
    }
  }
  function columnUp() {
    for (let index = pacmanColumnArrPosition; index >= 0; index--) {
      const cell = pacManColumnArr[index];

      if (cell.classList.contains("wall")) {
        console.log("i am a wall");
        return;
      }
      if (cell.classList.contains("junction")) {
        console.log("i am a junction");
      }
      cell.classList.add("pacmanClose");
    }
  }
  function columnDown() {
    for (
      let index = pacmanColumnArrPosition;
      index < pacManColumnArr.length;
      index++
    ) {
      const cell = pacManColumnArr[index];

      if (cell.classList.contains("wall")) {
        console.log("i am a wall");
        return;
      }
      if (cell.classList.contains("junction")) {
        console.log("i am a junction");
      }
      cell.classList.add("pacmanClose");
    }
  }
  rowLeft();
  rowRight();
  columnDown();
  columnUp();
}
// sonar();
//create an array of cells which are in the same row as Pacman
//exclude cells that are walls
//see if any of the ghosts are in those cells
