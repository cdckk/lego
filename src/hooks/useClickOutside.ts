import { Ref, ref, onMounted, onUnmounted } from 'vue'
const useClickOutside = (elementRef: Ref<HTMLElement | null>) => {
  const isClickOutside = ref(false)
  const handler = (event: MouseEvent) => {
    if (elementRef.value && event.target) {
      if (elementRef.value.contains(event.target as HTMLElement)) {
        console.log('点里面');
        
        isClickOutside.value = false
      } else {
        console.log('点外面');
        
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.addEventListener('click', handler)
  })
  return isClickOutside
}

export default useClickOutside