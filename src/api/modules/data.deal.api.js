const data_prefix = '/data'
export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    GET_DEALS(region, dealDate, pageNum = 0, PageSize = 10) {
        // pageNum -= 1
        // console.log('in');
        // let caller = '?deal_region=' + region + '&deal_date=' + dealDate + '&page_num=' + pageNum + '&page_size=' + PageSize //'/' + dataSource + '/' + dealId + '?pageNum=' + pageNum.toString() + '&pageSize=' + PageSize.toString()
        let resp = request({
            url: data_prefix + '/data/predict',
            method: 'post',
            data: {
                "deal_region": region,
                "deal_date": dealDate,
                "page_num": pageNum,
                "page_size": PageSize
            }
        })
        return resp
    }
})