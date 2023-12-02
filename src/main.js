import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ChromeStorageLoader from './module/ChromeStorageLoader.js';

const app = createApp(App);
app.provide('dataLoader', new ChromeStorageLoader());
app.mount('#app');
