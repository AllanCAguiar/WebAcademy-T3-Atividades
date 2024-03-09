const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const titulo = document.querySelector("h1");
const icone = document.querySelector(".flag-icon");
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */

const images = ['pic1.jpg', `pic2.jpg`, `pic3.jpg`, `pic4.jpg`, `pic5.jpg`];
const alts = {
  'pic1.jpg' : 'Feijoada - Brasil',
  'pic2.jpg' : 'Paella - Espanha',
  'pic3.jpg' : 'Pizza - Itália',
  'pic4.jpg' : 'Yakissoba - Japão',
  'pic5.jpg' : 'Enchilada - México'
}

/* Looping through images */

for (const image of images) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${image}`);
    newImage.setAttribute('alt', alts[image]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', e => {
        displayedImage.src = e.target.src;
        displayedImage.alt = e.target.alt;
        titulo.firstChild.nodeValue=e.target.alt;
        icone.src="images/bandeira"+(e.target.src.substring(e.target.src.lastIndexOf("/")+1));
  });
}

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', () => {
  const btnClass = btn.getAttribute('class');
  if (btnClass === 'dark') {
    btn.setAttribute('class','light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } 
  else {
    btn.setAttribute('class','dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});