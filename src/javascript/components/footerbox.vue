<template>
  <div id="content" class="footer mr-t20">
  <div class="in">
    <div class="search_box">   
        <router-link :to="{name:'home'}" class="homeBtn iconfont icon-homesc"></router-link>
        <input name="keywords" type="text" id="keywordfoot">
        <button class="iconfont icon-search" type="submit" value="搜索" onclick="return check('keywordfoot')"> </button>
        <a href="#top" class="gotop iconfont icon-top"></a>
    </div>
  </div>
  <p class="region">     
    © 2005-2018 ESUNG微商城 版权所有，并保留所有权利。 </p>
  <div class="favLink region"> <a href="javescript:void(0)"> Powered by Esung </a> </div>
</div>
</template>
<script>
</script>
<style lang="scss" scoped>
@import "../common/scss/index.scss";
$footerBoxH :.6rem;
.footer {
  font-size: 0.12rem;
  text-align: center;
  .in {
    width: 100%;
    position: relative;
    height: $footerBoxH;
    background-color: #b9b9b9;
    float: left;
    .homeBtn {
      position: absolute;
      left: 0;
      top: 0;
      color: #fff;
      background: #a1a1a1;
      line-height: 0.6rem;
      width: $footerBoxH;
      height: $footerBoxH;
    }
    .search_box {
      height: $footerBoxH;
      display: flex;
      justify-content: center;
      align-items: center;
      input,
      button {
        height: 0.32rem;
        border-radius: 0.16rem;
      }
      input {
        width: 70%;
        text-indent: 0.25rem;
      }
      button {
        transform: translateX(-0.5rem);
        border: 0;
        background-color:transparent ;
      }
    }
    .gotop {
      position: absolute;
      text-align: center;
      line-height: 0.6rem;
      right: 0;
      top: 0;
      width: $footerBoxH;
      color: #fff;
      height: $footerBoxH;
      background: #a1a1a1;
    }
  }
  .region{
      
      line-height: .3rem;
  }
}
</style>
