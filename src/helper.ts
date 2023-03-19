import { message } from 'ant-design-vue'

export interface CheckCondition {
 format: string[];
//  使用多少M为单位
 size: number;
}

type ErrorType = 'size' | 'format' | null

export function beforeUploadCheck(file: File, condition: CheckCondition) {
  const {format, size} = condition
  const isValidFormat = format ? format.includes(file.type) : true
  // const isValidSize = size ? (file.size / 1024 /1024 < size) : true
  const isValidSize = size ? (file.size) : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidSize && isValidSize,
    error
  }
}

export const commonUploadCheck = (file: File) => {
  const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1})
  const { passed, error } = result
  if (error === 'format') {
    message.error('上传图片只能是JPG/PNG格式！')
  }
  if (error === 'size') {
    message.error('上传图片大小不能超过1Mb')
  }
  return passed
}

export const getImageDimensions = (url: string) => {
  return new Promise<{width: number;height: number }>((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.addEventListener('load',() => {
      const { naturalWidth: width, naturalHeight: height } = img
      resolve({ width, height })
    })
    img.addEventListener('error', () => {
      reject(new Error('There was some problem with the image.'))
    })
  })
}

export const getParentElement = (element: HTMLElement, className: string) => {
  while(element) {
    if(element.classList && element.classList.contains(className)) {
      return element
    } else {
      element = element.parentNode as HTMLElement
    }
  }
  return null
}