<script setup>

defineProps({
    iconUrl: String,
    headerText: String,
});

</script>

<template>
  <div class="row mx-0 iconHead">
    <div class="col-3">
      <div class="d-block mx-0 iconImg">
        <img :src="iconUrl"/>
      </div>
    </div>
    <div class="col-9 ps-0 d-flex justify-content-start align-items-center">
      <div class="d-block mx-0 ">
        <span class="iconText">{{headerText}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.iconHead{
  padding: 0.6rem 0;
}
.iconImg img{
  width: 75%;
}
.iconText{
  font-size: 1.5rem;
  color: rgb(196, 128, 101);
}
</style>
