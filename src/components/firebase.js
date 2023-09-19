import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAZNsIksPtqmANG5JQCUatqont8X2flgQM",
  authDomain: "rent-up-8693f.firebaseapp.com",
  projectId: "rent-up-8693f",
  storageBucket: "rent-up-8693f.appspot.com",
  messagingSenderId: "913818482504",
  appId: "1:913818482504:web:d25d6781b4c826f020e57d",
  measurementId: "G-701X4R75NQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);