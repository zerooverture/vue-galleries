<template>
  <transition name="el-fade-in">
    <div
      class="zg-viewer"
      :class="{isFullScreen}"
      v-if="visible">
      <div class="zg-tools-bar" @click.stop.prevent="">
        <div class="zg-tools__left">
          <span class="zg-tools--title">
              {{this.title}}
          </span>
          <span class="zg-tools--index" v-if="this.list.length>1">
<!--          {{this.index+1}} / {{this.list.length}}-->
            {{albumLabelReplace(this.albumLabel)}}
          </span>
        </div>
        <div v-if="current.title" class="zg-tools__center">
          {{current.title}}
        </div>
        <div class="zg-tools__right">
          <button
            class="icon-button"
            :class="{
              'icon-smallscreen':isFullScreen,
              'icon-fullscreen':!isFullScreen,
            }"
            :title="isFullScreen?'退出全屏':'全屏显示'"
            @click="toggleScreen"
            @keydown.enter.prevent.stop="toggleScreen">
          </button>
          <button class="icon-button icon-close" @click="hide" @keydown.enter.stop=""></button>
        </div>
      </div>
      <div class="zg-container" @click.stop.prevent="onClickModal">
        <div class="zg-wrapper" :style="imgStyle" @click.stop.prevent="">
          <transition name="fade" mode="out-in">
            <div v-if="loading" class="zg-loading zg-loading"></div>
            <div v-else-if="error" class="zg-error"></div>
            <img v-else class="zg-image" :src="current.src" :alt="current.title">
          </transition>
          <div class="zg-nav">
            <div class="zg-nav__prev icon-left" v-if="showPrev" @click="prevImage"></div>
            <div class="zg-nav__next icon-right" v-if="showNext" @click="nextImage"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { off, on } from '../../../utils/dom'
import { exitFullscreen, fullScreen, rafThrottle } from '../../../utils/util'

export default {
  name: 'ZgViewer',
  props: {
    // 图片标题
    title: {
      type: String,
      default: ''
    },
    // 图片合集
    list: {
      type: Array,
      default () {
        return []
      }
    },
    initIndex: Number,
    // 点击遮罩关闭
    closeOnClickModal: Boolean,
    // positionFromTop: Number,
    // 如果为true,总是显示左右导航箭头
    alwaysShowNavArrows: Boolean,
    // 序号显示的文本
    albumLabel: String,
    // 锁住body滚动
    lockScroll: Boolean,
    // 图片的最大尺寸保持在视窗范围内
    fitImagesInViewport: Boolean,
    // 图片的最大宽度
    maxWidth: Boolean,
    // 图片的最大高度
    maxHeight: Boolean,
    // 如果为true,在最后一张图片点击右导航箭头时自动跳转到第一张,否则隐藏右导航箭头
    loop: Boolean,
    onClose: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    showPrev () {
      return (this.alwaysShowNavArrows && this.list.length > 1) || this.index > 0
    },
    showNext () {
      return (this.alwaysShowNavArrows && this.list.length > 1) || this.index < (this.list.length - 1)
    },
    current () {
      return this.list[this.index]
    },
    imgStyle () {
      return {
        width: `${this.imageWidth}px`,
        height: `${this.imageHeight}px`
      }
    },
    $index () {
      return this.index + 1
    },
    $count () {
      return this.list.length
    }
  },
  data () {
    return {
      visible: false,
      loading: true,
      error: false,
      index: 0,
      // image: {
      //   src: null,
      //   alt: null
      // },
      imageWidth: 0,
      imageHeight: 0,
      // sizeChange: 0,
      isFullScreen: false,
      sizeTimer: null,
      img: null
    }
  },
  mounted () {
    this.loadImage()
  },
  watch: {
    list () {
      this.index = 0
    },
    current () {
      this.loadImage()
    },
    visible (val) {
      if (val) {
        if (this.lockScroll) {
          document.body.classList.add('lock-scroll')
        }
        if (this.initIndex) this.index = this.initIndex
        this.addListener()
      } else {
        document.body.classList.remove('lock-scroll')
        this.removeListener()
      }
    }
  },
  methods: {
    onClickModal () {
      if (this.closeOnClickModal && !this.isFullScreen) {
        this.visible = false
      }
    },
    hide () {
      this.visible = false
      this.onClose()
    },
    loadImage () {
      if (this.$isServer || !this.current) return false
      this.loading = true
      this.error = false

      this.img = new Image()
      this.img.onload = e => this.handleLoad(e)
      this.img.onerror = this.handleError.bind(this)
      this.img.src = this.current.src
    },
    handleLoad (e) {
      this.comSize()
      // if (this.sizeTimer) clearTimeout(this.sizeTimer)
      // this.sizeTimer = setTimeout(() => {
      //   this.sizeChange = 0
      //   this.loading = false
      // }, this.sizeChange)
      this.loading = false
      this.$emit('load', e)
    },
    handleError (e) {
      this.loading = false
      this.error = true
      this.$emit('error', e)
    },
    comSize () {
      const img = this.img
      if (!this.fitImagesInViewport) {
        this.imageWidth = img.width
        this.imageHeight = img.height
      }
      let width = img.width
      let height = img.height
      const maxWidth = this.maxWidth || (window.innerWidth - 100)
      const maxHeight = this.maxHeight || (window.innerHeight - 50 - 100)
      let ratio = 1
      let hRatio = 1
      if (width > maxWidth) {
        ratio = maxWidth / width
      }
      if (height > maxHeight) {
        hRatio = maxHeight / height
      }
      ratio = ratio < hRatio ? ratio : hRatio
      width = width * ratio
      height = height * ratio
      // if (this.imageWidth !== width || this.imageHeight !== height) {
      //   this.sizeChange = 500
      // }
      this.imageWidth = width
      this.imageHeight = height
    },
    prevImage () {
      if (this.list.length < 2) return
      if (this.index > 0) {
        this.index -= 1
      } else {
        this.index = this.list.length - 1
      }
    },
    nextImage () {
      if (this.list.length < 2) return
      if (this.index < (this.list.length - 1)) {
        this.index += 1
      } else {
        this.index = 0
      }
    },
    exitFull () {
      const isFull = document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement
      // if (isFull === undefined) {
      //   isFull = false
      // }
      if (!isFull) {
        this.isFullScreen = false
        // window.removeEventListener('resize', this.exitFull)
      }
    },
    toggleScreen (e) {
      this.isFullScreen = !this.isFullScreen
      if (this.isFullScreen) {
        fullScreen()
      } else {
        exitFullscreen()
      }
    },
    toggleMode () {},
    addListener () {
      this._keyDownHandler = rafThrottle(e => {
        const keyCode = e.keyCode
        switch (keyCode) {
          // ENTER
          case 13:
            this.toggleScreen()
            break
          // ESC
          case 27:
            this.hide()
            break
          // SPACE
          case 32:
            this.toggleMode()
            break
          // LEFT_ARROW
          case 37:
            this.prevImage()
            break
          case 39:
            this.nextImage()
            break
        }
      })
      on(document, 'keydown', this._keyDownHandler)
      on(window, 'resize', this._resize)
    },
    removeListener () {
      off(document, 'keydown', this._keyDownHandler)
      off(window, 'resize', this._resize)
      this._keyDownHandler = null
    },
    _resize () {
      this.comSize()
      this.exitFull()
    },
    albumLabelReplace (labelString) {
      return labelString.replace(/{(\$[a-zA-Z]+)}/g, (key, $1) => {
        return this[$1] || ''
      })
    }
  }
}
</script>
