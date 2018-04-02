
import img1 from '../../image/banner/1.jpg';
import img2 from '../../image/banner/2.jpg';
import img3 from '../../image/banner/3.jpg';
export default {
    namespaced: true,
    state:{
        title: "ESUNG微商城",
        isShop:true,
        isBack:false,
        bannerList: [
            {
                goodsId: 1, imgSrc: img1, goodsID: 1
            },
            {
                goodsId: 2, imgSrc: img2, goodsID: 2
            },
            {
                goodsId: 3, imgSrc: img3, goodsID: 3
            },
        ],
        goodsList:[]
    },
    mutations:{
     
    },
    actions:{
        
    }
}