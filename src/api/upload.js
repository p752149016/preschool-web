import request from '@/utils/request'

export function list(params) {
    return request({
        url: '/userUpload/list',
        method: 'get',
        params: params
    })
}

export function create(data) {
    return request({
        url: '/userUpload/create',
        method: 'post',
        data: data
    })
}

export function deleteUserFile(id) {
    return request({
        url: '/userUpload/delete/' + id,
        method: 'post',
    })
}

export function getUserFile(id) {
    return request({
        url: '/userUpload/' + id,
        method: 'get',
    })
}

export function update(id, data) {
    return request({
        url: '/userUpload/update/' + id,
        method: 'post',
        data: data
    })
}

export function deleteFile(data) {
    return request({
        url: '/delete',
        method: 'post',
        params: {
            url: data
        }
    })
}