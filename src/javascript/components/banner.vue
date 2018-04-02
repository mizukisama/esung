<template>
    <div class="swiper-container">
            <div class="swiper-wrapper">
                <div v-for="(slide,index) in list" :key="index"  class="swiper-slide" >
                    <slot :a="slide"></slot>
                </div>
            </div>
            <div v-if="hasPagination" class="swiper-pagination"></div>
            
			<a v-if="hasButton" href="javascript:void(0)" class="swiper-button-next"></a>
			<a v-if="hasButton" href="javascript:void(0)" class="swiper-button-prev"></a>

        </div>
</template>
<script>
import Swiper from "swiper";
export default {
  name: "banner",
  props: {
    list: {
      type: Array,
      required: true
    },
    hasPagination: {
      type: Boolean,
      default: true
    },
    isAuto: {
      type: Boolean,
      default: true
    },
    hasButton: {
      type: Boolean,
      default: true
    },
    isLoop: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    var option = {};
    if (this.hasPagination) {
      option.pagination = {
        el: ".swiper-pagination"
      };
    }
    if (this.hasButton) {
      option.navigation = {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      };
    }
    if (this.isAuto) {
      option.autoplay = true;
    }
    if (this.isLoop) {
      option.loop = true;
    }
    var swiper = new Swiper(".swiper-container", option);
  }
};
</script>
<style src='swiper/dist/css/swiper.min.css'></style>

<style lang="scss" scoped>
@import "../common/scss/index.scss";
.swiper-container {
  width: 100%;
  height: 3.24rem;
  .swiper-slide {
    width: 100%;
    height: 3.24rem;
    a {
      display: block;
      width: 100%;
      height: 3.24rem;
      img.homeslide {
        display: block !important;
        width: 100% !important;
        height: auto !important;
      }
    }
  }
  .swiper-pagination-bullet {
    background: #fff;
    opacity: 1;

    &.swiper-pagination-bullet-active {
      background: $mC;
    }
  }
}
</style>
