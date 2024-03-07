(function () {
    'use strict';

    var adBlocker = {
        name: 'Блокировщик рекламы',
        version: '1.0',
        description: 'Отключает воспроизведение рекламы в кинотеатре'
    };

    Lampa.Listener.follow('app', function(e) {
        if (e.type == 'ready') {
            // Проверяем, загрузилась ли страница
            var ads = document.querySelectorAll('.ad-video-block');
            if (ads.length > 0) {
                // Если есть блоки рекламы, удаляем их
                ads.forEach(function(ad) {
                    ad.remove();
                });
            }
        }
    });

})();
