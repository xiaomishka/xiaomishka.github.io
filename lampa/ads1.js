(function () {
    console.log("Перехват JSON для замены рекламы");

    // Перехватываем JSON.parse
    const originalParse = JSON.parse;
    JSON.parse = function (text, reviver) {
        if (typeof text === "string" && text.includes('"ad":')) {
            console.log("Перехватываем JSON и заменяем рекламу...");
            text = text.replace(/"ad"\s*:\s*".*?"/g, '"ad": "НЕ реклама"');
        }
        return originalParse(text, reviver);
    };

    // Перехватываем fetch для замены JSON перед обработкой
    const originalFetch = window.fetch;
    window.fetch = function (...args) {
        return originalFetch(...args).then(response => {
            return response.text().then(text => {
                if (text.includes('"ad":')) {
                    console.log("Обнаружена реклама в JSON, заменяем...");
                    text = text.replace(/"ad"\s*:\s*".*?"/g, '"ad": "НЕ реклама"');
                }
                return new Response(text, {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers
                });
            });
        });
    };

})();
