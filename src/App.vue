<script setup>
import iconHeader from './components/iconHeader.vue';
import skipAdCounterBox from './components/skipAdCounterBox.vue';
import skipAdSaveTimeBox from './components/skipAdSaveTimeBox.vue';
import skipAdRecord from './components/skipAdRecord.vue';
import infoTabs from './components/infoTabs.vue';
import stackBarChart from './components/stackBarChart.vue';
import skipAdBarChart from './components/skipAdBarChart.vue';
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
    <skipAdSaveTimeBox
      label="已替您省下"
    ></skipAdSaveTimeBox>
    <skipAdCounterBox
      target="clickAd"
      label="點擊廣告已被省略"
    ></skipAdCounterBox>
    <skipAdCounterBox
      target="fixedAd"
      label="固定廣告已被省略"
    ></skipAdCounterBox>
  </div>
  <div class="row">
    <infoTabs
      :tabs="[
        {
          title: '本週紀錄',
          component: skipAdBarChart,
        },
        {
          title: '所有紀錄',
          component: skipAdRecord,
        }
      ]"
    >
    </infoTabs>
  </div>
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
.container{
  background-color: #f9ddb9;
  height: 100%;
}
</style>
