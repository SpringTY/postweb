const data_prefix = '/data'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    GET_DEALS(dataSource, dealId, pageNum = 1, PageSize = 10) {
        let caller = '/' + dataSource + '/' + dealId + '?pageNum=' + pageNum.toString() + '&pageSize=' + PageSize.toString()
        let resp = request({
            url: data_prefix + '/deals' + caller,
            method: 'get'
        })
        return resp
    }
})