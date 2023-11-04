class ChromeMessageManager {
    constructor(observeType) {
        this.observers = [];
        this.observeType = observeType;
        this.init();
    }

    init() {
        chrome.runtime.onMessage.addListener(this.receivedMsgAction.bind(this));
        console.log('init');
    }

    receivedMsgAction(message) {
        if (message.adType === this.observeType) {
            this.notifyObservers(message.saveTime);
            console.log(`Received ${this.observeType} from content.js: ${message.adType}`);
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
