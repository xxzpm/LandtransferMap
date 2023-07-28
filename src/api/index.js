import request from '../utils/request';

/*获取矢量图层数据*/
export function getVectorLayerByID(params){
    return request({
        url: "/getGeojsonBylayname",
        method: 'get',
        params: params
    })
}