import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD9j8nvKSsD3F8Gbl8aZ4yEfm6DTokK0ys",
  authDomain: "ej-js-ingenieria-de-software.firebaseapp.com",
  projectId: "ej-js-ingenieria-de-software",
  storageBucket: "ej-js-ingenieria-de-software.firebasestorage.app",
  messagingSenderId: "247925821988",
  appId: "1:247925821988:web:b7bfc53493df7c4c7bfeb1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };