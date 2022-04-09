import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBFNe4hHgJUn69wXMgy3q-iJ94kWa-rgkU",
  authDomain: "trizone-528c5.firebaseapp.com",
  projectId: "trizone-528c5",
  storageBucket: "trizone-528c5.appspot.com",
  messagingSenderId: "838241649679",
  appId: "1:838241649679:web:20dc5fb00e42416bc30f7a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;



