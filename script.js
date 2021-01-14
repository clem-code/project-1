const grid = document.querySelector(".grid");
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
];

let pacman = 312;

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
  console.log(typeof idWall);
  document.getElementById(idWall).classList.add("wall");
});

//locating pacman
cells[pacman].classList.remove("pacman");
pacman += 1;
cells[pacman].classList.add("pacman");
// moving pacman
let rightDirection = 0;
let leftDirection = 0;
let upDirection = 0;
let downDirection = 0;
let downwards;
let upwards;
let right;
let left;

document.addEventListener("keyup", (event) => {
  stopMov();
  if (event.key === "d") {
    if (rightDirection === 0) {
      right = setInterval(() => {
        console.log(`Rightdirection is ${rightDirection}`);
        console.log("I am now going right");
        if (cells[pacman + 1].classList.contains("wall")) {
          clearInterval(right);
          console.log("interval cleared");
          rightDirection = 0;
          console.log(`Rightdirection is ${rightDirection}`);
        }
        if (!cells[pacman + 1].classList.contains("wall")) {
          cells[pacman].classList.remove("pacman");
          pacman += 1;
          cells[pacman].classList.add("pacman");
        }
      }, 650);
    }
    rightDirection++;
  }
  if (event.key === "a") {
    if (leftDirection === 0) {
      left = setInterval(() => {
        console.log(`leftdirection is ${leftDirection}`);
        console.log("I am now going left");
        if (cells[pacman - 1].classList.contains("wall")) {
          clearInterval(left);
          console.log("interval cleared");
          leftDirection = 0;
          console.log(`leftdirection is ${leftDirection}`);
        }
        if (!cells[pacman - 1].classList.contains("wall")) {
          cells[pacman].classList.remove("pacman");
          pacman -= 1;
          cells[pacman].classList.add("pacman");
        }
      }, 650);
    }
    leftDirection++;
  }
  if (event.key === "w") {
    if (upDirection === 0) {
      upwards = setInterval(() => {
        console.log(`updirection is ${upDirection}`);
        console.log("I am now going up");
        if (cells[pacman - width].classList.contains("wall")) {
          clearInterval(upwards);
          console.log("interval cleared");
          upDirection = 0;
          console.log(`updirection is ${upDirection}`);
        }
        if (!cells[pacman - width].classList.contains("wall")) {
          cells[pacman].classList.remove("pacman");
          pacman -= width;
          cells[pacman].classList.add("pacman");
        }
      }, 650);
    }
    upDirection++;
  }
  if (event.key === "s") {
    if (downDirection === 0) {
      downwards = setInterval(() => {
        console.log(`downdirection is ${downDirection}`);
        console.log("I am now going down");
        if (cells[pacman + width].classList.contains("wall")) {
          clearInterval(downwards);
          console.log("interval cleared");
          downDirection = 0;
          console.log(`downdirection is ${downDirection}`);
        }
        if (!cells[pacman + width].classList.contains("wall")) {
          cells[pacman].classList.remove("pacman");
          pacman += width;
          cells[pacman].classList.add("pacman");
        }
      }, 650);
    }
    downDirection++;
  }
});
function stopMov() {
  clearInterval(right);
  clearInterval(left);
  clearInterval(upwards);
  clearInterval(downwards);
  rightDirection = 0;
  leftDirection = 0;
  upDirection = 0;
  downDirection = 0;
}
// cells[harry].classList.remove('harry')
//     harry += 1
//     cells[harry].classList.add('harry')
