import admin from "firebase-admin";
import fs from "fs";
import path from "path";

let serviceAccount;
if (process.env.VERCEL_ENV === "production") {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
} else {
    const serviceAccountPath = './service-account.json';
    const serviceAccountJson = fs.readFileSync(path.join(process.cwd(), "src/lib", serviceAccountPath), 'utf8');
    serviceAccount = JSON.parse(serviceAccountJson);
}

let firebaseAdminApp;
if (!admin.apps.length) {
    firebaseAdminApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
} else {
    firebaseAdminApp = admin.app();
}
const db = admin.firestore();
const usersCollection = db.collection('users');
const auth = admin.auth();

export function verifyAuthToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return auth.verifyIdToken(token);
}

export { firebaseAdminApp, db, usersCollection };