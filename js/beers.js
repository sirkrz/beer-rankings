// beers.js
// Handles beer creation and real-time syncing

import { db } from './firebase.js';
import { collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Live listener callback setter
let beersListener = null;

export function listenToBeers(sessionId, callback) {
    const q = query(collection(db, `sessions/${sessionId}/beers`), orderBy("createdAt"));

    beersListener = onSnapshot(q, snapshot => {
        const beers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(beers);
    });
}

export async function addBeer(sessionId, name) {
    if (!name.trim()) return;

    await addDoc(collection(db, `sessions/${sessionId}/beers`), {
        name,
        createdAt: Date.now()
    });
}

export function stopBeerListener() {
    if (beersListener) beersListener();
}