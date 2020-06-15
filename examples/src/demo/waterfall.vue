<template>
    <div class="waterfall-demo">
        <h2>瀑布流</h2>
        <div class="example">
            <div class="example-wrap">
                <zg-waterfall :scroll-container="scrollContainer" :footer-height="50" :data="dataList" item-link="${img.url}" link-target="_blank">
                    <template v-slot:footer="slotProps">
                        {{slotProps.row.title}}
                    </template>
                </zg-waterfall>
            </div>
            <pre class="example-code">
            </pre>
        </div>
    </div>
</template>

<script>
export default {
  name: 'WaterfallDemo',
  data () {
    return {
      dataList: [],
      scrollContainer: window,
      images: [
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
        'https://cdn.shibe.online/shibes/a7d38331952358cbef47c681042fdbe40378b675.jpg',
        'https://cdn.shibe.online/shibes/c2218e38faab3b4c754ecae6a96be2b78909a3e8.jpg',
        'https://cdn.shibe.online/shibes/9ce61f35878f15a225980d77127790ac0b6f965f.jpg',
        'https://cdn.shibe.online/shibes/ca4d0eab67c1bfe106b4f72afca333d730181747.jpg',
        'https://cdn.shibe.online/shibes/a23d7bb92a340e0293b7a46a4c4f26aa42feaa41.jpg',
        'https://cdn.shibe.online/shibes/ae9534c51586a76ae5df698f4c3517d4d839225f.jpg',
        'https://cdn.shibe.online/shibes/2dbf0396d8c7ce95c087b19915bd72ab8d4ff3aa.jpg',
        'https://cdn.shibe.online/shibes/65e531262cc5187a88d00399e8ef4d2b52ed617b.jpg',
        'https://cdn.shibe.online/shibes/81d9daf15358cd4dfcc195e7b83636cc613af53f.jpg',
        'https://cdn.shibe.online/shibes/3bda00e89fd18f6b4888722a1b9cb76b878f3523.jpg',
        'https://cdn.shibe.online/shibes/c00e8039d5d9f79702fb435937a670aaf66e9111.jpg',
        'https://cdn.shibe.online/shibes/810aa8a22832ba7b53a2785b268dad62726ae275.jpg',
        'https://cdn.shibe.online/shibes/9911c348dd6aedfa9a254ffad4b311c5a83fc1be.jpg',
        'https://cdn.shibe.online/shibes/417682528ca9154540c6c3a85271c1386da772d8.jpg',
        'https://cdn.shibe.online/shibes/0ff00b87a64c8bc5ef7beb7371c28c0e5d9fd5a1.jpg',
        'https://cdn.shibe.online/shibes/a25e0cc027effe826ac265a846504b707b4753e8.jpg',
        'https://cdn.shibe.online/shibes/333909fe45044bc26b5a0a4348dce6f368a109a8.jpg',
        'https://cdn.shibe.online/shibes/55117a1ecd7a3d9ae6471274c2141117c4819a75.jpg',
        'https://cdn.shibe.online/shibes/1853f721c6b784c354d5e171551f1416fd3d8764.jpg',
        'https://cdn.shibe.online/shibes/3da80279e9f98034498b481c6f7e0db4e9f1dd84.jpg',
        'https://cdn.shibe.online/shibes/e8def6f3e5d0b9d57391e26aaa2ad935ef36f1b5.jpg',
        'https://cdn.shibe.online/shibes/b30828114107e1f0d47e41ae59ebf3c045b92d6d.jpg',
        'https://cdn.shibe.online/shibes/b9a7866c28f5665f9704c58139665d87cd963291.jpg',
        'https://cdn.shibe.online/shibes/968e417f2cadc8fbdee8e81c926564526910ddd1.jpg',
        'https://cdn.shibe.online/shibes/151555cc4bed4ca4cb03f0148c14a2c559b0df5b.jpg',
        'https://cdn.shibe.online/shibes/e0419f6e1f00e800bada84233b0bad86723077ed.jpg',
        'https://cdn.shibe.online/shibes/8f7399a2f080b8e5f8ee262d58b0f250e00a6f74.jpg',
        'https://cdn.shibe.online/shibes/55778dbf0bce13c1c7822fe2208484f1a8c26ca6.jpg',
        'https://cdn.shibe.online/shibes/673aca21e8081c3c7ada9b996b34adf110a0e092.jpg',
        'https://cdn.shibe.online/shibes/695c6aef02cc998d117d89d960e96d7b544c89a0.jpg',
        'https://cdn.shibe.online/shibes/7addb9683370b57784b14abb9cc5a193ef0d83ac.jpg',
        'https://cdn.shibe.online/shibes/6c64c0bca08707fc69756116a1f59e93f45dd058.jpg',
        'https://cdn.shibe.online/shibes/09d1ee7ab54ddfb6763409815b61a2f5eb11ce70.jpg',
        'https://cdn.shibe.online/shibes/1c25125f3f37e3cb8a04da11bda6dbbf8d52c53c.jpg',
        'https://cdn.shibe.online/shibes/12a4cfce535354151cfdfa601d8f19d5649bb403.jpg',
        'https://cdn.shibe.online/shibes/9c145c72a63c5358500a3ad5690186a227cf9516.jpg',
        'https://cdn.shibe.online/shibes/bd8d44fa2bcc1da563238ad71eabb93f7270d65c.jpg',
        'https://cdn.shibe.online/shibes/9a227ff4ff3f78d6caf7246588681f6d32b1ca50.jpg',
        'https://cdn.shibe.online/shibes/fad5b04401bad436ad922d923735bda8ed94c09b.jpg',
        'https://cdn.shibe.online/shibes/a978ff19c82b4fe048005652e70f0eb51717dc2d.jpg',
        'https://cdn.shibe.online/shibes/765b0a556d276966270113a95eb61e18f60f548e.jpg',
        'https://cdn.shibe.online/shibes/990a309be8839c4dbc9b3a3d61575fb509809223.jpg',
        'https://cdn.shibe.online/shibes/79670d8dbaeba02a721758879c303bf33418cd91.jpg',
        'https://cdn.shibe.online/shibes/9d373435a234e0bd1a86f5b06cf057e979674af4.jpg',
        'https://cdn.shibe.online/shibes/678bdcd813bf25575cd41961c5a40113986858de.jpg',
        'https://cdn.shibe.online/shibes/b2021964eb574fc543328d2fe969ad4cc8da4007.jpg',
        'https://cdn.shibe.online/shibes/23f7061156fa2f1a35f312acc0d9cfc8a24f2342.jpg',
        'https://cdn.shibe.online/shibes/92d01051f336a2cfe6b2f89f2032598f018a9944.jpg',
        'https://cdn.shibe.online/shibes/21998328600e0522ce3a100c33d36552ba9c35e5.jpg',
        'https://cdn.shibe.online/shibes/869e5ee0aef47466ad1fe68dc4ba726a91c12e5d.jpg',
        'https://cdn.shibe.online/shibes/dbfc54d095274d7959a7007cc7cde4b62bc531de.jpg',
        'https://cdn.shibe.online/shibes/306140249769f6499d78a9ca4ddde8fa786cac27.jpg',
        'https://cdn.shibe.online/shibes/93625df3b338c3282ebfc531b41d98606d7a0232.jpg',
        'https://cdn.shibe.online/shibes/4e028145a045ff8d8bba86a0be191ae20616603b.jpg',
        'https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg',
        'https://cdn.shibe.online/shibes/66ff55e6564d95c88c8117abe5aa67a9eb660dcc.jpg',
        'https://cdn.shibe.online/shibes/f2e2e185b83507090667322da810247b385869e8.jpg',
        'https://cdn.shibe.online/shibes/439d328689191b7a3c80f9a55160f4ba921540ed.jpg',
        'https://cdn.shibe.online/shibes/1fec132d0dedbf61d93fff1370b89118933ba6b5.jpg',
        'https://cdn.shibe.online/shibes/1014644cd3d0308e533de315b1e611540d08643f.jpg',
        'https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg',
        'https://cdn.shibe.online/shibes/4e50abdec02b416af81940801b78c9558bdde36b.jpg',
        'https://cdn.shibe.online/shibes/6e0dbb23f84f88f5361c60b4994220a2d38985be.jpg',
        'https://cdn.shibe.online/shibes/299e102c775b13e52d487d08f7791bef171ed025.jpg',
        'https://cdn.shibe.online/shibes/5b526b79b32f73586eecefa1f3cb8d854da2d447.jpg',
        'https://cdn.shibe.online/shibes/bdac24a29cef2b7a3e720a1d36f43e326e40fb4d.jpg',
        'https://cdn.shibe.online/shibes/34a5f0e6b9272b241890276b6e800f09058c445f.jpg'
      ]
    }
  },
  created () {
    this.images.forEach((item, i) => {
      this.dataList.push({
        title: `标题 - ${i}`,
        img: item
      })
    })
  }
}
</script>

<style lang="scss" scoped>
    .waterfall-demo {
    }
</style>
