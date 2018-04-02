<template>
   <header>
       <a v-if="isBack" @click="goBack" class="iconfont icon-back back"></a>
        <h3>{{text}}</h3>
        <router-link v-if="isShop" :to="{name:'cart'}" class="iconfont icon-cart cart"></router-link>
    </header>
</template>
<script>
export default {
  name: "headerPage",
  props: {
    text: {
      type: String,
      required: true
    },
    isShop: Boolean,
    isBack: Boolean
  },
  methods:{
    goBack:function(){
      this.$router.go(-1)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../common/scss/index.scss";
header {
  height: $hH;
  line-height: $hH;
  font-size: 0.2rem;
  color: white;
  text-align: center;
  background: $mC;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  .back {
    color: white;
    font-size: 0.4rem;
    font-weight: bold;
    position: absolute;
    left: 5%;
    top: 50%;
    transform: translateY(-50%);
  }
  .cart {
    color: white;
    font-size: 0.6rem;
    // font-weight: bold;
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
