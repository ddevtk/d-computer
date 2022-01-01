import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; //v9
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDu6RbqsczRfp4ZP9PdhtgyDQ_pgHLZGOE',
  authDomain: 'e-commerce-b0b63.firebaseapp.com',
  projectId: 'e-commerce-b0b63',
  storageBucket: 'e-commerce-b0b63.appspot.com',
  messagingSenderId: '44057765097',
  appId: '1:44057765097:web:7fd5c3e1c091b361bb3c78',
  measurementId: 'G-FHLX2K0F6C',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export
export const googleAuthProvider = new GoogleAuthProvider();
export const facebookAuthProvider = new FacebookAuthProvider();
