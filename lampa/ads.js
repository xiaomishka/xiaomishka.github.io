(function () {
    console.log("Блокировка рекламы активирована");

    // Подменяем проверку подписки (премиум аккаунт)
    window.Account = window.Account || {};
    window.Account.hasPremium = () => true;

    // Ждём, пока появится VASTPlayer, и ломаем его
    let vastCheckInterval = setInterval(() => {
        if (window.VASTPlayer && !window.VASTPlayer.__blocked) {
            console.log("VASTPlayer найден, блокируем рекламу...");
            window.VASTPlayer.__blocked = true; // Флаг, чтобы не подменять дважды

            window.VASTPlayer.prototype.play = function () {
                console.log("VASTPlayer.play() заблокирован, реклама не воспроизводится");
                if (this.onVideoComplete) {
                    console.log("Эмулируем завершение рекламы через onVideoComplete()");
                    this.onVideoComplete();
                }
            };

            clearInterval(vastCheckInterval);
        }
    }, 500);

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
