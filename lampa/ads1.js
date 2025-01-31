const observer = new MutationObserver(() => {
    let adBlock = document.querySelector('.ad_video_block');
    if (adBlock) {
        clearInterval(this.timer);
        this.video.pause();
        this.video.src = '';
        this.block.remove();
        this.listener.send('ended');
        this.listener.send('launch');
        observer.disconnect(); // Остановить наблюдение после удаления
    }
});

observer.observe(document.body, { childList: true, subtree: true });
