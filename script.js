const grid = document.querySelector(".grid");
const notifications = document.getElementById("notifications");
notifications.innerHTML = "ON ACTIVE PATROL";
// const modalImg = document.getElementById("modID");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const audioPlayer = document.querySelector("audio");
const speakerButton = document.getElementById("speaker");
const timer = document.getElementById("timer");
const width = 20;
const cells = [];
const jewels = [];
let curScore = 0;
let currentLives = 3;
scoreSpan.textContent = curScore;
const leftMov = -1;
const rightMov = 1;
const upMov = -width;
const downMov = width;
const movArray = [leftMov, rightMov, upMov, downMov];
//declaring variables for setIntervals
let directionOfTravel;
let pacmanOrientation;
let directionOfTravelSubmarine4;
let sub1MovFunc;
let sub2MovFunc;
let sonarTrigger;
let alcoholHunter;
let deathInterval;

// const walls = [];
//types of maps
//MAP 1 classic
const map1Wall = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "160",
  "179",
  "15",
  "395",
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
  "10",
  "11",
  "12",
  "13",
  "14",
  "16",
  "17",
  "18",
  "19",
  "39",
  "59",
  "79",
  "99",
  "119",
  "139",
  "159",
  "199",
  "219",
  "239",
  "259",
  "279",
  "299",
  "319",
  "339",
  "359",
  "379",
  "399",
  "398",
  "397",
  "396",
  "394",
  "393",
  "392",
  "391",
  "390",
  "389",
  "388",
  "387",
  "386",
  "385",
  "384",
  "383",
  "382",
  "381",
  "380",
  "360",
  "340",
  "320",
  "300",
  "280",
  "260",
  "240",
  "220",
  "200",
  "180",
  "140",
  "120",
  "100",
  "80",
  "60",
  "40",
  "20",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
const sanctum1 = [
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
//MAP 2 caverns
const map2Wall = [
  "226",
  "225",
  "224",
  "222",
  "221",
  "233",
  "234",
  "236",
  "237",
  "256",
  "276",
  "296",
  "316",
  "336",
  "244",
  "264",
  "284",
  "304",
  "324",
  "147",
  "167",
  "151",
  "152",
  "172",
  "227",
  "247",
  "248",
  "251",
  "252",
  "232",
  "146",
  "145",
  "144",
  "143",
  "142",
  "140",
  "88",
  "68",
  "48",
  "28",
  "8",
  "0",
  "20",
  "40",
  "60",
  "80",
  "100",
  "120",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "91",
  "71",
  "51",
  "31",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "39",
  "59",
  "79",
  "99",
  "119",
  "139",
  "159",
  "158",
  "157",
  "156",
  "155",
  "154",
  "153",
  "9",
  "10",
  "267",
  "287",
  "307",
  "327",
  "328",
  "331",
  "332",
  "312",
  "292",
  "272",
  "388",
  "387",
  "386",
  "385",
  "384",
  "383",
  "382",
  "381",
  "380",
  "160",
  "180",
  "200",
  "220",
  "240",
  "260",
  "280",
  "300",
  "320",
  "340",
  "360",
  "389",
  "390",
  "391",
  "392",
  "393",
  "394",
  "395",
  "396",
  "397",
  "398",
  "399",
  "179",
  "199",
  "219",
  "239",
  "259",
  "279",
  "299",
  "319",
  "339",
  "359",
  "379",
  "81",
  "82",
  "84",
  "86",
  "87",
  "64",
  "44",
  "92",
  "94",
  "95",
  "96",
  "98",
  "75",
  "55",
  "166",
  "165",
  "164",
  "163",
  "173",
  "174",
  "175",
  "176",
  "148",
];
//MAP 3
//OPEN WATER
const map3Wall = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "22",
  "23",
  "43",
  "42",
  "227",
  "248",
  "195",
  "204",
  "355",
  "375",
  "376",
  "356",
  "322",
  "323",
  "303",
  "76",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "399",
  "398",
  "397",
  "395",
  "396",
  "394",
  "393",
  "392",
  "391",
  "390",
  "389",
  "388",
  "387",
  "386",
  "385",
  "384",
  "383",
  "382",
  "381",
  "380",
];

//MAP 4
//The Channel
const map4Wall = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "385",
  "384",
  "383",
  "382",
  "381",
  "380",
  "120",
  "121",
  "122",
  "123",
  "124",
  "104",
  "105",
  "85",
  "66",
  "47",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "15",
  "16",
  "17",
  "18",
  "19",
  "14",
  "84",
  "65",
  "46",
  "27",
  "8",
  "9",
  "11",
  "12",
  "13",
  "10",
  "7",
  "5",
  "3",
  "1",
  "0",
  "20",
  "40",
  "60",
  "80",
  "100",
  "101",
  "102",
  "103",
  "83",
  "81",
  "82",
  "61",
  "41",
  "21",
  "2",
  "4",
  "6",
  "26",
  "25",
  "24",
  "22",
  "23",
  "42",
  "62",
  "63",
  "64",
  "45",
  "44",
  "43",
  "299",
  "298",
  "297",
  "296",
  "316",
  "315",
  "314",
  "334",
  "333",
  "332",
  "352",
  "351",
  "350",
  "349",
  "369",
  "388",
  "368",
  "387",
  "389",
  "390",
  "391",
  "392",
  "393",
  "395",
  "394",
  "396",
  "398",
  "399",
  "397",
  "379",
  "359",
  "339",
  "319",
  "317",
  "318",
  "338",
  "337",
  "336",
  "335",
  "355",
  "354",
  "353",
  "370",
  "371",
  "372",
  "373",
  "374",
  "375",
  "356",
  "357",
  "358",
  "378",
  "377",
  "376",
  "279",
  "386",
  "302",
  "303",
  "323",
  "284",
  "186",
  "77",
  "76",
  "96",
  "97",
  "236",
  "235",
  "234",
  "255",
  "140",
];
//MAP 5
//LABYRINTH
const map5Wall = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "39",
  "59",
  "79",

  "139",
  "159",
  "179",
  "119",
  "219",
  "239",
  "259",
  "279",
  "299",
  "339",
  "359",
  "379",
  "399",
  "398",
  "397",
  "396",
  "395",
  "394",
  "393",
  "392",
  "391",
  "390",
  "389",
  "388",
  "387",
  "386",
  "385",
  "384",
  "383",
  "382",
  "381",
  "380",
  "20",
  "40",
  "80",
  "60",
  "120",
  "160",
  "140",
  "180",
  "200",
  "199",
  "220",
  "240",
  "260",
  "280",
  "300",
  "340",
  "360",
  "61",
  "62",
  "63",
  "64",
  "65",
  "85",
  "105",
  "125",
  "145",
  "144",
  "143",
  "142",
  "141",
  "278",
  "277",
  "257",
  "256",
  "255",
  "275",
  "295",
  "294",
  "293",
  "313",
  "333",
  "334",
  "335",
  "355",
  "356",
  "357",
  "337",
  "338",
  "148",
  "146",
  "151",
  "153",
  "155",
  "157",
  "116",
  "114",
  "112",
  "107",
  "68",
  "70",
  "72",
  "74",
  "76",
  "29",
  "33",
  "184",
  "183",
  "182",
  "202",
  "203",
  "204",
  "309",
  "310",
  "195",
  "215",
  "227",
  "247",
  "248",
  "232",
  "252",
  "251",
  "311",
  "331",
  "330",
  "329",
  "349",
  "350",
  "351",
  "308",
  "307",
  "306",
  "305",
  "323",
  "322",
  "342",
  "343",
  "264",
  "244",
  "243",
  "242",
  "262",
  "263",
];
//array of maps
const mapArray = [map1Wall, map2Wall, map3Wall, map4Wall, map5Wall];
//basic gameplay functionality
let beginGame;
let counter = 0;
//
let pacman;
let submarine;
let submarine2;
let submarine3;
let submarine4;
let alcohol;
// audio
let sonarAudio;
let sonarIsPlaying = false;
//buttons
startButton.addEventListener("click", () => {
  //begin set interval
  startButton.style.display = "none";
  resetButton.style.display = "block";
  beginGamePlay();
  audioToggle();
  timeLapse();
});
resetButton.addEventListener("click", () => {
  document.querySelector(".hero").scrollIntoView();
  location.reload();
});
function gameEnd() {
  cells.forEach((cell) => {
    cell.classList.remove("notBarrier");
    cell.classList.remove("junction");
    cell.classList.remove("sanctum");
    cell.classList.remove("alcohol");
    cell.classList.remove("jewel");
    cell.classList.remove("pacmanClose");
    cell.classList.add("endCell");
    cell.style.color = "black";
  });
  clearInterval(directionOfTravel);
  clearInterval(directionOfTravelSubmarine4);
  clearInterval(sub1MovFunc);
  clearInterval(sub2MovFunc);
  clearInterval(sonarTrigger);
  clearInterval(alcoholHunter);
  cells[pacman].classList.remove("pacman");
  cells[submarine].classList.remove("submarine");
  cells[submarine2].classList.remove("submarine2");
  cells[submarine3].classList.remove("submarine3");
  cells[submarine4].classList.remove("submarine4");
  cells[alcohol].classList.remove("alcohol");
  scoreSpan.textContent = "";
  timer.innerHTML = "GAME OVER";
  notifications.innerHTML = "GAME OVER";
  document.getElementById("putin").style.display = "block";
  setTimeout(() => {
    document.querySelector(".hero").scrollIntoView();
    location.reload();
  }, 3500);
}
// stopButton.addEventListener("click", gameEnd);
function audioToggle() {
  console.log("audio toggle has been fired");
  if (sonarIsPlaying === true) {
    audioOff();
  } else if (sonarIsPlaying === false) {
    audioOn();
  }
}
function audioOff() {
  document.getElementById("speaker").src = "speaker.png";
  clearInterval(sonarAudio);
  sonarIsPlaying = false;
  return;
}
function audioOn() {
  document.getElementById("speaker").src = "speaker1.png";
  sonarAudio = setInterval(() => {
    audioPlayer.play();
  }, 2500);
  sonarIsPlaying = true;
  return;
}
speakerButton.addEventListener("click", () => {
  console.log("the speaker button has been hit");
  audioToggle();
});
const mapChoice = document.querySelectorAll(".mapChoice");
mapChoice.forEach((button, index) => {
  button.setAttribute("map", index);
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const selection = parseInt(event.target.getAttribute("map"));
    buildWall(selection);
    document.getElementById("grid").scrollIntoView();
    document.querySelector(".maps").innerHTML = "<h2>PICK A MAP</h2>";
  });
});
//assigning the map
function buildWall(selection) {
  let sanctum = sanctum1;
  ///
  let walls = mapArray[selection];
  //
  const scoreSpan = document.getElementById("scoreSpan");
  const lifeSpan = document.getElementById("lifeSpan");
  const highScoreSpan = document.getElementById("highScore");
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
    // cell.innerHTML = index;
    cell.style.width = 100 / width + "%";
    cell.style.height = 100 / width + "%";
  }

  //building the walls

  walls.forEach((cell) => {
    cells[cell].classList.add("wall");
  });
  //building sanctum
  sanctum.forEach((cell) => {
    cells[cell].classList.add("sanctum");
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

    if (neighbours.length === 3) {
      cells[cellLoc].classList.add("junction");
    }
  }
  cells.forEach((cell) => {
    if (
      cell.classList.contains("wall") &&
      cell.classList.contains("junction")
    ) {
      return cell.classList.remove("junction");
    }
  });
}

//locating pacman
//pacman
function beginGamePlay() {
  cells.forEach((cell) => {
    if (
      !cell.classList.contains("wall") &&
      !cell.classList.contains("sanctum") &&
      !cell.classList.contains("pacman")
    ) {
      cell.classList.add("jewel");
      jewels.push(cell);
    }
  });
  // make pacman

  pacman = pacmanCreator();
  cells[pacman].classList.add("pacman");
  //make subs
  submarine = sub1Creator();
  submarine2 = sub2Creator();
  submarine3 = sub3Creator();
  submarine4 = sub4Creator();
  cells[submarine].classList.add("submarine");
  cells[submarine2].classList.add("submarine2");
  cells[submarine3].classList.add("submarine3");
  cells[submarine4].classList.add("submarine4");
  //alcohol prize creator
  alcohol = alcoholCreator();
  cells[alcohol].classList.add("alcohol");
  // creation code
  function pacmanCreator() {
    const randJewel = Math.floor(Math.random() * jewels.length);
    // console.log(parseInt(jewels[randJewel].id));
    return parseInt(jewels[randJewel].id);
  }
  //sub creators
  function sub1Creator() {
    const filteredSanctum = sanctum1.filter((cell) => {
      if (!cells[cell].classList.contains("wall")) {
        return cell;
      }
    });
    return (submarineGen = parseInt(
      filteredSanctum[Math.floor(Math.random() * filteredSanctum.length)]
    ));
  }
  function sub2Creator() {
    const filteredSanctum = sanctum1.filter((cell) => {
      if (!cells[cell].classList.contains("wall")) {
        return cell;
      }
    });
    return (submarine2Gen = parseInt(
      filteredSanctum[Math.floor(Math.random() * filteredSanctum.length)]
    ));
  }
  function sub3Creator() {
    const filteredSanctum = sanctum1.filter((cell) => {
      if (!cells[cell].classList.contains("wall")) {
        return cell;
      }
    });
    return (submarine3Gen = parseInt(
      filteredSanctum[Math.floor(Math.random() * filteredSanctum.length)]
    ));
  }
  function sub4Creator() {
    const filteredSanctum = sanctum1.filter((cell) => {
      if (!cells[cell].classList.contains("wall")) {
        return cell;
      }
    });
    return (submarine4Gen = parseInt(
      filteredSanctum[Math.floor(Math.random() * filteredSanctum.length)]
    ));
  }
  function alcoholCreator() {
    const randJewel = Math.floor(Math.random() * jewels.length);
    // console.log(parseInt(jewels[randJewel].id));
    return parseInt(jewels[randJewel].id);
  }

  // submarine movement code
  // let directionOfTravel;

  document.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
      console.log(`You hit ${event.key}`);
      pacmanOrientation = "rotateZ(-0.25turn)";
      movChange(upMov);
    }
    if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
      console.log(`You hit ${event.key}`);
      pacmanOrientation = "rotateY(3.142rad)";
      movChange(leftMov);
    }
    if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
      console.log(`You hit ${event.key}`);
      pacmanOrientation = "rotateZ(90deg)";
      movChange(downMov);
    }
    if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
      console.log(`You hit ${event.key}`);
      pacmanOrientation = "rotateY(0deg)";
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
        //clears if hits an obstacle
        if (cells[pacman + direction].classList.contains("wall")) {
          clearInterval(directionOfTravel);
          console.log("interval cleared");
          keyControl = 0;
        }
        //continues if the way is clear
        if (!cells[pacman + direction].classList.contains("wall")) {
          // console.log("the way is clear");
          cells[pacman].style.transform = "rotateY(0deg)";
          cells[pacman].classList.remove("pacman");

          if (cells[pacman + direction].classList.contains("jewel")) {
            cells[pacman + direction].classList.remove("jewel");
            console.log("you have eaten a jewel");
            curScore++;
            jewels.pop();
            console.log("jewels.length is", jewels.length);
            if (jewels.length === 0) {
              notifications.innerHTML = "😎YOU WIN😎";
              notifications.style.fontSize = "50px";
              gameEnd();
            }
            console.log(curScore);
            scoreSpan.textContent = curScore;
            console.log(scoreSpan.textContent);
          }
          pacman += direction;
          cells[pacman].classList.add("pacman");
          cells[pacman].style.transform = pacmanOrientation;
        }
      }, 400);
    }
  }
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
  sonarTrigger = setInterval(() => {
    sonar();
  }, 2000);
  //submarine movement
  //pseudo code
  function findPacMan() {
    //is a pacman trace in my column?
    //check all cells with same column id
    let colTraces;
    //is pacman in my column?
    if (
      parseInt(cells[pacman].getAttribute("column")) ===
      parseInt(cells[submarine].getAttribute("column"))
    ) {
      // console.log("we are in the same column");
      if (
        parseInt(cells[pacman].getAttribute("row")) >
        parseInt(cells[submarine].getAttribute("row"))
      ) {
        // console.log("pacman is below me");
        return width;
      } else {
        // console.log("pacman is above me");
        return -width;
      }
    }
    // is pacman in my row?
    else if (
      parseInt(cells[pacman].getAttribute("row")) ===
      parseInt(cells[submarine].getAttribute("row"))
    ) {
      // console.log("we are in the same row");
      if (
        parseInt(cells[pacman].getAttribute("column")) >
        parseInt(cells[submarine].getAttribute("column"))
      ) {
        // console.log("pacman is to my right");
        return 1;
      } else {
        // console.log("pacman is to my left");
        return -1;
      }
    }
    const checkCol = cells.some((cell) => {
      if (
        cell.getAttribute("column") ===
          cells[submarine].getAttribute("column") &&
        cell.classList.contains("pacmanClose")
      ) {
        // console.log("this is working", cell, cell.id);
        colTraces = parseInt(cell.getAttribute("row"));
        // console.log("this is coltraces", colTraces);
        return cell;
      }
    });
    // console.log("this is checkCol", checkCol);
    if (checkCol) {
      // console.log("we have found a trace");
      if (colTraces > parseInt(cells[submarine].getAttribute("row"))) {
        // console.log("pacman is below me");
        return width;
      } else {
        // console.log("pacman is above me");
        return -width;
      }
    }
    if (
      parseInt(cells[pacman].getAttribute("row")) !==
        parseInt(cells[submarine].getAttribute("row")) &&
      parseInt(cells[pacman].getAttribute("column")) !==
        parseInt(cells[submarine].getAttribute("column"))
    ) {
      return movArray[Math.floor(Math.random() * 4)];
    }
  }
  // let newDirection = findPacMan();
  function directionCheck(direction) {
    // console.log("this is the direction", direction);
    let movDirection = direction;
    let proposedCell = parseInt(cells[submarine].id) + movDirection;
    if (cells[proposedCell].classList.contains("wall")) {
      let potCell = parseInt(cells[submarine].id);
      const option1 = -1;
      const option2 = 1;
      const option3 = -width;
      const option4 = width;
      const options = [option1, option2, option3, option4];
      const filteredOptions = options.filter((option) => {
        if (!cells[potCell + option].classList.contains("wall")) {
          return option;
        }
      });
      movDirection = parseInt(
        filteredOptions[Math.floor(Math.random() * filteredOptions.length)]
      );
    } else if (!cells[proposedCell].classList.contains("wall"));
    {
      // console.log("this is not a wall");
      //moves into this cell
      cells[submarine].classList.remove("submarine");
      // console.log("submarine is now here", submarine, typeof submarine);
      submarine += movDirection;
      // console.log("submarine is now here", submarine);
      cells[submarine].classList.add("submarine");
    }
    // if (!proposedCell.classList.contains("wall")) {
    //   console.log("this is a wall");
    // } else {
    //   console.log("this is not a wall");
  }
  // if (cells[submarine + direction].classList.contains("wall")) {
  //   console.log("this cell is not a wall");
  // }
  sub1MovFunc = setInterval(() => {
    let newDirection = findPacMan();
    directionCheck(newDirection);
  }, 550);

  //SUBMARINE 2 MOVEMENT
  function findPacMan2() {
    //is a pacman trace in my column?
    //check all cells with same column id
    let rowTraces;
    //is pacman in my column?
    if (
      parseInt(cells[pacman].getAttribute("column")) ===
      parseInt(cells[submarine2].getAttribute("column"))
    ) {
      // console.log("we are in the same column");
      if (
        parseInt(cells[pacman].getAttribute("row")) >
        parseInt(cells[submarine2].getAttribute("row"))
      ) {
        // console.log("pacman is below me");
        return width;
      } else {
        // console.log("pacman is above me");
        return -width;
      }
    }
    // is pacman in my row?
    else if (
      parseInt(cells[pacman].getAttribute("row")) ===
      parseInt(cells[submarine2].getAttribute("row"))
    ) {
      // console.log("we are in the same row");
      if (
        parseInt(cells[pacman].getAttribute("column")) >
        parseInt(cells[submarine2].getAttribute("column"))
      ) {
        // console.log("pacman is to my right");
        return 1;
      } else {
        // console.log("pacman is to my left");
        return -1;
      }
    }
    const checkRow = cells.some((cell) => {
      if (
        cell.getAttribute("row") === cells[submarine2].getAttribute("row") &&
        cell.classList.contains("pacmanClose")
      ) {
        // console.log("this is working", cell, cell.id);
        rowTraces = parseInt(cell.getAttribute("column"));
        // console.log("this is rowtraces", rowTraces);
        return cell;
      }
    });
    // console.log("this is checkRow", checkRow);
    if (checkRow) {
      // console.log("we have found a trace");
      if (rowTraces > parseInt(cells[submarine2].getAttribute("column"))) {
        // console.log("pacman is to my right");
        return 1;
      } else {
        // console.log("pacman is to my left");
        return -1;
      }
    }
    if (
      parseInt(cells[pacman].getAttribute("row")) !==
        parseInt(cells[submarine2].getAttribute("row")) &&
      parseInt(cells[pacman].getAttribute("column")) !==
        parseInt(cells[submarine2].getAttribute("column"))
    ) {
      return movArray[Math.floor(Math.random() * 4)];
    }
  }
  // let newDirection = findPacMan();
  function directionCheck2(direction) {
    // console.log("this is the direction", direction);
    let movDirection = direction;
    let proposedCell = parseInt(cells[submarine2].id) + movDirection;
    if (cells[proposedCell].classList.contains("wall")) {
      // console.log("this is a wall");
      let potCell = parseInt(cells[submarine2].id);
      const option1 = -1;
      const option2 = 1;
      const option3 = -width;
      const option4 = width;
      const options = [option1, option2, option3, option4];
      const filteredOptions = options.filter((option) => {
        if (!cells[potCell + option].classList.contains("wall")) {
          return option;
        }
      });
      movDirection = parseInt(
        filteredOptions[Math.floor(Math.random() * filteredOptions.length)]
      );
      //don't let it move
    } else if (!cells[proposedCell].classList.contains("wall"));
    {
      //moves into this cell
      cells[submarine2].classList.remove("submarine2");
      submarine2 += movDirection;
      cells[submarine2].classList.add("submarine2");
    }
  }
  //
  // }
  sub2MovFunc = setInterval(() => {
    let newDirection = findPacMan2();
    directionCheck2(newDirection);
  }, 550);

  //modal triggered on death
  function deathModal() {
    notifications.innerHTML = `💀 YOU LOST A LIFE 💀 `;
    deathInterval = setTimeout(() => {
      notifications.innerHTML = "ON ACTIVE PATROL";
    }, 2000);
  }
  //submarine 3 patrols for booze
  //SUBMARINE 3 MOVEMENT
  function findAlcohol() {
    //check all cells with same column id
    //is alcohol in my column?
    if (
      parseInt(cells[alcohol].getAttribute("column")) ===
      parseInt(cells[submarine3].getAttribute("column"))
    ) {
      // console.log("we are in the same column as booze");
      if (
        parseInt(cells[alcohol].getAttribute("row")) >
        parseInt(cells[submarine3].getAttribute("row"))
      ) {
        // console.log("booze is below me");
        return width;
      } else {
        // console.log("booze is above me");
        return -width;
      }
    }
    //check all cells with same row id
    // is alcohol in my row?
    else if (
      parseInt(cells[alcohol].getAttribute("row")) ===
      parseInt(cells[submarine3].getAttribute("row"))
    ) {
      // console.log("we are in the same row as booze");
      if (
        parseInt(cells[alcohol].getAttribute("column")) >
        parseInt(cells[submarine3].getAttribute("column"))
      ) {
        // console.log("booze is to my right");
        return 1;
      } else {
        // console.log("booze is to my left");
        return -1;
      }
    }

    if (
      parseInt(cells[alcohol].getAttribute("row")) !==
        parseInt(cells[submarine3].getAttribute("row")) &&
      parseInt(cells[alcohol].getAttribute("column")) !==
        parseInt(cells[submarine3].getAttribute("column"))
    ) {
      return movArray[Math.floor(Math.random() * 4)];
    }
  }
  // let newDirection = findPacMan();
  function directionCheck3(direction) {
    // console.log("this is the direction", direction);
    let movDirection = direction;
    let proposedCell = parseInt(cells[submarine3].id) + movDirection;
    if (cells[proposedCell].classList.contains("wall")) {
      // console.log("this is a wall");
      let potCell = parseInt(cells[submarine3].id);
      const option1 = -1;
      const option2 = 1;
      const option3 = -width;
      const option4 = width;
      const options = [option1, option2, option3, option4];
      const filteredOptions = options.filter((option) => {
        if (!cells[potCell + option].classList.contains("wall")) {
          return option;
        }
      });
      movDirection = parseInt(
        filteredOptions[Math.floor(Math.random() * filteredOptions.length)]
      );
      //don't let it move
    } else if (!cells[proposedCell].classList.contains("wall"));
    {
      //moves into this cell
      cells[submarine3].classList.remove("submarine3");
      submarine3 += movDirection;
      cells[submarine3].classList.add("submarine3");
    }
  }
  //
  // }
  alcoholHunter = setInterval(() => {
    let newDirection = findAlcohol();
    directionCheck3(newDirection);
  }, 400);

  //detecting contacts between pacman and ghosts
  function detectDeath() {
    console.log("detect death has been fired");
    const checker = setInterval(() => {
      if (
        cells[pacman].classList.contains("submarine") ||
        cells[pacman].classList.contains("submarine2") ||
        cells[pacman].classList.contains("submarine3") ||
        cells[pacman].classList.contains("submarine4")
      ) {
        console.log("pacman is dead");
        cells.forEach((cell) => {
          if (cell.classList.contains("pacman")) {
            return cell.classList.remove("pacman");
          }
        });
        pacman = pacmanCreator();
        clearInterval(directionOfTravel);
        currentLives--;
        if (currentLives > 0) {
          deathModal();
        } else if (currentLives < 1) {
          gameEnd();
          clearInterval(deathInterval);
          notifications.innerHTML = "😭YOU LOSE😭";
          notifications.style.fontSize = "50px";
        }

        lifeSpan.textContent = currentLives;
      }
    }, 150);
  }
  detectDeath();
  //detecting if Pacman drinks the alcohol
  function detectAlcohol() {
    console.log("detect alcohol has been fired");
    const checker = setInterval(() => {
      if (cells[alcohol].classList.contains("pacman")) {
        console.log("alcohol consumed by pacman");
        cells.forEach((cell) => {
          if (cell.classList.contains("alcohol")) {
            return cell.classList.remove("alcohol");
          }
        });
        currentLives++;
        lifeSpan.textContent = currentLives;
        notifications.innerHTML = `♥️YOU GAINED A LIFE♥️`;
        setTimeout(() => {
          notifications.innerHTML = "ON ACTIVE PATROL";
        }, 2000);
        // setTimeout(() => {
        alcohol = alcoholCreator();
        cells[alcohol].classList.add("alcohol");
        cells[alcohol].style.transform = "rotateY(0deg)";
        // }, 2000);
      }
      if (
        cells[alcohol].classList.contains("submarine3") ||
        cells[alcohol].classList.contains("submarine1") ||
        cells[alcohol].classList.contains("submarine2") ||
        cells[alcohol].classList.contains("submarine4")
      ) {
        console.log("alcohol consumed by submarine");
        cells.forEach((cell) => {
          if (cell.classList.contains("alcohol")) {
            return cell.classList.remove("alcohol");
          }
        });
        // setTimeout(() => {
        alcohol = alcoholCreator();
        cells[alcohol].classList.add("alcohol");
        // }, 2000);
      }
    }, 200);
  }
  detectAlcohol();

  //submarine 4
  //does a random movement and continues in that direction until he hits an obstacle
  //ghost movements -- random
  const randomMovement = function () {
    let randomNum = Math.floor(Math.random() * 4);
    let randomMov = movArray[randomNum];
    return randomMov;
  };
  //main movement code
  function submarine4Mov(direction) {
    // submarine4IsMoving = true;
    // console.log(`${ghostOneIsMoving}`);
    if (cells[submarine4 + direction].classList.contains("wall")) {
      console.log("the fail safe has been triggered");
      clearInterval(directionOfTravelSubmarine4);
      submarine4Mov(randomMovement());
      // console.log(`${ghostOneIsMoving}`);
      return;
    }
    //if it is, trigger set interval
    else if (!cells[submarine4 + direction].classList.contains("wall")) {
      clearInterval(directionOfTravelSubmarine4);
      directionOfTravelSubmarine4 = setInterval(() => {
        console.log("sub4 is  now moving");

        //rotation
        //to come
        //clears if hits an obstacle
        if (cells[submarine4 + direction].classList.contains("wall")) {
          clearInterval(directionOfTravelSubmarine4);
          console.log("sub4 hit an obstacle");

          submarine4Mov(randomMovement());
          // console.log(`${ghostOneIsMoving}`);
          // keyControl = 0;
        }
        if (cells[submarine4 + direction].classList.contains("junction")) {
          clearInterval(directionOfTravelSubmarine4);
          // console.log("interval cleared for a junction");
          // submarine4IsMoving = false;
          submarine4Mov(randomMovement());
          // console.log(`${ghostOneIsMoving}`);
          // keyControl = 0;
        }
        //continues if the way is clear
        if (!cells[submarine4 + direction].classList.contains("wall")) {
          // console.log("ghost says the way is clear");
          cells[submarine4].classList.remove("submarine4");
          submarine4 += direction;
          cells[submarine4].classList.add("submarine4");
        }
      }, 400);
    }
  }
  // while (submarine4IsMoving === false) {
  submarine4Mov(randomMovement());
}
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let rawCount = 0;
function timeLapse() {
  const millisec = setInterval(() => {
    rawCount++;
    milliseconds++;
    if (milliseconds === 1000) {
      milliseconds = 0;
    }
    // console.log(milliseconds);
    document.getElementById(
      "milliseconds"
    ).innerHTML = milliseconds.toString().padStart("3", 0);
  }, 10);
  const secMin = setInterval(() => {
    seconds++;
    document.getElementById(
      "seconds"
    ).innerHTML = `${seconds.toString().padStart("2", 0)}:`;

    if (seconds > 59) {
      seconds = 0;
      minutes++;
      document.getElementById(
        "minutes"
      ).innerHTML = `${minutes.toString().padStart("2", 0)}:`;
    }
    if (minutes > 2) {
      // notifications.innerHTML = ;
      gameEnd();
      document.getElementById("timer").innerHTML = "⏰TIME'S UP!⏰";
    }
    if (minutes === 1 && seconds === 59) {
      notifications.innerHTML = "⏰ONE MINUTE LEFT⏰";
      setTimeout(() => {
        notifications.innerHTML = "ON ACTIVE PATROL";
      }, 2000);
    }
    if (minutes === 0 && seconds === 59) {
      notifications.innerHTML = "⏰TWO MINUTES LEFT⏰";
      setTimeout(() => {
        notifications.innerHTML = "ON ACTIVE PATROL";
      }, 2000);
    }
  }, 1000);
}

// const tempArray = [];
// grid.addEventListener("click", (event) => {
//   console.log(event.target.id);
//   event.target.classList.add("sanctum5");
//   tempArray.push(event.target.id);
//   console.log(tempArray);
// });
