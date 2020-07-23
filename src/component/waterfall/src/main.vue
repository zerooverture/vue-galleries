<template>
  <div ref="waterfall" class="zg-waterfall">
    <div :style="{ height: `${Math.max(...point) | 0}px` }" class="waterfall-wrap">
      <transition-group name="fade">
        <template v-for="(photo, index) in dataList">
          <div
            v-if="(allShow ||(photo.y + photo.totalHeight > scrollTop && photo.y < scrollHeight))"
            :key="`waterfall-box-${index}`"
            :style="{
              width: `${colWidth}px`,
              padding: `${colPadding}px`,
              transform: `translateX(${photo.x | 0}px) translateY(${
                photo.y | 0
              }px)`,
            }"
            class="waterfall-box"
          >
            <a :class="itemClass" :href="itemLink | linkReplace(photo)" :target="linkTarget" @click="itemClick(photo)">
              <div class="waterfall-logo-wrap">
                <slot :row="photo" :$index="index">
                  <img
                    :style="{
                      width: `${photo.imgWidth || 0}px`,
                      height: `${photo.imgHeight || 0}px`,
                    }"
                    :src="srcUrl | linkReplace(photo)"
                    :alt="photo.title"
                    class="waterfall-logo"
                  />
                </slot>
              </div>
              <div v-if="$scopedSlots.footer" class="waterfall-footer" :style="{ height: `${footerHeight}px` }">
                <slot name="footer" :row="photo" :$index="index"></slot>
              </div>
            </a>
          </div>
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { throttle } from 'throttle-debounce'

export default {
  name: 'ZgWaterfall',
  filters: {
    linkReplace (link, item) {
      if (!link) return null
      return link.replace(/\${([a-zA-Z\d_.]+)}/g, (key, $1) => {
        const keys = $1.split('.')
        return keys.reduce((rs, key) => {
          return rs[key]
        }, item)
      })
    },
    imgUrlReplace (urlText, item) {
      return this.linkReplace(urlText, item) || item[this.attrImg].url
    }
  },
  props: {
    // 数据
    data: {
      type: Array,
      default () {
        return []
      }
    },
    // 全部显示,默认只显示可见范围内的元素,减少dom的数量以提升效率,另外如果给出了宽高,则图片为懒加载的
    allShow: {
      type: Boolean,
      default: false
    },
    // 每列宽度,此宽度减去colPadding才是img显示的实际宽度
    colWidth: {
      type: Number,
      default: 240
    },
    // 每列padding
    colPadding: {
      type: Number,
      default: 6
    },
    // 滚动条绑定的容器
    scrollContainer: {
      default: null
    },
    // 底部插槽的高度
    footerHeight: {
      type: Number,
      default: 0
    },
    // waterfall-item 自定义样式
    itemClass: {
      type: String,
      default: 'waterfall-item'
    },
    itemLink: {
      type: String,
      default: null
    },
    linkTarget: {
      type: String,
      default: null
    },
    attrImg: {
      type: String,
      default: 'img'
    },
    srcUrl: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      // 容器
      container: null,
      // 容器偏移量
      containerOffset: 0,
      // 滚动条当前位置
      scrollTop: 0,
      // 滚动条高度
      scrollHeight: 0,
      dataList: [],
      // // 当前页面宽度
      // pageWidth: 0,
      // 当前页面每列数量
      colCount: 0,
      // 当前左边修正
      leftPadding: 0,
      // 当前处理至索引
      index: 0,
      // 定位索引，下标代表 x 位置 x*item宽度为实际left
      // 值为对应的列插入点值
      point: [],
      // 节流
      throttledResizeHandler: null
    }
  },
  watch: {
    // 内容改变时重新布局
    'data.length' () {
      this.dataList = JSON.parse(JSON.stringify(this.data))
      this.flow()
    }
  },
  created () {
    this.dataList = JSON.parse(JSON.stringify(this.data))
  },
  mounted () {
    if (this.scrollContainer) {
      if (typeof this.scrollContainer === 'string') {
        this.container = document.querySelector(this.scrollContainer)
      } else {
        this.container = this.scrollContainer
      }
      this.containerOffset = this.$refs.waterfall.offsetTop
    } else {
      this.container = this.$refs.waterfall
    }
    // this.scrollHeight = this.container.scrollHeight
    this.container.addEventListener('scroll', this.scrollHandler)
    this.throttledResizeHandler = throttle(300, this.initSize)
    window.addEventListener('resize', this.throttledResizeHandler)
    this.initSize()
  },
  beforeDestroy () {
    this.container.removeEventListener('scroll', this.scrollHandler)
    window.removeEventListener('resize', this.throttledResizeHandler)
  },
  methods: {
    scrollHandler () {
      // 滚动条改变时获取滚动条的位置和高度用来计算当前显示的内容

      // 滚动条的实际高度要减去当前组件所在的位置,因为对象的顶部距离是相对于组件的最外包装
      this.scrollTop = this.containerScrollTop() - this.containerOffset
      this.scrollHeight =
        this.scrollTop + this.getClientHeight() - this.containerOffset
    },
    containerScrollTop () {
      // 获取滚动条所在容器的滚动条高度
      return (
        this.container.scrollTop ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      )
    },
    getClientHeight () {
      let h =
        this.container.clientHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      if (this.container !== this.$refs.waterfall) {
        h += this.containerOffset
      }
      return h
    },
    initSize () {
      this.scrollHandler()
      // 取得当前组件的宽度
      let pageWidth = this.$refs.waterfall.clientWidth
      if (pageWidth < this.colCount) {
        pageWidth = this.colCount
      }
      // 计算宽度能容纳的列数
      this.colCount = Math.floor(pageWidth / this.colWidth)
      // 为了让数据居中显示,计算左边的距离
      this.leftPadding = (pageWidth % this.colWidth) / 2
      // 初始化索引用于计算当前插入了多少个对象
      this.index = 0
      // 初始化插入点值
      this.point = []
      this.flow()
    },
    flow () {
      for (let index = 0; index < this.dataList.length; index++) {
        const data = this.dataList[index]
        if (data[this.attrImg] instanceof Object && data[this.attrImg].height) {
          // 判断传入的对象是否是一个包括宽高的对象,即如果给出的数据中包括了宽高 则可以直接进行渲染
          this.appendItem(data)
        } else {
          // 如果没有给出宽高,则预加载图片获取图片的宽高
          const img = new Image()
          img.onload = (e) => {
            // data.index = index
            data[this.attrImg] = {
              width: img.width,
              height: img.height,
              url: data[this.attrImg]
            }
            this.appendItem(data)
          }
          img.src = data[this.attrImg]
        }
      }
    },
    appendItem (item) {
      let x = this.index
      this.index += 1
      let y = 0
      if (x < this.colCount) {
        this.point.push(0)
      } else {
        // 最小插入点
        y = Math.min(...this.point)
        // 最小插入点索引
        x = this.point.indexOf(y)
      }
      // colPadding 的偏移量
      const paddingOffset = this.colPadding * 2
      // 宽高缩放比率
      const rate = (this.colWidth - paddingOffset) / item[this.attrImg].width
      // 比率后的宽度
      const imgWidth = item[this.attrImg].width * rate
      // 比率后的高度
      const imgHeight = item[this.attrImg].height * rate
      // 整个对象所占高度,图片高度+colPadding偏移量+footer的高度+footer的上下padding(这个padding在css中)
      const totalHeight = imgHeight + paddingOffset + this.footerHeight + 12
      // 对象的X轴位置= 准备插入的列在一排缩占的索引 * 对象宽度 + 左侧偏移量
      this.$set(item, 'x', x * this.colWidth + this.leftPadding)
      // 对象的Y轴位置= 当前准备插入的列的最低位
      this.$set(item, 'y', y)

      // 用于页面渲染
      this.$set(item, 'totalHeight', totalHeight)
      this.$set(item, 'imgWidth', imgWidth)
      this.$set(item, 'imgHeight', imgHeight)
      // 判断对象的 x/y/宽/高 是否设置完成
      this.$set(item, 'loaded', true)
      // 更新插入列的最低插入点,以便下一个插入使用
      this.$set(this.point, x, this.point[x] + totalHeight)
    },
    itemClick (item) {
      this.$emit('item-click', item)
    }
  }
}
</script>

<style lang="scss">
  .zg-waterfall {
    width: 100%;

    .waterfall-wrap {
      margin: 0 auto;
      position: relative;
      overflow: hidden;
    }

    .waterfall-box {
      position: absolute;
      top: 0;
      left: 0;
      transition: transform 0.3s, background-color 0.5s, box-shadow 0.3s,
      opacity 0.5s;
      border-radius: 4px;
      box-sizing: border-box;

      a {
        cursor: pointer;
      }

      &:hover {
        background-color: #fff;
        box-shadow: $--box-shadow-dark;

        .waterfall-item {
          box-shadow: none;
        }
      }
    }

    .waterfall-item {
      display: block;
      position: relative;
      background-color: #fff;
      box-shadow: $--box-shadow-light;
      transition: box-shadow 0.3s;
      border-radius: 4px;
      overflow: hidden;

      &:hover .waterfall-item--link {
        color: $--link-color;
      }

      &--link {
        transition: color 0.3s;
      }
    }

    .waterfall-logo-wrap {
      border-radius: 4px;
    }

    .waterfall-logo {
      display: block;
      border-radius: 4px;
      width: 100%;
      background-color: #999;
    }

    .waterfall-footer {
      overflow: hidden;
      padding: 6px 0;
    }
  }
</style>
