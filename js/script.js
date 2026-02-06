/* ================================================================
   MENAXHIMI I MODALIT PDF
   Pergjegjes per hapjen/mbylljen e dritares dhe ngarkimin e skedarit.
   ================================================================ */

function openPDF(path) {
    document.getElementById("pdfViewer").src = path;
    document.getElementById("pdfModal").style.display = "flex";
}

function closePDF() {
    document.getElementById("pdfViewer").src = "";
    document.getElementById("pdfModal").style.display = "none";
}

/* ================================================================
   KONFIGURIMI I HERO SLIDER
   Percaktimi i imazheve dhe gjendjes fillestare te slider-it.
   ================================================================ */

const slides = [
    "images/sliders/slide1.jpg",
    "images/sliders/slide2.jpg",
    "images/sliders/slide3.jpg",
    "images/sliders/slide4.jpg",
    "images/sliders/slide5.jpg"
];

const hero = document.querySelector(".hero");
let current = 0;

hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${slides[0]}")`;

/* ================================================================
   LOGJIKA E ANIMACIONIT DHE TRANZICIONIT
   Trajton nderrimin e imazheve permes injektimit te stileve dinamike
   dhe sinkronizimit te animacionit CSS me JavaScript.
   ================================================================ */

function nextSlide() {
    current = (current + 1) % slides.length;
    const nextImgUrl = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${slides[current]}")`;

    hero.style.setProperty('--next-img', nextImgUrl); 
    
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `.hero::after { background-image: ${nextImgUrl}; }`;
    document.head.appendChild(styleSheet);

    hero.classList.add('slide-in');

    setTimeout(() => {
        hero.style.backgroundImage = nextImgUrl;
        hero.classList.remove('slide-in');
        styleSheet.remove();
    }, 1200);
}

// Inicializimi i ciklit automatik te slider-it
setInterval(nextSlide, 4000);