// Ambil canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Atur ukuran canvas
canvas.width = 600;
canvas.height = 400;

// Objek pemain
const player = {
    x: 50,
    y: 300,
    width: 30,
    height: 30,
    color: "red",
    vx: 0,
    vy: 0,
    speed: 5,
    jumpPower: 10,
    gravity: 0.5,
    onGround: false
};

// Blok yang bisa dihancurkan
const blocks = [
    { x: 200, y: 350, width: 50, height: 50, color: "brown", destroyed: false },
    { x: 260, y: 350, width: 50, height: 50, color: "brown", destroyed: false },
    { x: 320, y: 350, width: 50, height: 50, color: "brown", destroyed: false }
];

// Fungsi menggambar pemain
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Fungsi menggambar blok
function drawBlocks() {
    blocks.forEach(block => {
        if (!block.destroyed) {
            ctx.fillStyle = block.color;
            ctx.fillRect(block.x, block.y, block.width, block.height);
        }
    });
}

// Update posisi pemain
function updatePlayer() {
    player.x += player.vx;
    player.y += player.vy;
    player.vy += player.gravity;

    // Batas bawah (tanah)
    if (player.y + player.height >= canvas.height) {
        player.y = canvas.height - player.height;
        player.vy = 0;
        player.onGround = true;
    } else {
        player.onGround = false;
    }
}

// Deteksi tabrakan dengan blok
function checkBlockCollision() {
    blocks.forEach(block => {
        if (!block.destroyed &&
            player.x < block.x + block.width &&
            player.x + player.width > block.x &&
            player.y < block.y + block.height &&
            player.y + player.height > block.y) {
            
            block.destroyed = true; // Hancurkan blok
        }
    });
}

// Loop game
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBlocks();
    updatePlayer();
    drawPlayer();
    checkBlockCollision();
    requestAnimationFrame(gameLoop);
}

// Kontrol keyboard
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        player.vx = -player.speed;
    }
    if (event.key === "ArrowRight") {
        player.vx = player.speed;
    }
    if (event.key === "ArrowUp" && player.onGround) {
        player.vy = -player.jumpPower;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        player.vx = 0;
    }
});

// Kontrol sentuh (mobile)
document.getElementById("left").addEventListener("touchstart", () => {
    player.vx = -player.speed;
});

document.getElementById("right").addEventListener("touchstart", () => {
    player.vx = player.speed;
});

document.getElementById("jump").addEventListener("touchstart", () => {
    if (player.onGround) {
        player.vy = -player.jumpPower;
    }
});

document.getElementById("left").addEventListener("touchend", () => {
    player.vx = 0;
});

document.getElementById("right").addEventListener("touchend", () => {
    player.vx = 0;
});

// Mulai game
gameLoop();
