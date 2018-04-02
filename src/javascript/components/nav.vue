<template>

   <ul class="fenlei">

	        <li class="flex_in"> <router-link :to="{name:'goods'}"  title="全部分类"> <img src="../../image/all.png"> 
        <p> 全部分类 </p></router-link>
      </li>
                  <li class="flex_in"> <router-link  :to="{name:'my'}" title="帮助中心"> <img src="../../image/help.png"> 
        <p> 帮助中心 </p></router-link>
      </li>
                  <li class="flex_in"> <router-link  :to="{name:'my'}" title="个人中心"> <img src="../../image/user.png"> 
        <p> 个人中心 </p></router-link>
      </li>
                  <li class="flex_in"> <router-link  :to="{name:'my'}" title="联系我们"> <img src="../../image/cus.png"> 
        <p> 联系我们 </p></router-link>
      </li>
    </ul>

</template>
<script>
</script>


<style lang="scss" scoped>
@import "../common/scss/index.scss";
    ul{
        padding:.15rem 0 .15rem 0;
        border-top: 1px solid #f6f6f6;
        border-bottom: .2rem solid #f6f6f6;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        li{
            flex:1;
            display: flex;
            height: 1.33rem;
            text-align: center;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img{
                width: .68rem;
                height: .68rem;
            }
        }
        p{
            padding-top: .2rem;
        }
    }
   
</style>
