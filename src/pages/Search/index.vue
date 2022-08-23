<!--  -->
<template>
  <div>
    <p>params参数------{{ id }}-------{{ title }}</p>
    <p>query参数-----{{ dd }}</p>
  </div>
</template>

<script>
export default {
  props: ["id", "title", "dd"],
};
</script>
<style scoped>
</style>