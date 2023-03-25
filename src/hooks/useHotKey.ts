import hotkeys from 'hotkeys-js'

export const useHotKey = (keyType: string, callback: () => void) => {
  hotkeys(keyType, function(event){
    event.preventDefault()
    callback()
  })
}