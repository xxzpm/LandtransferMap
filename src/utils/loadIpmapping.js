import Vue from 'vue'
import { IpMappingService } from './IpMapping.js'
Vue.prototype.$ipMapping = new IpMappingService()
Vue.prototype.$ipMapping.setIpMappingConfigUrl('ip.mapping.json')