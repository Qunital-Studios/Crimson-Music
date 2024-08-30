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
            // setProfilePhoto(selectedProfilePhoto.src);
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

        selectedProfilePhoto.classList.remove("chosen");
        lastProfilePhoto.classList.add("chosen");

        editProfileUsername.value = oldUsername;
        profilePicturesHolder.firstElementChild.src = oldProfilePicture;

        abortSignal.abort();
    },
        {signal : abortSignal.signal}
    );

    editProfileButton.disabled = true;
});

var lastProfilePhoto = profilePicturesHolder.children[1];
var selectedProfilePhoto = undefined;

const profilePicturesHolderChildren = Array.from(profilePicturesHolder.children);

profilePicturesHolderChildren.forEach(child => {
    child.addEventListener("click", () => {
        profilePicturesHolderChildren.forEach(child => {
          child.classList.remove("chosen");  
        })

        if(!child.classList.contains("chosen") && child != profilePicturesHolderChildren[0]){
            saveProfileChanges.disabled = false;
            child.classList.add("chosen");
            selectedProfilePhoto = child;
        }
    })
})




// function setDominantColor(img){
//     var context = document.createElement("canvas").getContext("2d");
//     context.drawImage(img, 0, 0, 1, 1);
//     const i = context.getImageData(0, 0, 1, 1).data;
//     const rgba = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${i[3]})`;
// }
