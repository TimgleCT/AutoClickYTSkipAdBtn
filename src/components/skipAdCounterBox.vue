<script setup>
import { ref, inject } from 'vue';

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    target: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        default: '個',
    },
});

const skipAdCount = ref(0);
const dataLoader = inject('dataLoader');
async function getSkipAdCount() {
    if (chrome.storage) {
        let skipAdInfo;
        switch (props.target) {
        case 'clickAd':
            skipAdInfo = await dataLoader.getSkipClickAdRecord();
            break;
        case 'fixedAd':
            skipAdInfo = await dataLoader.getSkipFixedAdRecord();
            break;
        default:
            break;
        }
        skipAdCount.value = skipAdInfo.length;
    } else {
        skipAdCount.value = 6;
    }
}

async function init() {
    await getSkipAdCount();
}

init();
</script>

<template>
  <div class="col mx-2 mt-4 mb-3 py-2 skipAdCounterBox">
    <div class="d-block mx-0 mt-2 mb-2">
      <span class="countNum">{{ skipAdCount }}</span><span class="parmUnit"> {{ unit }} </span>
    </div>
    <div class="d-block mx-0 mb-2">
      <span class="label">{{ label }}</span>
    </div>
  </div>
</template>

<style scoped>
.skipAdCounterBox{
  color: white;
  background-color: #e5ad80;
  border-radius: 8px;
}
.skipAdCounterBox .label{
  font-size: 0.9rem;
}
.countNum{
  font-size: 3.0rem;
  font-weight: bold;
}
.parmUnit{
  font-size: 0.85rem;
}
</style>
