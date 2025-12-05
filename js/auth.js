import { auth } from './firebase-init.js';
import { signInAnonymously, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

signInAnonymously(auth).then(() => {
    console.log("Authenticated as", auth.currentUser.uid);
});

export function setUsername(name) {
    updateProfile(auth.currentUser, { displayName: name });
}