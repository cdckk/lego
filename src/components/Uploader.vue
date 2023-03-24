<template>
  <div class="file-upload">
    <div class="upload-area"
      :class="{'is-dragover': drag && isDragOver }"
      v-on="events"
    >
    <!-- v-on可以添加多个事件以对象的形式 -->
    <!-- @click="triggerUploader" -->
      <slot v-if="isUploading" name="loading">
        <button disabled>正在上传</button>
      </slot>
      <slot name="uploaded" v-else-if="lastFileData && lastFileData.loaded" :uploadedData="lastFileData.data">
        <button>点击上传</button>
      </slot>
      <slot v-else name="default">
        <!-- 插槽里的内容是默认显示，如果父组件有内容会被替换 -->
        <button>点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      ref="fileInput"
      @change="handleFileChange"
    />
    <!-- :style="{display: 'none'}" -->
    <ul :class="`upload-list upload-list-${listType}`">
      <li
        :class="`uploaded-file upload-${file.status}`"
        v-for="file in filesList"
        :key="file.uid"
      >
        <FileImageOutlined />
        <img
          v-if="file.url && listType === 'picture'"
          :src="file.url" 
          :alt="file.name"
          class="upload-list-thumbnail"
        />
        <span v-if="file.status === 'loading'" class="file-icon"><LoadingOutlined /></span>
        <span v-else class="file-icon"><FileOutlined/></span>
        <span class="filename">{{file.name}}</span>
        <button class="delete-icon" @click="removeFile(file.uid)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, reactive, computed, PropType, defineExpose } from 'vue'
import FileImageOutlined, {LoadingOutlined, FileOutlined} from '../../node_modules/@ant-design/icons-vue'
import axios from 'axios'
import { v4 as uuidv4} from 'uuid'
import { last } from 'lodash-es'
import { useStore } from 'vuex'
import {ImageComponentProps} from '../defaultProps'
import { getImageDimensions } from '../helper'

type uploadStatus = 'ready' | 'loading' | 'success' | 'error'
// picture带预览的功能
type FileListType = 'picture' | 'text '
type CheckUpload = (file: File) => boolean | Promise<File>
export interface UploadFile {
 uid: string;
 name: string;
 size: number;
 status: string;
 raw: File;
 resp?: any;
 url?: string;
 width?: number;
}

const props = defineProps({
  action: {
    type: String,
    default: 'http://localhost:3000/data'
  },
  beforeUpload: {
    type: Function as PropType<CheckUpload>
  },
  // 是否开启拖拽上传
  drag: {
    type: Boolean,
    default: false
  },
  // 默认自动上传
  autoUpload: {
    type: Boolean,
    default: true
  },
  listType: {
    type: String as PropType<FileListType>,
    default: 'text'
  },
  showUploadedList: {
    type: Boolean,
    default: true
  }
})

const store = useStore()

const fileInput = ref<null | HTMLInputElement>(null)
const fileStatus = ref<uploadStatus>('ready')
const filesList = ref<UploadFile[]>([])
// const uploadedFiles = ref<UploadFile[]>([])
const isDragOver = ref(false)
const isUploading = computed(() => {
  // 只要有一项的等于loading，整个按钮就是isloading
  return filesList.value.some(file => file.status === 'loading' )
})
const lastFileData = computed(() => {
  const lastFile = last(filesList.value)
  if (lastFile) {
    return {
      loaded: lastFile.status === 'success',
      data: lastFile.resp
    }
  }
  return false
})
const removeFile = (id: string) => {
  filesList.value = filesList.value.filter(file => {
    return file.uid !== id
  })
}

const triggerUploader = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const postFile = (readyFile: UploadFile) => {
  const formData = new FormData() 
  // const iseExistence = uploadedFiles.value.some((file) => file.name === fileObj.name )
  // if(!iseExistence) {
  // uploadedFiles.value.push(fileObj)
  // }
  
  formData.append(readyFile.name, readyFile.raw)
  console.dir('formdata', formData);
  
  readyFile.status = 'loading'
  axios.post(props.action, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    console.log('上传成功',res.data);
    // console.log(readyFile.raw);
    // console.log(readyFile.url);
    res.data.url = readyFile.url
    fileStatus.value = 'success'
    readyFile.status = 'success'
    
    const getWidth = (width: number) => {
      const maxWidth = 375
      res.data.width = (width > maxWidth) ? maxWidth : width
    }
    try {
      getImageDimensions(res.data.url).then(async ({width}) => {
      // getImageDimensions(readyFile.resp.url).then(async ({width}) => {
        await getWidth(width)
        // console.log('res.data', res.data);
        
      })
    } catch (error) {
      console.log('error', error);
    }
    readyFile.resp = res.data
    // console.log('readyFile.resp.width',readyFile.resp.width);
    setTimeout(() => {
      const imageProps: Partial<ImageComponentProps> = {
        src: readyFile.resp.url,
        width: readyFile.resp.width
      }
      // console.log('imageProps',imageProps);
      store.commit('addComponent', imageProps)
    }, 500)
    
  }).catch((err) => {
    console.log('上传失败', err);
    fileStatus.value = 'error'
    readyFile.status = 'error'
  }).finally(() => {
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  })
}

const addFileToList = (uploadedFile: File) => {
  const fileObj = reactive<UploadFile>({
    uid: uuidv4(),
    size: uploadedFile.size,
    name: uploadedFile.name,
    status: 'ready',
    raw: uploadedFile
  })
  if (props.listType === 'picture') {
    // 防止转换错误
    // try {
    //   fileObj.url = URL.createObjectURL(uploadedFile)
    // } catch (err) {
    //   console.error('upload file error', err)
    // }
    const fileReader = new FileReader()
    fileReader.readAsDataURL(uploadedFile)
    fileReader.addEventListener('load', () => {
      fileObj.url = fileReader.result as string
    })
  }
  filesList.value.push(fileObj)
  // console.log(filesList.value);
  
  if (props.autoUpload) {
    postFile(fileObj)
  }
}

const beforeUploadCheck = (files: null | FileList) => {
  if (files) {
    const uploadedFile = files[0]
    // 上传前的检查
    if (props.beforeUpload) {
      const result = props.beforeUpload(uploadedFile)
      if (result && result instanceof Promise) {
        result.then(processFile => {
          /**
           * 新冒出来的对象，并不知道是什么类型，直接进行处理会有问题
           */
          // 这里并不知道processFile的类型，要判断
          if (processFile instanceof File) {
            addFileToList(processFile)
          } else {
            throw new Error('beforeUpload Promise should return File object')
          }
        }).catch(e => {
          console.log(e);
        })
      } else if (result === true) {
        addFileToList(uploadedFile)
      }
    } else {
      addFileToList(uploadedFile)
    }
  }
}

// 暴露出uploadFiles方法
const uploadFiles = () => {
  filesList.value.filter(file => file.status = 'ready').forEach(readyFile => postFile(readyFile))
}

let events: { [key: string]: (e: any) => void } = {
  'click': triggerUploader
}

// 当上传框有图片
const handleFileChange = (e: Event) => {
  // console.log(e);
  
  const target = e.target as HTMLInputElement
  const files = target.files
  beforeUploadCheck(files)
}

// 拖
const handleDrag = (e: DragEvent, over: boolean) => {
  // 第二个参数代表class添加或者不添加
  e.preventDefault()
  isDragOver.value = over
}
// 落下
const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false
  if (e.dataTransfer) {
    // 拿到托放下的数据
    beforeUploadCheck(e.dataTransfer.files)
  }
}

// 添加其他的事件
if (props.drag) {
  events = {
    ...events,
    'dragover': (e: DragEvent) => { handleDrag(e, true) },
    'dragleave': (e: DragEvent) => { handleDrag(e, false) },
    'drop': handleDrop
  }
}

defineExpose({
  uploadFiles
})

</script>

<style scoped lang="less">
.upload-loading {
  color: yellow;
}
.upload-success {
  color: green;
}
.upload-error {
  color: red;
}
.upload-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.uploading-list li {
  transition: all .5s cubic-bezier(.55,0,.1,1);
  font-size: 14px;
  line-height: 1.8;
  margin-top: 5px;
  box-sizing: border-box;
  border-radius: 4px;
  min-width: 200px;
  position: relative;
  &:first-child {
    margin-top: 10px;
  }
  .file-icon {
    svg {
      margin-right: 5px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
  .filename {
    margin-left: 5px;
    margin-right: 40px;
  }
  &.upload-error {
    color: #f5222d;
    svg {
      color: #f5222d
    }
  }
  // .file-status {}
}
.upload-list-thumbnail {
  display: inline-block;
  width: 70px;
  height: 70px;
  vertical-align: middle;
  // position: relative;
  // z-index: 1;
}
</style>