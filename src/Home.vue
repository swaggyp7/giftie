<template>
  <div id="app" class="app">
    <lottery v-if="!isShowGift" @showGift="showGift" />
    <gift :gift="giftData" v-else />
  </div>
</template>

<script>
import Lottery from "./components/Lottery.vue";
import Gift from "./components/Gift.vue";
import axios from "axios";
import { homeConfig } from "./gift.setting";
export default {
  name: "Home",
  components: { Lottery, Gift },
  data() {
    return {
      isShowGift: false,
      giftData: {},
    };
  },

  methods: {
    async checkLocalGift(that) {
      const admin = this.$route.query.admin;
      let resourceData = await axios.post(`${homeConfig.apiUrl}/gifts/status`, {
        admin,
      });
      if (resourceData) {
        const { status, latest } = resourceData.data.data;
        if (!status) {
          that.giftData = latest;
          that.isShowGift = true;
        }
      }
    },

    showGift(gift) {
      this.giftData = gift;
      this.isShowGift = true;
    },
  },

  created() {
    this.checkLocalGift(this);
  },

  mounted() {},
};
</script>

<style>
.app {
  font-family: Muyao, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-image: url(./assets/images/bg.jpeg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.full-screen {
  width: 100vw;
  height: 100vh;
}
</style>
