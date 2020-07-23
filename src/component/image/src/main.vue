<template>
  <div class="zg-image">
    <transition name="fade" mode="out-in">
      <slot v-if="loading" name="placeholder">
        <div class="zg-image__placeholder zg-loading" key="placeholder"></div>
      </slot>
      <slot v-else-if="error" name="error">
        <div class="zg-image__error" key="error">加载失败</div>
      </slot>
      <img
        v-else
        v-zg-preview="preview"
        key="image"
        class="zg-image__inner"
        v-bind="$attrs"
        v-on="$listeners"
        @click="clickHandler"
        :src="src"
        :alt="alt"
        :style="imageStyle"
      />
    </transition>
  </div>
</template>

<script>
/**
 * 此组件引用了 element-ui<git@github.com:ElemeFE/element.git> Image组件的相关功能和代码
 */
import { on, off, getScrollContainer, isInContainer } from '../../../utils/dom'
import { isHtmlElement, isString } from '../../../utils/types'
import { throttle } from 'throttle-debounce'

const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined

const ObjectFit = {
  NONE: 'none',
  CONTAIN: 'contain',
  COVER: 'cover',
  FILL: 'fill',
  SCALE_DOWN: 'scale-down'
}
export default {
  name: 'ZgImage',
  props: {
    // 图集列表
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    // 是否开启预览
    preview: {
      type: [Boolean, String, Array, Object],
      default: false
    },
    // 是否开启懒加载
    lazy: {
      type: Boolean,
      default: false
    },
    // 原生 referrerPolicy
    referrerPolicy: String,
    fit: String
  },
  watch: {
    src (val) {
      this.show && this.loadImage()
    },
    show (val) {
      val && this.loadImage()
    }
  },
  data () {
    return {
      loading: true,
      error: false,
      imageWidth: 0,
      imageHeight: 0,
      show: false
    }
  },
  computed: {
    imageStyle () {
      const { fit } = this
      if (!this.$isServer && fit) {
        return isSupportObjectFit()
          ? { 'object-fit': fit }
          : this.getImageStyle(fit)
      }
      return {}
    }
  },
  mounted () {
    if (this.lazy) {
      this.addLazyLoadListener()
    } else {
      this.loadImage()
    }
  },
  methods: {
    loadImage () {
      if (this.$isServer) return false
      // reset status
      this.loading = true
      this.error = false

      const img = new Image()
      img.onload = e => this.handleLoad(e, img)
      img.onerror = this.handleError.bind(this)

      // bind html attrs
      // so it can behave consistently
      Object.keys(this.$attrs)
        .forEach((key) => {
          const value = this.$attrs[key]
          img.setAttribute(key, value)
        })
      img.src = this.src
    },
    handleLoad (e, img) {
      this.imageWidth = img.width
      this.imageHeight = img.height
      this.loading = false
      this.$emit('load', e)
    },
    handleError (e) {
      this.loading = false
      this.error = true
      this.$emit('error', e)
    },

    handleLazyLoad () {
      if (isInContainer(this.$el, this._scrollContainer)) {
        this.show = true
        this.removeLazyLoadListener()
      }
    },
    addLazyLoadListener () {
      if (this.$isServer) return

      const { scrollContainer } = this
      let _scrollContainer = null

      if (isHtmlElement(scrollContainer)) {
        _scrollContainer = scrollContainer
      } else if (isString(scrollContainer)) {
        _scrollContainer = document.querySelector(scrollContainer)
      } else {
        _scrollContainer = getScrollContainer(this.$el)
      }

      if (_scrollContainer) {
        this._scrollContainer = _scrollContainer
        this._lazyLoadHandler = throttle(200, this.handleLazyLoad)
        on(_scrollContainer, 'scroll', this._lazyLoadHandler)
        this.handleLazyLoad()
      }
    },
    removeLazyLoadListener () {
      const { _scrollContainer, _lazyLoadHandler } = this
      if (this.$isServer || !_scrollContainer || !_lazyLoadHandler) return
      off(_scrollContainer, 'scroll', _lazyLoadHandler)
      this._scrollContainer = null
      this._lazyLoadHandler = null
    },
    /**
     * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
     */
    getImageStyle (fit) {
      const { imageWidth, imageHeight } = this
      const {
        clientWidth: containerWidth,
        clientHeight: containerHeight
      } = this.$el

      if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {}

      const vertical = imageWidth / imageHeight < 1

      if (fit === ObjectFit.SCALE_DOWN) {
        const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight
        fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN
      }

      switch (fit) {
        case ObjectFit.NONE:
          return { width: 'auto', height: 'auto' }
        case ObjectFit.CONTAIN:
          return vertical ? { width: 'auto' } : { height: 'auto' }
        case ObjectFit.COVER:
          return vertical ? { height: 'auto' } : { width: 'auto' }
        default:
          return {}
      }
    },
    clickHandler () {}
  }
}
</script>
