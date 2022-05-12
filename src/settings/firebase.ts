import firebaseAdmin from 'firebase-admin'
import path from 'path'

const serviceAccount = path.join(__dirname, 'portfolio-ab7f4-firebase-adminsdk-1gb5k-e8d51a06e6.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});

export default firebaseAdmin
