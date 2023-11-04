<script setup>
import { ref } from 'vue';
import iconHeader from './components/iconHeader.vue';
import skipAdCounterBox from './components/skipAdCounterBox.vue';

const skipClickAdCount = ref(0);
const skipFixedAdCount = ref(0);
const totalSaveTime = ref(0);

function setSkipInfo() {
    chrome.storage.local.get('clickAd', (result) => {
        const data = result.clickAd || null;
        if (data !== null) {
            skipClickAdCount.value = data.record.length;
            totalSaveTime.value += data.record.reduce((a, b) => a + b.saveTime, 0);
        }
        // console.log(data);
    });
    chrome.storage.local.get('fixedAd', (result) => {
        const data = result.fixedAd || null;
        if (data !== null) {
            skipFixedAdCount.value = data.record.length;
            totalSaveTime.value += data.record.reduce((a, b) => a + b.saveTime, 0);
        }
        // console.log(data);
    });
}

setSkipInfo();

</script>

<template>
<div class="container">
  <div class="row">
    <iconHeader
      icon-url="./assets/youtube-ad-watcher-256.png"
      header-text="YouTube Ad Watcher"
    ></iconHeader>
  </div>
  <div class="row">
    <skipAdCounterBox
      :init-num="skipClickAdCount"
      label="點擊廣告已被省略"
    ></skipAdCounterBox>
    <skipAdCounterBox
      :init-num="skipFixedAdCount"
      label="固定廣告已被省略"
    ></skipAdCounterBox>
  </div>
  <div class="row"></div>
</div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
