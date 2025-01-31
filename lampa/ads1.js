(function() {
    // Перехватываем getUser, чтобы изменить user_data после загрузки
    var originalGetUser = window.getUser;

    window.getUser = function() {
        originalGetUser(); // Вызов оригинальной функции

        setTimeout(() => {
            if (typeof user_data !== "undefined") {
                user_data.premium = Date.now() + 1000 * 60 * 60 * 24 * 365 * 100; // 100 лет подписки
                user_data.permission = 1; // Можно добавить, если сайт использует permission
                Storage.set('account_user', JSON.stringify(user_data)); // Сохраняем в хранилище
                console.log("🔥 Premium активирован! 🔥");
            }
        }, 2000); // Ждём, пока загрузятся данные
    };

    // Подмена countDays, чтобы премиум никогда не истекал
    window.countDays = function(time_a, time_b) {
        return 9999; // Всегда 9999 дней
    };

    // Подмена checkPremium, чтобы сайт всегда думал, что премиум есть
    window.checkPremium = function() {
        return 9999; // Всегда активный премиум
    };

    // Автоматическая подмена user_data.premium каждые 1 секунду (защита)
    setInterval(() => {
        if (typeof user_data !== "undefined") {
            user_data.premium = Date.now() + 1000 * 60 * 60 * 24 * 365 * 100;
            user_data.permission = 1; // Возможно, это тоже влияет на премиум
            Storage.set('account_user', JSON.stringify(user_data));
        }
    }, 1000);
})();
