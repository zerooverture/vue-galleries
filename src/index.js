import './assets/icons.scss'
import './assets/transition.scss'
import './assets/style.scss'
import './index.scss'
import ZgGallery from './component/gallery'
import ZgImage from './component/image'
import ZgWaterfall from './component/waterfall'
import preview from './directive/preview'

const components = [
  ZgGallery,
  ZgImage,
  ZgWaterfall
]

const install = function (Vue, opts = {}) {
  // locale.use(opts.locale)
  // locale.i18n(opts.i18n)

  components.forEach(component => {
    Vue.component(component.name, component)
  })

  // Vue.use(InfiniteScroll)
  // Vue.use(Loading.directive)

  // Vue.prototype.$ELEMENT = {
  //   size: opts.size || '',
  //   zIndex: opts.zIndex || 2000
  // }

  // Vue.prototype.$loading = Loading.service
  // Vue.prototype.$msgbox = MessageBox
  // Vue.prototype.$alert = MessageBox.alert
  // Vue.prototype.$confirm = MessageBox.confirm
  // Vue.prototype.$prompt = MessageBox.prompt
  // Vue.prototype.$notify = Notification
  // Vue.prototype.$message = Message

  Vue.directive('zg-preview', preview)
}

export default {
  install,
  ZgGallery,
  ZgImage,
  ZgWaterfall
}
