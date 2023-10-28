class YouTubeAdSkipper {
    constructor() {
        const config = { childList: true, subtree: true };
        this.hasAddListener = false;
        this.observer = new MutationObserver(this.handleMutations.bind(this));
        this.observer.observe(document, config);
    }
    handleMutations(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.addedNodes.length > 0) {
                const hasSkipBtn = this.clickSkipButton();
                if (hasSkipBtn){
                    break;
                }
                const hasAdWithoutBtn = this.skipAdWithoutBtn();
                if (hasAdWithoutBtn){
                    break;
                }
            }
        }
    }
    clickSkipButton(){
        const skipButton = document.querySelector('.ytp-ad-skip-button.ytp-button');
        if (skipButton) {
            skipButton.click(); 
            console.log(new Date(), '自動點擊廣告');
            return true;
        }
        return false;
    }
    skipAdWithoutBtn(){
        const checkAdWithoutBtn = document.querySelector('.ytp-ad-player-overlay');
        if (checkAdWithoutBtn && !this.hasAddListener) {
            const video = document.querySelector('video');
            video.addEventListener('canplay', this.moveToLastSecond(video), { once: true });
            video.addEventListener('ended', () => { this.hasAddListener = false; }, { once: true });
            return true;
        }
        return false;
    }
    moveToLastSecond(video){
        console.log(new Date(), '略過不可點擊廣告');
        video.currentTime = video.duration;
        this.hasAddListener = true;
    }
}

const adSkipper = new YouTubeAdSkipper();
