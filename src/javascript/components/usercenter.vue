<template>
    <div>
        <div class="person_top">
            <img src="../../image/userbg.jpg" class="top_bj">
            <div class="per_con">
                <img src="../../image/userheader.png">				<div class="name_right">
                    <p>会 员 ID :{{userObj.username}}</p>
                  
                </div>
            </div>	
        </div>
        <ul class="list">
            <li><img src="../../image/userkf.png" alt=""><span>呼叫客服</span></li>
            <li><img src="../../image/userinfo.png" alt=""><span>修改资料</span></li>
            <li><img src="../../image/userorder.png" alt=""><span>我的订单</span></li>
            <li><img src="../../image/useradress.png" alt=""><span>收货地址</span></li>
            <li @click="logout()"><img src="../../image/userlogout.png" alt=""><span>退出登录</span></li>      
        </ul>
    </div>

</template>
<script>
export default {
  name: "usercenter",
  props: {
    userObj: {
      type: Object,
      required: true
    }
  },

  computed: {},
  methods: {
      logout(){
          localStorage.removeItem("username");
            this.$router.go(0)
         
      }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
@import "../common/scss/index.scss";
.person_top {
  position: relative;
  height: 3rem;
  overflow: hidden;
  & > img {
    display: block;
    width: 100%;
    height: auto;
  }
  .per_con {
    padding: 0.3rem;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    width: 100%;
    img {
      $width: 1.24rem;
      width: $width;
      height: $width;
      border-radius: 50%;
      border: 1px solid white;
    }
    .name_right {
      flex: 1;
      padding: 0.3rem;
      font-size: 0.28rem;
      color: white;
    }
  }
}
.list{
    li{
        @include border-1px(#d1d1d2);
        height: .94rem;
        font-size: .28rem;
        // line-height: .94rem;
        padding: .25rem .3rem;
        display: flex;
        align-items: center;
        justify-content: left;
        img{
            
            width:.5rem;
            height:.5rem;
            vertical-align: middle;
        }
        span{
            display: inline-block;
            margin-left: .3rem;
        }
    }
}
</style>
