const board = document.getElementById("board");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("start");
let holes = [];
let timeLeft = 30;
let score = 0;
let gameInterval, moleInterval;
function setup(){
  board.innerHTML = "";
  for(let i=0;i<9;i++){
    const hole = document.createElement("div");
    hole.className = "hole";
    const mole = document.createElement("div");
    mole.className = "mole";
    mole.dataset.up = "false";
    hole.appendChild(mole);
    hole.addEventListener("click", () => {
      if(mole.classList.contains("up")) {
        score++;
        mole.classList.remove("up");
        mole.dataset.up = "false";
        scoreEl.innerText = score;
      }
    });
    holes.push(mole);
    board.appendChild(hole);
  }
}
function showRandomMole(){
  const i = Math.floor(Math.random()*holes.length);
  const mole = holes[i];
  if(mole.dataset.up === "true") return;
  mole.classList.add("up");
  mole.dataset.up = "true";
  setTimeout(()=> {
    mole.classList.remove("up");
    mole.dataset.up = "false";
  }, 700);
}
function startGame(){
  clearIntervals();
  timeLeft = 30;
  score = 0;
  scoreEl.innerText = score;
  timeEl.innerText = timeLeft;
  gameInterval = setInterval(()=> {
    timeLeft--;
    timeEl.innerText = timeLeft;
    if(timeLeft <= 0) {
      clearIntervals();
      alert(`Time's up! Score: ${score}`);
    }
  }, 1000);
  moleInterval = setInterval(showRandomMole, 600);
}
function clearIntervals(){
  clearInterval(gameInterval);
  clearInterval(moleInterval);
}
startBtn.addEventListener("click", startGame);
setup();
