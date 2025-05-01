// document.addEventListener('DOMContentLoaded', () => {});

const slidesContainer = document.querySelector('.carousel-slides');
const slides = Array.from(document.querySelectorAll('.carousel-item'));
const btnPrev = document.querySelector('.carousel-control.prev');
const btnNext = document.querySelector('.carousel-control.next');
console.log('btnPrev →', btnPrev, '\nbtnNext →', btnNext);

/* posição inicial*/
let currentIndex = 0;

/* Função para atualizar a posição do container */
function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

/* deslocamento*/
    const offset = -currentIndex * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`;
  }

/* clique */
  btnPrev.addEventListener('click', () => showSlide(currentIndex - 1));
  btnNext.addEventListener('click', () => showSlide(currentIndex + 1));

  showSlide(0);

/*DarkMode*/ 
const btnDarkMode = document.querySelector('.darkMode');
const icon = btnDarkMode.querySelector('i');
const body = document.body;

// Aplica o tema salvo e ícone correspondente
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';

    body.classList.toggle('dark-mode', isDark);
    icon.classList.replace('bi-sun-fill', isDark ? 'bi-sun-fill' : 'bi-moon-fill');
});

// Alterna entre dark/light mode e o ícone
btnDarkMode.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-mode');

    icon.classList.replace(isDark ? 'bi-moon-fill' : 'bi-sun-fill', isDark ? 'bi-sun-fill' : 'bi-moon-fill');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Mostrar menu em telas menores
const menuToggle = document.querySelector('.menuToggle');
const menuLinks = document.querySelector('.menuLinks');

menuToggle.addEventListener('click', () => {
  menuLinks.classList.toggle('show');
});

//fechar menu ao clicar em opção
const menuItems = document.querySelectorAll('.menuLinks a');

menuItems.forEach(link => {
  link.addEventListener('click', () => {
    menuLinks.classList.remove('show');
  });
});

//efeito de rolagem em mobile
let touchStartX = null;
let touchEndX = null;

slidesContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

slidesContainer.addEventListener('touchmove', (e) => {
  touchEndX = e.touches[0].clientX;
});

slidesContainer.addEventListener('touchend', () => {
  if (touchStartX === null || touchEndX === null) return;

  const distance = touchStartX - touchEndX;
  const swipeThreshold = 50;

  if (distance > swipeThreshold) {
    showSlide(currentIndex + 1); // Esquerda → próximo
  } else if (distance < -swipeThreshold) {
    showSlide(currentIndex - 1); // Direita → anterior
  }

  // Reset para novos gestos
  touchStartX = null;
  touchEndX = null;
});