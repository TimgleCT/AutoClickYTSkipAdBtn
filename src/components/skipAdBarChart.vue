<script setup>
import { computed, ref, watch } from 'vue';
import ChromeStorageLoader from '../module/ChromeStorageLoader.js';
import stackBarChart from './stackBarChart.vue';
import DateTimeHelper from '../module/DateTimeHelper.js';

const dataLoader = new ChromeStorageLoader();
const yData = ref([]);
const weekOffset = ref(0);

const thisWeekDates = computed(() => DateTimeHelper.getThisWeekDates(weekOffset.value));

function addWeekOffset() {
    weekOffset.value += 1;
}

function minusWeekOffset() {
    weekOffset.value -= 1;
}

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

function getSkipAdInfoByDateRange(data, dateRange) {
    if (data.length > 0) {
        const skipAdRecordWithDatetime = data.map((adRecord) => new Date(JSON.parse(adRecord.recordTime)));
        return categorizeDates(dateRange, skipAdRecordWithDatetime);
    }
    return null;
}

async function setThisWeekSkipAdInfo() {
    const skipClickAdRecord = await dataLoader.getSkipClickAdRecord();
    const skipFixedAdRecord = await dataLoader.getSkipFixedAdRecord();
    const thisWeekDatesObj = thisWeekDates.value.map((ele) => new Date(ele));
    const thisWeekSkipClickAdRecords = getSkipAdInfoByDateRange(skipClickAdRecord, thisWeekDatesObj);
    const thisWeekSkipFixedAdRecords = getSkipAdInfoByDateRange(skipFixedAdRecord, thisWeekDatesObj);
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

watch(
    thisWeekDates,
    () => {
        setThisWeekSkipAdInfo();
    },
    { deep: true },
);

function init() {
    if (chrome.storage) {
        setThisWeekSkipAdInfo();
    }
}

init();

</script>

<template>
    <div class="position-relative skipAdBarChart w-100 h-100">
        <template v-if="yData.length > 0">
            <div class="position-absolute setWeek">
                <i @click="addWeekOffset()" class="bi bi-caret-left-square mx-1"></i>
                <i v-if="weekOffset > 0" @click="minusWeekOffset()" class="bi bi-caret-right-square mx-1"></i>
            </div>
            <stackBarChart
                :x-data="thisWeekDates"
                :y-data="yData"
            ></stackBarChart>
        </template>
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
.setWeek{
    top: 0.5rem;
    right: 1rem;
    z-index: 1;
}
.setWeek i{
    font-size: 1.1rem;
    color: #a58964;
}
.setWeek i:hover{
    cursor: pointer;
}
</style>
