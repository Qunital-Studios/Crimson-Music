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

const settingsButton = document.querySelector(".settingsButton");
settingsButton.addEventListener("click", () => {
    footerButtons[3].click();
})

var lastSelectedPageIndex = 0;
var currentIndex = 0;
var lastIndex = 0;
const pages = Array(homePage, searchPage, libraryPage, settingsPage);

footerButtons.forEach(button => {
    button.addEventListener("click", () => {
        footerButtons.forEach(button1 => {
            button1.classList.remove("chosen");
        });
        button.classList.add("chosen");
        currentIndex =  Array.prototype.indexOf.call(footerButtons, button);
        
        pages.forEach(page => {
            page.classList.remove("in");
        })

        pages[1].classList.add("out");
        pages[2].classList.add("out");
            
        if(currentIndex <= 1){
            if(lastSelectedPageIndex == 3){
                pages[1].classList.add("noTransition");
                pages[2].classList.add("noTransition");
            }else{
                pages[lastSelectedPageIndex == 2 ? 1 : 2].classList.add("noTransition");
            }
            pages[1].classList.remove("out");
            pages[2].classList.remove("out");
        }else{
            if(lastSelectedPageIndex == 0){
                pages[1].classList.add("noTransition");
                pages[2].classList.add("noTransition");           
            }
            else if(lastSelectedPageIndex == 1)
                pages[2].classList.add("noTransition");
        }

        pages[currentIndex].classList.remove("noTransition");
        pages[currentIndex].classList.remove("out");
        pages[currentIndex].classList.add("in");
        lastIndex = lastSelectedPageIndex;
        lastSelectedPageIndex = currentIndex;
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

const infoOfSongToPlay = document.querySelector(".miniPlayer");

const playerOpener = document.getElementById("playerOpener");
const player = document.getElementById("player");
playerOpener.addEventListener("touchstart", e => {
    setDominantColor(infoOfSongToPlay.children[1].children[0]);

    mouseYPosition = Math.round(e.touches[0].pageY);
    mouseStart = Math.round(e.touches[0].pageY - (screen.height - 122));
    lastMouseY = mouseYPosition - mouseStart;

    document.querySelector(".playerSongBanner").src = infoOfSongToPlay.children[1].children[0].src;
    document.querySelector(".playerSongName").innerHTML = infoOfSongToPlay.children[1].children[1].children[0].innerHTML;
    document.querySelector(".playerSongAuthor").innerHTML = infoOfSongToPlay.children[1].children[1].children[1].innerHTML;

    document.documentElement.style.setProperty("--playerHueRotate", "hue-rotate(-" + Math.floor((lastMouseY)/547*30) + "deg)");
    document.documentElement.style.setProperty("--playerBg", `url("` + infoOfSongToPlay.children[1].children[0].src + `")`);

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
            upperMenu.children[0].children[0].innerHTML = child.parentElement.parentElement.children[0].children[1].children[0].innerHTML;
            upperMenu.children[0].children[1].innerHTML = child.parentElement.parentElement.children[0].children[1].children[1].innerHTML;
        }else{
            upperMenu.children[0].children[0].innerHTML = child.parentElement.parentElement.children[2].children[1].children[0].children[0].innerHTML;
            upperMenu.children[0].children[1].innerHTML = child.parentElement.parentElement.children[2].children[1].children[0].children[1].innerHTML;
        }
        document.querySelector(".seeMoreFromSpan").innerHTML = upperMenu.children[0].children[1].innerHTML;
        
    })
});

document.querySelector(".upperMenuBackground").addEventListener("click", () => {
    upperMenu.classList.remove("in");
})

//Play song
const miniPlayer = document.querySelector(".miniPlayer");

Array.from(document.querySelectorAll(".songClickDiv")).forEach(child => {
    child.addEventListener("click", () => {
        // miniPlayer.children[1].children[1].children[0].innerHTML = child.parentElement.children[0].children[1].children[0].innerHTML;
        // miniPlayer.children[1].children[1].children[1].innerHTML = child.parentElement.children[0].children[1].children[1].innerHTML;
        miniPlayer.querySelector(".songCover").src = child.parentElement.querySelector(".songCover").src;
        miniPlayer.querySelector(".songName").innerHTML = child.parentElement.querySelector(".songName").innerHTML;
        miniPlayer.querySelector(".artistName").innerHTML = child.parentElement.querySelector(".artistName").innerHTML;
    })
})
