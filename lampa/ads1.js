
(function () {
    'use strict';

    // Указываем, что Lampa запущена в режиме TV
    Lampa.Platform.tv();

    // Устанавливаем протокол HTTP в настройках Lampa
    Lampa.Storage.set("protocol", "http");

    // Функция для управления источниками поиска
    function updateSource() {
        var searchSources = document.getElementsByClassName("search__sources");
        var currentSource = Lampa.Storage.get("source");

        if (searchSources.length > 0 || (Lampa.Activity.active() && Lampa.Activity.active().component === "category_full")) {
            if (Lampa.Storage.get("source") === 'cub') {
                Lampa.Storage.set('mySource', currentSource);
                Lampa.Storage.set("source", "tmdb");
            }
        } else {
            if (localStorage.getItem('mySource')) {
                Lampa.Storage.set("source", Lampa.Storage.get('mySource'));
                localStorage.removeItem("mySource");
            }
        }
    }

    // Наблюдатель за изменениями в DOM
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === "childList") {
                updateSource();
            }
        });
    });

    var observerConfig = {
        childList: true,
        subtree: true
    };
    observer.observe(document.body, observerConfig);

    // Удаляем ненужные плагины
    var plugins = Lampa.Storage.get("plugins") || [];
    plugins = plugins.filter(function (plugin) {
        return plugin.url !== "http://cub.red/plugin/tmdb-proxy" &&
               plugin.url !== "https://cub.red/plugin/tmdb-proxy" &&
               plugin.url !== "https://bylampa.github.io/tmdb-proxy.js";
    });
    Lampa.Storage.set("plugins", plugins);

    // Проксирование изображений TMDB
    Lampa.TMDB.image = function (path) {
        var url = Lampa.Utils.protocol() + "image.tmdb.org/" + path;
        return Lampa.Storage.field("proxy_tmdb") ? "http://212.113.103.137:9118/proxyimg/" + Lampa.Utils.addUrlComponent(url) : url;
    };

    // Проксирование API TMDB
    Lampa.TMDB.api = function (endpoint) {
        var url = Lampa.Utils.protocol() + "api.themoviedb.org/3/" + endpoint;
        return Lampa.Storage.field("proxy_tmdb") ? "http://212.113.103.137:9118/proxy/" + Lampa.Utils.addUrlComponent(url) : url;
    };

    // Удаление настроек прокси в разделе TMDB
    Lampa.Settings.listener.follow("open", function (event) {
        if (event.name === "tmdb") {
            event.body.find("[data-parent=\"proxy\"]").remove();
        }
    });

    // Отключение DMCA-блокировки
    var disableDMCA = setInterval(function () {
        if (typeof window.lampa_settings !== 'undefined' && (window.lampa_settings.fixdcma || window.lampa_settings.dcma)) {
            clearInterval(disableDMCA);
            window.lampa_settings.dcma = false;
        }
    }, 100);
})();
