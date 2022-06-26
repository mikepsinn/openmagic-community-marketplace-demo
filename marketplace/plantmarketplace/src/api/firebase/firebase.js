import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA5pU3WERze7GNxcgWAbyqprlEtgR4Vk1E",
    authDomain: "walletscan-354022.firebaseapp.com",
    projectId: "walletscan-354022",
    storageBucket: "walletscan-354022.appspot.com",
    messagingSenderId: "17644485962",
    appId: "1:17644485962:web:9768f4bef9b0f32e2ed5b3",
    measurementId: "G-PKDSV19VW7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };

  