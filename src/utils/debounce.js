/*
  数据防抖
*/
export default function debounce(method, wait, immediate) {
    let timeout
    let result
    let debounced = function(...args) {
      return new Promise(resolve => {
        let context = this
        if (timeout) {
          clearTimeout(timeout)
        }
        if (immediate) {
          let callNow = !timeout
          timeout = setTimeout(() => {
            timeout = null
          }, wait)
          if (callNow) {
            result = method.apply(context, args)
            resolve(result)
          }
        } else {
          timeout = setTimeout(() => {
            result = method.apply(context, args)
            resolve(result)
          }, wait)
        }
      })
    }
    debounced.cancel = function() {
      clearTimeout(timeout)
      timeout = null
    }
    return debounced
  }
  