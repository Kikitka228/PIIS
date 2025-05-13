const btnDarkMode = document.querySelector(".dark-mode-btn");

// 1. Проверка темной темы на уровне системных настроек
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ) {
    btnDarkMode.classList.add("dark-mode-btn--active");
	document.body.classList.add("dark");
}

// 2. Проверка темной темы в localStorage
if (localStorage.getItem('darkMode') === 'dark') {
    btnDarkMode.classList.add("dark-mode-btn--active");
    document.body.classList.add("dark");
} else if (localStorage.getItem("darkMode") === "light") {
    btnDarkMode.classList.remove("dark-mode-btn--active");
    document.body.classList.remove("dark");
}

// Если меняются системные настройки, меняем тему
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
        const newColorScheme = event.matches ? "dark" : "light";

        if (newColorScheme === "dark") {
			btnDarkMode.classList.add("dark-mode-btn--active");
			document.body.classList.add("dark");
			localStorage.setItem("darkMode", "dark");
		} else {
			btnDarkMode.classList.remove("dark-mode-btn--active");
			document.body.classList.remove("dark");
			localStorage.setItem("darkMode", "light");
		}
    });

// Включение ночного режима по кнопке
btnDarkMode.onclick = function () {
    btnDarkMode.classList.toggle("dark-mode-btn--active");
    const isDark = document.body.classList.toggle("dark");

    if (isDark) {
        localStorage.setItem("darkMode", "dark");
    } else {
        localStorage.setItem("darkMode", "light");
    }
};

// Функции поиска и сортировки
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const sortBtn = document.getElementById('sort-btn');
    const projectsContainer = document.querySelector('.projects');
    let projects = Array.from(document.querySelectorAll('.project'));
    let isSorted = false;
    let originalOrder = projects.map(project => project.cloneNode(true));

    // Функция поиска
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();

        projects.forEach(project => {
            const title = project.querySelector('.project__title').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }

    // Функция сортировки
    function performSort() {
        if (isSorted) {
            // Возвращаем исходный порядок
            projectsContainer.innerHTML = '';
            originalOrder.forEach(project => {
                projectsContainer.appendChild(project);
            });
            projects = Array.from(document.querySelectorAll('.project'));
            sortBtn.textContent = 'Сортировка А-Я';
        } else {
            // Сортируем по алфавиту
            projects.sort((a, b) => {
                const titleA = a.querySelector('.project__title').textContent.toLowerCase();
                const titleB = b.querySelector('.project__title').textContent.toLowerCase();
                return titleA.localeCompare(titleB);
            });

            // Очищаем контейнер и добавляем отсортированные проекты
            projectsContainer.innerHTML = '';
            projects.forEach(project => {
                projectsContainer.appendChild(project);
            });

            sortBtn.textContent = 'Сбросить сортировку';
        }

        isSorted = !isSorted;
        // Применяем поиск после сортировки
        performSearch();
    }

    // Обработчики событий
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    sortBtn.addEventListener('click', performSort);

    // Сохраняем оригинальный порядок проектов
    originalOrder = projects.map(project => project.cloneNode(true));
});


