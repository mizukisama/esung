<template>
      <div>
            <header-box :text="title" :isShop='isShop' :isBack='isBack'/>
              <main-com> 
         <div class="box" v-for="(item,i) in orderItem" :key='i'>
           <span class="iconfont icon-close" @click="del(item,i)"></span>
            <div class="left" > <img :src="item.imgSrc"> </div>
            <div class="right">
              <p>{{item.goodsName}}</p>
             
              <span> <b class="cartPrice">￥<span>{{item.goodsPrice.toFixed(2)}}</span></b></span> 
               <span><b class="cartNum">X</b></span>
              <div class="count" style="display:inline-block"><span class="reduce" @click="reduce(item)">-</span>
            <span class='num'><input type="text" v-model.number="item.goodsNum"></span>
            <span class="add" @click="add(item)">+</span>
            </div>
            </div>
          </div>
          <div class="tip" v-if="!orderItem.length">
            购物车空空的，去逛逛吧！
          </div>
            </main-com> 
        
            <div  v-if="orderItem.length" class="footer">
              <div class="div1">合计：<span class="allPrice">￥{{allPrice}}</span></div>
              <div class="div2" @click="toOrder()">结算：<span class="count">({{allCount}})</span></div>
            </div>

            <footNav v-else></footNav>
        </div>
</template>

<script>
import header from "../components/header";
import footNav from "../components/footnav";
import MainCom from "../components/main";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "cart",
  data() {
    return {
      orderItem: [],
      isLogin:false,
      userObj: {}
    };
  },
  components: {
    headerBox: header,
    footNav,
    MainCom
    // goods,
    // banner
  },
  beforeCreate(){

    // if(localStorage.getItem('username')){
    //    this.isLogin = true;
    //    this.userObj.username = localStorage.getItem('username')
    // }else{
    //     this.$router.push({name:'my'})
    // }
  },

  

  computed: {
    ...mapState("cart/", {
      title: "title",
      isBack: "isBack",
      isShop: "isShop"
    }),
    allPrice: {
      get() {
        let allPrice = 0;
        this.orderItem.map(item => {
          allPrice += item.goodsAllPrice;
        });
        return allPrice;
      }
    },
    allCount: {
      get() {
        let allCount = 0;
        this.orderItem.map(item => {
          allCount += item.goodsNum;
        });
        return allCount;
      }
    }
  },
  watch: {
    orderItem: {
      handler(newVal, oldVal) {
        const regex = /^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$/;
       for (let index = 0; index < newVal.length; index++) {
         const element = newVal[index];
         if(regex.test(element.goodsNum))
         break;
        this.orderItem = oldVal;
       }
      },
      deep: true
    },
   
  },

  methods: {
    toOrder(){
        this.$router.push({name:'order'})
    },
    add(item) {
      item.goodsNum++;
      item.goodsAllPrice = item.goodsPrice * item.goodsNum * 1;
        this.$http
          .post("/updataOrderItem", {
            username: this.userObj.username,
            goodsNum: item.goodsNum,
            goodsAllPrice:item.goodsAllPrice,
            goodsID:item.goodsID,
    
          })
          .then(res => {
              if(res.data.code==1){
                  
              }
          })
          .catch(err => {});
    },
    reduce(item) {
      item.goodsNum--;
      item.goodsNum = item.goodsNum <= 1 ? 1 : item.goodsNum;
      item.goodsAllPrice = item.goodsPrice * item.goodsNum * 1;
          this.$http
          .post("/updataOrderItem", {
            username: this.userObj.username,
            goodsNum: item.goodsNum,
            goodsAllPrice:item.goodsAllPrice,
            goodsID:item.goodsID,
          })
          .then(res => {
              if(res.data.code==1){
                  
              }
          })
          .catch(err => {});
    },
    del(item,i){
      this.orderItem.splice(i,1);
        this.$http
          .post("/delOrderItem", {
            username: this.userObj.username,
            goodsID:item.goodsID,
          })
          .then(res => {
              if(res.data.code==1){
                  
              }
          })
          .catch(err => {});
    }
  },
  mounted() {
     if(localStorage.getItem('username')){
       this.isLogin = true;
       this.userObj.username = localStorage.getItem('username')
    }else{
        this.$router.push({name:'my'})
    }
    this.$http
      .get("/cartItem",{params:{
        username:this.userObj.username
      }})
      .then(res => {
        this.orderItem = res.data;
      })
      .catch(err => {
        
      });
  }
};
</script>

<style lang="scss" scoped>
@import "../common/scss/index.scss";
.box {
  position: relative;
  display: flex;
  padding: 0.35rem;
  border: 1px solid #d6d6d6;
  border-radius: 0.2rem;
  font-size: 0.23rem;
  font-weight: bold !important;
  .icon-close {
    color: white;
    font-weight: bold;
    background: #cccccc;
    position: absolute;

    width: 0.4rem;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    border-radius: 50%;
    right: 0.1rem;
    top: 0.3rem;
  }
  .left {
    img {
      width: 1.6rem;
      height: 1.6rem;
    }
    width: 1.6rem;
    height: 1.6rem;
  }
  .right {
    width: 3.8rem;
    font-weight: bold;
    .cartPrice {
      font-size: 0.3rem;
      color: $mC;
    }
    .count {
      input {
        width: 0.75rem;
        text-align: center;
        font-size: 0.25rem;
        font-weight: bold;
      }
      .reduce,
      .add {
        text-align: center;
        display: inline-block;
        width: 0.46rem;
        background: #fafafa;
        font-size: 0.3rem;
        font-weight: bold;
      }
      margin-top: 0.2rem;
      margin-left: 0.2rem;
      width: 1.85rem;
      line-height: 0.5rem;

      height: 0.54rem;
      border: 1px solid #ccc;
    }
  }
}
.tip{
  width: 90%;
  margin: 0 auto;
  font-size: .3rem;
  text-align: center;
  line-height: 4rem;
  height: 4rem;
}
.footer {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.7rem;
  line-height: 0.7rem;
  font-size: 0.28rem;
  div {
    text-align: center;
  }
  .div1 {
    background: white;
    flex: 0.7;
    .allPrice {
      color: $mC;
      font-weight: bold !important;
    }
  }
  .div2 {
    flex: 0.3;
    color: white;
    background: $mC;
    .allCount {
      color: white;
    }
  }
}
</style>


