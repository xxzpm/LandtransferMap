import axios from "axios";
import { MessageBox } from "element-ui";
let IP_MAPPINGS;
let IP_MAPPING_CONFIG_URL;
const IpMappingService = (function() {
  function IpMappingService() {}
  /* 主动去加载映射信息*/
  IpMappingService.prototype.resolve = function() {
    if (this.getIpMappings().length > 0) {
      return new Promise(resolve => {
        resolve(true);
      });
    }
    return this.loadingIpMappingConfig();
  };

  /** 加载ip地址映射的配置信息
   *
   *
   * @returnses {Promise<any>}
   * @memberof IpMappingService
   */
  IpMappingService.prototype.loadingIpMappingConfig = function() {
    const ipMappingConfigUrl = IP_MAPPING_CONFIG_URL;
    if (!ipMappingConfigUrl || ipMappingConfigUrl + "".trim() === "") {
      MessageBox.alert(`ip映射功能需要读取含有ip映射配置的json文件，否则无法使用.
      请调用IpMappingService的setIpMappingConfigUrl(ipMappingConfigUrl)方法设置配置文件的获取路径
      `);
    }
    const uri = ipMappingConfigUrl;
    return axios
      .get(uri, {
        responseType: "json"
      })
      .then(data => {
        this.setIpMappings(data.data.data || data.data);
        return true;
      });
  };

  /** 获取ip映射配置信息
   *
   *
   * @returnses {IpMapping[]}
   * @memberof IpMappingService
   */
  IpMappingService.prototype.getIpMappings = function() {
    return IP_MAPPINGS || [];
  };

  /** 对url地址进行ip映射
   *
   *
   * @params {string} url 要映射的url地址
   * @returnses {string}
   * @memberof IpMappingService
   */
  IpMappingService.prototype.mapping = function(url) {
    if (url) {
      for (const ip of this.getIpMappings()) {
        if (url.includes(ip.key)) {
          if (ip.type === 1) {
            const newUrl = `${ip.value.host}${ip.value.another}`;
            url = url.replace(ip.key, newUrl);
          }
          break;
        }
      }
    }
    return url;
  };

  /** 以异步的方式对url地址进行ip映射。如果觉得ip映射时无法确保相应的
   * ip映射配置信息已经加载，可以使用此方式。因为该方法会在没有相应
   * ip映射配置信息时，自动去加载配置信息后，再进行ip映射
   *
   * @params {string} url 需要映射的url地址
   * @returnses {Promise<any>}
   * @memberof IpMappingService
   */
  IpMappingService.prototype.mappingByPromise = function(url) {
    if (this.getIpMappings().length > 0) {
      return new Promise(resolve => {
        resolve(this.mapping(url));
      });
    }
    return this.resolve().then(() => {
      return this.mapping(url);
    });
  };

  /** 存储ip映射配置信息
   *
   *
   * @params {IpMapping[]} ipMappings 要存储的ip映射配置信息
   * @memberof IpMappingService
   */
  IpMappingService.prototype.setIpMappings = function(ipMappings) {
    IP_MAPPINGS = ipMappings;
  };

  /** 设置映射配置文件的路径地址
   *
   *
   * @param {*} ipMappingConfigUrl
   */
  IpMappingService.prototype.setIpMappingConfigUrl = function(
    ipMappingConfigUrl
  ) {
    console.log("加载ipmapping")
    IP_MAPPING_CONFIG_URL = ipMappingConfigUrl;
    this.resolve();
  };
  return IpMappingService;
})();
export { IpMappingService };
