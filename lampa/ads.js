(function () {
    console.log("Блокировка рекламы активирована");

    // Подменяем проверку подписки (премиум аккаунт)
    window.Account = window.Account || {};
    window.Account.hasPremium = () => true;

    // Ломаем загрузку рекламного видео в Preroll
    if (window.Preroll) {
        window.Preroll.video = function (vast, num, started, ended, call) {
            console.log("Ломаем рекламный ролик...");
            
            setTimeout(() => {
                console.log("Форсируем завершение рекламы");
                if (typeof call === "function") call(); // Запускаем основное видео
                if (window.player) window.player.emit('AdStopped'); // Отправляем событие завершения
            }, 100);
        };
    }

    // Блокируем воспроизведение рекламы в VASTPlayer
    if (window.VASTPlayer) {
        window.VASTPlayer.prototype.play = function () {
            console.log("VASTPlayer.play() заблокирован, реклама не воспроизводится");
            if (this.onVideoComplete) this.onVideoComplete(); // Эмулируем завершение рекламы
        };
    }

    // Очищаем таймеры рекламы
    function clearAdTimers() {
        console.log("Очищаем рекламные таймеры...");
        let highestTimeout = setTimeout(() => {}, 0);
        for (let i = 0; i <= highestTimeout; i++) {
            clearTimeout(i);
            clearInterval(i);
        }
    }

    // Убираем рекламу после загрузки страницы
    document.addEventListener("DOMContentLoaded", clearAdTimers);
})();
