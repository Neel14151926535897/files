// === Assets ===
const dinoImg = new Image();
dinoImg.src = 'dino.png'; // Ensure this path is correct

const cactusImg = new Image();
cactusImg.src = 'cactus.webp'; // Ensure this path is correct

// === Canvas Setup ===
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const groundY = 350;

// === Cactus Class ===
class Cactus {
  constructor(x) {
    this.x = x;
    this.y = groundY;
    this.width = 20;
    this.height = 40;
  }
  update() {
    this.x -= 5;
  }
  draw() {
    ctx.drawImage(cactusImg, this.x, this.y, this.width, this.height);
  }
}

// === Dino Class ===
class Dino {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 44;
    this.height = 44;
    this.velocityY = 0;
    this.alive = true;
  }
  jump() {
    if (this.y === groundY) this.velocityY = -10;
  }
  update() {
    this.velocityY += 0.5;
    this.y += this.velocityY;
    if (this.y > groundY) {
      this.y = groundY;
      this.velocityY = 0;
    }
  }
  draw() {
    ctx.drawImage(dinoImg, this.x, this.y, this.width, this.height);
  }
}

// === AI Dino Class ===
class AIDino extends Dino {
  constructor(x, y) {
    super(x, y);
  }
  decide(obstacles) {
    const closestCactus = obstacles.find(cactus => cactus.x > this.x && cactus.x < this.x + 100);
    if (closestCactus && closestCactus.x - this.x < 50) {
      this.jump();
    }
  }
}

// === Game Setup ===
const dinos = [];
for (let i = 0; i < 500; i++) {
  dinos.push(new AIDino(50, groundY));
}

const obstacles = [new Cactus(500), new Cactus(800), new Cactus(1100)];

// === Game Loop ===
function updateDinos() {
  dinos.forEach(dino => {
    if (!dino.alive) return;
    dino.decide(obstacles);
    dino.update();
    obstacles.forEach(cactus => {
      if (dino.x < cactus.x + cactus.width && dino.x + dino.width > cactus.x &&
          dino.y < cactus.y + cactus.height && dino.y + dino.height > cactus.y) {
        dino.alive = false;
      }
    });
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateDinos();
  dinos.forEach(dino => dino.draw());
  obstacles.forEach(cactus => {
    cactus.update();
    cactus.draw();
  });
  document.getElementById('aliveCount').textContent = `Alive Dinos: ${dinos.filter(dino => dino.alive).length}`;
  requestAnimationFrame(gameLoop);
}

gameLoop();
