// ratings.js
// Handles per-user ratings stored in Firestore

import { db } from './firebase.js';
import {
    collection,
    doc,
    setDoc,
    onSnapshot,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let ratingsListener = null;

// Save/update a user's rating for a specific beer
export async function rateBeer(sessionId, beerId, userId, rating) {
    const ref = doc(db, `sessions/${sessionId}/beers/${beerId}/ratings`, userId);

    await setDoc(ref, {
        userId,
        rating,
        updatedAt: Date.now(),
    });
}

// Listen for all ratings within a session
export function listenToRatings(sessionId, callback) {
    const ratingsPath = `sessions/${sessionId}/beers`;

    // We need to listen to each beer's ratings — dynamic listeners
    // We'll load beers first and then attach listeners for each one's ratings

    if (ratingsListener) ratingsListener();

    ratingsListener = onSnapshot(collection(db, ratingsPath), async snapshot => {
        const beers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const allBeerRatings = {};

        for (const beer of beers) {
            const ratingsSnap = await getDocs(collection(db, `${ratingsPath}/${beer.id}/ratings`));
            const ratings = ratingsSnap.docs.map(r => r.data());

            const avg = ratings.length
                ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
                : null;

            allBeerRatings[beer.id] = {
                beerId: beer.id,
                name: beer.name,
                avg,
                ratings,
            };
        }

        callback(allBeerRatings);
    });
}

export function stopRatingsListener() {
    if (ratingsListener) ratingsListener();
}