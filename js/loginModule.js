// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js';
import { getDatabase, ref, set, child, get, update, remove, onValue } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js';
import { getAuth, signInWithRedirect, getRedirectResult , GoogleAuthProvider, signOut, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWBHG5C6DvJv_91IUgcwxkB2u3Nmr0-UE",
  authDomain: "crimson-music.firebaseapp.com",
  projectId: "crimson-music",
  storageBucket: "crimson-music.appspot.com",
  messagingSenderId: "308245526464",
  appId: "1:308245526464:web:9647864a2d0051429d3a25",
  measurementId: "G-CVTQNKNWLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Makes error// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const realdb = getDatabase();

//Sign in with Google
const googleButton = document.getElementById("googleButton");

googleButton.addEventListener("click", async e => {
  e.preventDefault();
  await signInWithPopup(auth, provider).then(result => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
  }).catch(() => {
    console.log("Baby finger where are you?");
  })
})

auth.onAuthStateChanged(async user => {
  if(user != null && user != undefined){
    console.log(user);
    window.location.pathname = "/html/index.html";
  }else{
    console.log("Error");
  }
})