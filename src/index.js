import './asset/icons.scss'
import './asset/transition.scss'
import './asset/style.scss'
import ZeroGallery from './component/gallery'
import ZeroImage from './component/image'
import ZeroWaterfall from './component/waterfall'
import preview from './directive/preview'

const components = [
  ZeroGallery,
  ZeroImage,
  ZeroWaterfall
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

  Vue.directive('preview', preview)
}

export default {
  install,
  ZeroGallery,
  ZeroImage,
  ZeroWaterfall
}
