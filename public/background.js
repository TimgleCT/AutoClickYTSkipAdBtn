import ChromeMessageManager from './chromeMessageManager.js';
import SkipAdObserver from './skipAdObserver.js';

const skipClickAdListener = new ChromeMessageManager('clickAd');
const skipFixedAdListener = new ChromeMessageManager('fixedAd');

const skipClickAdObserver = new SkipAdObserver('clickAd');
const skipFixedAdObserver = new SkipAdObserver('fixedAd');

skipClickAdListener.addObserver(skipClickAdObserver);
skipFixedAdListener.addObserver(skipFixedAdObserver);
