import request from '@/utils/request'

export function create(data) {
    return request({
        url: '/device/create',
        method: 'post',
        data: data
    })
}

export function deleteDevice(id) {
    return request({
        url: '/device/delete/' + id,
        method: 'post'
    })
}

export function list(params) {
    return request({
        url: '/device/list',
        method: 'get',
        params: params
    })
}

export function getDevice(id) {
    return request({
        url: '/device/' + id,
        method: 'get'
    })
}

export function update(id, data) {
    return request({
        url: '/device/update/' + id,
        method: 'post',
        data: data
    })
}