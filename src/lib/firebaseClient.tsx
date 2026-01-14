import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, User, getIdToken } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyA7anO04p6sMyN38pIT-Yytp0LY4Zj_nXk",
  authDomain: "web-varnothsava.firebaseapp.com",
  projectId: "web-varnothsava",
  storageBucket: "web-varnothsava.firebasestorage.app",
  messagingSenderId: "943741524490",
  appId: "1:943741524490:web:fc064db962fa4177aeddf3",
  measurementId: "G-LQ0T4Q2KRJ"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export const db = getFirestore(app);

let userCallback: ((user: User) => void) | null = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in:", user);
        if (typeof userCallback === "function") {
            userCallback(user);
        }
    } else {
        console.log("No user is signed in.");
    }
});

export function onUserSignedIn(callback: (user: User) => void) {
    userCallback = callback;
}

export function loginRequired() {
    return auth.currentUser !== null;
}

export function getCurrentUser(): User | null {
    return auth.currentUser;
}

export function getAuthToken(): Promise<string | null> {
    if(!auth.currentUser) {
        return Promise.resolve(null);
    }
    return getIdToken(auth.currentUser) || Promise.resolve(null);
}

export function createUserWithEmail(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                resolve(userCredential.user);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function loginWithEmail(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                resolve(userCredential.user);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function loginWithGoogle(): Promise<User> {
    return new Promise((resolve, reject) => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                resolve(result.user);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function signOut() {
    auth.signOut().then(() => {
        console.log("User signed out.");
    }).catch((error) => {
        console.error("Sign out error:", error);
    });
}