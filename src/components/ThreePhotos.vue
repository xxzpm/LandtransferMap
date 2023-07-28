<template>
  <div class="panolens-container" ref="threePhotos" style="height:100%"></div>
</template>

<script>
import * as PanoLens from 'panolens'
export default {
    name: "ThreePhotos",
    components:{},
    data(){
        return{
            viewer: null,
            littlePlanet: null,
            publicPath: process.env.BASE_URL,
        }
    },
    props:{},
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.viewer = new PanoLens.Viewer({
                container: this.$refs.threePhotos,
                output: 'console'
            });
            this.littlePlanet = new PanoLens.ImagePanorama(require('@/assets/img/TGZ23002.jpg'));
            this.viewer.add(this.littlePlanet);
        }
    }
}
</script>

<style>

</style>