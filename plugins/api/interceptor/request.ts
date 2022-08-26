import { Plugin } from '@nuxt/types'

const plugin: Plugin = (context) => {
  context.$axios.interceptors.request.use(
    (config) => {
      // totutes les configurations

      return config
    },
    (error) => Promise.reject(error)
  )
}

export default plugin
