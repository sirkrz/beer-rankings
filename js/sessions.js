import { db } from './firebase-init.js';
import { ref, set, remove } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

export function createSession(name) {
    const id = Date.now().toString();
    return set(ref(db, `sessions/${id}`), {
        name,
        created: Date.now()
    });
}