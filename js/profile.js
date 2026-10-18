document.addEventListener("DOMContentLoaded", () => {
  // 1. Авторизация и меню (стандартные функции)
  if (!localStorage.getItem('user')) window.location.href = 'auth_user.html';
  document.getElementById('userName').textContent = localStorage.getItem('user') || 'Гость';
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'auth_user.html';
  });
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // 2. БАЗА ДАННЫХ ПРОФИЛЕЙ (Подробная информация)
  const profilesDB = {
    "Пётр I": {
      name: "Пётр I Великий",
      years: "1682 – 1725 гг. | Император",
      image: "./img/petr.jpg",
      desc: "Последний царь всея Руси и первый Император Всероссийский. Провёл масштабные реформы, создал регулярную армию и флот, основал Санкт-Петербург и вывел Россию в число ведущих европейских держав.",
      facts: [
        "Рост Петра I составлял 203 см, что для того времени было огромным показателем.",
        "Он ввел налог на бороды. Тем, кто отказывался бриться, приходилось носить специальный медный жетон.",
        "Пётр I освоил 14 ремесел, включая стоматологию и токарное дело.",
        "Именно он привез в Россию картофель и кофе."
      ]
    },
    "Екатерина II": {
      name: "Екатерина II Великая",
      years: "1762 – 1796 гг. | Императрица",
      image: "./img/ekaterina.jpg",
      desc: "Императрица Всероссийская, чьё правление называют «золотым веком» Российской империи. Присоединила Крым и Новороссию, провела губернскую реформу и активно поддерживала науку и искусство.",
      facts: [
        "Екатерина II не была русской по происхождению, она была немецкой принцессой.",
        "Она ввела в России первую прививку от оспы, сделав её себе и наследнику.",
        "Императрица спала всего 4-5 часов в сутки и много писала.",
        "При ней было основано Эрмитажное собрание."
      ]
    },
    "Александр II": {
      name: "Александр II Освободитель",
      years: "1855 – 1881 гг. | Император",
      image: "./img/alexandr2.jpg",
      desc: "Император, вошедший в историю как Освободитель. В 1861 году отменил крепостное право, провёл земскую, судебную и военную реформы, присоединил к империи Среднюю Азию и Дальний Восток.",
      facts: [
        "Отмена крепостного права произошла 19 февраля 1861 года.",
        "Александр II продал Аляску США в 1867 году за 7,2 млн долларов.",
        "На него было совершено несколько покушений, последнее из которых стало смертельным.",
        "На месте его гибели был возведен храм Спаса на Крови."
      ]
    }
    // ДОБАВЛЯЙ СЮДА ОСТАЛЬНЫХ ПРАВИТЕЛЕЙ...
  };

  // 3. ПОЛУЧАЕМ ПАРАМЕТР ИЗ URL
  const urlParams = new URLSearchParams(window.location.search);
  const personName = urlParams.get('name');

  // 4. ЗАПОЛНЯЕМ СТРАНИЦУ
  const profileData = profilesDB[personName];

  if (profileData) {
    // Меняем Title страницы
    document.title = profileData.name + " | История России";
    
    // Заполняем данные
    document.getElementById('profileName').textContent = profileData.name;
    document.getElementById('profileYears').textContent = profileData.years;
    document.getElementById('profileDesc').textContent = profileData.desc;
    
    // Картинка
    document.getElementById('profileImage').src = profileData.image;
    
    // Список фактов
    const factsList = document.getElementById('profileFactsList');
    factsList.innerHTML = ''; // Очищаем перед заполнением
    profileData.facts.forEach(fact => {
      const li = document.createElement('li');
      li.textContent = fact;
      factsList.appendChild(li);
    });
  } else {
    // Если правителя нет в базе
    document.getElementById('profileName').textContent = "Правитель не найден";
    document.getElementById('profileDesc').textContent = "Информация о данном правителе пока находится в разработке.";
    document.querySelector('.profile-sidebar').style.display = 'none';
  }
});