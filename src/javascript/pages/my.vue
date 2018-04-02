<template>
    <div>
            <header-box :text="title" :isBack="isBack" :isShop="isShop" />
            <main-com>
                <usercenter v-if="isLogin" :userObj="userObj"/>
                <reorlog v-else/>
            
            </main-com>
            <footNav></footNav>
        </div>
</template>

<script>
import header from "../components/header";
import footNav from "../components/footnav";
import reorlog from '../components/reorlog';
import MainCom from "../components/main";
import usercenter from '../components/usercenter';
import {mapState , mapMutations} from "vuex";
export default {
  name: "my",
  data(){
    return {
      title: "登陆/注册",
      isShop: true,
      isBack: true,
      goodsList: [],
      isLogin: false,
      userObj: {}
    }
  },
 
  components: {
    headerBox: header,
    footNav,
    reorlog,
    usercenter,
    MainCom,
  },
  beforeCreate(){
    if(localStorage.getItem('username')){
        
      this.isLogin = true;
      this.title = '个人中心';
    }
  
  },
   mounted() {
    if(localStorage.getItem('username')){
        
      this.userObj.username=localStorage.getItem('username');
      this.isLogin = true;
      this.title = '个人中心';
    }
  },

};
</script>

<style lang="scss" scoped>
  
</style>


