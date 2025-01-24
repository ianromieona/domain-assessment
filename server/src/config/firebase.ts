import admin from "firebase-admin";

// Import the service account key JSON
import serviceAccount from "./tst-code-firebase-adminsdk-fbsvc-622b9d93b5.json";

const serviceAccountKey = serviceAccount as any;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
});

const db = admin.firestore();

export default db;
