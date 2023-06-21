import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB0GRpNjbn_s0UhrxUDYwF8y5jI9yhI4_I",
  authDomain: "hms-agile.firebaseapp.com",
  projectId: "hms-agile",
  storageBucket: "hms-agile.appspot.com",
  messagingSenderId: "757259849181",
  appId: "1:757259849181:web:2f1090eaa316057f5eba34",
  measurementId: "G-12PHZTF98X",
};
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };
