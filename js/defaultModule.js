// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getStorage, ref as sRef, uploadBytesResumable, uploadBytes, getDownloadURL, list } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js';
import { getDatabase, ref, set, child, get, update, remove, onValue } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js';
import { getAuth, signInWithRedirect, getRedirectResult , GoogleAuthProvider, signOut, signInWithPopup, updateProfile } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWBHG5C6DvJv_91IUgcwxkB2u3Nmr0-UE",
  authDomain: "crimson-music.firebaseapp.com",
  databaseURL: "https://crimson-music-default-rtdb.europe-west1.firebasedatabase.app",
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
const database = getDatabase();
const storage = getStorage();

window.logOut = function logOut(){
  signOut(auth).then(() => {
    window.location.pathname = "/html/login.html";
  })   
}

//Check for user in Database
async function checkUserInDatabase(){
  return new Promise(async resolve => {
    await get(ref(database, "Users/" + auth.currentUser.uid)).then(snapshot => {
      if(snapshot.exists())
        resolve(true);
    });
    resolve(false);
  });
}

//Set new user in Database
var firstProfilePicture;
var newUser = true;
var userInfo;

async function setUserInDatabase(){
  if(!(await checkUserInDatabase())){
    set(ref(database, "Users/" + auth.currentUser.uid), {
      Username: auth.currentUser.email.split('@')[0],
      FirstProfilePicture: auth.currentUser.photoURL
    }).then(() => {
      firstProfilePicture = auth.currentUser.photoURL;
    });
  }else{
    newUser = false;
    firstProfilePicture = await get(ref(database, "Users/" + auth.currentUser.uid)).then(snapshot => {
      return snapshot.val().FirstProfilePicture;
    });

    userInfo = await get(ref(database, "Users/" + auth.currentUser.uid)).then(snapshot => {
      return snapshot.val();
    })
  }
}

window.setUsername = function setUsername(username){
  Array.from(document.querySelectorAll(".profileUsername")).forEach(child => {
    if(child.tagName != "INPUT")
      child.innerHTML = username;
    else
      child.value = username;
  })
}

window.updateUsername = function updateUsername(username){
  update(ref(database, "Users/" + auth.currentUser.uid), {
    Username: username
  })
}

window.updateProfile = (image) => {
  updateProfile(auth.currentUser, {
    photoURL: image
  })
}

saveProfileChanges.addEventListener("click", async () => {
  if(lastProfilePhoto != selectedProfilePhoto && selectedProfilePhoto != undefined){
    await updateProfile(auth.currentUser, {
      photoURL: selectedProfilePhoto.src
    })
    profile.children[0].src = selectedProfilePhoto.src;
  }
})


//Get user playlists
var playlists = new Array();

async function getUserPlaylists(playlistType){
  await get(ref(database, playlistType + "Playlists/" + auth.currentUser.uid + "/")).then(snapshot => {
    if(snapshot.exists()){
      if(playlistType == "Created"){
        var i = 0;
        var created = Object.entries(snapshot.val());
        playlists.push(created);
      }else{
        const normal = Object.entries(snapshot.val());
        playlists.push(normal);
      }
    }
  })
  .catch(() => {
    console.log("Don't change files please.");
  })
}

async function setUserData(user){
  document.querySelector(":root").style.setProperty("--profileImage", 'url("' + user.photoURL + '")');
  
  if(newUser)
    setUsername(auth.currentUser.email.split('@')[0]);
  else
    setUsername(userInfo.Username);

  Array.from(document.querySelectorAll(".profilePicture")).forEach(child => {
      child.src = user.photoURL;
  });

  profilePicturesHolder.children[1].src = firstProfilePicture;

  Array.from(document.querySelectorAll(".profileEmail")).forEach(child => {
    child.innerHTML = auth.currentUser.email;
  })

  
  var optionalProfilePicturesList = [];
  for(var i = 1; i <= 7; i++)
     await getDownloadURL(sRef(storage, `optionalProfilePictures/${i}.jpg`)).then(url => {
      optionalProfilePicturesList.push(url);
    })

  var increment = 0;
  Array.from(document.querySelectorAll(".optionalProfilePicture")).forEach(child => {
    child.src = optionalProfilePicturesList[increment++];
  })

  if(playlists[0] != undefined)
    playlists[0].forEach(playlist => {
      createPlaylist("your", playlist);
    });

  // playlists[1].forEach(playlist => {
  //   createPlaylist("liked", playlist);
  // })

}

//Make playlist
window.makePlaylist = async function makePlaylist(playlistBanner, playlistName){
  if(playlistBanner != undefined && playlistName != ""){
    const exists = await get(ref(database, "CreatedPlaylists/" + auth.currentUser.uid + "/" + playlistName)).then(snapshot => {
      if(snapshot.exists()){
        return true;
      }
    })

    if(!exists){
      await uploadBytes(sRef(storage, auth.currentUser.uid + "/createdPlaylists/" + playlistName), playlistBanner);

      const bannerURL = await getDownloadURL(sRef(storage, auth.currentUser.uid + "/createdPlaylists/" + playlistName)).then(url => {
        return url;
      });

      await set(ref(database, "CreatedPlaylists/" + auth.currentUser.uid + "/" + playlistName), {
        Banner: bannerURL,
        Songs: ""
      })

      const newPlaylistChild = [playlistName, {"Banner": bannerURL, "Songs": ""}];
      playlists[0] != undefined ? playlists[0].push(newPlaylistChild) : playlists[0] = newPlaylistChild;

      createPlaylist("your", newPlaylistChild);
    }else{
      console.log("Playlist with this name already exists.");
    }
  }
}

auth.onAuthStateChanged(async user => {
  if(user != null && user != undefined){
    await setUserInDatabase();
    await getUserPlaylists("Created");
    await getUserPlaylists("");

    setUserData(user);
  }
})