<template>
  <div>
   <header-box :text="title" :isBack="isBack" :isShop="isShop" /> 
   <main-com> 
    <div class="clist"> 
     <ul> 
      <li class="crow level1" :class="[{active:item.show}]" v-for="(item,index) in classData" :key="index"> 
       <div class="crow_row"> 
        <div class="crow_icon"> 
         <img :src="item.class.imgSrc" /> 
        </div> 
        <div class="crow_title"> 
         <span>{{item.class.name}}</span> 
        </div> 
        <div class="crow_arrow"> 
         <img :src="item.crowImg" @click="changeli(index,item)" /> 
        </div> 
        <div>
         &nbsp;
        </div> 
       </div> 
        <ul class="clist clist_sub clearfix" v-show="item.show"> 
       <li class="crow" > 
        <div class="crow_item crow_item_clear" v-for="(a,index) in item.list" :key="index"> 
         <a >{{item.list[index]}}</a> 
        </div> 
       
       
        </li> 
      </ul> 
      </li>      
     </ul> 
    </div> 
   </main-com> 
    <footNav></footNav>
  </div>
</template>

<script>
import header from "../components/header";
import MainCom from "../components/main";
import footNav from "../components/footnav";
import { mapState, mapMutations } from "vuex";
import img1 from "../../image/list/1.png";
import img2 from "../../image/list/2.jpg";
import img3 from "../../image/list/3.png";
import img4 from "../../image/list/4.png";
import img5 from "../../image/list/5.png";
import img6 from "../../image/list/6.png";
import img7 from "../../image/list/7.png";
import img8 from "../../image/list/8.png";
import img9 from "../../image/list/9.png";
import img10 from "../../image/list/10.png";
import img11 from "../../image/list/11.png";
import imgcrow_arrow from "../../image/crow_arrow.png";
import imgcrow_arrow1 from "../../image/crow_arrow1.png";
export default {
  name: "goods",
  data() {
    return {
      classData: [
        {
          class:{
            name:"潮流女装",
            imgSrc:img1
          } ,
          list: ["连衣裙", "直丝裙", "休闲裤", "热裤", "蕾丝衫","牛仔裤"],
          show: false,
          crowImg:imgcrow_arrow,
        },
        {
          class:{
            name:"品牌男装",
            imgSrc:img2
          } ,
          list: ["T恤", "衬衫", "牛仔裤"],
          show: false,
          crowImg:imgcrow_arrow,
        },
        {
          class:{
            name:"鞋靴箱包",
            imgSrc:img3
          } ,
          list: ["时尚女鞋", "商务男鞋", "直皮女包"],
          show: false,
            crowImg:imgcrow_arrow,
        },
        {
          class:{
            name:"家用电器",
            imgSrc:img4
          } ,
          list: ["暂时缺货"],
          show: false,
            crowImg:imgcrow_arrow,
        },
        {
          class:{
            name:"手机数码",
            imgSrc:img5
          } ,
          list: ["暂时缺货"],
          show: false,
            crowImg:imgcrow_arrow,
        },
           {
          class:{
            name:"母婴用品",
            imgSrc:img6
          } ,
          list: ["暂时缺货"],
          show: false,
            crowImg:imgcrow_arrow,
        },
           {
          class:{
            name:"美妆护肤",
            imgSrc:img7
          } ,
          list: ["暂时缺货"],
          show: false,
            crowImg:imgcrow_arrow,
        },
           {
          class:{
            name:"居家生活",
            imgSrc:img8
          } ,
          list: ["暂时缺货"],
          show: false,
            crowImg:imgcrow_arrow,
        },
           {
          class:{
            name:"家具建材",
            imgSrc:img9
          } ,
          list: ["暂时缺货"],
          show: false,
            crowImg:imgcrow_arrow,
        },
           {
          class:{
            name:"营养保健",
            imgSrc:img10
          } ,
          list: ["暂时缺货"],
          show: false,
            crowImg:imgcrow_arrow,
        },
           {
          class:{
            name:"汽车用品",
            imgSrc:img11
          } ,
          list: ["暂时缺货"],
          show: false,
            crowImg:imgcrow_arrow,
        },
      ]
    };
  },
  components: {
    headerBox: header,
    MainCom,
    footNav,
  },
  computed: {
    ...mapState("goods/", {
      title: "title",
      isBack: "isBack",
      isShop: "isShop"
      
    }),
  },
  methods: {
            changeli: function(ind, item) {
                // 先循环数据中的show将其全部置为false,此时模板里的v-if判断生效关闭全部二级菜单,并移除样式
                // this.classData.forEach(i => {
                //     if (i.show !== this.classData[ind].show) {
                //         i.show = false;
                //     };
                // });
                // 取反(true或false)
                item.show = !item.show;
                item.crowImg = item.crowImg==imgcrow_arrow?imgcrow_arrow1:imgcrow_arrow
                  
            },
            doThis: function(index) {
                alert(index)
            }
        }
};
</script>

<style lang="scss" scoped>
@import "../common/scss/index.scss";
.crow_row {
  height: 1.24rem;
  line-height: 1.24rem;
  display: flex;
  align-items: center;
  justify-content: left;

  @include border-1px(#d1d1d2);
  div {
    // display: inline-block;
    float: left;
  }
  .crow_icon {
    padding-left: 0.18rem;
    width: 0.98rem;
    height: 0.9rem;
  }
  .crow_title {
    padding-left: 0.26rem;
    width: 5rem;
    font-size: 0.28rem !important;
    color: black;
  }
  .crow_arrow {
    width: 0.3rem;
    height: 0.2rem;
  }
}
.clist_sub {
  width: 100%;
  .crow_item {
    text-align: center;
    float: left;
    width: 33.33%;
    height: 1.37rem;

    a {
      display: block;
      height: 0.5rem;
      line-height: 0.5rem;
      border-left: 1px solid #d1d1d2;
      margin-left: -1px;
      margin-top: 0.4rem;
    }
  }
}
</style>


