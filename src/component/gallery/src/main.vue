<template>
  <div
    class="zero-gallery"
    :class="{
    [`zero-gallery--${indicatorPosition}`]:indicatorPosition
  }">
    <div class="zero-gallery__container">
      <button></button>
      <button type="button" class="zero-gallery__arrow zero-gallery__arrow--left"></button>
      <button type="button" class="zero-gallery__arrow zero-gallery__arrow--right"></button>
    </div>
    <ul class="zero-gallery__indicators">
      <li
        class="el-carousel__indicator"
        :class="{
        'el-carousel__indicator--thumb':thumbIndicator
      }">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ZeroGallery',
  props: {
    // 图集列表
    list: {
      type: Array,
      required: true
    },
    // 高度
    height: {
      type: String,
      default: 'auto'
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
    }
  },
  created () {
    this.setDataList()2
  },
  watch: {
    list () {
      this.setDataList()
    }
  },
  data () {
    return {
      dataList: []
    }
  },
  methods: {
    setDataList () {}
  }
}
</script>

<style scoped>

</style>
