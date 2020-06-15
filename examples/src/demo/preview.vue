<template>
  <div class="preview-demo">
    <h2>图片预览</h2>
    <div class="example">
      <div class="example-wrap">
        <div class="block">
          <zg-image lazy
                      style="width: 300px;"
                      :src="url1"
                      :preview="previewOptions"
          ></zg-image>
        </div>
        <div class="block">
          <zg-image style="width: 300px;" :src="url2"
                      :preview="[url1,url2]"></zg-image>
        </div>
      </div>
      <pre class="example-code">
            </pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewDemo',
  data () {
    return {
      url1: 'http://asset.yuhi.cc/images/001.jpg',
      url2: 'http://asset.yuhi.cc/images/002.jpg',
      previewOptions: {
        title: '图集标题', // 图片标题
        list: [
          {
            title: '图片1',
            src: 'http://asset.yuhi.cc/images/001.jpg'
          },
          {
            title: '图片2',
            src: 'http://asset.yuhi.cc/images/002.jpg'
          }
        ],
        closeOnClickModal: true,
        alwaysShowNavArrows: false, // 如果为true,总是显示左右导航箭头
        albumLabel: '{$index} / {$count}', // 序号显示的文本
        lockScroll: true, // 锁住body滚动
        fitImagesInViewport: true, // 图片的最大尺寸保持在视窗范围内
        maxWidth: null, // 图片的最大宽度
        maxHeight: null, // 图片的最大高度
        loop: true // 如果为true,在最后一张图片点击右导航箭头时自动跳转到第一张,否则隐藏右导航箭头
      }
    }
  }
}
</script>

<style scoped>

</style>
