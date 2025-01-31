(function () {
    console.log("Переопределение рекламы");

    function overrideAdProperty(langObj) {
        if (langObj && typeof langObj === "object") {
            Object.defineProperty(langObj, 'ad', {
                get: function () {
                    return "НЕ реклама";
                },
                set: function () {
                    console.log("Попытка изменить ad заблокирована!");
                },
                configurable: false, 
                enumerable: true
            });
        }
    }

    // Переопределяем свойство ad в уже существующих объектах
    if (window.ru) overrideAdProperty(window.ru);
    if (window.en) overrideAdProperty(window.en);
    if (window.de) overrideAdProperty(window.de);
    if (window.fr) overrideAdProperty(window.fr);

    // Следим за добавлением новых языков
    new Proxy(window, {
        set(target, prop, value) {
            if (typeof value === "object" && value !== null) {
                overrideAdProperty(value);
            }
            target[prop] = value;
            return true;
        }
    });

})();
