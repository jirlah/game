const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000; // Map luas
canvas.height = 600;

const assets = {
    player: new Image(),
    grass: new Image(),
    dirt: new Image(),
    stone: new Image(),
    wood: new Image()
};

assets.player.src = "assets/player.png";
assets.grass.src = "assets/grass.png";
assets.dirt.src = "assets/dirt.png";
assets.stone.src = "assets/stone.png";
assets.wood.src = "assets/wood.png";

const player = { x: 100, y: 500, width: 30, height: 50, speed: 5, velocityY: 0, jumping: false };
const gravity = 0.5;
const blocks = [];
const inventory = ["empty", "grass", "dirt", "stone", "wood"];
let selectedBlock = "empty"; 

// Buat tanah awal
for (let i = 0; i < 25; i++) {
    blocks.push({ x: i * 40, y: 550, type: "grass" });
}

// Gambar game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Gambar player
    ctx.drawImage(assets.player, player.x, player.y, player.width, player.height);
    
    // Gambar blok
    blocks.forEach(block => {
        ctx.drawImage(assets[block.type], block.x, block.y, 40, 40);
    });

    requestAnimationFrame(draw);
}

// Gerakan
function moveLeft() { player.x -= player.speed; }
function moveRight() { player.x += player.speed; }
function jump() {
    if (!player.jumping) {
        player.velocityY = -10;
        player.jumping = true;
    }
}

// Update posisi
function update() {
    player.y += player.velocityY;
    player.velocityY += gravity;
    
    if (player.y >= 500) { 
        player.y = 500;
        player.jumping = false;
    }
    
    requestAnimationFrame(update);
}

// Pilih blok di inventori
function selectBlock(type) {
    selectedBlock = type;
}

// Hancurkan blok
canvas.addEventListener("click", (event) => {
    const clickX = event.clientX - canvas.offsetLeft;
    const clickY = event.clientY - canvas.offsetTop;
    
    blocks.forEach((block, index) => {
        if (clickX > block.x && clickX < block.x + 40 &&
            clickY > block.y && clickY < block.y + 40) {
            if (selectedBlock === "empty") {
                blocks.splice(index, 1);
            }
        }
    });
});

// Letakkan blok baru
canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if (selectedBlock !== "empty") {
        const clickX = Math.floor((event.clientX - canvas.offsetLeft) / 40) * 40;
        const clickY = Math.floor((event.clientY - canvas.offsetTop) / 40) * 40;
        
        if (!blocks.some(block => block.x === clickX && block.y === clickY)) {
            blocks.push({ x: clickX, y: clickY, type: selectedBlock });
        }
    }
});

// Mulai game
draw();
update();
