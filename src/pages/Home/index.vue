<!--  -->
<template>
<div>
    <!-- 三级联动组件 -->
    <TypeNav/>
    <!-- 轮播图组件 -->
    <ListContainer></ListContainer>
    <!-- 今日推荐组件 -->
    <Recommend></Recommend>
    <!-- 商品排行组件 -->
    <Rank></Rank>
    <!-- 猜你喜欢组件 -->
    <Like></Like>
    <!--楼层组件-->
    <Floor></Floor>
    <Floor></Floor>
    <!-- 商标组件 -->
    <Brand></Brand>
</div>
</template>

<script>
import TypeNav from './TypeNav/index.vue';
import ListContainer from './ListContainer/index.vue';
import Recommend from './Recommend/index.vue';
import Rank from './Rank/index.vue';
import Like from './Like/index.vue';
import Floor from './Floor/index.vue';
import Brand from './Brand/index.vue';
export default {
    data() {
        return {};
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {
    },
    components: { TypeNav, ListContainer, Recommend, Rank, Like, Floor, Brand }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>