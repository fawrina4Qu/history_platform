// ==========================================
// 1. ФУНКЦИЯ ДЛЯ ГЛАЗИКА (ПОКАЗ ПАРОЛЯ)
// ==========================================
function togglePassword(inputId, button) {
  const input = document.getElementById(inputId);
  
  // Если сейчас пароль скрыт точками — показываем текст
  if (input.type === 'password') {
    input.type = 'text';
    button.textContent = '🙈'; // Меняем иконку
  } else {
    // Если текст виден — скрываем обратно
    input.type = 'password';
    button.textContent = '👁️'; // Возвращаем иконку
  }
}

// ==========================================
// 2. НАХОДИМ ЭЛЕМЕНТЫ НА СТРАНИЦЕ
// ==========================================
const tabLogin = document.getElementById('tabLogin');
const tabRegister = document.getElementById('tabRegister');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// ==========================================
// 3. ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ВКЛАДОК
// ==========================================
tabLogin.addEventListener('click', () => {
  tabLogin.classList.add('active');
  tabRegister.classList.remove('active');
  loginForm.classList.add('active');
  registerForm.classList.remove('active');
});

tabRegister.addEventListener('click', () => {
  tabRegister.classList.add('active');
  tabLogin.classList.remove('active');
  registerForm.classList.add('active');
  loginForm.classList.remove('active');
});

// ==========================================
// 4. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ ПРОВЕРКИ
// ==========================================
function hasRussianLetters(str) {
  return /[а-яА-ЯёЁ]/.test(str);
}

function isPasswordLongEnough(password) {
  return password.length > 8;
}

// ==========================================
// 5. ОБРАБОТКА ВХОДА
// ==========================================
loginForm.addEventListener('submit', (e) => {
  e.preventDefault(); 
  const errorBlock = document.getElementById('loginError');
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (hasRussianLetters(username)) {
    alert("❌ Ошибка!\nЛогин должен содержать только латинские буквы и цифры.");
    return; 
  }

  if (!isPasswordLongEnough(password)) {
    alert("❌ Ошибка входа!\nПароль должен содержать больше 8 символов.");
    return;
  }

  // Внимание: я поменял 1234 на 123456789, чтобы пройти проверку длины!
  if (username === 'admin' && password === '123456789') {
    errorBlock.style.color = 'green';
    errorBlock.textContent = 'Успешный вход! Перенаправление...';
    localStorage.setItem('user', username);
    setTimeout(() => window.location.href = 'index.html', 1000);
  } else {
    errorBlock.style.color = '#d32f2f';
    errorBlock.textContent = 'Неверный логин или пароль';
  }
});

// ==========================================
// 6. ОБРАБОТКА РЕГИСТРАЦИИ
// ==========================================
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const errorBlock = document.getElementById('registerError');
  
  const user = document.getElementById('regUsername').value.trim();
  const pass = document.getElementById('regPassword').value;
  const pass2 = document.getElementById('regPassword2').value;

  if (hasRussianLetters(user)) {
    alert("❌ Ошибка регистрации!\nВ логине нельзя использовать русские буквы.");
    return; 
  }

  if (hasRussianLetters(pass)) {
    alert("❌ Ошибка регистрации!\nВ пароле нельзя использовать русские буквы.");
    return; 
  }

  if (!isPasswordLongEnough(pass)) {
    alert("❌ Ошибка регистрации!\nПароль должен содержать больше 8 символов.");
    return; 
  }

  if (pass !== pass2) {
    alert("❌ Ошибка регистрации!\nПароли не совпадают!");
    return;
  }

  errorBlock.style.color = 'green';
  errorBlock.textContent = 'Регистрация успешна! Перенаправление...';
  
  localStorage.setItem('user', user);
  
  setTimeout(() => window.location.href = 'welcome_user.html', 1000);
});