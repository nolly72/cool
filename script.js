// 1. Инициализация иконок
lucide.createIcons();

// 2. Данные для кнопок управления (Премиальная сетка)
const controlData = {
    climate: [
        { name: 'Увлажнение', icon: 'droplets' },
        { name: 'Ионизация', icon: 'wind' },
        { name: 'Очистка воздуха', icon: 'filter' },
        { name: 'Теплый пол', icon: 'thermometer-sun' },
        { name: 'Проветривание', icon: 'refresh-cw' },
        { name: 'Ночной режим', icon: 'moon' },
        { name: 'Осушение', icon: 'cloud-rain' }
    ],
    security: [
        { name: 'Полная охрана', icon: 'shield-alert' },
        { name: 'Анти-протечка', icon: 'waves' },
        { name: 'Блок дверей', icon: 'lock' },
        { name: 'Запись камер', icon: 'video' },
        { name: 'Датчик газа', icon: 'alert-triangle' },
        { name: 'Имитация дома', icon: 'users' },
        { name: 'Face ID Вход', icon: 'eye' }
    ],
    lighting: [
        { name: 'Выключить всё', icon: 'power' },
        { name: 'Режим чтения', icon: 'book-open' },
        { name: 'Вечерний уют', icon: 'sunset' },
        { name: 'Вечеринка', icon: 'music' },
        { name: 'Максимум', icon: 'sun' },
        { name: 'Подсветка пола', icon: 'grip-horizontal' },
        { name: 'Сцена RGB', icon: 'palette' }
    ]
};

// 3. Плавное переключение страниц
function switchPage(pageId) {
    const pages = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-item, .m-nav-btn');

    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === pageId) {
            setTimeout(() => page.classList.add('active'), 50);
        }
    });

    // Обновляем активное состояние кнопок навигации
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick')?.includes(`'${pageId}'`)) {
            item.classList.add('active');
        }
    });

    // Если страница — управление, рендерим кнопки
    if (controlData[pageId]) {
        renderControlButtons(pageId);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 4. Рендер кнопок управления
function renderControlButtons(type) {
    const container = document.getElementById(`${type}-btns`);
    if (!container) return;

    container.innerHTML = controlData[type].map(item => `
        <div class="ctrl-card glass-effect" onclick="notif('${item.name} активировано')">
            <i data-lucide="${item.icon}"></i>
            <span>${item.name}</span>
        </div>
    `).join('');
    lucide.createIcons();
}

// 5. ИИ Ассистент (Логика и вопросы)
const aiBrain = {
    questions: [
        "Какая температура?", "Кто дома?", "Экономия энергии", 
        "Проверь замки", "Закажи кофе", "Погода завтра", 
        "Режим кино", "Выключи всё", "Статус защиты", "Включи музыку"
    ],
    answers: [
        "Внутри 22.4°C. Идеально для отдыха.",
        "В доме только владелец. Посторонних нет.",
        "Сегодня вы сэкономили 12% ресурсов.",
        "Все точки доступа заблокированы. Безопасно.",
        "Кофемашина запущена. Будет готово через минуту.",
        "Завтра +19°C. Не забудьте зонт утром.",
        "Сценарий запущен. Приятного просмотра!",
        "Свет погашен во всем доме. Доброй ночи.",
        "Система защиты в режиме 'Максимум'.",
        "Запускаю ваш вечерний плейлист в гостиной."
    ]
};

function toggleAIChat() {
    const chat = document.getElementById('ai-chat');
    const isVisible = chat.style.display === 'flex';
    chat.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) renderAIHints();
}

function renderAIHints() {
    const hintsBox = document.getElementById('ai-hints-box');
    hintsBox.innerHTML = aiBrain.questions.map((q, i) => `
        <button class="pill" onclick="askAI(${i})">${q}</button>
    `).join('');
}

function askAI(index) {
    const flow = document.getElementById('chat-flow');
    
    // Добавляем сообщение пользователя
    flow.innerHTML += `<div class="msg user">${aiBrain.questions[index]}</div>`;
    
    // Ответ ИИ через небольшую паузу
    setTimeout(() => {
        flow.innerHTML += `<div class="msg ai">${aiBrain.answers[index]}</div>`;
        flow.scrollTop = flow.scrollHeight;
    }, 600);
}

// 6. Сервисы (Такси, Еда)
function handleService(type) {
    const actions = {
        taxi: "🚕 Направляю вас в Яндекс Такси...",
        food: "🍕 Перехожу в Яндекс Лавка...",
        fun: "🎭 Ищу развлечения рядом с вами..."
    };
    notif(actions[type]);
}

// 7. Уведомления (Toast)
function notif(msg) {
    const wrapper = document.getElementById('toast-wrapper');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    wrapper.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// 8. Слайдер температуры
document.getElementById('temp-slider').addEventListener('input', function(e) {
    document.getElementById('temp-val').innerText = e.target.value;
});

// 9. Отрисовка графика (Chart.js)
const ctx = document.getElementById('luxuryChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        datasets: [{
            data: [1.2, 1.8, 1.3, 2.1, 1.7, 2.9, 2.4],
            borderColor: '#3b82f6',
            borderWidth: 4,
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            pointRadius: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { display: false } }
    }
});

// Инициализация стартовых зон
document.getElementById('active-zones-list').innerHTML = `
    <div class="ctrl-card" style="padding: 15px; flex-direction: row; justify-content: flex-start; margin-bottom: 10px;">
        <i data-lucide="tv"></i> <span style="font-size: 13px;">Гостиная • Тв активен</span>
    </div>
    <div class="ctrl-card" style="padding: 15px; flex-direction: row; justify-content: flex-start;">
        <i data-lucide="coffee"></i> <span style="font-size: 13px;">Кухня • Кофемашина</span>
    </div>
`;
lucide.createIcons();
