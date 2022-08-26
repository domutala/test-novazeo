import { Plugin } from '@nuxt/types'

const plugin: Plugin = (context) => {
  context.$axios.interceptors.response.use(
    (response) => {
      return response.data
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export default plugin
