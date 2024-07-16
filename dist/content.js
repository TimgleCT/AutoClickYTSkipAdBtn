class YouTubeAdSkipper {
    static skipAdBtnClassList = [
        '.ytp-skip-ad-button',
        '.ytp-skip-ad-button-modern',
        '.ytp-ad-skip-button',
        '.ytp-ad-skip-button-modern',
    ];

    static checkAdWithoutBtnList = [
        '.ytp-ad-player-overlay',
        '.ytp-ad-avatar-lockup-card',
        '.ytp-skip-ad',
    ];

    constructor() {
        const config = { childList: true, subtree: true };
        this.hasAddListener = false;
        this.observer = new MutationObserver(this.handleMutations.bind(this));
        this.observer.observe(document.body, config);
    }

    handleMutations(mutationsList) {
        for (let i = 0; i < mutationsList.length; i++) {
            const mutation = mutationsList[i];
            if (mutation.addedNodes.length > 0) {
                const hasSkipBtn = YouTubeAdSkipper.clickSkipButton();
                if (hasSkipBtn) {
                    break;
                }
                const hasAdWithoutBtn = this.skipAdWithoutBtn();
                if (hasAdWithoutBtn) {
                    break;
                }
            }
        }
    }

    static clickSkipButton() {
        const skipButton = document.querySelector(YouTubeAdSkipper.skipAdBtnClassList.join(', '));
        if (skipButton) {
            skipButton.click();
            // eslint-disable-next-line no-console
            console.log(new Date(), '自動點擊廣告');
            YouTubeAdSkipper.record('clickAd', 5);
            return true;
        }
        return false;
    }

    skipAdWithoutBtn() {
        const checkAdWithoutBtn = document.querySelector(YouTubeAdSkipper.checkAdWithoutBtnList.join(', '));
        if (checkAdWithoutBtn && !this.hasAddListener) {
            const video = document.querySelector('video');
            video.addEventListener('canplay', this.moveToLastSecond(video));
            video.addEventListener('ended', this.endAd(video));
            return true;
        }
        return false;
    }

    moveToLastSecond(video) {
        if (video.currentTime !== video.duration) {
            const videoDuration = YouTubeAdSkipper.getVideoDuration(video);
            // eslint-disable-next-line no-console
            console.log(new Date(), '略過不可點擊廣告', videoDuration);
            // eslint-disable-next-line no-param-reassign
            video.currentTime = video.duration;
            this.hasAddListener = true;
            YouTubeAdSkipper.record('fixedAd', videoDuration);
        }
    }

    static getVideoDuration(video) {
        return (Number.isNaN(video.duration) || video.duration === Infinity) ? null : video.duration;
    }

    endAd(video) {
        video.removeEventListener('canplay', this.moveToLastSecond);
        video.removeEventListener('ended', this.ended);
        this.hasAddListener = false;
    }

    static record(type, saveTime) {
        chrome.runtime.sendMessage({
            adType: type,
            saveTime,
        });
    }
}

// eslint-disable-next-line no-unused-vars
const adSkipper = new YouTubeAdSkipper();
