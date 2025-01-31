(function () {
    console.log("Принудительная замена рекламы!");

    function enforceNoAds(target) {
        return new Proxy(target, {
            get(obj, prop) {
                if (prop === "ad") {
                    return "НЕ реклама";
                }
                return obj[prop];
            },
            set(obj, prop, value) {
                if (prop === "ad") {
                    console.log("Попытка изменить ad заблокирована!");
                    return true; // Блокируем изменение
                }
                obj[prop] = value;
                return true;
            }
        });
    }

    // Перехватываем уже существующие языковые объекты
    if (window.ru) window.ru = enforceNoAds(window.ru);
    if (window.en) window.en = enforceNoAds(window.en);
    if (window.de) window.de = enforceNoAds(window.de);
    if (window.fr) window.fr = enforceNoAds(window.fr);

    // Отслеживаем добавление новых языков
    new Proxy(window, {
        set(target, prop, value) {
            if (typeof value === "object" && value !== null) {
                target[prop] = enforceNoAds(value);
            } else {
                target[prop] = value;
            }
            return true;
        }
    });

})();
