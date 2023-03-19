<template>
  <div class="shadow-picker">
    <div class="shadow-item">
      <span>阴影颜色：</span>
      <div class="shadow-component">

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { string } from 'vue-types';
const props = defineProps({
  value: {
    type: string,
    required: true
  }
})
const emit = defineEmits(['change'])
</script>

<style scoped lang="less">
</style>
