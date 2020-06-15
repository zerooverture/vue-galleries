<template>
  <zg-image
    ref="img"
    lazy
    fit="contain"
    class="zg-gallery__item"
    :src="item.url"
    :preview="preview"
    :style="itemStyle"></zg-image>
</template>

<script>
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
    length: Number,
    preview: Boolean
  },
  mounted () {
    this.width = this.$refs.img.$el.clientWidth
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
    itemStyle () {
      const translateType = this.direction === 'vertical' ? 'translateY' : 'translateX'
      const value = `${translateType}(${this.translate}px) scale(${this.scale})`
      const style = {
        transform: value
      }
      if (Math.abs(this.offset) > 1) {
        style.transition = 'none'
      }
      return style
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
      width: 0
    }
  }
}
</script>

<style scoped>

</style>
