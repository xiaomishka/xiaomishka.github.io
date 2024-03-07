(function () {
    'use strict';

    var adBlocker = {
        name: 'Блокировщик рекламы',
        version: '1.0',
        description: 'Отключает воспроизведение рекламы в кинотеатре'
    };

    Lampa.Listener.follow('app', function(e) {
        if (e.type == 'ready') {
            // Переопределяем конструктор VideoBlock
            window.VideoBlock = function() {
                // Переопределяем метод start
                this.start = function() {
                    // Просто игнорируем воспроизведение рекламы
                };

                // Переопределяем методы create и load
                this.create = function() {
                    // Пустая функция создания рекламного блока
                };

                this.load = function() {
                    // Пустая функция загрузки рекламы
                };
            };
        }
    });

})();
