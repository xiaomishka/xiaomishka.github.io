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

    // Перехватываем создание VASTPlayer
    let originalVASTPlayer = window.VASTPlayer;
    Object.defineProperty(window, "VASTPlayer", {
        configurable: true,
        set: function (value) {
            console.log("VASTPlayer подменён!");
            originalVASTPlayer = value;
        },
        get: function () {
            return function () {
                console.log("Создаётся новый экземпляр VASTPlayer...");

                let instance = new originalVASTPlayer(...arguments);

                // Ломаем метод play()
                instance.play = function () {
                    console.log("VASTPlayer.play() заблокирован, реклама не воспроизводится");
                    if (instance.onVideoComplete) {
                        console.log("Эмулируем завершение рекламы через onVideoComplete()");
                        instance.onVideoComplete();
                    }
                };

                return instance;
            };
        }
    });

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
