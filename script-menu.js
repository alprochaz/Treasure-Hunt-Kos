const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".menu__list");


// pri kliknuti se ikonka hamburgeru zmeni na krizek a prisune se vertikalni menu pro mensi obrazovky -> pri dalsim kliknuti se vrati vse zpet
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");         

})

document.querySelectorAll(".menu__link").forEach(n => n. 
    addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }))

