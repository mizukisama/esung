<template>
      <div>
            <header-box :text="title" :isShop='isShop' :isBack='isBack'/>
              <main-com>
                  <div class="box">
                  <h6>感谢您在本店购物！</h6>
                   <h6 >
                        <span class="ordernum">您的订单号：</span>
                        <span class="red">{{orderInfo.orderCode}}</span>
                    </h6>
                  <table>
                   
                     <tr>
                        <td>您选定的配送方式为：</td>
                        <td>{{orderInfo.postway}}</td>
                    </tr>
                     <tr>
                        <td>您选定的支付方式为：</td>
                        <td>{{orderInfo.payway}}</td>
                    </tr>
                     <tr>
                        <td>您的应付款金额为：</td>
                        <td>￥{{orderInfo.price}}</td>
                    </tr>
                    <tr v-if="orderInfo.payway=='支付宝'">
                        <td colspan="2"><button>立即使用支付宝支付</button></td>
                        
                    </tr>
                </table>
                </div>
                </main-com>
         <footNav></footNav>
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
      orderInfo: {},
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
  
  },

  computed: {
    ...mapState("pay/", {
      title: "title",
      isBack: "isBack",
      isShop: "isShop"
    }),
  
  },
 
  methods: {},
  mounted() {
     if(localStorage.getItem('username')){
       this.isLogin = true;
       this.userObj.username = localStorage.getItem('username')
    }else{
        this.$router.push({name:'my'})
    }

    
    var orderCode = this.$route.params.orderCode;

    //   
    this.$http
      .get("/getOrderInfo?orderCode=" + orderCode)
      .then(res => {
        this.orderInfo = res.data[0];
          
      })
      .catch(err => {
        
      });
  }
};
</script>

<style lang="scss" scoped>
@import "../common/scss/index.scss";
.box{
    padding: 3rem 0;

    h6{
        font-size: .3rem;
        color: #424445;
        font-weight: bold;
        text-align: center;
    }
     .ordernum{
             font-weight: bold;
          }
     .red{ font-weight: bold;
              color: #ff0000;
          }
    table{
        width: 90%;
        margin: 0 auto;
        border-collapse: collapse;
        border-spacing: 0;
        text-align: center;
        border: 1px solid #ccc;
        font-size: .25rem;
      tr{
          vertical-align: middle;
         td{
             padding:.1rem;
         }
          td:nth-child(1){
            //   text-align: right;
              width: 50%;
          }
          td:nth-child(2){
               font-weight: bold;
          }
      }
    }
}
</style>


