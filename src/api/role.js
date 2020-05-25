import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/role/list',
    method: 'get',
    params: params
  })
}

export function createRole(data) {
  return request({
    url: '/role/create',
    method: 'post',
    data: data
  })
}

export function updateRole(id, data) {
  return request({
    url: '/role/update/' + id,
    method: 'post',
    data: data
  })
}

export function deleteRole(id) {
  return request({
    url:'/role/delete/' + id,
    method:'post'
  })
}

export function fetchAllRoleList() {
  return request({
    url: '/role/listAll',
    method: 'get'
  })
}

export function listResourceByRole(roleId) {
  return request({
    url: '/role/'+roleId,
    method: 'get'
  })
}

export function allocResource(data) {
  return request({
    url: '/role/update/permission',
    method: 'post',
    data:data
  })
}
