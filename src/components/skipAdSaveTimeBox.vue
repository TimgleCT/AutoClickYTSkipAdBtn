<script setup>
import { ref } from 'vue';
import DateHelper from '../module/DateTimeHelper.js';
import ChromeStorageLoader from '../module/ChromeStorageLoader.js';

defineProps({
    label: {
        type: String,
        default: '',
    },
});

const saveHours = ref(0);
const saveMinutes = ref(0);
const saveSeconds = ref(0);
const dataLoader = new ChromeStorageLoader();

async function getSaveTime() {
    const saveTime = ref(0);
    if (chrome.storage) {
        const skipClickAdRecord = await dataLoader.getSkipClickAdRecord();
        const skipFixedAdRecord = await dataLoader.getSkipFixedAdRecord();
        saveTime.value += skipClickAdRecord.reduce((a, b) => a + b.saveTime, 0);
        saveTime.value += skipFixedAdRecord.reduce((a, b) => a + b.saveTime, 0);
        [saveHours.value, saveMinutes.value, saveSeconds.value] = DateHelper.convertSecondsToTime(saveTime.value);
    } else {
        saveTime.value = 967435;
        [saveHours.value, saveMinutes.value, saveSeconds.value] = DateHelper.convertSecondsToTime(saveTime.value);
    }
}

async function init() {
    await getSaveTime();
}

init();
</script>

<template>
  <div class="col-12 py-3 skipAdSaveTimeBox">
    <div class="d-block mx-0 mb-1 label">
      <span class="label">{{ label }}</span>
    </div>
    <div class="d-block mx-0 mt-1 mb-1">
        <template v-if="saveHours !== 0">
            <span class="saveTime">{{ saveHours }}</span><span class="unit"> 小時 </span>
        </template>
        <template v-if="saveMinutes !== 0">
            <span class="saveTime">{{ saveMinutes }}</span><span class="unit"> 分鐘 </span>
        </template>
        <template v-if="saveSeconds !== 0">
            <span  class="saveTime">{{ saveSeconds }}</span><span class="unit"> 秒 </span>
        </template>
    </div>
  </div>
</template>

<style scoped>
.skipAdSaveTimeBox{
  background-color: #d1a27b;
  color:white
}
.skipAdSaveTimeBox .label{
    text-align: start;
    font-size: 0.8rem;
}
.saveTime{
  font-size: 2.5rem;
  font-weight: bold;
}
.unit{
  font-size: 0.85rem;
}
</style>
