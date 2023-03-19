<template>
  <div class="image-processer">
    <a-modal
      v-model:visible="showModel"
      title="裁剪图片"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="showModel = false"
      okText="确认"
      cancelText="取消"
    >
      <div class="image-cropper">
        <img ref="cropperImg" :src="props.props.src" id="processed-image" alt="">
      </div>
    </a-modal>
    <div class="image-preview" :style="{ backgroundImage: backgroundUrl }">
      <img :src="props.props.src" style="width: 100%" alt="">
    </div>
    <div class="image-process">
      <style-uploader></style-uploader>
      <a-button @click="showModel = true">
        <scissor-outlined />
        剪裁图片
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ScissorOutlined } from '@ant-design/icons-vue';
import { ref, watch, defineProps, PropType, nextTick, defineEmits, computed } from 'vue'
import { StyleUploader } from '../components/StyleUploader'
import Cropper from 'cropperjs'
// 应该在model出现之前初始化
import { ImageComponentProps } from '../defaultProps'

export interface CropDataProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const showModel = ref<boolean>(false)
// const backgroundUrl = computed(() => `url(${props.value})`)
// const baseImageUrl = 
const cropperImg = ref<HTMLImageElement | null>(null)
const imgUrl = ref<string>()
let cropper: Cropper
// 裁剪的值
let cropData: CropDataProps | null = null
const props = defineProps({
  props: {
    type: Object as PropType<Partial<ImageComponentProps>> | undefined
  }
})
const emit = defineEmits(['change', 'uploaded'])
watch(showModel, async (newValue) => {
  if (newValue) {
    await nextTick()
    if (cropperImg.value) {
      cropper = new Cropper(cropperImg.value, {
        aspectRatio: 16 / 9,
        crop(event) {
          // console.log(event.detail.x);
          // console.log(event.detail.y);
          // console.log(event.detail.width);
          // console.log(event.detail.height);
          // console.log(event.detail.rotate);
          // console.log(event.detail.scaleX);
          // console.log(event.detail.scaleY);
          const { x, y, width, height } = event.detail
          // 为什么不直接赋值呢，因为要进行转换
          cropData = {
            x: Math.floor(x),
            y: Math.floor(y),
            width: Math.floor(width),
            height: Math.floor(height)
          }
        }
      })
    }
  } else {
    if(cropper) {
      cropper.destroy()
    }
  }
  
})
const handleOk = () => {
  if (cropData) {
    const { x, y, width, height } = cropData
    // const cropperURL = props.props?.src + `?x-oss-process=image/crop,x_${x},y_${y},width_${width},height_${height}`
    // console.log('cropperURL', cropperURL)
    cropper.getCroppedCanvas().toBlob((blob) => {
      if (blob) {
        const formData = new FormData()
        formData.append('croppedImage', blob, 'test.png')
        axios.post('http://localhost:3000/img', formData, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        }).then(res => {
          console.log('formData', formData);
          
          emit('change', res.data.data.url)
          console.log(res.data.data.url);
          
          showModel.value = false
        })
      }
    })
    // 更新新的URL
  }
  
}
// 监听图片有没有传过来
// watch(props.props, (newValue) => {
//   console.log('newvalue', newValue);
//   imgUrl.value = newValue
// },{ immediate: true })
</script>

<style scoped lang="less">
.image-processer {
  display: flex;
  justify-content: space-between;
}
.image-preview {
  width: 150px;
  height: 84px;
  border: 1px dashed #e6ebed;
  background: no-repeat 50%/contain;
  img {
    width: 100%;
    height: 100%;
  }
}
.image-preview.extraHeight {
  height: 110px;
}
.image-cropper img {
  display: block;
  max-width: 100%;
}
.image-process {
  padding: 5px 0;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
