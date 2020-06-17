<template>
  <div class="gallery-demo">
    <h2>画廊</h2>
    <div class="example">
      <div class="example-wrap">
        <zg-gallery :list="list" thumb-indicator></zg-gallery>
      </div>
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
        'https://cdn.shibe.online/shibes/174334cfc6db3cd740465282f1aed55c55ff1c38.jpg',
        'https://cdn.shibe.online/shibes/b5915e161bfabd7a4b78b2cf8f9b4663f2e1abed.jpg',
        'https://cdn.shibe.online/shibes/84a4fcc6e486f3d319730b33adbdd2f20a6b6fba.jpg',
        'https://cdn.shibe.online/shibes/9993f431c6e9a6565f25aa7e879d14aa99cb6f4e.jpg',
        'https://cdn.shibe.online/shibes/4a0d20f31eb3c027cc5093a5eb8896227b983938.jpg',
        'https://cdn.shibe.online/shibes/caede47be20a77ccdb11f94c26603ec2b7280e74.jpg',
        'https://cdn.shibe.online/shibes/36362305f5cf2918545c2a4c4c19ea48aea7dd8e.jpg',
        'https://cdn.shibe.online/shibes/d266f07f3231870e451d9fe4f530ab5e36b271c5.jpg',
        'https://cdn.shibe.online/shibes/7ca9c4f0ca85d49535ea376ee89040922d90a421.jpg',
        'https://cdn.shibe.online/shibes/07a3d951b6777c05e84f07d02c9e5366dec08b4d.jpg',
        'https://cdn.shibe.online/shibes/80b9e22a0897c6e40ed1742b16816caa4019dd04.jpg',
        'https://cdn.shibe.online/shibes/62965acf429196839ad3b5466632fd5d21d68e05.jpg',
        'https://cdn.shibe.online/shibes/b71e66f3bf71cef33a810ce536db3fc1d78eb7da.jpg',
        'https://cdn.shibe.online/shibes/5901c0ff594fdf4fff71a156e1c6f7139e6c47e7.jpg',
        'https://cdn.shibe.online/shibes/b24e64a7662f7754df3bdb21824c7e7f11f0d742.jpg',
        'https://cdn.shibe.online/shibes/db3040e95fb6092c35c35d12ddb5218b7a993635.jpg',
        'https://cdn.shibe.online/shibes/91931aa7d19f624c34408fa6869bc6b2e51413ff.jpg',
        'https://cdn.shibe.online/shibes/2fc3d4d829aab405993bf5b2ba72c98f8dbb4946.jpg',
        'https://cdn.shibe.online/shibes/ff67593028171211ec3faf9c7e6ef9dbc7032199.jpg',
        'https://cdn.shibe.online/shibes/5c9166bb9f98fc776d9c5ff5788a4db26b602151.jpg',
        'https://cdn.shibe.online/shibes/9477975a438eda351e05ab27b2d81254af887496.jpg',
        'https://cdn.shibe.online/shibes/881f6952db0ba4dbe9d9673845cf77c5aec30570.jpg',
        'https://cdn.shibe.online/shibes/169049837c47e4633b8cc84e1680c4b35e9aa078.jpg',
        'https://cdn.shibe.online/shibes/a62c5d30138cb420cb985f266de51ab5af9b9877.jpg',
        'https://cdn.shibe.online/shibes/9dcb7361cef0a0946ecc0d8aee9d5a6749cd9311.jpg',
        'https://cdn.shibe.online/shibes/a7d38331952358cbef47c681042fdbe40378b675.jpg'
      ]
    }
  }
}
</script>

<style scoped>

</style>
