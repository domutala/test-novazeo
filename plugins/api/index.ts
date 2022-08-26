import { AxiosResponse, AxiosRequestConfig } from 'axios'
import { Plugin } from '@nuxt/types'
import interceptor from './interceptor'

interface $api {
  baseUrl: string
  request: (config?: AxiosRequestConfig) => Promise<AxiosResponse>
}

declare module '@nuxt/types' {
  interface Context {
    $api: $api
  }
}

declare module 'vue/types/vue' {
  export interface Vue {
    $api: $api
  }
}

const plugin: Plugin = async (context, inject) => {
  const baseUrl = process.env.baseURL as string
  context.$axios.setBaseURL(baseUrl)

  await interceptor(context, inject)

  const request = (config: AxiosRequestConfig = {}): Promise<AxiosResponse> => {
    config.method = 'post'

    return new Promise((resolve, reject) => {
      if (config.data && config.data.files) {
        const formData = new FormData()
        const files: File[] = config.data.files

        if (!config.headers) config.headers = {}

        config.headers['Content-Type'] = 'multipart/form-data'

        for (const file of files) {
          formData.append('files', file)
        }

        delete config.data.files

        for (const key of Object.keys(config.data)) {
          formData.append(key, config.data[key])
        }

        context.$axios
          .post(config.url as string, formData, config)
          .then((response: AxiosResponse) => resolve(response))
          .catch((err) => reject(err))
      } else {
        context.$axios
          .request(config)
          .then((response: AxiosResponse) => resolve(response))
          .catch((err) => reject(err))
      }
    })
  }

  const $api = { request, baseUrl }
  inject('api', $api)
}

export default plugin
