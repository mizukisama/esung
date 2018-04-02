<template>
  <div class="main">
      <slot />
  </div>
</template>
<script>
export default {
  name : "mainCom"
}
</script>
<style lang="scss" scoped>
  @import '../common/scss/index.scss';
    .main{
        padding:$hH 0 $fH 0;
       
    }
</style>

