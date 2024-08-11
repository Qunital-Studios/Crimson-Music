//Featured Slider
const featuredSliderChildren = document.querySelector(".featuredSlider").children;

var childCounter = 0;
var childCount = featuredSliderChildren.length - 1;
var interval1;

function autoChangeSlider(){
    if((childCounter > childCount) || (childCounter < 0))
        childCounter = 0;

    if(manualChange){
        if(childCounter >= 1)
            childCounter -= 1;
        else
            childCounter = childCount;
        manualChange = false;
    }
        

    Array.from(featuredSliderChildren).forEach(child => {
        child.style.opacity = 0;
    });

    featuredSliderChildren[childCounter].style.opacity = 1;

    interval1 = setInterval(() => {
        if((childCounter == childCount) || (childCounter < 0))
            childCounter = -1;

        Array.from(featuredSliderChildren).forEach(child => {
            child.style.opacity = 0;
        });

        featuredSliderChildren[++childCounter].style.opacity = 1;
    }, 3000);
}

autoChangeSlider();

var manualChange = false;

function manuallyChangeSlider(number){
    const lastChildCounter = childCounter;
    if(number == 1)
        manualChange = true;
    else
        childCounter += 1;

    if((childCounter > childCount) || (childCounter < 0))
        childCounter = 0;

    featuredSliderChildren[lastChildCounter].style.opacity = 0;
    clearInterval(interval1);
    autoChangeSlider();
}

const featuredSliderButtons = Array.from(document.querySelector(".buttonHolder").children);
var buttonIndex;
featuredSliderButtons.forEach(child => {
    child.addEventListener("click", (manualChange) => {
        if(Array.prototype.indexOf.call(child.parentElement.children, child) == 1){
            manuallyChangeSlider(0);
        }else{
            manuallyChangeSlider(1);
        }
    })
});