//Featured Slider
const featuredSliderChildren = document.querySelector(".featuredSlider").children;
var manualChange = false;
const featuredSliderButtons = Array.from(document.querySelector(".buttonHolder").children);

var childCounter = 0;
var childCount = featuredSliderChildren.length - 1;
var interval1;

// function autoChangeSlider(){
//     if((childCounter > childCount) || (childCounter < 0))
//         childCounter = 0;

//     if(manualChange){
//         if(childCounter >= 1)
//             childCounter -= 1;
//         else
//             childCounter = childCount;
//         manualChange = false;
//     }
        

//     Array.from(featuredSliderChildren).forEach(child => {
//         child.style.opacity = 0;
//     });

//     featuredSliderChildren[childCounter].style.opacity = 1;

//     interval1 = setInterval(() => {
//         if((childCounter == childCount) || (childCounter < 0))
//             childCounter = -1;

//         Array.from(featuredSliderChildren).forEach(child => {
//             child.style.opacity = 0;
//         });

//         featuredSliderChildren[++childCounter].style.opacity = 1;
//     }, 3000);
// }

// autoChangeSlider();

// function manuallyChangeSlider(number){
//     const lastChildCounter = childCounter;
//     if(number == 1)
//         manualChange = true;
//     else
//         childCounter += 1;

//     if((childCounter > childCount) || (childCounter < 0))
//         childCounter = 0;

//     featuredSliderChildren[lastChildCounter].style.opacity = 0;
//     clearInterval(interval1);
//     autoChangeSlider();
// }

// featuredSliderButtons.forEach(child => {
//     child.addEventListener("click", (manualChange) => {
//         if(Array.prototype.indexOf.call(child.parentElement.children, child) == 1){
//             manuallyChangeSlider(0);
//         }else{
//             manuallyChangeSlider(1);
//         }
//     })
// });

//Side Slide
const featuredSlider = document.querySelector(".featuredSlider");
var featuredSliderScrollValue = 175;

function autoChangeSlider(){
    // if((childCounter > childCount) || (childCounter < 0))
    //     childCounter = 0;

    // if(manualChange){
    //     if(childCounter >= 1)
    //         childCounter -= 1;
    //     else
    //         childCounter = childCount;
    //     manualChange = false;
    // }
        

    // Array.from(featuredSliderChildren).forEach(child => {
    //     child.classList = "";
    // });

    // featuredSliderChildren[childCounter].classList.toggle(".slideToLeft");
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
    child.addEventListener("click", (manualChange) => {
        if(Array.prototype.indexOf.call(child.parentElement.children, child) == 1){
            manuallyChangeSlider(0);
        }else{
            manuallyChangeSlider(1);
        }
    })
})

//Navigation
const settingsButton = document.querySelector(".settingsButton");
const closeSettingsButton = document.querySelector(".closeSettingsButton");
const homeButton = document.querySelector(".homeButton");
const searchButton = document.querySelector(".searchButton");

const settingsPage = document.querySelector(".settings");
const searchPage = document.querySelector(".search");

settingsButton.addEventListener("click", () => {
    searchPage.classList.remove("searchIn");
    settingsPage.classList.add("settingsIn");    
})

closeSettingsButton.addEventListener("click", () => {
    settingsPage.classList.remove("settingsIn");
})

homeButton.addEventListener("click", () => {
    settingsPage.classList.remove("settingsIn");
    searchPage.classList.remove("searchIn");
})

searchButton.addEventListener("click", () => {
    settingsPage.classList.remove("settingsIn");
    searchPage.classList.add("searchIn");
})



// function setDominantColor(img){
//     var context = document.createElement("canvas").getContext("2d");
//     context.drawImage(img, 0, 0, 1, 1);
//     const i = context.getImageData(0, 0, 1, 1).data;
//     const rgba = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${i[3]})`;
// }
