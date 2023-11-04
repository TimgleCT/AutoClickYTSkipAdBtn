<script setup>

defineProps({
    iconUrl: String,
    headerText: String,
});

</script>

<template>
  <div class="col py-3">
    <div class="d-block mx-0 mt-3 mb-3">
      <img :src="iconUrl"/>
    </div>
    <div class="d-block mx-0 ">
      <span class="iconHead">{{headerText}}</span>
    </div>
  </div>
</template>

<style scoped>
.iconHead{
  font-size: 2.0rem;
}
</style>
