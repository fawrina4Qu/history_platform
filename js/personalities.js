document.addEventListener("DOMContentLoaded", () => {
  // 1. АВТОРИЗАЦИЯ И МЕНЮ
  if (!localStorage.getItem('user')) {
    window.location.href = 'auth_user.html';
  }
  
  const userNameEl = document.getElementById('userName');
  if (userNameEl) userNameEl.textContent = localStorage.getItem('user') || 'Гость';
  
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('user');
      window.location.href = 'auth_user.html';
    });
  }

  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      menuToggle.textContent = sidebar.classList.contains('open') ? '✕' : '☰';
    });
  }

  // 2. ДАННЫЕ (Все правители)
  const personalities = [
    {
      name: "Рюрик",
      years: "862 – 879 гг. | Династия Рюриковичей",
      desc: "Полулегендарный основатель первой русской княжеской династии. Согласно летописям, был призван на княжение племенами словен и кривичей, положив начало государственности на Руси.",
      image: "./img/personalities/ryurik.jpg"
    },
    {
      name: "Олег Вещий",
      years: "879 – 912 гг. | Династия Рюриковичей",
      desc: "Князь Новгородский и Киевский. В 882 году захватил Киев, объединив северные и южные земли в единое Древнерусское государство. Совершил успешный поход на Царьград и заключил выгодные торговые договоры с Византией.",
      image: "./img/personalities/oleg.jpg"
    },
    {
      name: "Княгиня Ольга",
      years: "945 – 962 гг. | Династия Рюриковичей",
      desc: "Первая женщина-правительница Руси. Жестоко отомстила древлянам за смерть мужа (князя Игоря). Провела первую налоговую реформу, упорядочив сбор дани. Первой из правителей Руси приняла христианство лично.",
      image: "./img/personalities/olga.jpg"
    },
    {
      name: "Святослав Игоревич",
      years: "962 – 972 гг. | Династия Рюриковичей",
      desc: "Князь-воин, почти всю жизнь проведший в походах. Разгромил Хазарский каганат, воевал с Волжской Булгарией и Византией. За храбрость и простоту в быту его называли «Александром Македонским Восточной Европы».",
      image: "./img/personalities/svyatoslav.jpg"
    },
    {
      name: "Владимир Святой",
      years: "980 – 1015 гг. | Династия Рюриковичей",
      desc: "Киевский князь, при котором произошло Крещение Руси в 988 году. Создал первую оборонительную систему на южных границах, ввел единую государственную религию, что укрепило международный авторитет Руси.",
      image: "./img/personalities/vladimir_svyatoy.jpg"
    },
    {
      name: "Ярослав Мудрый",
      years: "1019 – 1054 гг. | Династия Рюриковичей",
      desc: "Великий князь Киевский. При нём был составлен первый свод законов «Русская Правда», построены Софийские соборы в Киеве и Новгороде. Установил династические связи с правителями Европы.",
      image: "./img/personalities/yaroslav.jpg"
    },
    {
      name: "Владимир Мономах",
      years: "1113 – 1125 гг. | Династия Рюриковичей",
      desc: "Последний правитель единой Древней Руси. Организатор успешных походов против половцев. Автор знаменитого «Поучения детям», в котором завещал потомкам жить в мире и справедливости.",
      image: "./img/personalities/Vladimir_monomakh.jpg"
    },
    {
      name: "Андрей Боголюбский",
      years: "1157 – 1174 гг. | Династия Рюриковичей",
      desc: "Великий князь Владимирский. Перенес политический центр Руси из Киева во Владимир. Построил Успенский собор и всемирно известную церковь Покрова на Нерли. Убит в результате боярского заговора.",
      image: "./img/personalities/andrew.jpeg"
    },
    {
      name: "Александр Невский",
      years: "1252 – 1263 гг. | Династия Рюриковичей",
      desc: "Князь Новгородский и Великий князь Владимирский. Прославился победами над шведами (Невская битва) и Ливонским орденом (Ледовое побоище). Проводил политику компромисса с Золотой Ордой.",
      image: "./img/personalities/AlexanderNevsky.jpg"
    },
    {
      name: "Иван I Калита",
      years: "1325 – 1340 гг. | Династия Рюриковичей",
      desc: "Князь Московский. Заложил основы могущества Москвы. Получил от Орды право сбора дани, что позволило ему укрепить казну, расширить владения и перевести в Москву резиденцию митрополита.",
      image: "./img/personalities/Ivan_Kalita.jpg"
    },
    {
      name: "Дмитрий Донской",
      years: "1359 – 1389 гг. | Династия Рюриковичей",
      desc: "Великий князь Московский и Владимирский. В 1380 году разгромил войско Мамая в Куликовской битве, что стало переломным моментом в борьбе с Ордой. Впервые передал княжение сыну без ярлыка хана.",
      image: "./img/personalities/Dmitri_Donskoy.jpg"
    },
    {
      name: "Иван III Великий",
      years: "1462 – 1505 гг. | Династия Рюриковичей",
      desc: "Государь всея Руси. Сверг ордынское иго (Стояние на Угре, 1480). Присоединил к Москве Новгород, Тверь и другие земли, создав единое централизованное Русское государство.",
      image: "./img/personalities/Ivan_III_of_Russia_3.jpg"
    },
    {
      name: "Иван IV Грозный",
      years: "1533 – 1584 гг. | Династия Рюриковичей",
      desc: "Первый царь всея Руси. Провел масштабные реформы (Судебник, Земские соборы). Присоединил Казанское и Астраханское ханства, начал освоение Сибири. Ввел опричнину, приведшую к террору.",
      image: "./img/personalities/Ivan_grozny_frame.jpg"
    },
    {
      name: "Федор Иоаннович",
      years: "1584 – 1598 гг. | Династия Рюриковичей",
      desc: "Последний царь из династии Рюриковичей. Был набожным и тихим правителем, страной фактически управлял его шурин Борис Годунов. В его правление было учреждено патриаршество в Русской церкви.",
      image: "./img/personalities/Feodor_I_of_Russia.jpg"
    },
    {
      name: "Борис Годунов",
      years: "1598 – 1605 гг. | Смутное время",
      desc: "Фактический правитель при Федоре Иоанновиче, затем избранный царь. Продолжал укрепление центральной власти, строил крепости. Его правление совпало с Великим голодом, что привело к Смуте.",
      image: "./img/personalities/Portrait_of_Boris_Godunov.jpg"
    },
    {
      name: "Михаил Федорович",
      years: "1613 – 1645 гг. | Династия Романовых",
      desc: "Первый царь из династии Романовых. Избран на Земском соборе после окончания Смутного времени. Его правление стало началом восстановления страны после разрухи и укрепления государственности.",
      image: "./img/personalities/Michael-I-Romanov.jpg"
    },
    {
      name: "Алексей Михайлович",
      years: "1645 – 1676 гг. | Династия Романовых",
      desc: "Царь, при котором произошло воссоединение Украины с Россией (1654). Провел церковную реформу патриарха Никона, вызвавшую раскол. При нем составлено Соборное уложение 1649 года.",
      image: "./img/personalities/Alexander_I_of_Russia_.jpg"
    },
    {
      name: "Пётр I Великий",
      years: "1682 – 1725 гг. | Династия Романовых",
      desc: "Первый Император Всероссийский. Провел масштабные реформы, создал регулярную армию и флот, основал Санкт-Петербург. Победа в Северной войне обеспечила России выход к Балтийскому морю.",
      image: "./img/personalities/petr1.jpg"
    },
    {
      name: "Елизавета Петровна",
      years: "1741 – 1762 гг. | Династия Романовых",
      desc: "Дочь Петра I. При ней была основана Академия художеств и Московский университет (1755). Россия участвовала в Семилетней войне, одержав ряд громких побед над Пруссией.",
      image: "./img/personalities/Elisabeth_Petrovna.jpeg"
    },
    {
      name: "Екатерина II Великая",
      years: "1762 – 1796 гг. | Династия Романовых",
      desc: "Императрица, чье правление называют «золотым веком». Присоединила Крым и Новороссию, провела губернскую и судебную реформы, активно поддерживала науку, искусство и просвещение.",
      image: "./img/personalities/ekaterina2.jpg"
    },
    {
      name: "Александр I Благословенный",
      years: "1801 – 1825 гг. | Династия Романовых",
      desc: "Император, при котором Россия одержала победу в Отечественной войне 1812 года над Наполеоном. Провел либеральные реформы (учреждение министерств, указ о вольных хлебопашцах).",
      image: "./img/personalities/Alexander_I_of_Russia_.jpg"
    },
    {
      name: "Николай I",
      years: "1825 – 1855 гг. | Династия Романовых",
      desc: "Император, чье правление началось с восстания декабристов. Ужесточил цензуру и создал Третье отделение (политический сыск). При нем Россия вела Крымскую войну.",
      image: "./img/personalities/Nikolay1-4.jpg"
    },
    {
      name: "Александр II Освободитель",
      years: "1855 – 1881 гг. | Династия Романовых",
      desc: "Император, отменивший крепостное право в 1861 году. Провел земскую, судебную и военную реформы, присоединил к империи Среднюю Азию и Дальний Восток. Убит народовольцами.",
      image: "./img/personalities/alexandr2.jpg"
    },
    {
      name: "Александр III Миротворец",
      years: "1881 – 1894 гг. | Династия Романовых",
      desc: "Император, проводивший политику контрреформ и укрепления самодержавия. При нем Россия не вела ни одной войны, за что он получил прозвище «Миротворец». Активно развивал промышленность.",
      image: "./img/personalities/alexander3.jpg"
    },
    {
      name: "Николай II",
      years: "1894 – 1917 гг. | Династия Романовых",
      desc: "Последний Император Всероссийский. При нем произошли Первая русская революция, экономический подъем и Первая мировая война. Отрекся от престола в 1917 году, что привело к падению монархии.",
      image: "./img/personalities/nikolay2.jpg"
    }
  ];

  // 3. ЛОГИКА КАРУСЕЛИ
  let currentIndex = 0;
  const imageContainer = document.getElementById('imageContainer');
  const nameEl = document.getElementById('personName');
  const yearsEl = document.getElementById('personYears');
  const descEl = document.getElementById('personDesc');
  const currentNumEl = document.getElementById('currentNum');
  const totalNumEl = document.getElementById('totalNum');

  if (!imageContainer || !nameEl) return;

  function initCarousel() {
    totalNumEl.textContent = personalities.length;
    imageContainer.innerHTML = '';

    personalities.forEach((person, index) => {
      const img = document.createElement('img');
      img.src = person.image;
      img.alt = person.name;
      if (index === 0) img.classList.add('active');
      imageContainer.appendChild(img);
    });
    
    updateTextContent();
  }

  function updateTextContent() {
    const person = personalities[currentIndex];
    currentNumEl.textContent = currentIndex + 1;

    nameEl.textContent = person.name;
    yearsEl.textContent = person.years;
    descEl.textContent = person.desc;

    // Анимация текста
    nameEl.classList.remove('animate-text');
    yearsEl.classList.remove('animate-text');
    descEl.classList.remove('animate-text');
    void nameEl.offsetWidth; 
    nameEl.classList.add('animate-text');
    yearsEl.classList.add('animate-text');
    descEl.classList.add('animate-text');

    // Смена картинки
    const images = imageContainer.querySelectorAll('img');
    images.forEach(img => img.classList.remove('active'));
    if (images[currentIndex]) {
      images[currentIndex].classList.add('active');
    }
  }

  document.getElementById('nextBtn')?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % personalities.length;
    updateTextContent();
  });

  document.getElementById('prevBtn')?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + personalities.length) % personalities.length;
    updateTextContent();
  });

  document.getElementById('readMoreBtn')?.addEventListener('click', () => {
    const currentPersonName = personalities[currentIndex].name;
    window.location.href = `profile.html?name=${encodeURIComponent(currentPersonName)}`;
  });

  initCarousel();
});