import viewerVue from './main.vue'
import Vue from 'vue'

const defaults = {
  title: '', // 图片标题
  list: [], // 图片合集
  initIndex: 0, // 初始索引
  closeOnClickModal: true,
  positionFromTop: 50,
  alwaysShowNavArrows: true, // 如果为true,总是显示左右导航箭头
  albumLabel: '{$index} / {$count}', // 标题下方显示的文本
  lockScroll: true, // 锁住body滚动
  fitImagesInViewport: true, // 图片的最大尺寸保持在视窗范围内
  maxWidth: null, // 图片的最大宽度
  maxHeight: null, // 图片的最大高度
  loop: true // 如果为true,在最后一张图片点击右导航箭头时自动跳转到第一张,否则隐藏右导航箭头
}

const ViewerConstructor = Vue.extend(viewerVue)
let instance = null

const initInstance = () => {
  instance = new ViewerConstructor({
    el: document.createElement('div')
  })
}

const Preview = function (options) {
  if (Vue.prototype.$isServer) return false
  if (!instance) {
    initInstance()
    document.body.appendChild(instance.$el)
  }
  options = Object.assign({}, defaults, options)
  for (const key of Object.keys(options)) {
    instance[key] = options[key]
  }
  Vue.nextTick(() => {
    instance.visible = true
  })
}

export default Preview
export { Preview }
