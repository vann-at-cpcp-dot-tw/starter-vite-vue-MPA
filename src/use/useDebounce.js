import lodash from 'lodash'

export default function useDebounce(delay=500, options={}) {
  return lodash.debounce(function(callback=function(){}){
    callback()
  }, delay, options)
}

