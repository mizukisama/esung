<template>
    <div>
            <header-box :text="header" />
            <div class="main">
                <!-- <banner :list="bannerList" :hasButton="false" :hasPagination="true" :isAuto="true" />
                <goods :list="goodsList" /> -->
            </div>
        </div>
</template>

<script>
import header from "../components/header";
export default {
  name: "more",
  data() {
    return {
      header: "更多"
      //   goodsList: [
      //     { name: "商品1", price: 18 },
      //     { name: "商品2", price: 128 },
      //     { name: "商品3", price: 118 },
      //     { name: "商品4", price: 218 },
      //     { name: "商品5", price: 183 },
      //     { name: "商品6", price: 128 }
      //   ],
      //   bannerList: [
      //     { href: "javascript:void(0)", imgSrc: bannerImg1 },
      //     { href: "javascript:void(0)", imgSrc: bannerImg2 },
      //     { href: "javascript:void(0)", imgSrc: bannerImg3 },
      //     { href: "javascript:void(0)", imgSrc: bannerImg4 }
      //   ]
    };
  },
  components: {
    headerBox: header
    // goods,
    // banner
  }
};
</script>

<style lang="scss" scoped>

</style>


