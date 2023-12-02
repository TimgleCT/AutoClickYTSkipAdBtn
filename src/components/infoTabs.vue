<script setup>
import { ref } from 'vue';

defineProps({
    tabs: {
        type: Array,
        required: true,
        default: () => [
            {
                title: '',
                component: 'component',
            },
        ],
    },
});

const activeTabIndex = ref(0);

const activateTab = (index) => {
    activeTabIndex.value = index;
};

</script>

<template>
<div class="infoTabs">
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          class="nav-link"
          :class="{ 'active': activeTabIndex === index }"
          :id="`nav-${index}-tab`"
          data-bs-toggle="tab"
          :data-bs-target="`#nav-${index}`"
          type="button"
          role="tab"
          :aria-controls="`nav-${index}`"
          :aria-selected="activeTabIndex === index"
          @click="activateTab(index)"
        >
          {{ tab.title }}
        </button>
      </div>
    </nav>
    <div class="tab-content p-1" id="nav-tabContent">
      <component
        v-for="(tab, index) in tabs"
        :key="index"
        :is="tab.component"
        :class="{ 'tab-pane': true, 'fade': true, 'show': activeTabIndex === index, 'active': activeTabIndex === index }"
        :id="`nav-${index}`"
        role="tabpanel"
        :aria-labelledby="`nav-${index}-tab`"
        :tabindex="activeTabIndex === index ? 0 : -1"
      />
    </div>
</div>
</template>

<style scoped>
.infoTabs .tab-content{
  height: 215px;
  overflow: auto;
  background-color: #e7ae80;
  border-start-end-radius: 8px;
  border-end-start-radius: 8px;
  border-end-end-radius: 8px;
}
.nav.nav-tabs .nav-link.active{
  background-color: #e7ae80;
  color:white;
}

.nav.nav-tabs .nav-link{
  border: none;
  background-color: #e7ae8052;
  color:#ffffffbd;
}
</style>
