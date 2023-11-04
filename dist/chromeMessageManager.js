class ChromeMessageManager {
    constructor(observeType) {
        this.observers = [];
        this.observeType = observeType;
        this.init();
    }

    init() {
        chrome.runtime.onMessage.addListener(this.receivedMsgAction.bind(this));
    }

    receivedMsgAction(message) {
        if (message.adType === this.observeType) {
            console.log(this.observeType);
            this.notifyObservers(message.saveTime);
        }
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers(message) {
        this.observers.forEach((observer) => {
            observer.update(message);
        });
    }
}

export default ChromeMessageManager;
