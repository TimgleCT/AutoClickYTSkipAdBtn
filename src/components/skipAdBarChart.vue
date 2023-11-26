<script setup>
import { ref } from 'vue';
import ChromeStorageLoader from '../module/ChromeStorageLoader.js';
import stackBarChart from './stackBarChart.vue';
import DateTimeHelper from '../module/DateTimeHelper.js';

const dataLoader = new ChromeStorageLoader();
const thisWeekDates = ref(DateTimeHelper.getThisWeekDates());
const yData = ref([]);

function categorizeDates(baseDates, targetDates) {
    const categorizedDates = {};

    baseDates.forEach((baseDate) => {
        const baseDateString = baseDate.toISOString().slice(0, 10); // 格式為 YYYY-MM-DD
        categorizedDates[baseDateString] = [];
    });

    targetDates.forEach((targetDate) => {
        const targetDateString = targetDate.toISOString().slice(0, 10);

        if (categorizedDates[targetDateString]) {
            categorizedDates[targetDateString].push(targetDate);
        }
    });

    return categorizedDates;
}

async function init() {
    if (chrome.storage) {
        const skipClickAdRecord = await dataLoader.getSkipClickAdRecord();
        const skipFixedAdRecord = await dataLoader.getSkipFixedAdRecord();
        const skipClickAdRecordWithDatetime = skipClickAdRecord.map((adRecord) => new Date(JSON.parse(adRecord.recordTime)));
        const skipFixedAdRecordWithDatetime = skipFixedAdRecord.map((adRecord) => new Date(JSON.parse(adRecord.recordTime)));
        const thisWeekDatesObj = thisWeekDates.value.map((ele) => new Date(ele));
        const thisWeekSkipClickAdRecords = categorizeDates(thisWeekDatesObj, skipClickAdRecordWithDatetime);
        const thisWeekSkipFixedAdRecords = categorizeDates(thisWeekDatesObj, skipFixedAdRecordWithDatetime);
        const thisWeekSkipClickAdCount = [];
        const thisWeekSkipFixedAdCount = [];
        thisWeekDates.value.forEach((date) => {
            thisWeekSkipClickAdCount.push(thisWeekSkipClickAdRecords[date].length);
            thisWeekSkipFixedAdCount.push(thisWeekSkipFixedAdRecords[date].length);
        });
        yData.value = [
            {
                type: '點擊廣告',
                data: thisWeekSkipClickAdCount,
            },
            {
                type: '固定廣告',
                data: thisWeekSkipFixedAdCount,
            },
        ];
        console.log(yData.value);
    }
}

init();

</script>

<template>
    <div class="skipAdBarChart w-100 h-100">
        <stackBarChart
            v-if="yData.length > 0"
            :x-data="thisWeekDates"
            :y-data="yData"
        ></stackBarChart>
    </div>
</template>

<style scoped>
</style>
