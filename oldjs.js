//ghost movements -- random
const randomMovement = function () {
  let randomNum = Math.floor(Math.random() * 4);
  let randomMov = movArray[randomNum];
  return randomMov;
};
const checkRandomMov = function (randomMov) {
  if (cells[submarine + randomMov].classList.contains("wall")) {
    // console.log("cannot go in here, this is a wall");
    randomMovement();
  } else if (!cells[submarine + randomMov].classList.contains("wall")) {
    // console.log("all good -- this is not a wall");
    return randomMov;
  }
};
ghost1;
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
        // keyControl = 0;
      }
      if (cells[ghost1 + direction].classList.contains("junction")) {
        clearInterval(directionOfTravelGhost1);
        // console.log("interval cleared for a junction");
        ghostOneIsMoving = false;
        ghost1Mov(randomMovement());
        // console.log(`${ghostOneIsMoving}`);
        // keyControl = 0;
      }
      //continues if the way is clear
      if (!cells[ghost1 + direction].classList.contains("wall")) {
        // console.log("ghost says the way is clear");
        cells[ghost1].classList.remove("ghost1");
        ghost1 += direction;
        cells[ghost1].classList.add("ghost1");
      }
    }, 300);
  }
}
while (ghostOneIsMoving === false) {
  ghost1Mov(randomMovement());
}
// //ghost will receive a random direction
// //it will generate a set interval and go in that direction until it hits a wall
// //when it hits a wall it will cancel the set interval
// //and generate a new set interval with a new direction

// //ghost 2
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

      if (cells[ghost2 + direction].classList.contains("wall")) {
        clearInterval(directionOfTravelGhost2);
        // console.log("interval cleared");
        ghostTwoIsMoving = false;
        ghost2Mov(randomMovement());
        // console.log(`${ghostTwoIsMoving}`);
        // keyControl = 0;
      }
      if (cells[ghost2 + direction].classList.contains("junction")) {
        clearInterval(directionOfTravelGhost2);
        console.log("interval cleared for a junction");
        ghostTwoIsMoving = false;
        ghost2Mov(randomMovement());
        console.log(`${ghostTwoIsMoving}`);
        // keyControl = 0;
      }
      //continues if the way is clear
      if (!cells[ghost2 + direction].classList.contains("wall")) {
        // console.log("ghost 2 says the way is clear");
        cells[ghost2].classList.remove("ghost2");

        ghost2 += direction;
        cells[ghost2].classList.add("ghost2");
      }
    }, 300);
  }
}
while (ghostTwoIsMoving === false) {
  ghost2Mov(randomMovement());
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
  // console.log("sonar fired");
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
  //variables to find column and row
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
        // console.log("i am a wall");
        return;
      }
      if (cell.classList.contains("junction")) {
        // console.log("i am a junction");
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
        // console.log("i am a wall");
        return;
      }
      if (cell.classList.contains("junction")) {
        // console.log("i am a junction");
      }
      cell.classList.add("pacmanClose");
    }
  }
  function columnUp() {
    for (let index = pacmanColumnArrPosition; index >= 0; index--) {
      const cell = pacManColumnArr[index];

      if (cell.classList.contains("wall")) {
        // console.log("i am a wall");
        return;
      }
      if (cell.classList.contains("junction")) {
        // console.log("i am a junction");
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
        // console.log("i am a wall");
        return;
      }
      if (cell.classList.contains("junction")) {
        // console.log("i am a junction");
      }
      cell.classList.add("pacmanClose");
    }
  }
  rowLeft();
  rowRight();
  columnDown();
  columnUp();
}
setInterval(() => {
  sonar();
}, 300);

//for class 'submarine' aka sub1
function submarineTravel(direction) {
  if (!cells[submarine + direction].classList.contains("wall")) {
    // console.log("submarine is moving");
    cells[submarine].classList.remove("submarine");
    submarine += direction;
    cells[submarine].classList.add("submarine");
  }
}

function subLocator() {
  let lastKnownSighting;
  let movBool1 = false;
  //submarine columns
  let submarineColArrPosition = parseInt(cells[submarine].getAttribute("row"));
  let submarineColumn = parseInt(cells[submarine].getAttribute("column"));
  let submarineColArr = cells.filter((cell) => {
    if (
      parseInt(cell.getAttribute("column")) ===
      parseInt(cells[submarine].getAttribute("column"))
    )
      return cell;
  });
  //submarine rows
  let submarineRowArrPosition = parseInt(
    cells[submarine].getAttribute("column")
  );
  let submarineRow = parseInt(cells[submarine].getAttribute("row"));
  let submarineRowArr = cells.filter((cell) => {
    if (
      parseInt(cell.getAttribute("row")) ===
      parseInt(cells[submarine].getAttribute("row"))
    )
      return cell;
  });

  function subColUp() {
    for (let index = submarineColArrPosition; index >= 0; index--) {
      const cell = submarineColArr[index];

      if (cell.classList.contains("wall")) {
        // console.log("i am a wall");
        return;
      }
      if (
        cell.classList.contains("pacman") ||
        cell.classList.contains("pacmanClose")
      ) {
        // console.log("we found him above us");
        // console.log(-width);
        lastKnownSighting = -width;
        movBool1 = true;
        return;
      } else {
        movBool1 = false;
        subColDown();
      }
      cell.classList.add("submarineScan");
    }
  }
  //first function -- checks column below
  function subColDown() {
    for (
      let index = submarineColArrPosition;
      index < submarineColArr.length;
      index++
    ) {
      const cell = submarineColArr[index];

      if (cell.classList.contains("wall")) {
        // console.log("i am a wall");
        return;
      }
      if (
        cell.classList.contains("pacmanClose") ||
        cell.classList.contains("pacman")
      ) {
        // console.log("we found him below us");
        // console.log(width);
        lastKnownSighting = width;
        movBool1 === true;
        return;
      } else {
        movBool1 = false;
      }
      cell.classList.add("submarineScan");
    }
  }

  if (movBool1 === false) {
    // checkRandomMov(randomMovement());
    lastKnownSighting = checkRandomMov(randomMovement());
    // console.log(
    //   checkRandomMov(randomMovement()),
    //   typeof checkRandomMov(randomMovement())
    // );
    // console.log("this is sub1: time for something random");
  }

  submarineTravel(lastKnownSighting);
  subColUp();
}

function clearSubLocator() {
  cells.forEach((cell) => {
    if (cell.classList.contains("submarineScan")) {
      return cell.classList.remove("submarineScan");
    }
  });
  // console.log("all cleared now");
}

setInterval(() => {
  clearSubLocator();
  subLocator();
}, 1000);

function submarine2Travel(direction) {
  if (!cells[submarine2 + direction].classList.contains("wall")) {
    // console.log("submarine 2 is moving");
    cells[submarine2].classList.remove("submarine2");
    submarine2 += direction;
    cells[submarine2].classList.add("submarine2");
  }
}
//sub2 random movement function

function sub2Locator() {
  let lastKnownSighting2;
  let movBool2 = false;
  //submarine columns
  let submarine2ColArrPosition = parseInt(
    cells[submarine2].getAttribute("row")
  );
  let submarine2Column = parseInt(cells[submarine2].getAttribute("column"));
  let submarine2ColArr = cells.filter((cell) => {
    if (
      parseInt(cell.getAttribute("column")) ===
      parseInt(cells[submarine2].getAttribute("column"))
    )
      return cell;
  });
  //submarine rows
  let submarine2RowArrPosition = parseInt(
    cells[submarine2].getAttribute("column")
  );
  let submarine2Row = parseInt(cells[submarine2].getAttribute("row"));
  let submarine2RowArr = cells.filter((cell) => {
    if (
      parseInt(cell.getAttribute("row")) ===
      parseInt(cells[submarine2].getAttribute("row"))
    )
      return cell;
  });
  //first function -- checkes row to left
  function sub2RowLeft() {
    for (let index = submarine2RowArrPosition; index >= 0; index--) {
      const cell = submarine2RowArr[index];

      if (cell.classList.contains("wall")) {
        // console.log("i am a wall");
        return;
      }

      if (
        cell.classList.contains("pacmanClose")
        // cell.classList.contains("pacman")
      ) {
        // console.log("we found him to the left");
        // console.log(-1);
        lastKnownSighting2 = -1;
        movBool2 = true;
        return;
      } else if (cell.classList.contains("pacman")) {
        // console.log("we found him to the left");
        // console.log(-1);
        lastKnownSighting2 = -1;
        movBool2 = true;
        return;
      } else {
        movBool2 = false;
        sub2RowRight();
      }
      cell.classList.add("submarine2Scan");
    }
  }
  //first function -- checks row to right
  function sub2RowRight() {
    for (
      let index = submarine2RowArrPosition;
      index < submarine2RowArr.length;
      index++
    ) {
      const cell = submarine2RowArr[index];

      if (cell.classList.contains("wall")) {
        // console.log("i am a wall");
        return;
      }
      if (
        cell.classList.contains("pacmanClose") ||
        cell.classList.contains(pacman)
      ) {
        // console.log("we found him to the right");
        // console.log(1);
        lastKnownSighting2 = 1;
        movBool2 = true;
        return;
      } else {
        movBool2 = false;
      }
      cell.classList.add("submarine2Scan");
    }
  }
  if (movBool2 === false) {
    lastKnownSighting2 = checkRandomMov(randomMovement());
    // console.log("this is sub2: time for something random");
  }
  sub2RowLeft();

  submarine2Travel(lastKnownSighting2);
}
function clearSubLocator() {
  cells.forEach((cell) => {
    if (cell.classList.contains("submarineScan")) {
      return cell.classList.remove("submarineScan");
    }
  });
  // console.log("all cleared now");
}
function clearSub2Locator() {
  cells.forEach((cell) => {
    if (cell.classList.contains("submarine2Scan")) {
      return cell.classList.remove("submarine2Scan");
    }
  });
  // console.log("all cleared now");
}
setInterval(() => {
  clearSubLocator();
  subLocator();
}, 300);
setInterval(() => {
  clearSub2Locator();
  sub2Locator();
}, 300);

//
//check to see if pacman is in a cell with anyone else
//pseudo code
//run a setinterval to see if he is in the same cell
//if he is clear the set interval
function detectDeath() {
  console.log("detect death has been fired");
  const checker = setInterval(() => {
    if (
      cells[pacman].classList.contains("submarine") ||
      cells[pacman].classList.contains("submarine2") ||
      cells[pacman].classList.contains("ghost1") ||
      cells[pacman].classList.contains("ghost2")
    ) {
      console.log("pacman is dead");
      cells.forEach((cell) => {
        if (cell.classList.contains("pacman")) {
          return cell.classList.remove("pacman");
        }
      });
      pacman = 314;
      clearInterval(directionOfTravel);
      currentLives--;
      lifeSpan.textContent = currentLives;
      deathModal();
    }
  }, 300);
}
detectDeath();
