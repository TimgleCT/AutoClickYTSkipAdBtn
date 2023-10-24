function clickSkipButton() {
    // 檢查節點是否包含略過廣告按鈕
    const skipButton = document.querySelector('.ytp-ad-skip-button.ytp-button');
    if (skipButton) {
        // 點擊略過廣告按鈕
        skipButton.click(); 
        console.log(new Date(), '自動點擊廣告');
        return true;
    }
    return false;
}

var hasAddListener = false;
function moveToLastSecond(video){
    // 移至廣告片尾
    console.log(new Date(), '略過不可點擊廣告');
    video.currentTime = video.duration;
    hasAddListener = true;
}
function endAd(video){
    video.removeEventListener('canplay', moveToLastSecond);
    hasAddListener = false;
    video.removeEventListener('ended', endAd);
}


function skipAdWithoutBtn() {
    const checkAdWithoutBtn = document.querySelector('.ytp-ad-player-overlay');
    if (checkAdWithoutBtn) {
        if (!hasAddListener) {
            const video = document.querySelector('video');
            video.addEventListener('canplay', moveToLastSecond(video));
            video.addEventListener("ended", endAd(video));
        }
        return true;
    }
    return false;
}

// 使用Mutation Observer來監視DOM變化
const observer = new MutationObserver(mutationsList => {
    for (const mutation of mutationsList) {
        if (mutation.addedNodes.length > 0) {
            const hasSkipBtn = clickSkipButton();
            if (hasSkipBtn){
                break;
            }
            const hasAdWithoutBtn = skipAdWithoutBtn();
            if (hasAdWithoutBtn){
                break;
            }
        }
    }
});

// 設定Mutation Observer的配置
const config = { childList: true, subtree: true };

// 監視整個文檔的變化
observer.observe(document, config);
