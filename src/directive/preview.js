// class preview {}

import Preview from '../component/preview/src/main'

const showPreview = function (binding, el, e) {
  const title = el.getAttribute('alt')
  const elSrc = el.getAttribute('src')
  let options = {}
  if (binding.value instanceof Array) {
    // list = binding.value
    options.list = []
    binding.value.forEach(item => {
      options.list.push({
        title: title,
        src: item
      })
    })
  } else if (binding.value instanceof Object) {
    options = binding.value
  }
  if (!options.list) {
    options.list = [{
      title: el.getAttribute('alt'),
      src: typeof binding.value === 'string' ? binding.value : el.getAttribute('src')
    }]
  }
  if (options.list.length > 1) {
    const index = options.list.findIndex(item => item.src === elSrc)
    if (index > 0) {
      options.initIndex = index
    }
  }

  Preview(options)
}
export default {
  // pointer: null,
  bind: function (el, binding) {
    if (!binding.value) return
    binding.pointer = showPreview.bind(this, binding, el)
    el.classList.add('zg-preview')
    el.addEventListener('click', binding.pointer, false)
  },
  // inserted: function (el, binding) {
  //   setTimeout(() => {
  //     console.log('i', el, binding)
  //     el.removeEventListener('click', binding.pointer)
  //   }, 2000)
  // },
  unbind: function (el, binding) {
    el.removeEventListener('click', binding.pointer, false)
  }
}
