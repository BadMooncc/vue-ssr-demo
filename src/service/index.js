import request from '@/utils/request'

export const getList = () => {
  return request({
    url: '/v1/logout',
    methods: 'get'
  })
}
