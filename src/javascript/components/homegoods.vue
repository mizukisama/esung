<template>
<div id="content" class="wrap">
   <div v-for="(item,index) in goodsList" :key="index">
        <div class="rmtj">
        <a><div class="rmtj_left">{{item.class}}</div></a>
        </div>
        <ul class="chanpin clearfix">
            <li v-for="(a,index) in item.list" :key="index">
                <div class="chanpin_mb">
                <router-link :to="{name:'detail',params:{goodsID:a.goodsID}}"><img :src="a.imgSrc"></router-link>   
                <p><em class="red">￥<span>{{a.price}}</span></em>
                <em class="xiexian">市场价：￥<span>{{a.oriPrice}}</span> </em>
                </p>
                        
                <p class="goodsname">{{a.name}}</p>
                </div>
            </li>
         
        </ul>
    </div>
</div>
</template>
<script>
export default {
  name: "homegoods",
  data() {
    return {
      goodsList: [
        {
          class: "新品上架",
          list: [
            {
              goodsID: 1,
              name: "2017连衣裙夏装潮新款名人瑞裳大码女装短袖雪纺长裙连衣裙气质",
              price: 1,
              oriPrice: 356,
              imgSrc:
                "http://shop.ytaob.cn/images/201512/thumb_img/172_thumb_G_1450912176614.jpg"
            },
            {
              goodsID: 2,
              name: "热嘉2017夏装新款潮韩版气质波西米亚夏欧洲站雪纺长裙连衣裙女神",
              price: 268,
              oriPrice: 382,
              imgSrc:
                "http://shop.ytaob.cn/images/201512/thumb_img/173_thumb_G_1450912218810.jpg"
            },
            {
              goodsID: 3,
              name: "蕾丝连衣裙夏装2017新款燕子翩夏季女装短袖修身包臀OL气质女裙子",
              price: 288,
              oriPrice: 412,
              imgSrc:
                "http://shop.ytaob.cn/images/201512/thumb_img/174_thumb_G_1450912254232.jpg"
            },
            {
              goodsID: 4,
              name: "2017夏装新款女装OL大牌气质网纱刺绣拼接修身大码真丝连衣裙",
              price: 298,
              oriPrice: 687,
              imgSrc:
                "http://shop.ytaob.cn/images/201512/thumb_img/175_thumb_G_1450912285792.jpg"
            },
            {
              goodsID: 5,
              name: "紫纯2017夏装新款OL高档重磅桑蚕丝连衣裙女大牌气质修身真丝长裙",
              price: 568,
              oriPrice: 958,
              imgSrc:
                "http://shop.ytaob.cn/images/201512/thumb_img/176_thumb_G_1450912329558.jpg"
            },
            {
              goodsID: 6,
              name: "桑蚕丝2017新款 大码显瘦韩版大牌女裙 高端绸缎印花真丝连衣裙夏",
              price: 369,
              oriPrice: 790,
              imgSrc:
                "http://shop.ytaob.cn/images/201512/thumb_img/177_thumb_G_1450912357988.jpg"
            }
          ]
        },
        {
          class: "精品推荐",
          list: [
            {
              goodsID: 7,
              name: "2017夏装新款马卡龙纯色复古森系雪纺连衣裙显瘦",
              price: 139,
              oriPrice: 398,
              imgSrc:
                "http://shop.ytaob.cn/images/201512/thumb_img/164_thumb_G_1450902419530.jpg"
            },
            {
              goodsID: 8,
              name: "颜域2017秋装新款 欧美高端优雅气质一字领腰带短袖蕾丝连衣裙",
              price: 268,
              oriPrice: 382,
              imgSrc:
                "http://shop.ytaob.cn/images/201512/thumb_img/170_thumb_G_1450911460283.jpg"
            },
            {
              goodsID: 9,
              name: "VeroModa假两件收腰无袖圆领A型连衣裙|314361006",
              price: 479,
              oriPrice: 679,
              imgSrc:
                "http://shop.ytaob.cn/images/201512/thumb_img/171_thumb_G_1450911859135.jpg"
            },
            {
              goodsID: 10,
              name: "杭依阁 2017夏装新款韩版修身淑女连衣裙女装 蕾丝雪纺连衣裙夏潮",
              price: 168,
              oriPrice: 399,
              imgSrc:
                "http://shop.ytaob.cn/images/201512/thumb_img/165_thumb_G_1450910166667.jpg"
            },
            {
              goodsID: 11,
              name: "英花 2017夏季高端大牌真丝连衣裙中年大码桑蚕丝连衣裙印花绸缎",
              price: 468,
              oriPrice: 985,
              imgSrc:
                "http://shop.ytaob.cn/images/201512/thumb_img/166_thumb_G_1450910260767.jpg"
            },
            {
              goodsID: 12,
              name: "Zara kara女装欧洲站2017夏装新款 欧美风复古印花连衣裙气质修身",
              price: 229,
              oriPrice: 382,
              imgSrc:
                "http://shop.ytaob.cn/images/201512/thumb_img/167_thumb_G_1450910380060.jpg"
            },
             {
              goodsID: 13,
              name: "farfellny/法妃尼2017夏装新款真丝修身显瘦女神范气质长裙连衣裙",
              price: 528,
              oriPrice: 1210,
              imgSrc:
                "http://shop.ytaob.cn/images/201512/thumb_img/168_thumb_G_1450910450834.jpg"
            },
             {
              goodsID: 14,
              name: "2017 巴布欧夏季长裙大码桑蚕丝吊带真丝修身乔其纱纯色中长款连衣裙子",
              price: 369,
              oriPrice: 1688,
              imgSrc:
                "http://shop.ytaob.cn/images/201512/thumb_img/169_thumb_G_1450910489371.jpg"
            },
          ]
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../common/scss/index.scss";
.wrap {
  .rmtj_left {
    height: 0.5rem;
    line-height: 0.5rem;
    color: $mC;
    font-size: 0.18rem;
    padding-left: 0.1rem;
  }
  .chanpin {
    border-bottom: 0.18rem solid #f6f6f6;
    li {
      float: left;
      width: 50%;
      border-top: 1px solid #f6f6f6;
      border-left: 1px solid #f6f6f6;
      padding: 0.1rem;
      text-align: center;
      .red {
        color: #cf1d1d;
        font-size: 0.18rem;
        font-style: normal;
      }

      .goodsname {
        padding-top: 0.05rem;
        margin: 0 auto;
        color: black;
        font-style: normal;
        font-size: 0.18rem !important;
        width: 1.8rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .xiexian {
        text-decoration: line-through;
        color: black;
        font-style: normal;
        font-size: 0.18rem;
        line-height: 0.18rem;
      }
    }
  }
}
</style>
