<template>
  <div class="">
    <uploader
      class="style-uploader"
      action="http://localhost:3000/data"
      :showUploadedList="true"
      listType="picture"
      @success="(data) => handleUploadSuccess(data.resp)"
    >
    <!-- :beforeUpload="commonUploadCheck" -->
      <!-- 上传前 -->
      <div class="uploader-container">
        <!-- <FileImageOutlined /> -->
        <file-image-outlined />
        <h4>上传图片</h4>
      </div>
      <template #loading>
        <div class="uploader-container">
          <LoadingOutlined spin />
          <h4>上传中</h4>
        </div>
      </template>
      <template #loaded>
        <div class="uploader-container">
          <FileImageOutlined />
          <h4>上传完毕</h4>
        </div>
      </template>
    </uploader>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'
import { LoadingOutlined, FileImageOutlined } from '@ant-design/icons-vue'
import Uploader from './Uploader.vue'
import { commonUploadCheck } from '../helper'

const emit = defineEmits(['success'])
const handleUploadSuccess = (resp: any) => {
  emit('success', resp)
}
</script>

<style scoped lang="less">
.styled-uploader {
  
  // hover可以为鼠标经过的元素设置样式  
  .uploader-container:hover {
    background: #000;
  }
  
}
.uploader-container {
    margin-top: 10px;
    width: 100px;
    padding: 10px;
    color: #ffffff;
    background-color: #1890ff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .uploader-container h4 {
    color: #ffffff;
    margin-bottom: 0;
    margin-left: 10px;
  }
</style>
