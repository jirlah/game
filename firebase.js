import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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
const chatRef = ref(db, "chat");

// Kirim pesan chat
function sendMessage(username, message) {
    push(chatRef, { username, message });
}

// Ambil pesan terbaru
onValue(chatRef, (snapshot) => {
    const messages = snapshot.val();
    console.clear();
    for (let key in messages) {
        console.log(`${messages[key].username}: ${messages[key].message}`);
    }
});

// Contoh penggunaan
sendMessage("Player1", "Halo, ada yang main?");
