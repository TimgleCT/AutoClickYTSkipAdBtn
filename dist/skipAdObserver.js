class SkipAdObserver {
    constructor(type) {
        this.type = type;
    }

    saveDataToStorage(data) {
        const skipAdInfo = {};
        skipAdInfo[this.type] = data;
        chrome.storage.local.set(skipAdInfo, () => {
            console.log('Data saved:', data);
        });
    }

    getDataFromStorage(callback) {
        chrome.storage.local.get(this.type, (result) => {
            const data = result[this.type] || null;
            console.log('Retrieved data:', data);
            callback(data);
        });
    }

    update(saveTime) {
        function setSkipAdInfo(skipInfo) {
            // const newSkipInfo = (skipInfo === null) ? { saveTime: 0, count: 0 } : { ...skipInfo };
            // newSkipInfo.saveTime += saveTime;
            // newSkipInfo.count += 1;
            const newSkipInfo = (skipInfo === null) ? { record: [] } : { ...skipInfo };
            newSkipInfo.record.push({
                recordTime: JSON.stringify(new Date()),
                saveTime,
            });
            this.saveDataToStorage(newSkipInfo);
        }
        this.getDataFromStorage(setSkipAdInfo.bind(this));
    }
}

export default SkipAdObserver;
