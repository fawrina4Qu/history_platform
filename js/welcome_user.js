// Если пользователь не зарегистрирован, выкидываем его на страницу входа
if (!localStorage.getItem('user')) {
  window.location.href = 'auth_user.html';
}

// Берем имя из памяти и вставляем в заголовок
const name = localStorage.getItem('user') || 'друг';
document.getElementById('welcomeName').textContent = name;

// Массив мотивационных цитат
const quotes = [
  { text: "Народ, не знающий своего прошлого, не имеет будущего.", author: "М. В. Ломоносов" },
  { text: "История — свидетель прошлого, свет истины, живая память.", author: "Цицерон" },
  { text: "Кто не помнит своего прошлого, тот обречён пережить его снова.", author: "Дж. Сантаяна" },
  { text: "История России — это история великих побед и великих испытаний.", author: "Н. М. Карамзин" },
  { text: "Мы должны знать историю, чтобы понимать себя.", author: "В. О. Ключевский" }
];

// Выбираем случайную цитату
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

// Вставляем текст и автора в HTML
document.getElementById('quoteText').textContent = `«${randomQuote.text}»`;
document.getElementById('quoteAuthor').textContent = `— ${randomQuote.author}`;

// Обработка кнопки "Начать путешествие"
document.getElementById('startBtn').addEventListener('click', () => {
  // Перекидываем на главную
  window.location.href = 'index.html';
});