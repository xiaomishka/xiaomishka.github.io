const observer = new MutationObserver(() => {
    let adBlock = document.querySelector('.ad-video-block');
    if (adBlock) {
        console.log("Ad removed!");
        adBlock.remove();
        observer.disconnect(); // Остановить наблюдение после удаления
    }
});

observer.observe(document.body, { childList: true, subtree: true });
