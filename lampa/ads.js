(function () {
    console.log("Блокировка рекламы активирована");

    // Подменяем проверку подписки (включаем "премиум")
    window.Account = window.Account || {};
    window.Account.hasPremium = () => true;
    console.log("Псевдо премиум активирован");

    // Эмулируем завершение рекламы
    function skipAd() {
        console.log("Форсируем завершение рекламы...");

        if (window.player && typeof window.player.emit === "function") {
            window.player.emit('AdStopped'); // Сообщаем, что реклама закончилась
            console.log("Ad complete (форсировано)");
        }

        // Запускаем основной контент
        if (typeof window.call === "function") {
            window.call();
            console.log("Запуск видео после рекламы");
        }
    }

    // Периодически проверяем и пропускаем рекламу
    setInterval(skipAd, 1000);

    // Пропускаем рекламу при загрузке страницы
    document.addEventListener("DOMContentLoaded", skipAd);
})();
