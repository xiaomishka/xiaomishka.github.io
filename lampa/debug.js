// Разблокировка F12 и других клавиш DevTools
document.addEventListener("keydown", function (event) {
    if (
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && event.key === "I") || // Ctrl + Shift + I
        (event.ctrlKey && event.shiftKey && event.key === "J") || // Ctrl + Shift + J
        (event.ctrlKey && event.key === "U") // Ctrl + U (view source)
    ) {
        event.stopPropagation();
    }
});

// Разблокировка правой кнопки мыши
document.addEventListener("contextmenu", function (event) {
    event.stopPropagation();
}, true);

// Удаление обработчиков, которые блокируют DevTools
const removeEventListeners = () => {
    document.oncontextmenu = null;
    document.onkeydown = null;
    document.onkeypress = null;
    document.onkeyup = null;
};

// Запускаем очистку обработчиков каждые 500 мс (на случай, если сайт добавляет их заново)
setInterval(removeEventListeners, 500);
