(function() {
    Object.defineProperty(ru, 'ad', {
        get: function() {
            return 'НЕ реклама';
        },
        set: function() {
            console.warn('Попытка изменить ru.ad была заблокирована');
        },
        configurable: false
    });
})();
