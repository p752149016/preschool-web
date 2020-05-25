import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/permission/list',
    method: 'get',
    params: params
  })
}

export function createResource(data) {
  return request({
    url: '/permission/create',
    method: 'post',
    data: data
  })
}

export function updateResource(id, data) {
  return request({
    url: '/permission/update/' + id,
    method: 'post',
    data: data
  })
}

export function deleteResource(id) {
  return request({
    url: '/permission/delete/' + id,
    method: 'post'
  })
}

export function fetchAllResourceList() {
  return request({
    url: '/permission/listAll',
    method: 'get'
  })
}
