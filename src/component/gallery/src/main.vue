<template>
  <div
    class="zg-gallery"
    :class="{
    [`zg-gallery--${indicatorPosition}`]:indicatorPosition
  }">
    <div ref="containerWrap"
         class="zg-gallery__container"
         :style="{height}"
         @mouseenter="showContainer = true"
         @mouseleave="showContainer = false">
      <transition name="slide-fade-left">
        <button v-show="showContainer" type="button" class="zg-gallery__arrow zg-gallery__arrow--left icon-left"
                @click="throttleSetIndex(activeIndex-1)"></button>
      </transition>
      <transition name="slide-fade-right">
        <button v-show="showContainer" type="button" class="zg-gallery__arrow zg-gallery__arrow--right icon-right"
                @click="throttleSetIndex(activeIndex+1)"></button>
      </transition>
      <zg-gallery-item
        v-for="(item, index) in dataList"
        :key="`zg-gallery__item--${index}`"
        :item="item"
        :direction="direction"
        :index="index"
        :activeIndex="activeIndex"
        :length="dataList.length"
        :preview="preview"
        :show-info="showContainer"
        :attr-url="attrUrl"
        :width="containerWrapWidth"
      >
        <template slot-scope="$scope">
          <slot :row="$scope.row"></slot>
        </template>
      </zg-gallery-item>
    </div>
    <div ref="indicator" class="zg-gallery__indicator">
      <transition name="slide-fade-left">
        <button class="zg-gallery__arrow zg-gallery__indicator--left icon-left" @click="onPrevIndicator"
                v-show="indicatorOffset > 0"></button>
      </transition>
      <transition name="slide-fade-right">
        <button class="zg-gallery__arrow zg-gallery__indicator--right icon-right" @click="onNextIndicator"
                v-show="indicatorOffset < indicatorOffsetMax"></button>
      </transition>
      <div ref="indicatorWrap" class="zg-gallery__indicator--wrap" :style="{width:`${indicatorWrapWidth}px`}">
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
              <img :src="item[attrThumb]" alt="">
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
    },
    attrUrl: {
      type: String,
      default: 'url'
    },
    attrThumb: {
      type: String,
      default: 'thumb'
    }
  },
  created () {
    this.activeIndex = this.initialIndex
    // this.throttledSetIndex =
    this.setDataList()
  },
  mounted () {
    this.indicatorWrap = this.$refs.indicatorWrap
    this.containerWrap = this.$refs.containerWrap
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
      return {
        width: `${this.dataList.length * thumbSize}px`,
        transform: `translateX(-${this.indicatorOffset * this.indicatorWrapWidth}px)`
      }
    },
    indicatorOffsetMax () {
      return Math.floor((this.dataList.length * thumbSize) / this.indicatorWrapWidth)
    }
  },
  data () {
    return {
      containerWrapWidth: 0,
      containerWrap: null,
      indicatorWrapWidth: 0,
      indicatorWrap: null,
      indicatorOffset: 0,
      dataList: [],
      activeIndex: 0,
      showContainer: false
    }
  },
  methods: {
    setDataList () {
      this.dataList = []
      for (const item of this.list) {
        if (item instanceof Object) {
          this.dataList.push(item)
        } else {
          this.dataList.push({ [this.attrUrl]: item, [this.attrThumb]: item })
        }
      }
    },
    setActiveIndex (index) {
      if ((index < 0 || index > this.maxIndex) && !this.loop) return false
      if (index < 0) index = this.maxIndex
      if (index > this.maxIndex) index = 0
      this.activeIndex = index

      const currentPos = this.activeIndex * thumbSize
      this.indicatorOffset = Math.floor(currentPos / this.indicatorWrapWidth)
    },
    throttleSetIndex: throttle(300, true, function (index) { this.setActiveIndex(index) }),
    throttleSetWidth () {
      if (this.$refs.indicator) {
        const indicatorWidth = this.$refs.indicator.offsetWidth - 90
        const redundant = indicatorWidth % thumbSize
        this.indicatorWrapWidth = indicatorWidth - redundant
      }
      if (this.$refs.containerWrap) {
        this.containerWrapWidth = this.$refs.containerWrap.offsetWidth
      }
    },
    onPrevIndicator () {
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

    .slide-fade {
      &-right,
      &-left,
      &-bottom {
        &-enter-active,
        &-leave-active {
          transition: all 0.3s ease;
        }

        &-enter,
        &-leave-to {
          transform: translateX(10px);
          opacity: 0;
        }
      }

      &-left {
        &-enter,
        &-leave-to {
          transform: translateX(-10px);
        }
      }

      &-bottom {
        &-enter,
        &-leave-to {
          transform: translateY(50px);
        }
      }
    }

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
      margin-top: -25px;
      z-index: 1;
      font-size: 20px;
      transition: background-color 0.3s;
      color: $--color-white;

      &:hover {
        background-color: $--background-color-dark;
      }

      &--left {
        left: 10px;
        padding-right: 10px;
      }

      &--right {
        right: 10px;
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
      transition: transform .4s ease-in-out;

      &--child {
        width: 100%;
        height: 100%;
      }

      &--info {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        padding: 10px;
        border-radius: 2px;
      }
    }

    &__indicator {
      position: relative;
      height: 54px;
      line-height: 54px;
      padding: 0 45px;
      overflow: hidden;
      margin-top: 20px;

      img {
        width: 46px;
        height: 46px;
        display: block;
        border-radius: 1px;
      }

      &--wrap {
        height: 54px;
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
        border-radius: 4px;
        opacity: 0.5;
        transition: opacity 0.3s;

        &:hover, &.active {
          opacity: 1;
        }

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
        left: 10px;
      }

      &--right {
        right: 10px;
      }
    }
  }
</style>
