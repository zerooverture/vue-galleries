<template>
  <div
    class="zg-gallery"
    :class="{
    [`zg-gallery--${indicatorPosition}`]:indicatorPosition
  }">
    <div class="zg-gallery__container" :style="{height}">
      <button type="button" class="zg-gallery__arrow zg-gallery__arrow--left icon-left"
              @click="throttleSetIndex(activeIndex-1)"></button>
      <button type="button" class="zg-gallery__arrow zg-gallery__arrow--right icon-right"
              @click="throttleSetIndex(activeIndex+1)"></button>
      <zg-gallery-item
        v-for="(item, index) in dataList"
        :key="`zg-gallery__item--${index}`"
        :item="item"
        :direction="direction"
        :index="index"
        :activeIndex="activeIndex"
        :length="dataList.length"
        :preview="preview"
      ></zg-gallery-item>
    </div>
    <div ref="indicator" class="zg-gallery__indicator">
      <button class="zg-gallery__arrow zg-gallery__indicator--left icon-left" @click="onPrevIndicator"></button>
      <button class="zg-gallery__arrow zg-gallery__indicator--right icon-right" @click="onNextIndicator"></button>
      <div ref="indicatorWrap" class="zg-gallery__indicator--wrap" :style="{width:`${wrapWidth}px`}">
        <div class="zg-gallery__indicator--block" :style="itemStyle">
          <a
            v-for="(item, index) in dataList"
            :key="`zg-gallery__item--${index}`"
            class="zg-gallery__indicator--item"
            :class="{
              'el-carousel__indicator--thumb':thumbIndicator,
              'active':activeIndex === index
            }"
            @click="throttleSetIndex(index)">
            <template v-if="thumbIndicator">
              <img :src="item.thumb" alt="">
            </template>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from 'throttle-debounce'
import ZgGalleryItem from './item'

const thumbSize = 50

export default {
  name: 'ZgGallery',
  components: { ZgGalleryItem },
  props: {
    // 图集列表
    list: {
      type: Array,
      required: true
    },
    // 高度
    height: {
      type: String,
      default: '300px'
    },
    // 初始化索引
    initialIndex: {
      type: Number,
      default: 0
    },
    // 自动播放
    autoplay: {
      type: Boolean,
      default: false
    },
    // 自动切换间隔
    interval: {
      type: Boolean,
      default: false
    },
    // 指示器触发方式
    trigger: {
      type: String,
      default: 'click'
    },
    // 指示器位置
    indicatorPosition: {
      type: String,
      default: 'bottom',
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['bottom', 'right', 'left', 'top', null].indexOf(value) !== -1
      }
    },
    // 缩略图形式展示指示器
    thumbIndicator: {
      type: Boolean,
      default: false
    },
    loop: {
      type: Boolean,
      default: true
    },
    // 开启预览
    preview: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.activeIndex = this.initialIndex
    // this.throttledSetIndex =
    this.setDataList()
  },
  mounted () {
    this.indicatorWrap = this.$refs.indicatorWrap
    this.throttleSetWidth()
    window.addEventListener('resize', this.throttleSetWidth)
  },
  watch: {
    list () {
      this.setDataList()
    }
  },
  computed: {
    direction () {
      return ['right', 'left'].indexOf(this.indicatorPosition) > -1 ? 'vertical' : 'horizontal'
    },
    maxIndex () {
      return this.dataList.length - 1
    },
    itemStyle () {
      // let width = 0
      // if (this.indicatorWrap) {
      //   width = this.indicatorWrap.offsetWidth
      // }
      // const currentPos = this.activeIndex * thumbSize
      // const offset = Math.floor(currentPos / width)
      // transform: `translateX(-${offset * width}px)`
      return {
        width: `${this.dataList.length * thumbSize}px`,
        transform: `translateX(-${this.indicatorOffset * this.wrapWidth}px)`
      }
    },
    indicatorOffsetMax () {
      return Math.floor((this.dataList.length * thumbSize) / this.wrapWidth)
    }
  },
  data () {
    return {
      wrapWidth: 0,
      indicatorWrap: null,
      indicatorOffset: 0,
      dataList: [],
      activeIndex: 0
    }
  },
  methods: {
    setDataList () {
      this.dataList = []
      for (const item of this.list) {
        let t
        if (item instanceof Object) {
          t = {
            title: item.title || '',
            url: item.url,
            desc: item.desc || '',
            thumb: item.thumb || item.url
          }
        } else {
          t = { url: item, thumb: item }
        }
        this.dataList.push(t)
      }
    },
    setActiveIndex (index) {
      if ((index < 0 || index > this.maxIndex) && !this.loop) return false
      if (index < 0) index = this.maxIndex
      if (index > this.maxIndex) index = 0
      this.activeIndex = index

      const currentPos = this.activeIndex * thumbSize
      this.indicatorOffset = Math.floor(currentPos / this.wrapWidth)
    },
    throttleSetIndex: throttle(300, true, function (index) { this.setActiveIndex(index) }),
    throttleSetWidth () {
      if (this.$refs.indicator) {
        const indicatorWidth = this.$refs.indicator.offsetWidth - 80
        const redundant = indicatorWidth % thumbSize
        this.wrapWidth = indicatorWidth - redundant
      }
    },
    onPrevIndicator () {
      // console.log(this.indicatorOffsetMax)
      if (this.indicatorOffset > 0) {
        this.indicatorOffset -= 1
      } else {
        this.indicatorOffset = this.indicatorOffsetMax
      }
    },
    onNextIndicator () {
      if (this.indicatorOffset < this.indicatorOffsetMax) {
        this.indicatorOffset += 1
      } else {
        this.indicatorOffset = 0
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.throttleSetWidth)
  }
}
</script>

<style lang="scss">
  .zg-gallery {
    &__container {
      position: relative;
      overflow: hidden;
    }

    &__arrow {
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: $--background-color-dim;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
      font-size: 20px;
      transition: background-color 0.3s;
      color: $--color-white;

      &:hover {
        background-color: $--background-color-dark;
      }

      &--left {
        left: 0;
        padding-right: 10px;
      }

      &--right {
        right: 0;
        padding-left: 10px;
      }
    }

    &__item {
      position: absolute !important;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 0;
      /*transition: transform 0.5s;*/
      transition: transform .4s ease-in-out
    }

    &__indicator {
      position: relative;
      height: 54px;
      line-height: 54px;
      padding: 0 40px;
      overflow: hidden;
      margin-top: 20px;

      img {
        width: 46px;
        height: 46px;
        display: block;
        border-radius: 1px;
      }

      &--wrap {
        height: 50px;
        padding: 2px 0;
        overflow: hidden;
        margin: 0 auto;
        transition: width 0.3s;
      }

      &--block {
        transition: all 0.3s;

        &:after {
          content: "";
          display: block;
          clear: both;
        }
      }

      &--item {
        width: 50px;
        height: 50px;
        float: left;
        cursor: pointer;
        box-sizing: border-box;
        border-width: 2px;
        border-style: solid;
        border-color: transparent;
        border-radius: 2px;

        &.active {
          border-color: $--color-primary;
        }
      }

      &--left, &--right {
        font-size: 18px;
        width: 30px;
        border-radius: 4px;
      }

      &--left {
        left: 0;
      }

      &--right {
        right: 0;
      }
    }
  }
</style>
