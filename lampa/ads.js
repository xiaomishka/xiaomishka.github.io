(function () {
    console.log("Блокировка рекламы активирована");

    // Подменяем проверку подписки (премиум аккаунт)
    window.Account = window.Account || {};
    window.Account.hasPremium = () => true;

    // Удаление рекламных блоков
    function removeAds() {
        document.querySelectorAll('.ad-preroll, .ad-bot, .ad-video-block').forEach(el => el.remove());
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

    // Очищаем рекламу каждые 2 секунды (если появляется динамически)
    setInterval(removeAds, 2000);

    // Убираем рекламу при загрузке страницы
    document.addEventListener("DOMContentLoaded", removeAds);
})();
