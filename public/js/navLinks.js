let homeLink = document.querySelector('#homeLink');
let aboutusLink = document.querySelector('#aboutusLink');
let newsLink = document.querySelector('#newsLink');
let treatmentsLink = document.querySelector('#treatmentsLink');
let staffLink = document.querySelector('#staffLink');
let faqLink = document.querySelector('#faqLink');
let contactLink = document.querySelector('#contactLink');

let checkInput = document.querySelector('#check');

let principalSection = document.querySelector('#principalSection');
let aboutusSection = document.querySelector('#aboutusSection');
let treatmentsSection = document.querySelector('#treatmentsSection');
let staffSection = document.querySelector('#staffSection');
let faqSection = document.querySelector('#faqSection');
let contactSection = document.querySelector('#contactSection');

const options = {block: "center",behavior: "smooth"}

homeLink.addEventListener("click",()=>{
    principalSection.scrollIntoView(options)
    checkInput.checked = false;
})
aboutusLink.addEventListener("click",()=>{
    aboutusSection.scrollIntoView(options)
    checkInput.checked = false;
})
treatmentsLink.addEventListener("click",()=>{
    treatmentsSection.scrollIntoView(options)
    checkInput.checked = false;
})
staffLink.addEventListener("click",()=>{
    staffSection.scrollIntoView(options)
    checkInput.checked = false;
})
faqLink.addEventListener("click",()=>{
    faqSection.scrollIntoView(options)
    checkInput.checked = false;
})
contactLink.addEventListener("click",()=>{
    contactSection.scrollIntoView(options)
    checkInput.checked = false;
})