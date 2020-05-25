import request from '@/utils/request'

export function getSchool() {
    return request({
        url: '/schoolClass/info',
        method: 'get'
    })
}

export function updateSchool(data) {
    return request({
        url: '/schoolClass/update',
        method: 'post',
        data: data
    })
}