<template>
    <div>
            <header-box :text="title" :isBack="isBack" :isShop="isShop"/>
         <main-com>
              <banner :list="bannerList" :hasButton="false" :hasPagination="true" :isAuto="true" >
                  
                   <router-link slot-scope="{a}" :to="{name:'detail',params:{goodsID:a.goodsID}}">
                       <img class="homeslide" :src="a.imgSrc" />
                   </router-link>
                   
              </banner>
              <navCom></navCom>
              <homeGoods></homeGoods>
              <footerBox></footerBox>
          </main-com>
      <footNav></footNav>
    </div>
</template>

<script>
import header from "../components/header";
import MainCom from "../components/main"
import search from '../components/search';
import banner from "../components/banner";
import navCom from "../components/nav";
import homeGoods from "../components/homegoods"
import footerBox from "../components/footerbox"
import footNav from "../components/footnav"
import {mapState , mapMutations} from "vuex";
export default {
  name: "home",
  components: {
    headerBox: header,
    search,
    banner,
    MainCom,
    navCom,
    homeGoods,
    footerBox,
    footNav
  },
  computed:{
  ...mapState("home/",{
        bannerList:'bannerList',
        title:'title',
        isBack:'isBack',
        isShop:'isShop'
    })
  },  
};
</script>

<style lang="scss" scoped>

</style>


