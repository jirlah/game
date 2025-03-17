const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load gambar blok
const blockImages = {
    grass: new Image(),
    dirt: new Image(),
    stone: new Image(),
    wood: new Image()
};

blockImages.grass.src = "assets/blocks/grass.png";
blockImages.dirt.src = "assets/blocks/dirt.png";
blockImages.stone.src = "assets/blocks/stone.png";
blockImages.wood.src = "assets/blocks/wood.png";

// Grid dunia
const world = [];
const worldWidth = 50;
const worldHeight = 20;
const blockSize = 32;

// Buat dunia dengan blok acak
for (let y = 0; y < worldHeight; y++) {
    let row = [];
    for (let x = 0; x < worldWidth; x++) {
        if (y < 10) row.push("grass");
        else if (y < 15) row.push("dirt");
        else row.push("stone");
    }
    world.push(row);
}

// Render dunia
function drawWorld() {
    for (let y = 0; y < worldHeight; y++) {
        for (let x = 0; x < worldWidth; x++) {
            const blockType = world[y][x];
            ctx.drawImage(blockImages[blockType], x * blockSize, y * blockSize, blockSize, blockSize);
        }
    }
}

// Pemain
const player = {
    x: 5,
    y: 5,
    width: 32,
    height: 32,
    speed: 5
};

// Input kontrol
const keys = {
    left: false,
    right: false,
    jump: false
};

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") keys.left = true;
    if (e.key === "ArrowRight") keys.right = true;
    if (e.key === " ") keys.jump = true;
});

window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") keys.left = false;
    if (e.key === "ArrowRight") keys.right = false;
    if (e.key === " ") keys.jump = false;
});

// Update game
function update() {
    if (keys.left) player.x -= player.speed;
    if (keys.right) player.x += player.speed;
}

// Render game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWorld();
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Loop game
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
