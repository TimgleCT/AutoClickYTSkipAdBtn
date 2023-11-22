class ChromeStorageLoader {
    constructor() {
        this.skipClickAdRecord = [];
        this.skipFixedAdRecord = [];
        this.init();
    }

    init() {
        this.getSkipClickAdRecord();
        this.getSkipFixedAdRecord();
    }

    static async getDataFromStorage(key) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get([key], (result) => {
                if (result[key] === undefined) {
                    reject();
                } else {
                    resolve(result[key]);
                }
            });
        });
    }

    async getSkipClickAdRecord() {
        if (this.skipClickAdRecord.length > 0) {
            return this.skipClickAdRecord;
        }
        try {
            const record = await ChromeStorageLoader.getDataFromStorage('clickAd');
            const recordWithoutNull = record.record.filter((ele) => ele.saveTime !== null);
            this.skipClickAdRecord = recordWithoutNull;
        } catch (error) {
            console.error(error);
        }
        return this.skipClickAdRecord;
    }

    async getSkipFixedAdRecord() {
        if (this.skipFixedAdRecord.length > 0) {
            return this.skipFixedAdRecord;
        }
        try {
            const record = await ChromeStorageLoader.getDataFromStorage('fixedAd');
            const recordWithoutNull = record.record.filter((ele) => ele.saveTime !== null);
            this.skipFixedAdRecord = recordWithoutNull;
        } catch (error) {
            console.error(error);
        }
        return this.skipFixedAdRecord;
    }
}
export default ChromeStorageLoader;
