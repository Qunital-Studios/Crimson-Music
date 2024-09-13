//Featured Slider
const featuredSliderChildren = document.querySelector(".featuredSlider").children;
const featuredSliderButtons = Array.from(document.querySelector(".buttonHolder").children);

var childCounter = 0;
var childCount = featuredSliderChildren.length - 1;
var interval1;

const featuredSlider = document.querySelector(".featuredSlider");
var featuredSliderScrollValue = 175;

function autoChangeSlider(){
    interval1 = setInterval(() => {
        
        if(childCounter == childCount){
            featuredSlider.appendChild(featuredSlider.firstElementChild);
        }
        else
            childCounter++;
        featuredSlider.scrollLeft += featuredSliderScrollValue;
    }, 3000);
}

autoChangeSlider();

function manuallyChangeSlider(number){
    clearInterval(interval1);
    if(number == 0){
        if(childCounter < childCount)
            childCounter++;
        else
            featuredSlider.appendChild(featuredSlider.firstElementChild);
        featuredSlider.scrollLeft += featuredSliderScrollValue;
    }
    else{
        if(childCounter > 0)
            childCounter--;
        else
            featuredSlider.prepend(featuredSlider.lastElementChild);
        
        featuredSlider.scrollLeft -= featuredSliderScrollValue; 
    }
    autoChangeSlider();
}

featuredSliderButtons.forEach(child => {
    child.addEventListener("click", () => {
        if(Array.prototype.indexOf.call(child.parentElement.children, child) == 1){
            manuallyChangeSlider(0);
        }else{
            manuallyChangeSlider(1);
        }
    })
})


//Navigation
const settingsPage = document.querySelector(".settings");
const searchPage = document.querySelector(".search");
const homePage = document.querySelector(".main");
const libraryPage = document.querySelector(".library");
const footerButtons = Array.from(document.getElementById("footer").children);

const settingsButtons = document.querySelectorAll(".settingsButton");
Array.from(settingsButtons).forEach(child => {
    child.addEventListener("click", () => {
        if(child != footerButtons[3])
            footerButtons[3].click();
    })
})

var currentIndex = 0;
var lastIndex = 0;
const pages = Array(homePage, searchPage, libraryPage, settingsPage);

footerButtons.forEach(button => {
    button.addEventListener("click", () => {
        lastIndex = currentIndex;
        currentIndex =  Array.prototype.indexOf.call(footerButtons, button);
        if(currentIndex != lastIndex){
            pages.forEach(page => {
                page.classList = page.classList[0];
            });

            button.classList.add("chosen");
            footerButtons[lastIndex].classList.remove("chosen");

            pages[currentIndex].classList.add("in");
            pages[lastIndex].classList.add("out");
        }
    })
});

const closeSettingsButton = document.querySelector(".closeSettingsButton");
closeSettingsButton.addEventListener("click", () => {
    footerButtons[lastIndex].click();
});


//Profile
const profilePage = document.querySelector(".profilePage");
const profile = document.querySelector(".profile");
profile.addEventListener("click", () => {
    profilePage.classList.add("in");
});

const closeProfilePageButton = document.querySelector(".closeProfilePageButton");
closeProfilePageButton.addEventListener("click", () => {
    profilePage.classList.remove("in");
    cancelProfileChanges.click();
})

const gitHubLink = document.getElementById("gitHubLink");
gitHubLink.addEventListener("click", () => {
    setTimeout(() => {
        window.open("https://github.com/Qunital-Studios/Crimson-Music", "_blank");    
    }, 100);
})

const licencesAndAttributionPage = document.querySelector(".licencesAndAttribution");
const licencesAndAttributionButton = document.querySelector(".licencesAndAttributionButton");
licencesAndAttributionButton.addEventListener("click", () => {
    licencesAndAttributionPage.classList.add("in");
})

const closeAttributionButton = document.querySelector(".closeAttributionButton");
closeAttributionButton.addEventListener("click", () => {
    licencesAndAttributionPage.classList.remove("in");
})

function closeProfileCustomization(){
    cancelProfileChanges.disabled = true;
    editProfileUsername.classList.remove("in");
    editProfileButton.disabled = false;
    saveProfileChanges.disabled = true;
    profilePicturesHolder.classList.remove("in");
}


const profileView = document.querySelector(".profileView");
const profilePicturesHolder = document.querySelector(".profilePicturesHolder");
const saveProfileChanges = document.querySelector(".saveProfileChanges");
const cancelProfileChanges = document.querySelector(".cancelProfileChanges");
const editProfileUsername = document.querySelector(".profileUsername.edit");
const editProfileButton = document.querySelector(".editProfileButton");
editProfileButton.addEventListener("click", () => {
    const oldUsername = editProfileUsername.value;
    const oldProfilePicture = profilePicturesHolder.firstElementChild.src;

    const abortSignal = new AbortController();

    profilePicturesHolder.classList.add("in");

    editProfileUsername.classList.toggle("in");
    editProfileUsername.focus();
    editProfileUsername.setSelectionRange(editProfileUsername.value.length, editProfileUsername.value.length);
    editProfileUsername.addEventListener("change", () => {
        if(oldUsername != editProfileUsername.value){
            saveProfileChanges.disabled = false;

        }else{
            saveProfileChanges.disabled = true;
            cancelProfileChanges.classList.remove("in");
        }
    },
        {signal : abortSignal.signal}
    )

    saveProfileChanges.addEventListener("click", () => {
        if(lastProfilePhoto != selectedProfilePhoto){
            lastProfilePhoto = selectedProfilePhoto;
            profilePicturesHolderChildren[0].src = selectedProfilePhoto != undefined ? selectedProfilePhoto.src : profilePicturesHolderChildren[0].src;
        }

        if(oldUsername != editProfileUsername.value){
            setUsername(editProfileUsername.value);
            updateUsername(editProfileUsername.value);
        }

        closeProfileCustomization();
    })

    cancelProfileChanges.disabled = false;
    cancelProfileChanges.addEventListener("click", () => {
        closeProfileCustomization();

        selectedProfilePhoto != undefined ? selectedProfilePhoto.classList.remove("chosen") : {};

        editProfileUsername.value = oldUsername;

        profilePicturesHolder.firstElementChild.src = oldProfilePicture;

        abortSignal.abort();
    },
        {signal : abortSignal.signal}
    );

    editProfileButton.disabled = true;
});

const profilePicturesHolderChildren = Array.from(profilePicturesHolder.children);
var lastProfilePhoto = undefined;
var selectedProfilePhoto = undefined;

profilePicturesHolderChildren.forEach(child => {
    child.addEventListener("click", () => {
        if(child.src != lastProfilePhoto)
            saveProfileChanges.disabled = false;

        profilePicturesHolderChildren.forEach(child => {
            child.classList.remove("chosen");  
        })

        child.classList.add("chosen");
        selectedProfilePhoto = child;
    })
  })

//MiniPlayer drag
function setDominantColor(img){
    var context = document.createElement("canvas").getContext("2d");
    context.drawImage(img, 0, 0, 1, 1);
    const i = context.getImageData(0, 0, 1, 1).data;
    const rgba1 = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${i[3]})`;
    const rgba2 = `rgba(${i[0]}, ${i[1]}, ${i[2]}, 0.5)`;
    document.documentElement.style.setProperty("--dominantColor1", rgba2);
    document.documentElement.style.setProperty("--dominantColor2", rgba1);
}

var lastMouseY = 0;
var mouseYPosition;
var mouseStart;

const miniPlayer = document.querySelector(".miniPlayer");

const playerOpener = document.getElementById("playerOpener");
const player = document.getElementById("player");
playerOpener.addEventListener("touchstart", e => {
    setDominantColor(miniPlayer.querySelector(".songBanner"));

    mouseYPosition = Math.round(e.touches[0].pageY);
    mouseStart = Math.round(e.touches[0].pageY - (screen.height - 122));
    lastMouseY = mouseYPosition - mouseStart;

    player.querySelector(".songBanner").src = miniPlayer.querySelector(".songBanner").src;
    player.querySelector(".songName").innerHTML = miniPlayer.querySelector(".songName").innerHTML;
    player.querySelector(".artistName").innerHTML = miniPlayer.querySelector(".artistName").innerHTML;

    document.documentElement.style.setProperty("--playerHueRotate", "hue-rotate(-" + Math.floor((lastMouseY)/547*30) + "deg)");
    document.documentElement.style.setProperty("--playerBg", `url("` + miniPlayer.querySelector(".songBanner").src + `")`);

    player.classList.add("start");
});

function openPlayer(){
    document.documentElement.style.setProperty("--playerHueRotate", "hue-rotate(0)");
    document.documentElement.style.setProperty("--playerBgDirection", (Math.floor(Math.random() * 2) == 0 ? "" : "-") + "360deg");

    player.classList.add("in");

    setTimeout(() => {
        closePlayerButton.disabled = false;
    }, 100);

}

playerOpener.addEventListener("touchend", () => {
    if(screen.height - 122 == (mouseYPosition - mouseStart) && (mouseYPosition - mouseStart) <= lastMouseY){
        openPlayer();
    }else if((mouseYPosition - mouseStart) <= 440 && (mouseYPosition - mouseStart) <= lastMouseY){
        openPlayer();
    }else{
        player.classList.remove("start");
        document.documentElement.style.setProperty("--playerTop", "calc(100% - 122px)");
    }
    mouseYPosition = 0;
});

playerOpener.addEventListener("touchmove", movePlayer, false);

function movePlayer(e){
    lastMouseY = (mouseYPosition - mouseStart);
    mouseYPosition = Math.round(e.touches[0].clientY);
    document.documentElement.style.setProperty("--playerHueRotate", "hue-rotate(-" + Math.floor((mouseYPosition - mouseStart)/547*30) + "deg)");

    if(screen.height - 50 >= (mouseYPosition - mouseStart) && (mouseYPosition - mouseStart) > 80){
        document.documentElement.style.setProperty("--playerTop", (mouseYPosition - mouseStart) + "px");
    }
}

//Player
const closePlayerButton = document.querySelector(".closePlayerButton");
closePlayerButton.addEventListener("click", () => {
    player.classList.remove("in", "start");
    closePlayerButton.disabled = true;
    document.documentElement.style.setProperty("--playerTop", "calc(100% - 122px)");
})

const autoPlayButton = document.querySelector(".autoPlayButton");
autoPlayButton.addEventListener("click", () => {
    autoPlayButton.classList.toggle("in");
    autoPlayButton.children[0].innerHTML == "OFF" ? autoPlayButton.children[0].innerHTML = "ON" : autoPlayButton.children[0].innerHTML = "OFF";
})

//Upper menu
const upperMenu = document.querySelector(".upperMenu");
Array.from(document.querySelectorAll(".songMenuButton")).forEach(child => {
    child.addEventListener("click", () => {
        upperMenu.classList.add("in");
        if(child.parentElement.parentElement.classList.contains("song")){
            upperMenu.querySelector(".songName").innerHTML = child.parentElement.parentElement.querySelector(".songName").innerHTML;
            upperMenu.querySelector(".artistName").innerHTML = child.parentElement.parentElement.querySelector(".artistName").innerHTML;
        }else{
            upperMenu.querySelector(".songName").innerHTML = child.parentElement.parentElement.querySelector(".songName").innerHTML;
            upperMenu.querySelector(".artistName").innerHTML = child.parentElement.parentElement.querySelector(".artistName").innerHTML;
        }
        document.querySelector(".seeMoreFromSpan").innerHTML = upperMenu.querySelector(".artistName").innerHTML;
        
    })
});

document.querySelector(".upperMenuBackground").addEventListener("click", () => {
    upperMenu.classList.remove("in");
})

//Play song
var lastPlayedChildVisualizer = undefined;
var currentlyPlayingVisualizer = undefined;

Array.from(document.querySelectorAll(".songClickDiv")).forEach(child => {
    child.addEventListener("click", () => {
        if(lastPlayedChildVisualizer != child.parentElement.querySelector(".visualizer")){
            currentlyPlayingVisualizer = child.parentElement.querySelector(".visualizer");
            currentlyPlayingVisualizer.classList.remove("pause");
            miniPlayer.classList.remove("hidden");
            miniPlayer.querySelector(".songBanner").src = child.parentElement.querySelector(".songBanner").src;
            miniPlayer.querySelector(".songName").innerHTML = child.parentElement.querySelector(".songName").innerHTML;
            miniPlayer.querySelector(".artistName").innerHTML = child.parentElement.querySelector(".artistName").innerHTML;
            child.parentElement.querySelector(".visualizer").classList.add("in");
            lastPlayedChildVisualizer != undefined ? lastPlayedChildVisualizer.classList.remove("in") : {};
            lastPlayedChildVisualizer = child.parentElement.querySelector(".visualizer");
        }
    })
})

miniPlayer.querySelector(".playOrPauseButton").addEventListener("click", () => {
    currentlyPlayingVisualizer.classList.toggle("pause");
})

//Library search
const searchLibraryButton = libraryPage.querySelector(".searchLibraryButton");
searchLibraryButton.addEventListener("click", () => {
    searchLibraryButton.children[0].src.includes("Close(outline)") ? searchLibraryButton.children[0].src = "../images/Search(outlineWhite).svg" : searchLibraryButton.children[0].src = "../images/Close(outline).svg";
    searchLibraryButton.parentElement.parentElement.classList.toggle("searching");
    searchLibraryButton.parentElement.parentElement.querySelector(".librarySearch").focus();
})

//Make Playlist
const makePlaylistPage = document.querySelector(".makePlaylist");

const addYourPlaylistButton = document.querySelector(".addYourPlaylistButton");
addYourPlaylistButton.addEventListener("click", () => {
    makePlaylistPage.classList.add("in");
});

document.querySelector(".closeMakePlaylistButton").addEventListener("click", () => {
    makePlaylistPage.classList.remove("in");
})

const uploaderDiv = makePlaylistPage.querySelector(".uploaderDiv");
const uploader = uploaderDiv.children[1];

uploaderDiv.addEventListener("click", () => {
    uploader.click();
})

const validFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/svg",
    "image/png",
    "image/webp"
]

function validFileType(file){
    return validFileTypes.includes(file.type);
}

uploader.addEventListener("change", () => {
    console.log(uploader.files[0].type);
    if(validFileType(uploader.files[0])){
        uploaderDiv.children[0].classList.add("in");
        uploaderDiv.children[0].src = URL.createObjectURL(uploader.files[0]);
        console.log(uploaderDiv.children[0].src);
    }else{
        console.log("Ne moze");
    }
})