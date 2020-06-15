<template>
  <div class="image-demo">
    <h2>图片显示</h2>
    <div class="example">
      <div class="example-wrap">
        <div class="block" v-for="fit in fits" :key="fit">
          <p>{{fit}}</p>
          <zg-image style="width: 100px; height: 100px"
                      :src="url"
                      :fit="fit"></zg-image>
        </div>
      </div>
      <pre class="example-code">
            </pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageDemo',
  data () {
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: require('../../images/1.jpg').default
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-demo {

  }
</style>
