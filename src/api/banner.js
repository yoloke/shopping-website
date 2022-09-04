import requests from '@/utils/request'

export default {
    //查询前两条banner数据
  // getListBanner(skuId) {
  //   return request({
  //     url: `/item/${skuId}`,
  //     method: 'get'
  //   })
  // }
  reqGoodsInfo(skuId) {
    return requests({
      url: `/item/${skuId}`,
      method: 'get',
    });
  },
}