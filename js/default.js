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

const settingsButton = document.querySelector(".settingsButton");
const settingsPage = document.querySelector(".settings");
settingsButton.addEventListener("click", () => {
    settingsPage.classList.toggle("settingsIn");
})

function closeSettings(){
    settingsPage.classList.toggle("settingsIn");
}
