(function() {
    var originalFetch = window.fetch;

    window.fetch = function(url, options) {
        return originalFetch(url, options).then(response => {
            return response.json().then(data => {
                if (url.includes('users/get')) {
                    data.user.premium = 1; // Подменяем premium в ответе
                }
                return new Response(JSON.stringify(data), {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers
                });
            });
        });
    };
setInterval(() => {
    if (typeof user_data !== "undefined") {
        user_data.premium = Date.now() + 1000 * 60 * 60 * 24 * 365 * 100;
        data_user.premium = 1;
    }
    if (typeof Utils$2 !== "undefined") {
        Utils$2.countDays = () => 9999;
    }
}, 1000);

})();
