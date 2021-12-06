const manage_prefix = '/model/manage'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    /**
     * @description 请求模型数据
     * @param {Object} data 登录携带的信息
     */
    GET_REGISTER_MODELS(data = {}) {

        // 接口请求
        return request({
            url: manage_prefix + '/models',
            method: 'get',
            data
        })
    },
    GET_MODEL_DETAIL(name = '') {
        return request({
            url: manage_prefix + '/models/' + name,
            method: 'get'
        })
    },
    UNREGISTER_MODEL(name = '', version = '') {
        return request({
            url: manage_prefix + '/models/' + name + '/' + version,
            method: 'delete'
        })
    },
    UPDATE_MODEL(name = '', version = '', minWorkers = 0, maxWorkers = 0) {
        return request({
            url: manage_prefix + '/models/' + name + '/' + version + "?min_worker=" + minWorkers.toString() + "&max_worker=" + maxWorkers.toString(),
            method: 'put'
        })
    }
})