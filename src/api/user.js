import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      userName: username,
      password: password
    }
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function fetchList(params) {
  return request({
    url: '/admin/list',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/admin/create',
    method: 'post',
    data: data
  })
}

export function updateAdmin(id, data) {
  return request({
    url: '/admin/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, data) {
  return request({
    url: '/admin/update/' + id,
    method: 'post',
    data: data
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/admin/delete/' + id,
    method: 'post'
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/admin/role/' + id,
    method: 'get'
  })
}

export function allocateRole(data) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data: data
  })
}

export function getSettingInfo() {
  return request({
    url: '/user/settingInfo',
    method: 'get'
  })
}

export function updateSettingInfo(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data: data
  })
}