import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../firebase-credentials.json';

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

export default firebaseApp;
