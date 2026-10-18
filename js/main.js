// 1. Проверка авторизации и выход
if (!localStorage.getItem('user')) {
  window.location.href = 'auth_user.html';
}

const userNameElement = document.getElementById('userName');
if (userNameElement) {
  userNameElement.textContent = localStorage.getItem('user') || 'Гость';
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'auth_user.html';
  });
}

// 2. Бургер-меню
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    menuToggle.textContent = sidebar.classList.contains('open') ? '✕' : '☰';
  });
}

// 3. ИНТЕРАКТИВНАЯ КАРТА
document.addEventListener("DOMContentLoaded", () => {
  const points = document.querySelectorAll('.map-point');
  const popup = document.getElementById('mapPopup');
  const sidebar = document.getElementById('sidebar');

  if (!popup || points.length === 0) return;

  const popupTitle = document.getElementById('popupTitle');
  const popupFounded = document.getElementById('popupFounded');
  const popupHistory = document.getElementById('popupHistory');
  const popupFact = document.getElementById('popupFact');
  const popupImage = document.getElementById('popupImage');
  const popupClose = document.getElementById('popupClose');
  const nextFactBtn = document.getElementById('nextFactBtn');

  let factsArray = [];

  function showRandomFact() {
    if (factsArray.length === 0) return;
    const randomIndex = Math.floor(Math.random() * factsArray.length);
    popupFact.textContent = factsArray[randomIndex];
  }

  points.forEach(point => {
    point.addEventListener('click', function() {
      popupTitle.textContent = this.getAttribute('data-title');
      popupFounded.textContent = this.getAttribute('data-founded');
      popupHistory.textContent = this.getAttribute('data-history');

      // === ФИКС МИГАНИЯ КАРТИНКИ ===
      const newSrc = this.getAttribute('data-image');
      popupImage.style.visibility = 'hidden';

      const img = new Image();
      img.src = newSrc;
      img.decode().then(() => {
        popupImage.src = newSrc;
        popupImage.style.visibility = 'visible';
      }).catch(() => {
        popupImage.src = newSrc;
        popupImage.style.visibility = 'visible';
      });
      // =============================

      let factsString = this.getAttribute('data-facts');
      factsArray = factsString ? factsString.split(';') : ["Факт не найден"];

      showRandomFact();

      // Показываем попап
      popup.classList.add('active');

      // Принудительно закрываем меню, если оно открыто
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        document.getElementById('menuToggle').textContent = '☰';
      }
    });
  });

  if (nextFactBtn) nextFactBtn.addEventListener('click', showRandomFact);

  if (popupClose) {
    popupClose.addEventListener('click', () => {
      popup.classList.remove('active');
    });
  }

  // Закрытие при клике на темный фон вокруг попапа
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('active');
    }
  });
});