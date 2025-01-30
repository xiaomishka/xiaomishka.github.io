(function () {
    console.log("Блокировка рекламы активирована");

    // Подменяем проверку подписки (премиум аккаунт)
    window.Account = window.Account || {};
    window.Account.hasPremium = () => true;

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

    // Ломаем запуск рекламы в Preroll
    let originalPreroll = window.Preroll;
    Object.defineProperty(window, "Preroll", {
        configurable: true,
        set: function (value) {
            console.log("Preroll подменён!");
            originalPreroll = value;
        },
        get: function () {
            return {
                launch: function (call) {
                    console.log("Preroll.launch() заблокирован, сразу запускаем видео!");
                    setTimeout(() => {
                        if (typeof call === "function") call(); // Запускаем основное видео
                        if (window.player) window.player.emit('AdStopped'); // Отправляем событие завершения
                    }, 100);
                },
                video: function () {
                    console.log("Preroll.video() заблокирован!");
                },
                show: function () {
                    console.log("Preroll.show() заблокирован!");
                }
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
