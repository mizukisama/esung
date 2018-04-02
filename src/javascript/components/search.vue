<template>
   <div class="search">
      <div class="bg">
          <div><i></i><input type="text" placeholder="请输入搜索内容"></div>
      </div>
    </div>
</template>
<script>
export default {
    name:"search",
 
}
</script>
<style lang="scss" scoped>
    .bg{
        display: flex;
        justify-content: center;
        align-items:center;
        margin-top: .84rem;
        width:100%;
        height:.88rem;
        background: #52525a;
        border-bottom: 1px solid black;
        div{
            display: flex;
            background: white;
            height: .58rem;
            width: 6rem;
            border-radius: .2rem/.28rem;
            justify-content: center;
            align-items:center;
            i{
                display: block;
                width: .55rem;
                height: .43rem;
                background: url(../assets/search.png) center center no-repeat;
                background-size: auto 100%;
            }
            input{
                width: 5rem;
                height:.4rem;
                border: 0;
            }
            input::-webkit-input-placeholder { 
	            color:#98989a;
             }
        }
    }
</style>
