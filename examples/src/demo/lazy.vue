<template>
  <div class="lazy-demo">
    <h2>懒加载</h2>
    <div class="example">
      <div class="example-wrap">
        <div style="width: 500px; height: 400px;overflow-y: scroll">
          <zero-image v-for="url of urls" :key="url" lazy :src="url"
                      style="min-height: 300px;min-width: 100%"></zero-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LazyDemo',
  data () {
    return {
      urls: [
        'https://cdn.shibe.online/shibes/bb502139f0740c4d58bd7e78046bdcb48cc198ac.jpg',
        'https://cdn.shibe.online/shibes/61a1558b7767df51c361d384380614fe12bf6b1d.jpg',
        'https://cdn.shibe.online/shibes/54da2d1d2c8d041064a2fd861c754ae10a248c44.jpg',
        'https://cdn.shibe.online/shibes/035cf5aeaeb762c001f0ea8125488dc9ecc1a00a.jpg',
        'https://cdn.shibe.online/shibes/661cbb868b8d077f307eac5e6224846d4603ed14.jpg',
        'https://cdn.shibe.online/shibes/e88b48cae5fdebab0b3f2c75d18863af7465ecac.jpg',
        'https://cdn.shibe.online/shibes/c08a11ea0b5fe2c3cb18ac988056e7c057f6e1a3.jpg',
        'https://cdn.shibe.online/shibes/b4f25cdaba6d2afa4296343334f00a60b79f1d18.jpg',
        'https://cdn.shibe.online/shibes/eeed8edfe574ffe0781b3f6d37005fbd82ac8528.jpg',
        'https://cdn.shibe.online/shibes/b16e4aa9122e3973e3affd1cfa33fe73008e9e53.jpg'
      ]
    }
  },
  created () {
  }
}
</script>

<style scoped>

</style>
