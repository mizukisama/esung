<template>
  <div class="box">
   <header-box :text="title" :isBack="isBack" :isShop="isShop" /> 
   <main-com> 
     <template v-if="goodData != null">
    <banner :list="goodData.imgSrc" :hasButton="false" :hasPagination="true" :isAuto="true" >
                   <template slot-scope="{slide}">
                    <img :src="slide.imgSrc" />
                   </template>
    </banner>
  
    <div class="goodsInfo">
        <ul>
            <li class="name">{{goodData.name}}</li>
            <li><label>月销量：</label>{{goodData.xl}}件</li>
            <li class="price"><label>商品总价：</label><span>￥{{goodData.price*1*num}}</span></li>
            <li >
              <label>数量：</label>
              <div class="count" style="display:inline-block"><span class="reduce" @click="reduce()">-</span>
            <span class='num'><input type="text" v-model="num"></span>
            <span class="add" @click="add()">+</span>
            </div>
            </li>
        </ul>

    </div>
      </template>
    <div class="cart">
     <!-- <button class="bugnow" @click="buyNow()">立即购买</button> -->
     <button class="toCart" @click="showShadow()">加入购物车</button>
   </div>
   </main-com> 
   <div v-if="goodData != null" class="popGeneral" :style="shadowStyle" id="popDiv">
          <div class="tit">
            <h4>商品加入购物车<span class="iconfont icon-close" @click="closShadow()"></span></h4>
             </div>
          <div class="main">
            <div class="left" > <img :src="goodData.imgSrc[0].imgSrc"> </div>
            <div class="right">
              <p>{{goodData.name}}</p>
              <span> 加入数量： <b id="cartNum">{{num}}</b></span>
              <br> <span> 总计金额： <b id="cartPrice">￥<span>{{goodData.price*1*num}}</span></b></span> 
            </div>
          </div>
          <div class="popbtn"> <button class="button" @click="closShadow()" >继续购物</button> <button class="button" @click="toCart()" >去结算</button> </div>
        </div>
 
  </div>
</template>

<script>
import header from "../components/header";
import MainCom from "../components/main";
import banner from "../components/detailBanner";
import { mapState, mapMutations } from "vuex";
export default {
  name: "goods",
  data() {
    return {
      goodData: null,
      num: 1,
      shadowStyle: {
        display: "none"
      },
      isLogin: false,
      userObj: {}
    };
  },
  components: {
    headerBox: header,
    MainCom,
    banner
  },
  computed: {
    ...mapState("detail/", {
      title: "title",
      isBack: "isBack",
      isShop: "isShop",
      classData: "classData"
    })
  },
  watch: {
    num: function(newVal, oldVal) {
      const regex = /^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$/;
      if (!regex.test(newVal)) {
        //如果小于等于零
        this.num = oldVal; //恢复原值
      }
    }
  },
 beforeCreate(){
  // this.$http.post("/isLogin")
  //   .then(res=>{
  //       
  //     this.isLogin = res.data.isLogin
  //     this.userObj = res.data.userObj
  //       
  //   })
  },
  methods: {
    add() {
      this.num++;
    },
    reduce() {
      this.num--;
      this.num = this.num < 1 ? 1 : this.num;
    },
    closShadow() {
      this.shadowStyle.display = "none";
    },
    showShadow() {
      this.shadowStyle.display = "block";
      var goodsID = this.$route.params.goodsID;
      let orderItem = {
            goodsID: goodsID,
            goodsName: this.goodData.name,
            goodsNum: this.num,
            goodsPrice:this.goodData.price*1,
            goodsAllPrice: this.goodData.price * 1 * this.num,
            imgSrc: this.goodData.imgSrc[0].imgSrc,
            statu: 0 * 1 //未下单
          };
      //   
        if (this.isLogin) {
          orderItem.username = this.userObj.username;
          this.$http
            .post("/orderItem", orderItem)
            .then(res => {})
            .catch(err => {
              
            });
        } else {
            
          this.$router.push({name:'my'})
          return false;
          //下面的以后做。
          //否则写入或者更新session
          //   
          let orderItemList = JSON.parse(sessionStorage.getItem("orderItem"))
  
          //   
    
            orderItemList.map((item,index)=>{
              if(item.goodsID==orderItem.goodsID){
                item.goodsNum+=orderItem.goodsNum
                item.goodsAllPrice+=orderItem.goodsAllPrice
              }
            })
            if(JSON.stringify(orderItemList)==sessionStorage.getItem("orderItem")){
               orderItemList.push(orderItem);
            }
          sessionStorage.setItem("orderItem", JSON.stringify(orderItemList));
          
        }
  
    },
    // buyNow() {
    //    var goodsID = this.$route.params.goodsID;
    //   let orderItem = {
    //         goodsID: goodsID,
    //         goodsName: this.goodData.name,
    //         goodsNum: this.num,
    //         goodsPrice:this.goodData.price*1,
    //         goodsAllPrice: this.goodData.price * 1 * this.num,
    //         imgSrc: this.goodData.imgSrc[0].imgSrc,
    //         statu: 1 * 1 
    //       };
    //   //   
    //     if (this.isLogin) {
    //       orderItem.username = this.userObj.username;
    //       this.$http
    //         .post("/orderItem", orderItem)
    //         .then(res => {
    //           if(res.data.code==1){
    //              this.$router.push({name:'order', params: { goodsID: goodsID }})
    //           }
    //         })
    //         .catch(err => {
    //           
    //         });
    //     } else {
    //         
    //       this.$router.push({name:'my'})
    //     }
    // }
    toCart(){
      this.$router.push({name:'cart'})
    }

  },

  mounted() {
     if(localStorage.getItem('username')){
       this.isLogin = true;
       this.userObj.username = localStorage.getItem('username')
    }
    var goodsID = this.$route.params.goodsID;

    //   
    this.$http
      .get("/getGoods?goodsID=" + goodsID)
      .then(res => {
        this.goodData = res.data[0];
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
  .goodsInfo {
    li {
      width: 90%;
      margin: 0 auto;
      font-size: 0.28rem;
      line-height: 1rem;
      @include border-1px(#d1d1d2);
      height: 1rem;
      label {
        display: inline-block;
        width: 1.5rem;
      }
      &.name {
        line-height: 0.4rem;
        font-weight: bold;
      }
      &.price {
        span {
          color: $mC;
        }
      }
      .count {
        // border: 1px solid #e3e3e3;
        border-radius: 0.8rem;

        .add,
        .reduce {
          text-align: center;
          display: inline-block;
          font-weight: bold;
          width: 0.5rem;
          height: 0.6rem;
          background: #fafafa;
          line-height: 0.6rem;
        }

        input {
          text-align: center;
          height: 0.5rem;
          border: 1px solid #e3e3e3;
          width: 1.2rem;
        }
      }
    }
  }
  .cart {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 1.2rem;
    button {
      width: 2.66rem;
      height: 0.7rem;
      border: 1px solid #c40000;
      border-radius: 0.1rem;
      &.bugnow {
        background: #fff0f0;
        color: #c40000;
      }
      &.toCart {
        background: #c40000;
        color: white;
      }
    }
  }
  .popGeneral {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0.3rem;
    z-index: 1000;
    width: 5.78rem;
    height: 3.61rem;
    .tit {
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      font-size: 0.25rem;
      background: $mC;
      color: white;
      h4 {
        position: relative;
        span {
          font-weight: bold;
          position: absolute;
          right: 0.2rem;
        }
      }
    }
    .main {
      display: flex;
      padding: 0.1rem 0.2rem;
      background: #efefef;
      .left {
        width: 2rem;
        height: 2rem;
        img {
          width: 2rem;
          height: 2rem;
        }
      }
      .right {
        padding-left: 0.2rem;
        font-size: 0.27rem;
        flex: 1;
        p {
          height: 1.1rem;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
    }
    .popbtn {
      background: #e1e1e1;
      height: 0.85rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      button {
        color: white;
        border: 0;
        width: 2.75rem;
        height: 0.6rem;
        border-radius: 0.1rem;
        background: $mC;
      }
    }
  }
}
</style>


