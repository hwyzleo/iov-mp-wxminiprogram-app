//eventBus  事件通讯中心
class Bus {
  constructor() {
    this.events = {}
  }

  /**
   * 监听事件
   * @param {string | Array<string>} event 
   * @param {Object} self 调用处this作用域对象
   * @param {Function} callback 
   */
  on(event, self, callback) {
    if (typeof event === 'string') {
      const tuple = [self, callback]
      const callbacks = this.events[event]
      if (Array.isArray(callbacks)) {
        callbacks.push(tuple)
      } else {
        this.events[event] = [tuple]
      }
    } else if (Array.isArray(event)) {
      event.forEach(eventName => {
        this.on(eventName, self, callback)
      })
    }
  }

  /**
   * 监听事件并只触发一次
   * @param {string | Array<string>} event 
   * @param {Object} self 调用处this作用域对象
   * @param {Function} callback 
   */
  once(event, self, callback) {
    const fn = (data) => {
      callback(data)
      this.off(event, self)
    }

    this.on(event, self, fn)
  }

  /**
   * 移除自定义事件监听器
   * @param {string | Array<string>} event 
   * @param {Object} self 调用处this作用域对象
   */
  off(event, self) {
    if (typeof event === 'string') {
      const callbacks = this.events[event]
      if (Array.isArray(callbacks)) {
        this.events[event] = callbacks.filter((tuple) => {
          return tuple[0] !== self
        })
      }
    } else if (Array.isArray(event)) {
      event.forEach(eventName => {
        this.off(eventName, self)
      })
    }
  }

  /**
   * 触发事件
   * @param {string} eventName 
   * @param {any} data 
   */
  emit(eventName, data) {
    const callbacks = this.events[eventName]
    if (Array.isArray(callbacks)) {
      callbacks.map((tuple) => {
        const self = tuple[0]
        const callback = tuple[1]
        callback.call(self, data)
      })
    }
  }

  static getInstance() {
    if (!Bus.instance) {
      Bus.instance = new Bus()
    }
    return Bus.instance;
  }
}
export default Bus.getInstance();