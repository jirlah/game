// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, onValue, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Konfigurasi Firebase (GANTI DENGAN KONFIGURASI FIREBASE-MU)
const firebaseConfig = {
  apiKey: "AIzaSyBL6kFluWUAWJfMlN5QI8um9Yre3lRMlFA",
  authDomain: "game-95268.firebaseapp.com",
  projectId: "game-95268",
  storageBucket: "game-95268.firebasestorage.app",
  messagingSenderId: "654678672851",
  appId: "1:654678672851:web:b0e6d201a5d0044109db26",
  measurementId: "G-GDVK77YGLE"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Fungsi untuk menyimpan data pemain di Firebase
function updatePlayer(playerId, x, y, username) {
    set(ref(db, "players/" + playerId), {
        x: x,
        y: y,
        username: username
    });
}

// Fungsi untuk mengambil data pemain dari Firebase
onValue(ref(db, "players"), (snapshot) => {
    const players = snapshot.val();
    console.log(players); // Debugging
});

// Fungsi untuk mengirim pesan chat
function sendMessage(username, message) {
    push(ref(db, "chat"), { username, message });
}

// Fungsi untuk mendengarkan chat baru
onValue(ref(db, "chat"), (snapshot) => {
    const messages = snapshot.val();
    console.clear();
    for (let key in messages) {
        console.log(`${messages[key].username}: ${messages[key].message}`);
    }
});

// Contoh penggunaan
updatePlayer("player1", 100, 200, "Player1");
sendMessage("Player1", "Halo, ini chat pertama!");
