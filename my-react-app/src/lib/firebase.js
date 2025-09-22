// // Firebase configuration
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// const firebaseConfig = {
//   apiKey: "AIzaSyAdyPe5HeupIghdr6Fz5DoPHU-eU-9iB2Y",
//   authDomain: "gardening-plannerdatabase.firebaseapp.com",
//   databaseURL: "https://gardening-plannerdatabase-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "gardening-plannerdatabase",
//   storageBucket: "gardening-plannerdatabase.firebasestorage.app",
//   messagingSenderId: "919818760523",
//   appId: "1:919818760523:web:8b95e1f658a655bb3338ce",
//   measurementId: "G-0NHLC4LWTQ"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);
// // Initialize Cloud Firestore and get a reference to the service
// export const db = getFirestore(app);
// // Initialize Cloud Storage and get a reference to the service
// export const storage = getStorage(app);
// export default app;
// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyAdyPe5HeupIghdr6Fz5DoPHU-eU-9iB2Y",
    authDomain: "gardening-plannerdatabase.firebaseapp.com",
    databaseURL: "https://gardening-plannerdatabase-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gardening-plannerdatabase",
    storageBucket: "gardening-plannerdatabase.firebasestorage.app",
    messagingSenderId: "919818760523",
    appId: "1:919818760523:web:8b95e1f658a655bb3338ce",
    measurementId: "G-0NHLC4LWTQ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
export default app;
