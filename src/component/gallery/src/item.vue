<template>
  <div class="zg-gallery__item" :style="adjust.style">
    <zg-image
      v-if="adjust.show"
      ref="img"
      fit="contain"
      :src="item[attrUrl]"
      class="zg-gallery__item--child"
      :preview="preview"></zg-image>
    <transition name="slide-fade-bottom">
      <div v-show="showInfo" class="zg-gallery__item--info">
        <slot class="zg-gallery__item--title" :row="item"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
// import { throttle } from 'throttle-debounce'

export default {
  name: 'ZgGalleryItem',
  props: {
    item: Object,
    direction: String,
    index: {
      type: Number,
      default: 0
    },
    activeIndex: {
      type: Number,
      default: 0
    },
    showInfo: {
      type: Boolean,
      default: false
    },
    attrUrl: {
      type: String,
      default: 'url'
    },
    width: {
      type: Number,
      default: -1
    },
    length: Number,
    preview: Boolean
  },
  mounted () {
    this.loaded = true
  },
  computed: {
    /**
     * 此处两个方法复制了 element-ui<git@github.com:ElemeFE/element.git> Carousel组件 计算位置的方法
     */
    processIndex () {
      if (this.activeIndex === 0 && this.index === this.length - 1) return -1
      if (this.activeIndex === this.length - 1 && this.index === 0) return this.length
      if (this.index < this.activeIndex - 1 && this.activeIndex - this.index >= this.length / 2) return this.length + 1
      if (this.index > this.activeIndex + 1 && this.index - this.activeIndex >= this.length / 2) return -2
      return this.index
    },
    offset () {
      return this.processIndex - this.activeIndex
    },
    adjust () {
      const translateType = this.direction === 'vertical' ? 'translateY' : 'translateX'
      const value = `${translateType}(${this.translate}px) scale(${this.scale})`
      const style = {
        transform: value
      }
      if (Math.abs(this.offset) > 1) {
        style.transition = 'none'
      }
      return { show: this.loaded && this.width && Math.abs(this.translate) <= this.width, style }
    },
    translate () {
      return this.offset * this.width
    },
    scale () {
      return 1
    }
  },
  data () {
    return {
      loaded: false
    }
  },
  beforeDestroy () {
  }
}
</script>

<style scoped>

</style>
