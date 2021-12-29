import lodash from 'lodash'

export default function useThrottle(delay=500, options={}) {
  return lodash.throttle(function(callback=function(){}){
    callback()
  }, delay, options)
}

