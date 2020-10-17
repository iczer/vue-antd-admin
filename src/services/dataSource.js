import {GOODS} from './api'
import {METHOD, request} from '@/utils/request'

export async function goodsList(params) {
  return request(GOODS, METHOD.GET, params)
}

export default {goodsList}