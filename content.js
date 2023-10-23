// 定義一個函數，用於點擊略過廣告按鈕
function clickSkipButton(skipButton) {
    if (skipButton) {
        skipButton.click(); // 點擊略過廣告按鈕
    }
}

// 使用Mutation Observer來監視DOM變化
const observer = new MutationObserver(mutationsList => {
    for (const mutation of mutationsList) {
        // 檢查新增的節點是否包含略過廣告按鈕
        if (mutation.addedNodes.length > 0) {
            const skipButton = document.querySelector('.ytp-ad-skip-button.ytp-button');
            clickSkipButton(skipButton);
        }
    }
});

// 設定Mutation Observer的配置
const config = { childList: true, subtree: true };

// 監視整個文檔的變化
observer.observe(document, config);
