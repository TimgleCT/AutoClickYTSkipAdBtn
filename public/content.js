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
        const skipButton = document.querySelector('.ytp-ad-skip-button.ytp-button') || document.querySelector('.ytp-ad-skip-button-modern.ytp-button');
        if (skipButton) {
            skipButton.click();
            console.log(new Date(), '自動點擊廣告');
            YouTubeAdSkipper.record('clickAd', 5);
            return true;
        }
        return false;
    }

    skipAdWithoutBtn() {
        const checkAdWithoutBtn = document.querySelector('.ytp-ad-player-overlay');
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
            console.log(new Date(), '略過不可點擊廣告', videoDuration);
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

const adSkipper = new YouTubeAdSkipper();
