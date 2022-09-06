<template>
  <div class="lottery-component">
    <swiper class="swiper" ref="mySwiper" :options="swiperOptions">
      <swiper-slide class="swiper-slide">
        <home />
      </swiper-slide>
      <swiper-slide class="swiper-slide" v-for="gift in gifts" :key="gift.key">
        <gift-displayer
          :name="gift.name"
          :image="gift.image"
          :description="gift.description"
        />
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <turntable @success="handleTurntableSuccess" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import Home from "./Lottery.Home.vue";
import GiftDisplayer from "./Lottery.GiftDisplayer.vue";
import Turntable from "./Lottery.Turntable.vue";
import axios from "axios";
import { homeConfig } from "../gift.setting";
export default {
  name: "Lottery",
  components: { Home, GiftDisplayer, Turntable },
  data() {
    this.swiperOptions = {
      direction: "vertical",
      width: window.innerWidth,
      height: window.innerHeight,
    };
    return {
      gifts: [],
    };
  },
  methods: {
    async showGifts() {
      let resourceData = await axios.post(`${homeConfig.apiUrl}/gifts/list`);
      this.gifts = resourceData.data.data;
    },

    handleTurntableSuccess(gift) {
      this.$emit("showGift", gift);
    },
  },
  mounted() {
    this.showGifts();
  },
};
</script>

<style scoped>
.lottery-component {
}
.swiper {
  height: 100%;
  width: 100%;
}
.swiper-slide {
  height: 100%;
  width: 100%;
}
</style>
