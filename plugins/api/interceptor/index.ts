/**
 * C'est un middleware qui intercete tous les requettes
 * à la sortie et à l'entrée pour injection, des modifications,
 * cryptage, etc.
 */

import { Plugin } from '@nuxt/types'

import request from './request'
import response from './response'

const plugin: Plugin = (context, inject) => {
  request(context, inject)
  response(context, inject)
}

export default plugin
