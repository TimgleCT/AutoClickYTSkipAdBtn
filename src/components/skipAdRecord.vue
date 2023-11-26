<script setup>
import { reactive } from 'vue';
import DateHelper from '../module/DateTimeHelper.js';
import ChromeStorageLoader from '../module/ChromeStorageLoader.js';

const records = reactive([]);
const dataLoader = new ChromeStorageLoader();

async function getSkipAdRecord() {
    if (chrome.storage) {
        const skipClickAdRecord = await dataLoader.getSkipClickAdRecord();
        const skipFixedAdRecord = await dataLoader.getSkipFixedAdRecord();
        skipClickAdRecord.forEach((adRecord) => {
            records.push({
                adType: 'clickAd',
                saveTime: adRecord.saveTime,
                recordTime: new Date(JSON.parse(adRecord.recordTime)),
            });
        });
        skipFixedAdRecord.forEach((adRecord) => {
            records.push({
                adType: 'fixedAd',
                saveTime: adRecord.saveTime,
                recordTime: new Date(JSON.parse(adRecord.recordTime)),
            });
        });
    } else {
        records.push(...[
            {
                saveTime: DateHelper.formattedConvertedTime(325),
                recordTime: DateHelper.DateToYYYYMMDDHHMMSS(new Date()),
            },
            {
                saveTime: DateHelper.formattedConvertedTime(600),
                recordTime: DateHelper.DateToYYYYMMDDHHMMSS(new Date()),
            },
            {
                saveTime: DateHelper.formattedConvertedTime(600),
                recordTime: DateHelper.DateToYYYYMMDDHHMMSS(new Date()),
            },
            {
                saveTime: DateHelper.formattedConvertedTime(600),
                recordTime: DateHelper.DateToYYYYMMDDHHMMSS(new Date()),
            },
            {
                saveTime: DateHelper.formattedConvertedTime(600),
                recordTime: DateHelper.DateToYYYYMMDDHHMMSS(new Date()),
            },
            {
                saveTime: DateHelper.formattedConvertedTime(600),
                recordTime: DateHelper.DateToYYYYMMDDHHMMSS(new Date()),
            },
            {
                saveTime: DateHelper.formattedConvertedTime(600),
                recordTime: DateHelper.DateToYYYYMMDDHHMMSS(new Date()),
            },
            {
                saveTime: DateHelper.formattedConvertedTime(600),
                recordTime: DateHelper.DateToYYYYMMDDHHMMSS(new Date()),
            },
            {
                saveTime: DateHelper.formattedConvertedTime(600),
                recordTime: DateHelper.DateToYYYYMMDDHHMMSS(new Date()),
            },
        ].reverse());
    }
}

function sortByRecordTime(objArray) {
    objArray.sort((a, b) => new Date(b.recordTime) - new Date(a.recordTime));
}

function formattedSkipAdRecord(objArray) {
    objArray.forEach((obj) => {
        // eslint-disable-next-line no-param-reassign
        obj.saveTime = DateHelper.formattedConvertedTime(obj.saveTime);
        // eslint-disable-next-line no-param-reassign
        obj.recordTime = DateHelper.DateToYYYYMMDDHHMMSS(obj.recordTime);
    });
}

async function init() {
    await getSkipAdRecord();
    sortByRecordTime(records);
    formattedSkipAdRecord(records);
}

init();

</script>

<template>
  <div class="col-12 ps-1 pe-1 pt-2 skipAdRecord overflow-auto">
    <div class="d-block mx-0">
        <div class="row mx-0 tableTitle">
            <div class="col-2">No.</div>
            <div class="col-4">節省時間</div>
            <div class="col-6">廣告時間</div>
        </div>
        <div class="tableContent overflow-auto">
            <div v-for='(record, index) in records' :key="index" class="row mx-0 tableContentRow">
                <div class="col-2"> {{ records.length - index }}</div>
                <!-- <div class="col-2"> {{ record.adType }}</div> -->
                <div class="col-4">{{ record.saveTime }}</div>
                <div class="col-6 px-2">{{ record.recordTime }}</div>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.skipAdRecord,
.skipAdRecord > div{
    height: 100%;
}
.tableTitle,
.tableContentRow{
    border-bottom: 1px solid rgb(236, 163, 103);
}
.tableTitle{
    font-size: 0.9rem;
    font-weight: bold;
    padding: 0.5rem 0;
    background-color: rgb(240, 209, 170);
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    color:#e5905f;
}
.tableContentRow{
    font-size: 0.8rem;
    color:#c57b4f;
    padding: 0.25rem 0;
    background-color: #f9ddb9;
}

.tableContent{
    max-height: calc(100% - 40px);
    border-end-end-radius: 8px;
    border-end-start-radius: 8px;
}

/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 4px;
  background-color: rgb(230, 203, 170);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(230, 174, 128);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #eca50b;
}
</style>
