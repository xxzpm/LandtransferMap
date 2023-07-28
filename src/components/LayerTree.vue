<template>
  <div class='layerTree'>
    <span class='layerTittle'>出让时间安排</span>
    <el-tree
    :data="treeNode"
    show-checkbox
    node-key="id"
    @check="nodeClick"
    :default-checked-keys="checkedKeys"
    :props="defaultProps">
    </el-tree>
  </div>
</template>

<script>
export default {
    name: 'LayerTree',
    props: {
        treeNode: {
            type: Array,
            reqiure: true
        }
    },
    data() {
      return {
        treeData: [{
          id: 1,
          label: '2022年',
          children: [{
            id: 11,
            label: '第二季度',
          },{
            id: 12,
            label: '第三季度'
          }]
        }, {
          id: 2,
          label: '2023年',
          children: [{
            id: 21,
            label: '第一季度'
          }]
        }],
        expendedKeys: null,
        checkedKeys: null,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    mounted(){
        this.treeData = this.treeNode;
    },
    watch:{
        treeNode:{
            handler(newVal){
                this.expendedKeys= [];
                this.checkedKeys= [];
                for (let i = 0; i < newVal.length; i++) {
                    let el = newVal[i];
                    this.expendedKeys.push(el.id)
                    for (let j = 0; j < el.children.length; j++) {
                        let cel = el.children[j];
                        this.checkedKeys.push(cel.id)                   
                    }              
                }
                console.log(newVal);
                this.treeData = newVal;
            }
        }
    },
    methods:{
        nodeClick(checkedNodes,checkedKeys,halfCheckedNodes,halfCheckedKeys){
            console.log(checkedNodes,checkedKeys,halfCheckedNodes,halfCheckedKeys)
            this.$emit("getLayerIds",checkedKeys.checkedKeys)
        }
    },
    computed:{},
}
</script>

<style lang = 'scss'>
  .layerTree{
    border-radius: 5px 5px 0 0;
    position: absolute;
    bottom: 45px;
    width: 200px;
    right: 20px;
    background-color: #b5c7e1;
    border: solid 1px #b5c7e1;
    .layerTittle{
        padding: 6px;
        color: rgb(244, 10, 10);
    }
  }
</style>