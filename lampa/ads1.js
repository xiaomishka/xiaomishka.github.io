(function () {
    function replaceAdText() {
        if (window.ru && window.ru.ad) {
            window.ru.ad = 'Приятного чаяпития'; // Замените на нужное слово
        }
    }

    // Первоначальная замена
    replaceAdText();

    // Интервал для периодической замены (каждые 500 мс)
    setInterval(replaceAdText, 500);

    // Используем MutationObserver для отслеживания изменений объекта window.ru
    var observer = new MutationObserver(replaceAdText);

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

})();
