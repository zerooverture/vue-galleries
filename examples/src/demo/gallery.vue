<template>
  <div class="gallery-demo">
    <h2>画廊</h2>
    <div class="example">
      <div class="example-wrap">
        <zg-gallery :list="list" thumb-indicator></zg-gallery>
      </div>
      <pre class="example-code"></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'galleryDemo',
  data () {
    return {
      list: [
        'https://cdn.shibe.online/shibes/7d64d093c725e71bd346e1aa0ffc8ec15991b482.jpg',
        'https://cdn.shibe.online/shibes/093c020b3f50c9ec9e64fafd0c3fe7725cd06b50.jpg',
        'https://cdn.shibe.online/shibes/e4ff3dc44849fdda68adc3f273ba3726d18e64a7.jpg',
        'https://cdn.shibe.online/shibes/103d8e0127d97b7c50e7348d7f257d4809cb949f.jpg',
        'https://cdn.shibe.online/shibes/8955ddccc917fb8348750cf22add849bbeb226b7.jpg',
        'https://cdn.shibe.online/shibes/3d6d6f48bb8930a769bce442d4f00f6b322e71fd.jpg',
        'https://cdn.shibe.online/shibes/1c93388acb45de976bc0b8f4d16a1966c32bb62b.jpg',
        'https://cdn.shibe.online/shibes/fc1658fc591d16cd93cd1efb50fe20f3334f8681.jpg',
      ]
    }
  }
}
</script>

<style scoped>

</style>
