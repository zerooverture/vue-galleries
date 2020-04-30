<template>
  <div id="app">
    <image-demo></image-demo>
    <preview-demo></preview-demo>
    <gallery-demo></gallery-demo>
    <lazy-demo></lazy-demo>
    <waterfall-demo></waterfall-demo>
  </div>
</template>

<script>
import ImageDemo from './demo/image'
import PreviewDemo from './demo/preview'
import LazyDemo from './demo/lazy'
import WaterfallDemo from './demo/waterfall'
import GalleryDemo from './demo/gallery'

export default {
  name: 'app',
  components: { GalleryDemo, WaterfallDemo, LazyDemo, PreviewDemo, ImageDemo },
  data () {
    return {}
  },
  mounted () {
  }
}
</script>

<style lang="scss">
  .example {
    border: 1px solid #ebebeb;

    &-wrap {
      padding: 20px;
    }

    &-code {
      background-color: #fafafa;
      border-top: 1px solid #eaeefb;
      overflow: hidden;
      transition: height .2s;
    }
  }

  .block {
    padding: 30px 0;
    text-align: center;
    border-right: 1px solid #eff2f6;
    display: inline-block;
    width: 20%;
    box-sizing: border-box;
    vertical-align: top;
  }

  .block:last-child,
  .block:last-child,
  .block:last-child {
    border-right: none;
  }
</style>
