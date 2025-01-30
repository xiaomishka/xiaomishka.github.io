(function () {
    console.log("Блокировка рекламы активирована");

    // Подменяем проверку подписки (премиум аккаунт)
    window.Account = window.Account || {};
    window.Account.hasPremium = () => true;

    // Функция для форсированного пропуска рекламы
    function skipAd() {
        console.log("Форсируем завершение рекламы...");

        // Эмулируем клик по кнопке "Пропустить рекламу", если она есть
        let skipButton = document.querySelector('.ad-skip-button, .skip-ad, .ad-skip');
        if (skipButton) {
            skipButton.click();
            console.log("Кнопка 'Пропустить рекламу' нажата (форсировано)");
        }

        // Триггерим завершение рекламы
        if (window.player && typeof window.player.emit === "function") {
            window.player.emit('AdStopped');
            console.log("Ad complete (форсировано)");
        }
    }

    // Блокировка API-запросов к рекламе
    (function () {
        var open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function (method, url) {
            if (url.includes("/api/ad/")) {
                console.log("Блокирован рекламный запрос:", url);
                return;
            }
            open.apply(this, arguments);
        };
    })();

    // Запускаем пропуск рекламы каждые 2 секунды
    setInterval(skipAd, 2000);

    // Пропускаем рекламу при загрузке страницы
    document.addEventListener("DOMContentLoaded", skipAd);
})();
