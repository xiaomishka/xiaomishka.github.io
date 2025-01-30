(function () {
    console.log("Блокировка рекламы активирована");

    // Подменяем проверку подписки (премиум аккаунт)
    window.Account = window.Account || {};
    window.Account.hasPremium = () => true;

    // Отменяем возможные рекламные таймеры
    function clearAdTimers() {
        console.log("Очищаем таймеры рекламы...");
        let highestTimeout = setTimeout(() => {}, 0);
        for (let i = 0; i <= highestTimeout; i++) {
            clearTimeout(i);
            clearInterval(i);
        }
    }

    // Пропускаем рекламу, если есть кнопка "Пропустить"
    function skipAd() {
        console.log("Форсируем завершение рекламы...");

        let skipButton = document.querySelector('.ad-skip-button, .skip-ad, .ad-skip');
        if (skipButton) {
            skipButton.click();
            console.log("Кнопка 'Пропустить рекламу' нажата (форсировано)");
        }

        if (window.player && typeof window.player.emit === "function") {
            window.player.emit('AdStopped');
            console.log("Ad complete (форсировано)");

            // Принудительно запускаем видео, если оно не стартует
            setTimeout(() => {
                if (typeof window.player.play === "function") {
                    window.player.play();
                    console.log("Принудительный запуск видео");
                }
            }, 500);
        }

        clearAdTimers(); // Очищаем все таймеры рекламы
    }

    // Блокируем API-запросы рекламы
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

    // Проверяем рекламу каждые 2 секунды
    setInterval(skipAd, 2000);

    // Запускаем после загрузки страницы
    document.addEventListener("DOMContentLoaded", skipAd);
})();
