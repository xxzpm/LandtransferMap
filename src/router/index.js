import VueRouter from 'vue-router'
import Vue from 'vue'
import HomeMap from '../components/HomeMap.vue'
import zpm from '../components/ZPM.vue'
import ThreePhotos from '../components/ThreePhotos.vue'
import LayerTree from '../components/LayerTree.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: HomeMap
    },
    {
        path: '/zpm',
        component: zpm
    },
    {
        path: '/ThreePhotos',
        component: ThreePhotos
    },
    {
        path: '/LayerTree',
        component: LayerTree
    }
]

const router = new VueRouter({routes})

export default router