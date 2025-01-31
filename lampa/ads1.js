if (window.ru && typeof window.ru === "object") {
    Object.defineProperty(window.ru, 'ad', {
        value: 'НЕ реклама',
        writable: false, // Делаем неизменяемым (по желанию)
        configurable: false, // Запрещаем повторное определение
        enumerable: true
    });
}
