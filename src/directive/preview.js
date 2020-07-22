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
    let imgEls = []
    if (el instanceof HTMLImageElement || el.tagName === 'IMG') {
      if (!binding.value) return
      // binding.pointer = showPreview.bind(this, binding, el)
      // el.classList.add('zg-preview')
      // el.addEventListener('click', binding.pointer, false)
      imgEls = [el]
    } else {
      imgEls = el.querySelectorAll('img')
    }
    for (const imgEl of imgEls) {
      binding.pointer = showPreview.bind(this, binding, imgEl)
      imgEl.classList.add('zg-preview')
      imgEl.addEventListener('click', binding.pointer, false)
    }
  }
}
