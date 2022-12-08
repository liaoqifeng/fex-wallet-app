var Event = {
  EVENT: {},
  emit (eventName, resp) {
    if (this.EVENT[eventName] && Object.prototype.toString.call(this.EVENT[eventName]) === "[object Array]") {
      for (let i = 0, fn; fn = this.EVENT[eventName][i++];) {
        fn(resp)
      }
    }
  },
  on (name, fn) {
    if (this.EVENT[name] && Object.prototype.toString.call(this.EVENT[name]) === "[object Array]") {
      this.EVENT[name].push(fn)
    } else {
      this.EVENT[name] = [fn]
    }
  },
  off (name) {
    this.EVENT[name] = null
  }
}