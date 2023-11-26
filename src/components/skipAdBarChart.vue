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
        const thisWeekDatesObj = thisWeekDates.value.map((ele) => new Date(ele));
        let thisWeekSkipClickAdRecords = null;
        let thisWeekSkipFixedAdRecords = null;

        if (skipClickAdRecord.length > 0) {
            const skipClickAdRecordWithDatetime = skipClickAdRecord.map((adRecord) => new Date(JSON.parse(adRecord.recordTime)));
            thisWeekSkipClickAdRecords = categorizeDates(thisWeekDatesObj, skipClickAdRecordWithDatetime);
        }

        if (skipFixedAdRecord.length > 0) {
            const skipFixedAdRecordWithDatetime = skipFixedAdRecord.map((adRecord) => new Date(JSON.parse(adRecord.recordTime)));
            thisWeekSkipFixedAdRecords = categorizeDates(thisWeekDatesObj, skipFixedAdRecordWithDatetime);
        }

        const thisWeekSkipClickAdCount = [];
        const thisWeekSkipFixedAdCount = [];
        thisWeekDates.value.forEach((date) => {
            thisWeekSkipClickAdCount.push((thisWeekSkipClickAdRecords) ? thisWeekSkipClickAdRecords[date].length : 0);
            thisWeekSkipFixedAdCount.push((thisWeekSkipFixedAdRecords) ? thisWeekSkipFixedAdRecords[date].length : 0);
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
        <div v-else class="d-flex justify-content-center align-items-center w-100 h-100">
            <span class="noDataLabel">暫無資料</span>
        </div>
    </div>
</template>

<style scoped>
.noDataLabel{
    color: white;
    font-size: 1.5rem;
}
</style>
