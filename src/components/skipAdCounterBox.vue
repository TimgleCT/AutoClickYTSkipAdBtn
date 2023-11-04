<script setup>
defineProps({
    initNum: {
        type: Number,
        default: 0,
    },
    label: String,
});
</script>

<template>
  <div class="col py-2">
    <div class="d-block mx-0 mt-3 mb-3">
      <span class="countNum">{{ initNum }}</span><span class="parmUnit">個</span>
    </div>
    <div class="d-block mx-0 mb-3">
      <span class="label">{{ label }}</span>
    </div>
  </div>
</template>

<style scoped>
.countNum{
  font-size: 3.0rem;
  font-weight: bold;
}
.parmUnit{
  font-size: 0.85rem;
}
</style>
