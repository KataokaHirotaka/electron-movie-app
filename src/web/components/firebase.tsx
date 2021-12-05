/**
 * firebaseがversion9の場合
 */
import {initializeApp} from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
 
const firebaseApp = {
  apiKey: "AIzaSyCSUbFIKP20lnA7eSVhrCH53hhZZH6qars",
  authDomain: "electron-movei-app.firebaseapp.com",
  projectId: "electron-movei-app",
  storageBucket: "electron-movei-app.appspot.com",
  messagingSenderId: "686693881348",
  appId: "1:686693881348:web:a9971180c7509b2a594751"
};
 
const app = initializeApp(firebaseApp);
const db = getFirestore();
 
export {db};