<template>
  <div class="global-nav global-nav--current">
  
        <div class="global-nav__nav-item">
            <router-link class="global-nav__nav-link" :to="{name:'home'}">
                 <i class="iconfont icon-home"></i>
                <span class="global-nav__nav-tit">首页</span>
            </router-link>

        </div>
        <div class="global-nav__nav-item">
             <router-link class="global-nav__nav-link" :to="{name:'goods'}">
                 <i class="iconfont icon-class"></i>
                <span class="global-nav__nav-tit">分类</span>
            </router-link>

        </div>
       
        <div class="global-nav__nav-item">
           <router-link class="global-nav__nav-link" :to="{name:'cart'}">
                 <i class="iconfont icon-cart"></i>
                <span class="global-nav__nav-tit">购物车</span>
    
            </router-link>

        </div>
        <div class="global-nav__nav-item">
            <router-link class="global-nav__nav-link" :to="{name:'my'}">
                 <i class="iconfont icon-user"></i>
                <span class="global-nav__nav-tit">个人中心</span>
            </router-link>

        </div>

</div>
</template>
<script>
</script>
<style lang="scss" scoped>
@import "../common/scss/index.scss";
.global-nav {
  border-top: 1px solid #a1a1a1;
  position: fixed;
  width: 100%;
  z-index: 100;
  left: 0;
  bottom: 0;
  background: white;
  color: #a1a1a1;
  height: $fH;

  display: flex;
  justify-content: center;

  div {
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    a {
      text-align: center;
      i {
        display: block;
        font-size: 0.45rem;
      }
      span{
          display: block;
          font-size: 0.12rem;
      }
    }
    a.cart{
        position: relative;
        $circleH:.20rem;
        .global-nav__nav-shop-cart-num{
            position: absolute;
            display: block;
            color: white;
            width:$circleH;
            height: $circleH;
            line-height: $circleH;
            border-radius: 50%;
            background: #fd470a;
            top: -6%;
            left: 60%;
        }
    }
    .router-link-active{
          color: $mC;
    }
  }
}
</style>
