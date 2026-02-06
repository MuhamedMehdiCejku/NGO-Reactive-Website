/* ================================================================
   INICIALIZIMI I ELEMENTEVE DHE VARIABLAT GLOBALE
   Perzgjedhja e nyjeve te DOM dhe konfigurimi i tranzicionit.
   ================================================================ */

const galleries = document.querySelectorAll('.gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let allImages = [];
let currentIndex = 0;

lightboxImg.style.transition = 'opacity 0.3s';

/* ================================================================
   GjENERIMI DINAMIK I GALERISE
   Iterimi neper foldere dhe krijimi i elementeve <img> me Lazy Load.
   ================================================================ */

galleries.forEach(gallery => {
    const folder = gallery.dataset.folder;
    const count = parseInt(gallery.dataset.count);

    for (let i = 1; i <= count; i++) {
        const imgSrc = `images/${folder}/img${i}.jpg`;
        allImages.push(imgSrc);

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `Foto nga ${folder}`;
        img.setAttribute('loading', 'lazy');

        const thisIndex = allImages.length - 1;
        img.onclick = () => openLightbox(thisIndex);

        gallery.appendChild(img);
    }
});

/* ================================================================
   LOGJIKA E LIGHTBOX (SHFAQJA DHE NDERRIMI)
   Trajton hapjen e modalit dhe efektin fade gjate ngarkimit te fotos.
   ================================================================ */

function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = 'flex';
    updateImage();
}

function updateImage() {
    lightboxImg.style.opacity = '0';
    lightboxImg.src = allImages[currentIndex];
    lightboxImg.onload = () => {
        lightboxImg.style.opacity = '1';
    };
}

/* ================================================================
   NAVIGIMI DHE KONTROLLI
   Menaxhimi i eventeve per butonat, tastieren dhe mbylljen e modalit.
   ================================================================ */

nextBtn.onclick = (e) => { e.stopPropagation(); showNext(); };
prevBtn.onclick = (e) => { e.stopPropagation(); showPrev(); };

function showNext() {
    currentIndex = (currentIndex + 1) % allImages.length;
    updateImage();
}

function showPrev() {
    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    updateImage();
}

closeBtn.onclick = () => lightbox.style.display = 'none';

lightbox.onclick = (e) => {
    if (e.target !== lightboxImg) lightbox.style.display = 'none';
};

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") lightbox.style.display = 'none';
    }
});