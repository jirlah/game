const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

// Gambar blok
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
const inventory = ["grass", "dirt", "stone", "wood"];
let selectedBlock = "grass";

// Buat tanah awal
for (let i = 0; i < 10; i++) {
    blocks.push({ x: i * 50, y: 550, type: "dirt", durability: 3 });
}

// Event keyboard untuk gerakan
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") player.x += player.speed;
    if (event.key === "ArrowLeft") player.x -= player.speed;
    if (event.key === "ArrowUp" && !player.jumping) {
        player.velocityY = -10;
        player.jumping = true;
    }
});

// Kontrol Mobile
document.getElementById("left").addEventListener("click", () => player.x -= player.speed);
document.getElementById("right").addEventListener("click", () => player.x += player.speed);
document.getElementById("jump").addEventListener("click", () => {
    if (!player.jumping) {
        player.velocityY = -10;
        player.jumping = true;
    }
});

// Event untuk klik atau sentuhan (HP)
canvas.addEventListener("pointerdown", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let blockDestroyed = false;
    
    for (let i = 0; i < blocks.length; i++) {
        if (mouseX > blocks[i].x && mouseX < blocks[i].x + 50 &&
            mouseY > blocks[i].y && mouseY < blocks[i].y + 50) {
            
            blocks[i].durability -= 1;
            if (blocks[i].durability <= 0) {
                blocks.splice(i, 1);
            }
            blockDestroyed = true;
            break;
        }
    }

    // Jika tidak ada blok yang dihancurkan, tambahkan blok baru
    if (!blockDestroyed) {
        blocks.push({ 
            x: Math.floor(mouseX / 50) * 50, 
            y: Math.floor(mouseY / 50) * 50, 
            type: selectedBlock, 
            durability: 3 
        });
    }
});

// Render game
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar pemain
    ctx.drawImage(assets.player, player.x, player.y, player.width, player.height);

    // Gambar blok
    for (let block of blocks) {
        ctx.drawImage(assets[block.type], block.x, block.y, 50, 50);
    }

    // Fisika lompat
    player.y += player.velocityY;
    player.velocityY += gravity;

    if (player.y >= 500) {
        player.y = 500;
        player.jumping = false;
    }

    requestAnimationFrame(gameLoop);
}

// Pilih blok dari inventori
function updateInventory() {
    const inventoryDiv = document.getElementById("inventory");
    inventoryDiv.innerHTML = "";

    inventory.forEach(block => {
        let blockButton = document.createElement("button");
        blockButton.innerText = block;
        blockButton.onclick = () => selectedBlock = block;
        inventoryDiv.appendChild(blockButton);
    });
}

// Mulai game
updateInventory();
gameLoop();
