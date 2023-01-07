<template>
  <div  class="site">
    <header class="site__header">
      <div class="header__cpntent">
        <img class="header__logo" src="../assets/logo.png" />
        <label for="checkbox" class="switch">
          <input  @change="changeTheme" type="checkbox" id="checkbox" v-model="checked">
          <span class="slider round"></span>
        </label>
        <div class="header__user--wrap">
          <span class="avo__span" :style="{background: getColor}">
            <img :src="avatarGet" class="header__user--avatar" />
          </span>
          <div class="header__user">{{ userName }}</div>
        </div>
      </div>
    </header>
    <div class="site__wrap">
      <article class="site__content">
        <router-view />
      </article>
      <aside class="site__menu">
        <router-link class="site__menu-link" to="/profile">profile</router-link>
        <router-link class="site__menu-link" to="/chats">chats</router-link>
        <router-link class="site__menu-link" to="/friends">friends</router-link>
      </aside>
    </div>
  </div>
</template>
<script>
const url = "http://localhost:3006/api";
import axios from "axios";
import { authHeader} from "../helpers.js";



export default {
  name: "ContentScreen",
  data() {
    return {
      userName: "Name",
      avatar: '',
      snows: new Array(100),
    };
  },
  computed: {
    avatarGet() {
      return this.$store.state.avatar
    },
    checked() {
      return this.$store.state.checked
    },
    getColor(){
      return this.$store.state.color
    }
  },
  methods: {
    getUserName() {
      //const self = this
      axios
        .get(`${url}/userInfo`, {
          headers: authHeader(),
        })
        .then( ({ data }) => {
            this.userName = data.data.name;
            this.$store.commit('updateAvatar', data.data.avatar);
        });
    },
    changeTheme(){
      document.body.classList.toggle('newYearTheme')
      this.$store.commit('updateChecked',!this.checked);
    }
    
  },
  
  mounted() {
    this.getUserName();
  },
};
</script>
<style scoped>
.site {
  margin: 0;
}
.avo__span{
  border-radius: 35px;
  width: 50px;
  height: 50px;
  margin: auto;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
/* The switch - the box around the slider */
.switch {
  margin-top: 15px;
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {display:none;}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #5a7081;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.site__wrap {
  display: flex;
  flex-direction: row-reverse;
  margin-left: 16%;
  margin-top: 10px;
}
.site__menu {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  width: 20%;
}
.site__content {
  margin: 0 auto;
  margin-left: 0;
  width: 40%;
  min-height: 500px;
  
}
.site__menu-link {
  text-decoration: none;
  color: #9bc472;
  font-size: 24px;
  text-align: start;
  margin: 0 0 20px 55%;
}
.site__menu-link:hover {
  color: #88ad62;
}
.site__header {
  background: #bde991;
  height: 60px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.newYearTheme .site__header{
  background: none;
  color: white;
}
.newYearTheme .site__content{
  background: transparent;
}
.header__cpntent {
  width: 34%;
  display: flex;
  justify-content: space-between;
  margin: 0 30px 0 0;
}
.header__logo {
  margin: 10px 0px 10px 0px;
  height: 40px;
}
.header__user {
  margin: 20px 0px 10px 0px;
}
.header__user--wrap {
  display: flex;
}
.header__user--avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;

}
body {
  height: 100vh;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;
  
}

.snow {
  filter: drop-shadow(0 0 10px white);
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
}
.snow:nth-child(1) {
  opacity: 0.7291;
  transform: translate(9.5151vw, -10px) scale(0.6585);
  animation: fall-1 12s -3s linear infinite;
}
@keyframes fall-1 {
  46.516% {
    transform: translate(19.48vw, 46.516vh) scale(0.6585);
  }
  to {
    transform: translate(14.49755vw, 100vh) scale(0.6585);
  }
}
.snow:nth-child(2) {
  opacity: 0.2492;
  transform: translate(93.4875vw, -10px) scale(0.2783);
  animation: fall-2 10s -18s linear infinite;
}
@keyframes fall-2 {
  31.405% {
    transform: translate(97.6829vw, 31.405vh) scale(0.2783);
  }
  to {
    transform: translate(95.5852vw, 100vh) scale(0.2783);
  }
}
.snow:nth-child(3) {
  opacity: 0.651;
  transform: translate(41.8485vw, -10px) scale(0.9869);
  animation: fall-3 25s -21s linear infinite;
}
@keyframes fall-3 {
  64.845% {
    transform: translate(49.9413vw, 64.845vh) scale(0.9869);
  }
  to {
    transform: translate(45.8949vw, 100vh) scale(0.9869);
  }
}
.snow:nth-child(4) {
  opacity: 0.1501;
  transform: translate(35.9783vw, -10px) scale(0.4432);
  animation: fall-4 23s -12s linear infinite;
}
@keyframes fall-4 {
  46.152% {
    transform: translate(29.9884vw, 46.152vh) scale(0.4432);
  }
  to {
    transform: translate(32.98335vw, 100vh) scale(0.4432);
  }
}
.snow:nth-child(5) {
  opacity: 0.2822;
  transform: translate(99.8201vw, -10px) scale(0.563);
  animation: fall-5 24s -2s linear infinite;
}
@keyframes fall-5 {
  53.445% {
    transform: translate(104.7247vw, 53.445vh) scale(0.563);
  }
  to {
    transform: translate(102.2724vw, 100vh) scale(0.563);
  }
}
.snow:nth-child(6) {
  opacity: 0.3709;
  transform: translate(60.8441vw, -10px) scale(0.0647);
  animation: fall-6 13s -19s linear infinite;
}
@keyframes fall-6 {
  36.523% {
    transform: translate(62.8996vw, 36.523vh) scale(0.0647);
  }
  to {
    transform: translate(61.87185vw, 100vh) scale(0.0647);
  }
}
.snow:nth-child(7) {
  opacity: 0.6405;
  transform: translate(86.9138vw, -10px) scale(0.4514);
  animation: fall-7 21s -4s linear infinite;
}
@keyframes fall-7 {
  47.579% {
    transform: translate(91.7172vw, 47.579vh) scale(0.4514);
  }
  to {
    transform: translate(89.3155vw, 100vh) scale(0.4514);
  }
}
.snow:nth-child(8) {
  opacity: 0.693;
  transform: translate(95.1936vw, -10px) scale(0.39);
  animation: fall-8 18s -1s linear infinite;
}
@keyframes fall-8 {
  68.633% {
    transform: translate(100.4454vw, 68.633vh) scale(0.39);
  }
  to {
    transform: translate(97.8195vw, 100vh) scale(0.39);
  }
}
.snow:nth-child(9) {
  opacity: 0.2972;
  transform: translate(90.1124vw, -10px) scale(0.7651);
  animation: fall-9 20s -21s linear infinite;
}
@keyframes fall-9 {
  40.619% {
    transform: translate(89.4864vw, 40.619vh) scale(0.7651);
  }
  to {
    transform: translate(89.7994vw, 100vh) scale(0.7651);
  }
}
.snow:nth-child(10) {
  opacity: 0.6206;
  transform: translate(93.7437vw, -10px) scale(0.3956);
  animation: fall-10 12s -7s linear infinite;
}
@keyframes fall-10 {
  35.801% {
    transform: translate(99.513vw, 35.801vh) scale(0.3956);
  }
  to {
    transform: translate(96.62835vw, 100vh) scale(0.3956);
  }
}
.snow:nth-child(11) {
  opacity: 0.8378;
  transform: translate(97.2929vw, -10px) scale(0.5775);
  animation: fall-11 27s -3s linear infinite;
}
@keyframes fall-11 {
  62.545% {
    transform: translate(106.4602vw, 62.545vh) scale(0.5775);
  }
  to {
    transform: translate(101.87655vw, 100vh) scale(0.5775);
  }
}
.snow:nth-child(12) {
  opacity: 0.6491;
  transform: translate(80.0277vw, -10px) scale(0.1467);
  animation: fall-12 19s -1s linear infinite;
}
@keyframes fall-12 {
  55.618% {
    transform: translate(87.1974vw, 55.618vh) scale(0.1467);
  }
  to {
    transform: translate(83.61255vw, 100vh) scale(0.1467);
  }
}
.snow:nth-child(13) {
  opacity: 0.9375;
  transform: translate(65.2745vw, -10px) scale(0.3724);
  animation: fall-13 27s -18s linear infinite;
}
@keyframes fall-13 {
  71.55% {
    transform: translate(66.6791vw, 71.55vh) scale(0.3724);
  }
  to {
    transform: translate(65.9768vw, 100vh) scale(0.3724);
  }
}
.snow:nth-child(14) {
  opacity: 0.8283;
  transform: translate(35.1448vw, -10px) scale(0.3969);
  animation: fall-14 30s -18s linear infinite;
}
@keyframes fall-14 {
  38.233% {
    transform: translate(39.613vw, 38.233vh) scale(0.3969);
  }
  to {
    transform: translate(37.3789vw, 100vh) scale(0.3969);
  }
}
.snow:nth-child(15) {
  opacity: 0.1135;
  transform: translate(33.0242vw, -10px) scale(0.6905);
  animation: fall-15 20s -30s linear infinite;
}
@keyframes fall-15 {
  65.581% {
    transform: translate(32.0771vw, 65.581vh) scale(0.6905);
  }
  to {
    transform: translate(32.55065vw, 100vh) scale(0.6905);
  }
}
.snow:nth-child(16) {
  opacity: 0.6089;
  transform: translate(55.9766vw, -10px) scale(0.3655);
  animation: fall-16 25s -2s linear infinite;
}
@keyframes fall-16 {
  38.498% {
    transform: translate(61.3459vw, 38.498vh) scale(0.3655);
  }
  to {
    transform: translate(58.66125vw, 100vh) scale(0.3655);
  }
}
.snow:nth-child(17) {
  opacity: 0.6647;
  transform: translate(37.5069vw, -10px) scale(0.4635);
  animation: fall-17 24s -22s linear infinite;
}
@keyframes fall-17 {
  52.991% {
    transform: translate(30.6873vw, 52.991vh) scale(0.4635);
  }
  to {
    transform: translate(34.0971vw, 100vh) scale(0.4635);
  }
}
.snow:nth-child(18) {
  opacity: 0.2127;
  transform: translate(66.2184vw, -10px) scale(0.23);
  animation: fall-18 23s -11s linear infinite;
}
@keyframes fall-18 {
  63.25% {
    transform: translate(60.4811vw, 63.25vh) scale(0.23);
  }
  to {
    transform: translate(63.34975vw, 100vh) scale(0.23);
  }
}
.snow:nth-child(19) {
  opacity: 0.6591;
  transform: translate(70.8451vw, -10px) scale(0.5648);
  animation: fall-19 28s -1s linear infinite;
}
@keyframes fall-19 {
  51.983% {
    transform: translate(72.415vw, 51.983vh) scale(0.5648);
  }
  to {
    transform: translate(71.63005vw, 100vh) scale(0.5648);
  }
}
.snow:nth-child(20) {
  opacity: 0.4995;
  transform: translate(97.1161vw, -10px) scale(0.9346);
  animation: fall-20 28s -1s linear infinite;
}
@keyframes fall-20 {
  73.934% {
    transform: translate(98.0313vw, 73.934vh) scale(0.9346);
  }
  to {
    transform: translate(97.5737vw, 100vh) scale(0.9346);
  }
}
.snow:nth-child(21) {
  opacity: 0.9159;
  transform: translate(37.928vw, -10px) scale(0.7024);
  animation: fall-21 22s -25s linear infinite;
}
@keyframes fall-21 {
  56.741% {
    transform: translate(40.1733vw, 56.741vh) scale(0.7024);
  }
  to {
    transform: translate(39.05065vw, 100vh) scale(0.7024);
  }
}
.snow:nth-child(22) {
  opacity: 0.698;
  transform: translate(59.5352vw, -10px) scale(0.4595);
  animation: fall-22 10s -21s linear infinite;
}
@keyframes fall-22 {
  75.35% {
    transform: translate(62.2646vw, 75.35vh) scale(0.4595);
  }
  to {
    transform: translate(60.8999vw, 100vh) scale(0.4595);
  }
}
.snow:nth-child(23) {
  opacity: 0.1854;
  transform: translate(16.0142vw, -10px) scale(0.6196);
  animation: fall-23 16s -9s linear infinite;
}
@keyframes fall-23 {
  78.861% {
    transform: translate(10.254vw, 78.861vh) scale(0.6196);
  }
  to {
    transform: translate(13.1341vw, 100vh) scale(0.6196);
  }
}
.snow:nth-child(24) {
  opacity: 0.3648;
  transform: translate(72.1426vw, -10px) scale(0.5593);
  animation: fall-24 15s -10s linear infinite;
}
@keyframes fall-24 {
  34.307% {
    transform: translate(68.9314vw, 34.307vh) scale(0.5593);
  }
  to {
    transform: translate(70.537vw, 100vh) scale(0.5593);
  }
}
.snow:nth-child(25) {
  opacity: 0.7721;
  transform: translate(96.3575vw, -10px) scale(0.7793);
  animation: fall-25 10s -3s linear infinite;
}
@keyframes fall-25 {
  49.751% {
    transform: translate(95.9199vw, 49.751vh) scale(0.7793);
  }
  to {
    transform: translate(96.1387vw, 100vh) scale(0.7793);
  }
}
.snow:nth-child(26) {
  opacity: 0.6617;
  transform: translate(4.2657vw, -10px) scale(0.1211);
  animation: fall-26 14s -13s linear infinite;
}
@keyframes fall-26 {
  79.066% {
    transform: translate(0.0916vw, 79.066vh) scale(0.1211);
  }
  to {
    transform: translate(2.17865vw, 100vh) scale(0.1211);
  }
}
.snow:nth-child(27) {
  opacity: 0.6157;
  transform: translate(24.7713vw, -10px) scale(0.0962);
  animation: fall-27 29s -2s linear infinite;
}
@keyframes fall-27 {
  31.308% {
    transform: translate(25.6212vw, 31.308vh) scale(0.0962);
  }
  to {
    transform: translate(25.19625vw, 100vh) scale(0.0962);
  }
}
.snow:nth-child(28) {
  opacity: 0.0333;
  transform: translate(78.6454vw, -10px) scale(0.6259);
  animation: fall-28 17s -15s linear infinite;
}
@keyframes fall-28 {
  46.627% {
    transform: translate(69.3178vw, 46.627vh) scale(0.6259);
  }
  to {
    transform: translate(73.9816vw, 100vh) scale(0.6259);
  }
}
.snow:nth-child(29) {
  opacity: 0.7184;
  transform: translate(79.3116vw, -10px) scale(0.0982);
  animation: fall-29 29s -5s linear infinite;
}
@keyframes fall-29 {
  30.43% {
    transform: translate(71.9081vw, 30.43vh) scale(0.0982);
  }
  to {
    transform: translate(75.60985vw, 100vh) scale(0.0982);
  }
}
.snow:nth-child(30) {
  opacity: 0.4602;
  transform: translate(94.6108vw, -10px) scale(0.2151);
  animation: fall-30 12s -16s linear infinite;
}
@keyframes fall-30 {
  42.543% {
    transform: translate(92.6243vw, 42.543vh) scale(0.2151);
  }
  to {
    transform: translate(93.61755vw, 100vh) scale(0.2151);
  }
}
.snow:nth-child(31) {
  opacity: 0.4871;
  transform: translate(24.647vw, -10px) scale(0.9506);
  animation: fall-31 23s -9s linear infinite;
}
@keyframes fall-31 {
  31.992% {
    transform: translate(18.2011vw, 31.992vh) scale(0.9506);
  }
  to {
    transform: translate(21.42405vw, 100vh) scale(0.9506);
  }
}
.snow:nth-child(32) {
  opacity: 0.5404;
  transform: translate(60.2194vw, -10px) scale(0.067);
  animation: fall-32 17s -29s linear infinite;
}
@keyframes fall-32 {
  54.764% {
    transform: translate(59.892vw, 54.764vh) scale(0.067);
  }
  to {
    transform: translate(60.0557vw, 100vh) scale(0.067);
  }
}
.snow:nth-child(33) {
  opacity: 0.3697;
  transform: translate(58.7423vw, -10px) scale(0.3027);
  animation: fall-33 10s -12s linear infinite;
}
@keyframes fall-33 {
  72.017% {
    transform: translate(67.2445vw, 72.017vh) scale(0.3027);
  }
  to {
    transform: translate(62.9934vw, 100vh) scale(0.3027);
  }
}
.snow:nth-child(34) {
  opacity: 0.4386;
  transform: translate(15.4067vw, -10px) scale(0.2923);
  animation: fall-34 23s -6s linear infinite;
}
@keyframes fall-34 {
  32.625% {
    transform: translate(18.5365vw, 32.625vh) scale(0.2923);
  }
  to {
    transform: translate(16.9716vw, 100vh) scale(0.2923);
  }
}
.snow:nth-child(35) {
  opacity: 0.7291;
  transform: translate(15.8097vw, -10px) scale(0.9311);
  animation: fall-35 29s -9s linear infinite;
}
@keyframes fall-35 {
  58.648% {
    transform: translate(12.622vw, 58.648vh) scale(0.9311);
  }
  to {
    transform: translate(14.21585vw, 100vh) scale(0.9311);
  }
}
.snow:nth-child(36) {
  opacity: 0.7009;
  transform: translate(41.429vw, -10px) scale(0.7288);
  animation: fall-36 28s -4s linear infinite;
}
@keyframes fall-36 {
  74.62% {
    transform: translate(42.0594vw, 74.62vh) scale(0.7288);
  }
  to {
    transform: translate(41.7442vw, 100vh) scale(0.7288);
  }
}
.snow:nth-child(37) {
  opacity: 0.6958;
  transform: translate(46.4768vw, -10px) scale(0.8383);
  animation: fall-37 21s -24s linear infinite;
}
@keyframes fall-37 {
  31.681% {
    transform: translate(47.1796vw, 31.681vh) scale(0.8383);
  }
  to {
    transform: translate(46.8282vw, 100vh) scale(0.8383);
  }
}
.snow:nth-child(38) {
  opacity: 0.3247;
  transform: translate(17.0408vw, -10px) scale(0.6197);
  animation: fall-38 28s -9s linear infinite;
}
@keyframes fall-38 {
  46.715% {
    transform: translate(21.1112vw, 46.715vh) scale(0.6197);
  }
  to {
    transform: translate(19.076vw, 100vh) scale(0.6197);
  }
}
.snow:nth-child(39) {
  opacity: 0.5579;
  transform: translate(11.9167vw, -10px) scale(0.4166);
  animation: fall-39 24s -23s linear infinite;
}
@keyframes fall-39 {
  37.517% {
    transform: translate(14.5163vw, 37.517vh) scale(0.4166);
  }
  to {
    transform: translate(13.2165vw, 100vh) scale(0.4166);
  }
}
.snow:nth-child(40) {
  opacity: 0.4404;
  transform: translate(83.6005vw, -10px) scale(0.0999);
  animation: fall-40 30s -26s linear infinite;
}
@keyframes fall-40 {
  30.262% {
    transform: translate(86.9936vw, 30.262vh) scale(0.0999);
  }
  to {
    transform: translate(85.29705vw, 100vh) scale(0.0999);
  }
}
.snow:nth-child(41) {
  opacity: 0.2586;
  transform: translate(60.0355vw, -10px) scale(0.8866);
  animation: fall-41 28s -9s linear infinite;
}
@keyframes fall-41 {
  39.422% {
    transform: translate(67.3961vw, 39.422vh) scale(0.8866);
  }
  to {
    transform: translate(63.7158vw, 100vh) scale(0.8866);
  }
}
.snow:nth-child(42) {
  opacity: 0.9174;
  transform: translate(57.493vw, -10px) scale(0.0278);
  animation: fall-42 23s -2s linear infinite;
}
@keyframes fall-42 {
  75.028% {
    transform: translate(51.4311vw, 75.028vh) scale(0.0278);
  }
  to {
    transform: translate(54.46205vw, 100vh) scale(0.0278);
  }
}
.snow:nth-child(43) {
  opacity: 0.8084;
  transform: translate(16.4773vw, -10px) scale(0.915);
  animation: fall-43 28s -2s linear infinite;
}
@keyframes fall-43 {
  70.271% {
    transform: translate(23.6369vw, 70.271vh) scale(0.915);
  }
  to {
    transform: translate(20.0571vw, 100vh) scale(0.915);
  }
}
.snow:nth-child(44) {
  opacity: 0.6898;
  transform: translate(46.722vw, -10px) scale(0.9943);
  animation: fall-44 13s -22s linear infinite;
}
@keyframes fall-44 {
  36.361% {
    transform: translate(51.9421vw, 36.361vh) scale(0.9943);
  }
  to {
    transform: translate(49.33205vw, 100vh) scale(0.9943);
  }
}
.snow:nth-child(45) {
  opacity: 0.9538;
  transform: translate(41.8848vw, -10px) scale(0.1093);
  animation: fall-45 15s -18s linear infinite;
}
@keyframes fall-45 {
  52.053% {
    transform: translate(44.1069vw, 52.053vh) scale(0.1093);
  }
  to {
    transform: translate(42.99585vw, 100vh) scale(0.1093);
  }
}
.snow:nth-child(46) {
  opacity: 0.9132;
  transform: translate(21.0519vw, -10px) scale(0.5073);
  animation: fall-46 17s -18s linear infinite;
}
@keyframes fall-46 {
  38.168% {
    transform: translate(23.9371vw, 38.168vh) scale(0.5073);
  }
  to {
    transform: translate(22.4945vw, 100vh) scale(0.5073);
  }
}
.snow:nth-child(47) {
  opacity: 0.6612;
  transform: translate(57.7284vw, -10px) scale(0.8564);
  animation: fall-47 13s -14s linear infinite;
}
@keyframes fall-47 {
  45.866% {
    transform: translate(66.4639vw, 45.866vh) scale(0.8564);
  }
  to {
    transform: translate(62.09615vw, 100vh) scale(0.8564);
  }
}
.snow:nth-child(48) {
  opacity: 0.0578;
  transform: translate(85.8056vw, -10px) scale(0.7179);
  animation: fall-48 21s -24s linear infinite;
}
@keyframes fall-48 {
  61.091% {
    transform: translate(77.4542vw, 61.091vh) scale(0.7179);
  }
  to {
    transform: translate(81.6299vw, 100vh) scale(0.7179);
  }
}
.snow:nth-child(49) {
  opacity: 0.6445;
  transform: translate(73.4766vw, -10px) scale(0.4269);
  animation: fall-49 22s -21s linear infinite;
}
@keyframes fall-49 {
  59.642% {
    transform: translate(77.2845vw, 59.642vh) scale(0.4269);
  }
  to {
    transform: translate(75.38055vw, 100vh) scale(0.4269);
  }
}
.snow:nth-child(50) {
  opacity: 0.9698;
  transform: translate(70.8666vw, -10px) scale(0.0782);
  animation: fall-50 30s -28s linear infinite;
}
@keyframes fall-50 {
  74.986% {
    transform: translate(62.7393vw, 74.986vh) scale(0.0782);
  }
  to {
    transform: translate(66.80295vw, 100vh) scale(0.0782);
  }
}
.snow:nth-child(51) {
  opacity: 0.06;
  transform: translate(88.4944vw, -10px) scale(0.9958);
  animation: fall-51 18s -21s linear infinite;
}
@keyframes fall-51 {
  77.073% {
    transform: translate(92.7175vw, 77.073vh) scale(0.9958);
  }
  to {
    transform: translate(90.60595vw, 100vh) scale(0.9958);
  }
}
.snow:nth-child(52) {
  opacity: 0.6021;
  transform: translate(14.9087vw, -10px) scale(0.8598);
  animation: fall-52 24s -4s linear infinite;
}
@keyframes fall-52 {
  36.2% {
    transform: translate(5.3596vw, 36.2vh) scale(0.8598);
  }
  to {
    transform: translate(10.13415vw, 100vh) scale(0.8598);
  }
}
.snow:nth-child(53) {
  opacity: 0.8321;
  transform: translate(60.9255vw, -10px) scale(0.708);
  animation: fall-53 13s -15s linear infinite;
}
@keyframes fall-53 {
  51.711% {
    transform: translate(67.5391vw, 51.711vh) scale(0.708);
  }
  to {
    transform: translate(64.2323vw, 100vh) scale(0.708);
  }
}
.snow:nth-child(54) {
  opacity: 0.8691;
  transform: translate(57.5614vw, -10px) scale(0.2771);
  animation: fall-54 14s -4s linear infinite;
}
@keyframes fall-54 {
  52.223% {
    transform: translate(62.1096vw, 52.223vh) scale(0.2771);
  }
  to {
    transform: translate(59.8355vw, 100vh) scale(0.2771);
  }
}
.snow:nth-child(55) {
  opacity: 0.0836;
  transform: translate(37.7853vw, -10px) scale(0.7812);
  animation: fall-55 14s -28s linear infinite;
}
@keyframes fall-55 {
  38.56% {
    transform: translate(37.8437vw, 38.56vh) scale(0.7812);
  }
  to {
    transform: translate(37.8145vw, 100vh) scale(0.7812);
  }
}
.snow:nth-child(56) {
  opacity: 0.7792;
  transform: translate(64.8286vw, -10px) scale(0.9367);
  animation: fall-56 30s -7s linear infinite;
}
@keyframes fall-56 {
  33.08% {
    transform: translate(71.1256vw, 33.08vh) scale(0.9367);
  }
  to {
    transform: translate(67.9771vw, 100vh) scale(0.9367);
  }
}
.snow:nth-child(57) {
  opacity: 0.5306;
  transform: translate(60.8688vw, -10px) scale(0.549);
  animation: fall-57 18s -4s linear infinite;
}
@keyframes fall-57 {
  52.923% {
    transform: translate(51.9127vw, 52.923vh) scale(0.549);
  }
  to {
    transform: translate(56.39075vw, 100vh) scale(0.549);
  }
}
.snow:nth-child(58) {
  opacity: 0.7467;
  transform: translate(85.919vw, -10px) scale(0.9851);
  animation: fall-58 18s -7s linear infinite;
}
@keyframes fall-58 {
  72.896% {
    transform: translate(86.7694vw, 72.896vh) scale(0.9851);
  }
  to {
    transform: translate(86.3442vw, 100vh) scale(0.9851);
  }
}
.snow:nth-child(59) {
  opacity: 0.0297;
  transform: translate(7.9921vw, -10px) scale(0.0016);
  animation: fall-59 26s -18s linear infinite;
}
@keyframes fall-59 {
  66.149% {
    transform: translate(10.2203vw, 66.149vh) scale(0.0016);
  }
  to {
    transform: translate(9.1062vw, 100vh) scale(0.0016);
  }
}
.snow:nth-child(60) {
  opacity: 0.8009;
  transform: translate(70.1215vw, -10px) scale(0.6146);
  animation: fall-60 19s -11s linear infinite;
}
@keyframes fall-60 {
  72.287% {
    transform: translate(72.5318vw, 72.287vh) scale(0.6146);
  }
  to {
    transform: translate(71.32665vw, 100vh) scale(0.6146);
  }
}
.snow:nth-child(61) {
  opacity: 0.1571;
  transform: translate(90.0523vw, -10px) scale(0.208);
  animation: fall-61 16s -30s linear infinite;
}
@keyframes fall-61 {
  37.476% {
    transform: translate(90.6668vw, 37.476vh) scale(0.208);
  }
  to {
    transform: translate(90.35955vw, 100vh) scale(0.208);
  }
}
.snow:nth-child(62) {
  opacity: 0.8937;
  transform: translate(58.758vw, -10px) scale(0.1182);
  animation: fall-62 17s -16s linear infinite;
}
@keyframes fall-62 {
  49.241% {
    transform: translate(64.8063vw, 49.241vh) scale(0.1182);
  }
  to {
    transform: translate(61.78215vw, 100vh) scale(0.1182);
  }
}
.snow:nth-child(63) {
  opacity: 0.2849;
  transform: translate(48.0079vw, -10px) scale(0.1657);
  animation: fall-63 27s -20s linear infinite;
}
@keyframes fall-63 {
  61.489% {
    transform: translate(43.763vw, 61.489vh) scale(0.1657);
  }
  to {
    transform: translate(45.88545vw, 100vh) scale(0.1657);
  }
}
.snow:nth-child(64) {
  opacity: 0.3255;
  transform: translate(58.7386vw, -10px) scale(0.9581);
  animation: fall-64 14s -9s linear infinite;
}
@keyframes fall-64 {
  73.894% {
    transform: translate(62.2337vw, 73.894vh) scale(0.9581);
  }
  to {
    transform: translate(60.48615vw, 100vh) scale(0.9581);
  }
}
.snow:nth-child(65) {
  opacity: 0.2088;
  transform: translate(77.3344vw, -10px) scale(0.3455);
  animation: fall-65 12s -6s linear infinite;
}
@keyframes fall-65 {
  75.821% {
    transform: translate(69.0597vw, 75.821vh) scale(0.3455);
  }
  to {
    transform: translate(73.19705vw, 100vh) scale(0.3455);
  }
}
.snow:nth-child(66) {
  opacity: 0.2048;
  transform: translate(67.7817vw, -10px) scale(0.7701);
  animation: fall-66 28s -18s linear infinite;
}
@keyframes fall-66 {
  78.334% {
    transform: translate(65.892vw, 78.334vh) scale(0.7701);
  }
  to {
    transform: translate(66.83685vw, 100vh) scale(0.7701);
  }
}
.snow:nth-child(67) {
  opacity: 0.8956;
  transform: translate(19.232vw, -10px) scale(0.6366);
  animation: fall-67 12s -25s linear infinite;
}
@keyframes fall-67 {
  52.251% {
    transform: translate(29.1962vw, 52.251vh) scale(0.6366);
  }
  to {
    transform: translate(24.2141vw, 100vh) scale(0.6366);
  }
}
.snow:nth-child(68) {
  opacity: 0.9214;
  transform: translate(3.6818vw, -10px) scale(0.5407);
  animation: fall-68 10s -15s linear infinite;
}
@keyframes fall-68 {
  66.925% {
    transform: translate(-1.6507vw, 66.925vh) scale(0.5407);
  }
  to {
    transform: translate(1.01555vw, 100vh) scale(0.5407);
  }
}
.snow:nth-child(69) {
  opacity: 0.6721;
  transform: translate(19.0945vw, -10px) scale(0.2917);
  animation: fall-69 20s -4s linear infinite;
}
@keyframes fall-69 {
  75.945% {
    transform: translate(15.1028vw, 75.945vh) scale(0.2917);
  }
  to {
    transform: translate(17.09865vw, 100vh) scale(0.2917);
  }
}
.snow:nth-child(70) {
  opacity: 0.678;
  transform: translate(75.3671vw, -10px) scale(0.5538);
  animation: fall-70 29s -11s linear infinite;
}
@keyframes fall-70 {
  71.465% {
    transform: translate(76.6199vw, 71.465vh) scale(0.5538);
  }
  to {
    transform: translate(75.9935vw, 100vh) scale(0.5538);
  }
}
.snow:nth-child(71) {
  opacity: 0.0289;
  transform: translate(86.4242vw, -10px) scale(0.6031);
  animation: fall-71 11s -3s linear infinite;
}
@keyframes fall-71 {
  46.803% {
    transform: translate(89.9067vw, 46.803vh) scale(0.6031);
  }
  to {
    transform: translate(88.16545vw, 100vh) scale(0.6031);
  }
}
.snow:nth-child(72) {
  opacity: 0.806;
  transform: translate(17.2436vw, -10px) scale(0.6498);
  animation: fall-72 14s -13s linear infinite;
}
@keyframes fall-72 {
  51.781% {
    transform: translate(24.0516vw, 51.781vh) scale(0.6498);
  }
  to {
    transform: translate(20.6476vw, 100vh) scale(0.6498);
  }
}
.snow:nth-child(73) {
  opacity: 0.453;
  transform: translate(28.1806vw, -10px) scale(0.3716);
  animation: fall-73 11s -9s linear infinite;
}
@keyframes fall-73 {
  77.615% {
    transform: translate(24.0625vw, 77.615vh) scale(0.3716);
  }
  to {
    transform: translate(26.12155vw, 100vh) scale(0.3716);
  }
}
.snow:nth-child(74) {
  opacity: 0.4714;
  transform: translate(19.8327vw, -10px) scale(0.8254);
  animation: fall-74 14s -20s linear infinite;
}
@keyframes fall-74 {
  67.429% {
    transform: translate(11.5155vw, 67.429vh) scale(0.8254);
  }
  to {
    transform: translate(15.6741vw, 100vh) scale(0.8254);
  }
}
.snow:nth-child(75) {
  opacity: 0.6066;
  transform: translate(78.0061vw, -10px) scale(0.8104);
  animation: fall-75 13s -5s linear infinite;
}
@keyframes fall-75 {
  73.171% {
    transform: translate(71.6468vw, 73.171vh) scale(0.8104);
  }
  to {
    transform: translate(74.82645vw, 100vh) scale(0.8104);
  }
}
.snow:nth-child(76) {
  opacity: 0.5473;
  transform: translate(20.0814vw, -10px) scale(0.0693);
  animation: fall-76 10s -22s linear infinite;
}
@keyframes fall-76 {
  34.632% {
    transform: translate(27.3216vw, 34.632vh) scale(0.0693);
  }
  to {
    transform: translate(23.7015vw, 100vh) scale(0.0693);
  }
}
.snow:nth-child(77) {
  opacity: 0.997;
  transform: translate(19.9024vw, -10px) scale(0.0739);
  animation: fall-77 28s -28s linear infinite;
}
@keyframes fall-77 {
  51.205% {
    transform: translate(27.6614vw, 51.205vh) scale(0.0739);
  }
  to {
    transform: translate(23.7819vw, 100vh) scale(0.0739);
  }
}
.snow:nth-child(78) {
  opacity: 0.0237;
  transform: translate(54.5582vw, -10px) scale(0.5019);
  animation: fall-78 12s -3s linear infinite;
}
@keyframes fall-78 {
  66.506% {
    transform: translate(63.0197vw, 66.506vh) scale(0.5019);
  }
  to {
    transform: translate(58.78895vw, 100vh) scale(0.5019);
  }
}
.snow:nth-child(79) {
  opacity: 0.7655;
  transform: translate(50.1266vw, -10px) scale(0.802);
  animation: fall-79 11s -24s linear infinite;
}
@keyframes fall-79 {
  40.645% {
    transform: translate(46.1446vw, 40.645vh) scale(0.802);
  }
  to {
    transform: translate(48.1356vw, 100vh) scale(0.802);
  }
}
.snow:nth-child(80) {
  opacity: 0.9972;
  transform: translate(83.9368vw, -10px) scale(0.8754);
  animation: fall-80 25s -21s linear infinite;
}
@keyframes fall-80 {
  49.06% {
    transform: translate(84.6799vw, 49.06vh) scale(0.8754);
  }
  to {
    transform: translate(84.30835vw, 100vh) scale(0.8754);
  }
}
.snow:nth-child(81) {
  opacity: 0.3495;
  transform: translate(64.7944vw, -10px) scale(0.4076);
  animation: fall-81 13s -20s linear infinite;
}
@keyframes fall-81 {
  49.641% {
    transform: translate(73.5517vw, 49.641vh) scale(0.4076);
  }
  to {
    transform: translate(69.17305vw, 100vh) scale(0.4076);
  }
}
.snow:nth-child(82) {
  opacity: 0.7036;
  transform: translate(0.8586vw, -10px) scale(0.2818);
  animation: fall-82 26s -30s linear infinite;
}
@keyframes fall-82 {
  35.271% {
    transform: translate(-4.069vw, 35.271vh) scale(0.2818);
  }
  to {
    transform: translate(-1.6052vw, 100vh) scale(0.2818);
  }
}
.snow:nth-child(83) {
  opacity: 0.3269;
  transform: translate(39.9609vw, -10px) scale(0.9504);
  animation: fall-83 16s -6s linear infinite;
}
@keyframes fall-83 {
  69.12% {
    transform: translate(46.7543vw, 69.12vh) scale(0.9504);
  }
  to {
    transform: translate(43.3576vw, 100vh) scale(0.9504);
  }
}
.snow:nth-child(84) {
  opacity: 0.0239;
  transform: translate(3.3527vw, -10px) scale(0.8446);
  animation: fall-84 27s -9s linear infinite;
}
@keyframes fall-84 {
  42.275% {
    transform: translate(12.9087vw, 42.275vh) scale(0.8446);
  }
  to {
    transform: translate(8.1307vw, 100vh) scale(0.8446);
  }
}
.snow:nth-child(85) {
  opacity: 0.9979;
  transform: translate(45.3264vw, -10px) scale(0.1945);
  animation: fall-85 27s -29s linear infinite;
}
@keyframes fall-85 {
  34.884% {
    transform: translate(44.7952vw, 34.884vh) scale(0.1945);
  }
  to {
    transform: translate(45.0608vw, 100vh) scale(0.1945);
  }
}
.snow:nth-child(86) {
  opacity: 0.861;
  transform: translate(44.1015vw, -10px) scale(0.2943);
  animation: fall-86 26s -10s linear infinite;
}
@keyframes fall-86 {
  37.011% {
    transform: translate(47.4299vw, 37.011vh) scale(0.2943);
  }
  to {
    transform: translate(45.7657vw, 100vh) scale(0.2943);
  }
}
.snow:nth-child(87) {
  opacity: 0.1229;
  transform: translate(12.8788vw, -10px) scale(0.094);
  animation: fall-87 12s -20s linear infinite;
}
@keyframes fall-87 {
  63.011% {
    transform: translate(17.8005vw, 63.011vh) scale(0.094);
  }
  to {
    transform: translate(15.33965vw, 100vh) scale(0.094);
  }
}
.snow:nth-child(88) {
  opacity: 0.7513;
  transform: translate(99.8954vw, -10px) scale(0.5235);
  animation: fall-88 18s -9s linear infinite;
}
@keyframes fall-88 {
  35.178% {
    transform: translate(95.1533vw, 35.178vh) scale(0.5235);
  }
  to {
    transform: translate(97.52435vw, 100vh) scale(0.5235);
  }
}
.snow:nth-child(89) {
  opacity: 0.3268;
  transform: translate(68.1118vw, -10px) scale(0.4369);
  animation: fall-89 10s -29s linear infinite;
}
@keyframes fall-89 {
  38.934% {
    transform: translate(72.3624vw, 38.934vh) scale(0.4369);
  }
  to {
    transform: translate(70.2371vw, 100vh) scale(0.4369);
  }
}
.snow:nth-child(90) {
  opacity: 0.0521;
  transform: translate(92.7731vw, -10px) scale(0.6117);
  animation: fall-90 20s -19s linear infinite;
}
@keyframes fall-90 {
  33.898% {
    transform: translate(87.1178vw, 33.898vh) scale(0.6117);
  }
  to {
    transform: translate(89.94545vw, 100vh) scale(0.6117);
  }
}
.snow:nth-child(91) {
  opacity: 0.1295;
  transform: translate(81.6174vw, -10px) scale(0.5463);
  animation: fall-91 23s -6s linear infinite;
}
@keyframes fall-91 {
  79.284% {
    transform: translate(79.396vw, 79.284vh) scale(0.5463);
  }
  to {
    transform: translate(80.5067vw, 100vh) scale(0.5463);
  }
}
.snow:nth-child(92) {
  opacity: 0.4797;
  transform: translate(24.3032vw, -10px) scale(0.2747);
  animation: fall-92 27s -4s linear infinite;
}
@keyframes fall-92 {
  31.382% {
    transform: translate(29.1859vw, 31.382vh) scale(0.2747);
  }
  to {
    transform: translate(26.74455vw, 100vh) scale(0.2747);
  }
}
.snow:nth-child(93) {
  opacity: 0.4824;
  transform: translate(12.5307vw, -10px) scale(0.2293);
  animation: fall-93 23s -17s linear infinite;
}
@keyframes fall-93 {
  72.847% {
    transform: translate(3.925vw, 72.847vh) scale(0.2293);
  }
  to {
    transform: translate(8.22785vw, 100vh) scale(0.2293);
  }
}
.snow:nth-child(94) {
  opacity: 0.694;
  transform: translate(91.8594vw, -10px) scale(0.2541);
  animation: fall-94 29s -16s linear infinite;
}
@keyframes fall-94 {
  32.507% {
    transform: translate(85.106vw, 32.507vh) scale(0.2541);
  }
  to {
    transform: translate(88.4827vw, 100vh) scale(0.2541);
  }
}
.snow:nth-child(95) {
  opacity: 0.8783;
  transform: translate(98.1338vw, -10px) scale(0.574);
  animation: fall-95 27s -5s linear infinite;
}
@keyframes fall-95 {
  38.682% {
    transform: translate(107.1345vw, 38.682vh) scale(0.574);
  }
  to {
    transform: translate(102.63415vw, 100vh) scale(0.574);
  }
}
.snow:nth-child(96) {
  opacity: 0.8912;
  transform: translate(38.5407vw, -10px) scale(0.9009);
  animation: fall-96 10s -3s linear infinite;
}
@keyframes fall-96 {
  79.167% {
    transform: translate(48.486vw, 79.167vh) scale(0.9009);
  }
  to {
    transform: translate(43.51335vw, 100vh) scale(0.9009);
  }
}
.snow:nth-child(97) {
  opacity: 0.1295;
  transform: translate(4.7566vw, -10px) scale(0.4658);
  animation: fall-97 24s -13s linear infinite;
}
@keyframes fall-97 {
  62.886% {
    transform: translate(5.5213vw, 62.886vh) scale(0.4658);
  }
  to {
    transform: translate(5.13895vw, 100vh) scale(0.4658);
  }
}
.snow:nth-child(98) {
  opacity: 0.7785;
  transform: translate(28.5963vw, -10px) scale(0.6732);
  animation: fall-98 15s -10s linear infinite;
}
@keyframes fall-98 {
  53.63% {
    transform: translate(20.1108vw, 53.63vh) scale(0.6732);
  }
  to {
    transform: translate(24.35355vw, 100vh) scale(0.6732);
  }
}
.snow:nth-child(99) {
  opacity: 0.4126;
  transform: translate(97.3418vw, -10px) scale(0.1317);
  animation: fall-99 26s -11s linear infinite;
}
@keyframes fall-99 {
  62.326% {
    transform: translate(90.452vw, 62.326vh) scale(0.1317);
  }
  to {
    transform: translate(93.8969vw, 100vh) scale(0.1317);
  }
}
.snow:nth-child(100) {
  opacity: 0.0876;
  transform: translate(35.4836vw, -10px) scale(0.5517);
  animation: fall-100 19s -2s linear infinite;
}
@keyframes fall-100 {
  41.218% {
    transform: translate(41.0331vw, 41.218vh) scale(0.5517);
  }
  to {
    transform: translate(38.25835vw, 100vh) scale(0.5517);
  }
}
.snow:nth-child(101) {
  opacity: 0.8916;
  transform: translate(72.1706vw, -10px) scale(0.1472);
  animation: fall-101 15s -11s linear infinite;
}
@keyframes fall-101 {
  66.402% {
    transform: translate(77.0019vw, 66.402vh) scale(0.1472);
  }
  to {
    transform: translate(74.58625vw, 100vh) scale(0.1472);
  }
}
.snow:nth-child(102) {
  opacity: 0.4789;
  transform: translate(49.8361vw, -10px) scale(0.8538);
  animation: fall-102 27s -3s linear infinite;
}
@keyframes fall-102 {
  79.645% {
    transform: translate(44.2793vw, 79.645vh) scale(0.8538);
  }
  to {
    transform: translate(47.0577vw, 100vh) scale(0.8538);
  }
}
.snow:nth-child(103) {
  opacity: 0.7424;
  transform: translate(80.3805vw, -10px) scale(0.7868);
  animation: fall-103 22s -8s linear infinite;
}
@keyframes fall-103 {
  50.853% {
    transform: translate(77.45vw, 50.853vh) scale(0.7868);
  }
  to {
    transform: translate(78.91525vw, 100vh) scale(0.7868);
  }
}
.snow:nth-child(104) {
  opacity: 0.3648;
  transform: translate(13.9707vw, -10px) scale(0.3432);
  animation: fall-104 14s -20s linear infinite;
}
@keyframes fall-104 {
  69.601% {
    transform: translate(16.4935vw, 69.601vh) scale(0.3432);
  }
  to {
    transform: translate(15.2321vw, 100vh) scale(0.3432);
  }
}
.snow:nth-child(105) {
  opacity: 0.7447;
  transform: translate(42.7812vw, -10px) scale(0.4736);
  animation: fall-105 11s -30s linear infinite;
}
@keyframes fall-105 {
  37.027% {
    transform: translate(44.2126vw, 37.027vh) scale(0.4736);
  }
  to {
    transform: translate(43.4969vw, 100vh) scale(0.4736);
  }
}
.snow:nth-child(106) {
  opacity: 0.6099;
  transform: translate(92.8787vw, -10px) scale(0.0595);
  animation: fall-106 18s -9s linear infinite;
}
@keyframes fall-106 {
  43.792% {
    transform: translate(92.4867vw, 43.792vh) scale(0.0595);
  }
  to {
    transform: translate(92.6827vw, 100vh) scale(0.0595);
  }
}
.snow:nth-child(107) {
  opacity: 0.2422;
  transform: translate(3.8608vw, -10px) scale(0.285);
  animation: fall-107 14s -23s linear infinite;
}
@keyframes fall-107 {
  46.084% {
    transform: translate(-0.1298vw, 46.084vh) scale(0.285);
  }
  to {
    transform: translate(1.8655vw, 100vh) scale(0.285);
  }
}
.snow:nth-child(108) {
  opacity: 0.2899;
  transform: translate(19.4342vw, -10px) scale(0.7109);
  animation: fall-108 11s -27s linear infinite;
}
@keyframes fall-108 {
  71.837% {
    transform: translate(16.7649vw, 71.837vh) scale(0.7109);
  }
  to {
    transform: translate(18.09955vw, 100vh) scale(0.7109);
  }
}
.snow:nth-child(109) {
  opacity: 0.5311;
  transform: translate(27.5685vw, -10px) scale(0.5058);
  animation: fall-109 16s -3s linear infinite;
}
@keyframes fall-109 {
  35.558% {
    transform: translate(35.2077vw, 35.558vh) scale(0.5058);
  }
  to {
    transform: translate(31.3881vw, 100vh) scale(0.5058);
  }
}
.snow:nth-child(110) {
  opacity: 0.2859;
  transform: translate(98.1681vw, -10px) scale(0.9025);
  animation: fall-110 11s -9s linear infinite;
}
@keyframes fall-110 {
  53.362% {
    transform: translate(104.9353vw, 53.362vh) scale(0.9025);
  }
  to {
    transform: translate(101.5517vw, 100vh) scale(0.9025);
  }
}
.snow:nth-child(111) {
  opacity: 0.9309;
  transform: translate(47.0781vw, -10px) scale(0.0615);
  animation: fall-111 15s -17s linear infinite;
}
@keyframes fall-111 {
  59.402% {
    transform: translate(37.427vw, 59.402vh) scale(0.0615);
  }
  to {
    transform: translate(42.25255vw, 100vh) scale(0.0615);
  }
}
.snow:nth-child(112) {
  opacity: 0.674;
  transform: translate(50.1457vw, -10px) scale(0.2518);
  animation: fall-112 11s -10s linear infinite;
}
@keyframes fall-112 {
  51.807% {
    transform: translate(46.0127vw, 51.807vh) scale(0.2518);
  }
  to {
    transform: translate(48.0792vw, 100vh) scale(0.2518);
  }
}
.snow:nth-child(113) {
  opacity: 0.669;
  transform: translate(12.1327vw, -10px) scale(0.2419);
  animation: fall-113 28s -2s linear infinite;
}
@keyframes fall-113 {
  52.149% {
    transform: translate(18.3343vw, 52.149vh) scale(0.2419);
  }
  to {
    transform: translate(15.2335vw, 100vh) scale(0.2419);
  }
}
.snow:nth-child(114) {
  opacity: 0.4938;
  transform: translate(73.5831vw, -10px) scale(0.1831);
  animation: fall-114 21s -6s linear infinite;
}
@keyframes fall-114 {
  53.974% {
    transform: translate(81.3779vw, 53.974vh) scale(0.1831);
  }
  to {
    transform: translate(77.4805vw, 100vh) scale(0.1831);
  }
}
.snow:nth-child(115) {
  opacity: 0.449;
  transform: translate(99.9013vw, -10px) scale(0.7139);
  animation: fall-115 26s -13s linear infinite;
}
@keyframes fall-115 {
  76.149% {
    transform: translate(106.0601vw, 76.149vh) scale(0.7139);
  }
  to {
    transform: translate(102.9807vw, 100vh) scale(0.7139);
  }
}
.snow:nth-child(116) {
  opacity: 0.0443;
  transform: translate(91.0756vw, -10px) scale(0.3675);
  animation: fall-116 16s -30s linear infinite;
}
@keyframes fall-116 {
  73.985% {
    transform: translate(87.3856vw, 73.985vh) scale(0.3675);
  }
  to {
    transform: translate(89.2306vw, 100vh) scale(0.3675);
  }
}
.snow:nth-child(117) {
  opacity: 0.1325;
  transform: translate(87.4432vw, -10px) scale(0.792);
  animation: fall-117 21s -4s linear infinite;
}
@keyframes fall-117 {
  38.67% {
    transform: translate(81.2423vw, 38.67vh) scale(0.792);
  }
  to {
    transform: translate(84.34275vw, 100vh) scale(0.792);
  }
}
.snow:nth-child(118) {
  opacity: 0.3221;
  transform: translate(10.9175vw, -10px) scale(0.2897);
  animation: fall-118 24s -21s linear infinite;
}
@keyframes fall-118 {
  48.207% {
    transform: translate(15.0602vw, 48.207vh) scale(0.2897);
  }
  to {
    transform: translate(12.98885vw, 100vh) scale(0.2897);
  }
}
.snow:nth-child(119) {
  opacity: 0.8173;
  transform: translate(73.5731vw, -10px) scale(0.1368);
  animation: fall-119 30s -18s linear infinite;
}
@keyframes fall-119 {
  32.951% {
    transform: translate(74.6003vw, 32.951vh) scale(0.1368);
  }
  to {
    transform: translate(74.0867vw, 100vh) scale(0.1368);
  }
}
.snow:nth-child(120) {
  opacity: 0.4089;
  transform: translate(65.6656vw, -10px) scale(0.6438);
  animation: fall-120 12s -26s linear infinite;
}
@keyframes fall-120 {
  38.515% {
    transform: translate(68.2117vw, 38.515vh) scale(0.6438);
  }
  to {
    transform: translate(66.93865vw, 100vh) scale(0.6438);
  }
}
.snow:nth-child(121) {
  opacity: 0.9;
  transform: translate(14.5074vw, -10px) scale(0.0936);
  animation: fall-121 24s -9s linear infinite;
}
@keyframes fall-121 {
  34.316% {
    transform: translate(15.013vw, 34.316vh) scale(0.0936);
  }
  to {
    transform: translate(14.7602vw, 100vh) scale(0.0936);
  }
}
.snow:nth-child(122) {
  opacity: 0.434;
  transform: translate(43.363vw, -10px) scale(0.845);
  animation: fall-122 27s -3s linear infinite;
}
@keyframes fall-122 {
  64.311% {
    transform: translate(40.353vw, 64.311vh) scale(0.845);
  }
  to {
    transform: translate(41.858vw, 100vh) scale(0.845);
  }
}
.snow:nth-child(123) {
  opacity: 0.1644;
  transform: translate(73.6408vw, -10px) scale(0.1369);
  animation: fall-123 16s -25s linear infinite;
}
@keyframes fall-123 {
  50.023% {
    transform: translate(72.3058vw, 50.023vh) scale(0.1369);
  }
  to {
    transform: translate(72.9733vw, 100vh) scale(0.1369);
  }
}
.snow:nth-child(124) {
  opacity: 0.4443;
  transform: translate(35.7006vw, -10px) scale(0.8444);
  animation: fall-124 20s -11s linear infinite;
}
@keyframes fall-124 {
  65.43% {
    transform: translate(32.4392vw, 65.43vh) scale(0.8444);
  }
  to {
    transform: translate(34.0699vw, 100vh) scale(0.8444);
  }
}
.snow:nth-child(125) {
  opacity: 0.5331;
  transform: translate(41.7658vw, -10px) scale(0.624);
  animation: fall-125 30s -5s linear infinite;
}
@keyframes fall-125 {
  40.817% {
    transform: translate(48.4986vw, 40.817vh) scale(0.624);
  }
  to {
    transform: translate(45.1322vw, 100vh) scale(0.624);
  }
}
.snow:nth-child(126) {
  opacity: 0.0857;
  transform: translate(56.8081vw, -10px) scale(0.6822);
  animation: fall-126 14s -29s linear infinite;
}
@keyframes fall-126 {
  51.439% {
    transform: translate(62.2337vw, 51.439vh) scale(0.6822);
  }
  to {
    transform: translate(59.5209vw, 100vh) scale(0.6822);
  }
}
.snow:nth-child(127) {
  opacity: 0.0693;
  transform: translate(67.3125vw, -10px) scale(0.0774);
  animation: fall-127 20s -24s linear infinite;
}
@keyframes fall-127 {
  68.942% {
    transform: translate(72.8039vw, 68.942vh) scale(0.0774);
  }
  to {
    transform: translate(70.0582vw, 100vh) scale(0.0774);
  }
}
.snow:nth-child(128) {
  opacity: 0.9213;
  transform: translate(59.4916vw, -10px) scale(0.2872);
  animation: fall-128 21s -8s linear infinite;
}
@keyframes fall-128 {
  78.732% {
    transform: translate(65.5501vw, 78.732vh) scale(0.2872);
  }
  to {
    transform: translate(62.52085vw, 100vh) scale(0.2872);
  }
}
.snow:nth-child(129) {
  opacity: 0.588;
  transform: translate(3.3163vw, -10px) scale(0.705);
  animation: fall-129 30s -20s linear infinite;
}
@keyframes fall-129 {
  70.933% {
    transform: translate(5.7916vw, 70.933vh) scale(0.705);
  }
  to {
    transform: translate(4.55395vw, 100vh) scale(0.705);
  }
}
.snow:nth-child(130) {
  opacity: 0.1592;
  transform: translate(51.5157vw, -10px) scale(0.9613);
  animation: fall-130 11s -26s linear infinite;
}
@keyframes fall-130 {
  61.627% {
    transform: translate(50.4154vw, 61.627vh) scale(0.9613);
  }
  to {
    transform: translate(50.96555vw, 100vh) scale(0.9613);
  }
}
.snow:nth-child(131) {
  opacity: 0.1261;
  transform: translate(80.0788vw, -10px) scale(0.2242);
  animation: fall-131 28s -8s linear infinite;
}
@keyframes fall-131 {
  57.571% {
    transform: translate(72.6782vw, 57.571vh) scale(0.2242);
  }
  to {
    transform: translate(76.3785vw, 100vh) scale(0.2242);
  }
}
.snow:nth-child(132) {
  opacity: 0.7327;
  transform: translate(5.0445vw, -10px) scale(0.2631);
  animation: fall-132 13s -15s linear infinite;
}
@keyframes fall-132 {
  60.485% {
    transform: translate(4.5785vw, 60.485vh) scale(0.2631);
  }
  to {
    transform: translate(4.8115vw, 100vh) scale(0.2631);
  }
}
.snow:nth-child(133) {
  opacity: 0.1776;
  transform: translate(27.2927vw, -10px) scale(0.3892);
  animation: fall-133 19s -11s linear infinite;
}
@keyframes fall-133 {
  32.999% {
    transform: translate(17.8924vw, 32.999vh) scale(0.3892);
  }
  to {
    transform: translate(22.59255vw, 100vh) scale(0.3892);
  }
}
.snow:nth-child(134) {
  opacity: 0.7302;
  transform: translate(10.0454vw, -10px) scale(0.986);
  animation: fall-134 16s -18s linear infinite;
}
@keyframes fall-134 {
  66.809% {
    transform: translate(12.7114vw, 66.809vh) scale(0.986);
  }
  to {
    transform: translate(11.3784vw, 100vh) scale(0.986);
  }
}
.snow:nth-child(135) {
  opacity: 0.9454;
  transform: translate(40.9077vw, -10px) scale(0.2337);
  animation: fall-135 11s -1s linear infinite;
}
@keyframes fall-135 {
  44.903% {
    transform: translate(31.6182vw, 44.903vh) scale(0.2337);
  }
  to {
    transform: translate(36.26295vw, 100vh) scale(0.2337);
  }
}
.snow:nth-child(136) {
  opacity: 0.9357;
  transform: translate(59.021vw, -10px) scale(0.8344);
  animation: fall-136 30s -29s linear infinite;
}
@keyframes fall-136 {
  57.167% {
    transform: translate(55.8304vw, 57.167vh) scale(0.8344);
  }
  to {
    transform: translate(57.4257vw, 100vh) scale(0.8344);
  }
}
.snow:nth-child(137) {
  opacity: 0.4656;
  transform: translate(41.1509vw, -10px) scale(0.0272);
  animation: fall-137 29s -13s linear infinite;
}
@keyframes fall-137 {
  41.826% {
    transform: translate(39.4645vw, 41.826vh) scale(0.0272);
  }
  to {
    transform: translate(40.3077vw, 100vh) scale(0.0272);
  }
}
.snow:nth-child(138) {
  opacity: 0.4045;
  transform: translate(7.7224vw, -10px) scale(0.9538);
  animation: fall-138 11s -27s linear infinite;
}
@keyframes fall-138 {
  36.89% {
    transform: translate(-2.2364vw, 36.89vh) scale(0.9538);
  }
  to {
    transform: translate(2.743vw, 100vh) scale(0.9538);
  }
}
.snow:nth-child(139) {
  opacity: 0.6266;
  transform: translate(12.6059vw, -10px) scale(0.3481);
  animation: fall-139 16s -10s linear infinite;
}
@keyframes fall-139 {
  38.55% {
    transform: translate(17.4825vw, 38.55vh) scale(0.3481);
  }
  to {
    transform: translate(15.0442vw, 100vh) scale(0.3481);
  }
}
.snow:nth-child(140) {
  opacity: 0.7724;
  transform: translate(86.4114vw, -10px) scale(0.1688);
  animation: fall-140 27s -12s linear infinite;
}
@keyframes fall-140 {
  31.965% {
    transform: translate(78.2835vw, 31.965vh) scale(0.1688);
  }
  to {
    transform: translate(82.34745vw, 100vh) scale(0.1688);
  }
}
.snow:nth-child(141) {
  opacity: 0.5198;
  transform: translate(48.3221vw, -10px) scale(0.6129);
  animation: fall-141 21s -19s linear infinite;
}
@keyframes fall-141 {
  65.191% {
    transform: translate(55.7371vw, 65.191vh) scale(0.6129);
  }
  to {
    transform: translate(52.0296vw, 100vh) scale(0.6129);
  }
}
.snow:nth-child(142) {
  opacity: 0.3125;
  transform: translate(81.0035vw, -10px) scale(0.4593);
  animation: fall-142 18s -2s linear infinite;
}
@keyframes fall-142 {
  43.08% {
    transform: translate(79.1947vw, 43.08vh) scale(0.4593);
  }
  to {
    transform: translate(80.0991vw, 100vh) scale(0.4593);
  }
}
.snow:nth-child(143) {
  opacity: 0.3671;
  transform: translate(74.8155vw, -10px) scale(0.8851);
  animation: fall-143 20s -24s linear infinite;
}
@keyframes fall-143 {
  30.03% {
    transform: translate(69.3803vw, 30.03vh) scale(0.8851);
  }
  to {
    transform: translate(72.0979vw, 100vh) scale(0.8851);
  }
}
.snow:nth-child(144) {
  opacity: 0.4748;
  transform: translate(0.3928vw, -10px) scale(0.456);
  animation: fall-144 17s -20s linear infinite;
}
@keyframes fall-144 {
  30.632% {
    transform: translate(3.3155vw, 30.632vh) scale(0.456);
  }
  to {
    transform: translate(1.85415vw, 100vh) scale(0.456);
  }
}
.snow:nth-child(145) {
  opacity: 0.4655;
  transform: translate(50.9268vw, -10px) scale(0.3104);
  animation: fall-145 28s -4s linear infinite;
}
@keyframes fall-145 {
  66.738% {
    transform: translate(44.0619vw, 66.738vh) scale(0.3104);
  }
  to {
    transform: translate(47.49435vw, 100vh) scale(0.3104);
  }
}
.snow:nth-child(146) {
  opacity: 0.5901;
  transform: translate(99.7724vw, -10px) scale(0.9604);
  animation: fall-146 23s -15s linear infinite;
}
@keyframes fall-146 {
  76.892% {
    transform: translate(93.5347vw, 76.892vh) scale(0.9604);
  }
  to {
    transform: translate(96.65355vw, 100vh) scale(0.9604);
  }
}
.snow:nth-child(147) {
  opacity: 0.5641;
  transform: translate(28.1235vw, -10px) scale(0.0947);
  animation: fall-147 28s -20s linear infinite;
}
@keyframes fall-147 {
  55.362% {
    transform: translate(21.8015vw, 55.362vh) scale(0.0947);
  }
  to {
    transform: translate(24.9625vw, 100vh) scale(0.0947);
  }
}
.snow:nth-child(148) {
  opacity: 0.0127;
  transform: translate(90.9146vw, -10px) scale(0.4651);
  animation: fall-148 24s -16s linear infinite;
}
@keyframes fall-148 {
  48.624% {
    transform: translate(88.3113vw, 48.624vh) scale(0.4651);
  }
  to {
    transform: translate(89.61295vw, 100vh) scale(0.4651);
  }
}
.snow:nth-child(149) {
  opacity: 0.1521;
  transform: translate(47.8756vw, -10px) scale(0.9164);
  animation: fall-149 28s -4s linear infinite;
}
@keyframes fall-149 {
  36.74% {
    transform: translate(53.767vw, 36.74vh) scale(0.9164);
  }
  to {
    transform: translate(50.8213vw, 100vh) scale(0.9164);
  }
}
.snow:nth-child(150) {
  opacity: 0.1167;
  transform: translate(95.2043vw, -10px) scale(0.3178);
  animation: fall-150 19s -28s linear infinite;
}
@keyframes fall-150 {
  35.676% {
    transform: translate(93.0977vw, 35.676vh) scale(0.3178);
  }
  to {
    transform: translate(94.151vw, 100vh) scale(0.3178);
  }
}
.snow:nth-child(151) {
  opacity: 0.4983;
  transform: translate(74.5997vw, -10px) scale(0.1045);
  animation: fall-151 10s -20s linear infinite;
}
@keyframes fall-151 {
  75.494% {
    transform: translate(68.5677vw, 75.494vh) scale(0.1045);
  }
  to {
    transform: translate(71.5837vw, 100vh) scale(0.1045);
  }
}
.snow:nth-child(152) {
  opacity: 0.9658;
  transform: translate(95.8985vw, -10px) scale(0.0651);
  animation: fall-152 10s -16s linear infinite;
}
@keyframes fall-152 {
  53.998% {
    transform: translate(105.8238vw, 53.998vh) scale(0.0651);
  }
  to {
    transform: translate(100.86115vw, 100vh) scale(0.0651);
  }
}
.snow:nth-child(153) {
  opacity: 0.8311;
  transform: translate(49.2945vw, -10px) scale(0.7625);
  animation: fall-153 15s -4s linear infinite;
}
@keyframes fall-153 {
  59.573% {
    transform: translate(57.3928vw, 59.573vh) scale(0.7625);
  }
  to {
    transform: translate(53.34365vw, 100vh) scale(0.7625);
  }
}
.snow:nth-child(154) {
  opacity: 0.1395;
  transform: translate(18.6491vw, -10px) scale(0.1082);
  animation: fall-154 25s -18s linear infinite;
}
@keyframes fall-154 {
  35.726% {
    transform: translate(16.7992vw, 35.726vh) scale(0.1082);
  }
  to {
    transform: translate(17.72415vw, 100vh) scale(0.1082);
  }
}
.snow:nth-child(155) {
  opacity: 0.3172;
  transform: translate(14.7392vw, -10px) scale(0.5245);
  animation: fall-155 29s -14s linear infinite;
}
@keyframes fall-155 {
  31.24% {
    transform: translate(21.9791vw, 31.24vh) scale(0.5245);
  }
  to {
    transform: translate(18.35915vw, 100vh) scale(0.5245);
  }
}
.snow:nth-child(156) {
  opacity: 0.2096;
  transform: translate(1.3259vw, -10px) scale(0.1144);
  animation: fall-156 25s -12s linear infinite;
}
@keyframes fall-156 {
  36.678% {
    transform: translate(8.9971vw, 36.678vh) scale(0.1144);
  }
  to {
    transform: translate(5.1615vw, 100vh) scale(0.1144);
  }
}
.snow:nth-child(157) {
  opacity: 0.4981;
  transform: translate(0.5385vw, -10px) scale(0.9527);
  animation: fall-157 10s -9s linear infinite;
}
@keyframes fall-157 {
  49.083% {
    transform: translate(0.2042vw, 49.083vh) scale(0.9527);
  }
  to {
    transform: translate(0.37135vw, 100vh) scale(0.9527);
  }
}
.snow:nth-child(158) {
  opacity: 0.8262;
  transform: translate(13.1982vw, -10px) scale(0.5706);
  animation: fall-158 11s -10s linear infinite;
}
@keyframes fall-158 {
  38.003% {
    transform: translate(16.623vw, 38.003vh) scale(0.5706);
  }
  to {
    transform: translate(14.9106vw, 100vh) scale(0.5706);
  }
}
.snow:nth-child(159) {
  opacity: 0.0627;
  transform: translate(53.4063vw, -10px) scale(0.9845);
  animation: fall-159 15s -21s linear infinite;
}
@keyframes fall-159 {
  33.205% {
    transform: translate(50.0254vw, 33.205vh) scale(0.9845);
  }
  to {
    transform: translate(51.71585vw, 100vh) scale(0.9845);
  }
}
.snow:nth-child(160) {
  opacity: 0.3918;
  transform: translate(37.8328vw, -10px) scale(0.2648);
  animation: fall-160 29s -19s linear infinite;
}
@keyframes fall-160 {
  71.401% {
    transform: translate(42.9761vw, 71.401vh) scale(0.2648);
  }
  to {
    transform: translate(40.40445vw, 100vh) scale(0.2648);
  }
}
.snow:nth-child(161) {
  opacity: 0.0491;
  transform: translate(59.3273vw, -10px) scale(0.9449);
  animation: fall-161 19s -5s linear infinite;
}
@keyframes fall-161 {
  34.09% {
    transform: translate(55.0217vw, 34.09vh) scale(0.9449);
  }
  to {
    transform: translate(57.1745vw, 100vh) scale(0.9449);
  }
}
.snow:nth-child(162) {
  opacity: 0.0674;
  transform: translate(52.3948vw, -10px) scale(0.6065);
  animation: fall-162 22s -16s linear infinite;
}
@keyframes fall-162 {
  74.014% {
    transform: translate(59.6392vw, 74.014vh) scale(0.6065);
  }
  to {
    transform: translate(56.017vw, 100vh) scale(0.6065);
  }
}
.snow:nth-child(163) {
  opacity: 0.0205;
  transform: translate(77.0755vw, -10px) scale(0.8239);
  animation: fall-163 25s -22s linear infinite;
}
@keyframes fall-163 {
  38.719% {
    transform: translate(67.7499vw, 38.719vh) scale(0.8239);
  }
  to {
    transform: translate(72.4127vw, 100vh) scale(0.8239);
  }
}
.snow:nth-child(164) {
  opacity: 0.1707;
  transform: translate(99.2576vw, -10px) scale(0.2677);
  animation: fall-164 25s -1s linear infinite;
}
@keyframes fall-164 {
  44.936% {
    transform: translate(97.6647vw, 44.936vh) scale(0.2677);
  }
  to {
    transform: translate(98.46115vw, 100vh) scale(0.2677);
  }
}
.snow:nth-child(165) {
  opacity: 0.5739;
  transform: translate(73.6028vw, -10px) scale(0.6313);
  animation: fall-165 28s -30s linear infinite;
}
@keyframes fall-165 {
  69.77% {
    transform: translate(65.5261vw, 69.77vh) scale(0.6313);
  }
  to {
    transform: translate(69.56445vw, 100vh) scale(0.6313);
  }
}
.snow:nth-child(166) {
  opacity: 0.1989;
  transform: translate(44.0785vw, -10px) scale(0.8132);
  animation: fall-166 23s -24s linear infinite;
}
@keyframes fall-166 {
  66.372% {
    transform: translate(50.5708vw, 66.372vh) scale(0.8132);
  }
  to {
    transform: translate(47.32465vw, 100vh) scale(0.8132);
  }
}
.snow:nth-child(167) {
  opacity: 0.468;
  transform: translate(82.5292vw, -10px) scale(0.8804);
  animation: fall-167 30s -20s linear infinite;
}
@keyframes fall-167 {
  72.83% {
    transform: translate(89.5008vw, 72.83vh) scale(0.8804);
  }
  to {
    transform: translate(86.015vw, 100vh) scale(0.8804);
  }
}
.snow:nth-child(168) {
  opacity: 0.7538;
  transform: translate(76.0153vw, -10px) scale(0.6915);
  animation: fall-168 18s -15s linear infinite;
}
@keyframes fall-168 {
  65.456% {
    transform: translate(83.2466vw, 65.456vh) scale(0.6915);
  }
  to {
    transform: translate(79.63095vw, 100vh) scale(0.6915);
  }
}
.snow:nth-child(169) {
  opacity: 0.2326;
  transform: translate(37.5378vw, -10px) scale(0.7167);
  animation: fall-169 24s -1s linear infinite;
}
@keyframes fall-169 {
  42.623% {
    transform: translate(43.6502vw, 42.623vh) scale(0.7167);
  }
  to {
    transform: translate(40.594vw, 100vh) scale(0.7167);
  }
}
.snow:nth-child(170) {
  opacity: 0.511;
  transform: translate(75.1804vw, -10px) scale(0.6562);
  animation: fall-170 13s -20s linear infinite;
}
@keyframes fall-170 {
  53.084% {
    transform: translate(78.1747vw, 53.084vh) scale(0.6562);
  }
  to {
    transform: translate(76.67755vw, 100vh) scale(0.6562);
  }
}
.snow:nth-child(171) {
  opacity: 0.0247;
  transform: translate(37.1918vw, -10px) scale(0.2522);
  animation: fall-171 29s -17s linear infinite;
}
@keyframes fall-171 {
  35.996% {
    transform: translate(32.7738vw, 35.996vh) scale(0.2522);
  }
  to {
    transform: translate(34.9828vw, 100vh) scale(0.2522);
  }
}
.snow:nth-child(172) {
  opacity: 0.5579;
  transform: translate(35.9333vw, -10px) scale(0.6579);
  animation: fall-172 17s -13s linear infinite;
}
@keyframes fall-172 {
  76.516% {
    transform: translate(34.2007vw, 76.516vh) scale(0.6579);
  }
  to {
    transform: translate(35.067vw, 100vh) scale(0.6579);
  }
}
.snow:nth-child(173) {
  opacity: 0.292;
  transform: translate(59.7203vw, -10px) scale(0.645);
  animation: fall-173 15s -1s linear infinite;
}
@keyframes fall-173 {
  60.021% {
    transform: translate(69.2677vw, 60.021vh) scale(0.645);
  }
  to {
    transform: translate(64.494vw, 100vh) scale(0.645);
  }
}
.snow:nth-child(174) {
  opacity: 0.6336;
  transform: translate(54.8885vw, -10px) scale(0.2457);
  animation: fall-174 10s -22s linear infinite;
}
@keyframes fall-174 {
  40.69% {
    transform: translate(52.4313vw, 40.69vh) scale(0.2457);
  }
  to {
    transform: translate(53.6599vw, 100vh) scale(0.2457);
  }
}
.snow:nth-child(175) {
  opacity: 0.9871;
  transform: translate(24.3241vw, -10px) scale(0.3272);
  animation: fall-175 19s -7s linear infinite;
}
@keyframes fall-175 {
  53.788% {
    transform: translate(21.1843vw, 53.788vh) scale(0.3272);
  }
  to {
    transform: translate(22.7542vw, 100vh) scale(0.3272);
  }
}
.snow:nth-child(176) {
  opacity: 0.2249;
  transform: translate(67.1358vw, -10px) scale(0.4004);
  animation: fall-176 14s -4s linear infinite;
}
@keyframes fall-176 {
  63.675% {
    transform: translate(75.5737vw, 63.675vh) scale(0.4004);
  }
  to {
    transform: translate(71.35475vw, 100vh) scale(0.4004);
  }
}
.snow:nth-child(177) {
  opacity: 0.4138;
  transform: translate(83.2981vw, -10px) scale(0.9602);
  animation: fall-177 23s -15s linear infinite;
}
@keyframes fall-177 {
  39.299% {
    transform: translate(91.6533vw, 39.299vh) scale(0.9602);
  }
  to {
    transform: translate(87.4757vw, 100vh) scale(0.9602);
  }
}
.snow:nth-child(178) {
  opacity: 0.2607;
  transform: translate(44.7119vw, -10px) scale(0.8655);
  animation: fall-178 18s -21s linear infinite;
}
@keyframes fall-178 {
  74.578% {
    transform: translate(37.4131vw, 74.578vh) scale(0.8655);
  }
  to {
    transform: translate(41.0625vw, 100vh) scale(0.8655);
  }
}
.snow:nth-child(179) {
  opacity: 0.9984;
  transform: translate(4.1049vw, -10px) scale(0.198);
  animation: fall-179 20s -25s linear infinite;
}
@keyframes fall-179 {
  31.804% {
    transform: translate(-3.5482vw, 31.804vh) scale(0.198);
  }
  to {
    transform: translate(0.27835vw, 100vh) scale(0.198);
  }
}
.snow:nth-child(180) {
  opacity: 0.186;
  transform: translate(0.5024vw, -10px) scale(0.2836);
  animation: fall-180 18s -19s linear infinite;
}
@keyframes fall-180 {
  49.481% {
    transform: translate(5.6462vw, 49.481vh) scale(0.2836);
  }
  to {
    transform: translate(3.0743vw, 100vh) scale(0.2836);
  }
}
.snow:nth-child(181) {
  opacity: 0.8246;
  transform: translate(77.6577vw, -10px) scale(0.0348);
  animation: fall-181 17s -9s linear infinite;
}
@keyframes fall-181 {
  71.254% {
    transform: translate(84.138vw, 71.254vh) scale(0.0348);
  }
  to {
    transform: translate(80.89785vw, 100vh) scale(0.0348);
  }
}
.snow:nth-child(182) {
  opacity: 0.233;
  transform: translate(65.7477vw, -10px) scale(0.4867);
  animation: fall-182 28s -12s linear infinite;
}
@keyframes fall-182 {
  68.438% {
    transform: translate(56.6279vw, 68.438vh) scale(0.4867);
  }
  to {
    transform: translate(61.1878vw, 100vh) scale(0.4867);
  }
}
.snow:nth-child(183) {
  opacity: 0.0602;
  transform: translate(16.1164vw, -10px) scale(0.585);
  animation: fall-183 21s -4s linear infinite;
}
@keyframes fall-183 {
  64.808% {
    transform: translate(11.04vw, 64.808vh) scale(0.585);
  }
  to {
    transform: translate(13.5782vw, 100vh) scale(0.585);
  }
}
.snow:nth-child(184) {
  opacity: 0.8322;
  transform: translate(73.8671vw, -10px) scale(0.6169);
  animation: fall-184 10s -6s linear infinite;
}
@keyframes fall-184 {
  66.975% {
    transform: translate(66.794vw, 66.975vh) scale(0.6169);
  }
  to {
    transform: translate(70.33055vw, 100vh) scale(0.6169);
  }
}
.snow:nth-child(185) {
  opacity: 0.8894;
  transform: translate(39.5881vw, -10px) scale(0.7988);
  animation: fall-185 20s -7s linear infinite;
}
@keyframes fall-185 {
  47.365% {
    transform: translate(40.9822vw, 47.365vh) scale(0.7988);
  }
  to {
    transform: translate(40.28515vw, 100vh) scale(0.7988);
  }
}
.snow:nth-child(186) {
  opacity: 0.702;
  transform: translate(27.5788vw, -10px) scale(0.3893);
  animation: fall-186 15s -16s linear infinite;
}
@keyframes fall-186 {
  35.831% {
    transform: translate(25.2478vw, 35.831vh) scale(0.3893);
  }
  to {
    transform: translate(26.4133vw, 100vh) scale(0.3893);
  }
}
.snow:nth-child(187) {
  opacity: 0.7191;
  transform: translate(87.4728vw, -10px) scale(0.5619);
  animation: fall-187 19s -26s linear infinite;
}
@keyframes fall-187 {
  31.304% {
    transform: translate(88.1568vw, 31.304vh) scale(0.5619);
  }
  to {
    transform: translate(87.8148vw, 100vh) scale(0.5619);
  }
}
.snow:nth-child(188) {
  opacity: 0.4133;
  transform: translate(75.5002vw, -10px) scale(0.0756);
  animation: fall-188 14s -5s linear infinite;
}
@keyframes fall-188 {
  47.738% {
    transform: translate(72.1427vw, 47.738vh) scale(0.0756);
  }
  to {
    transform: translate(73.82145vw, 100vh) scale(0.0756);
  }
}
.snow:nth-child(189) {
  opacity: 0.5895;
  transform: translate(8.7803vw, -10px) scale(0.6669);
  animation: fall-189 21s -23s linear infinite;
}
@keyframes fall-189 {
  41.155% {
    transform: translate(7.5444vw, 41.155vh) scale(0.6669);
  }
  to {
    transform: translate(8.16235vw, 100vh) scale(0.6669);
  }
}
.snow:nth-child(190) {
  opacity: 0.9848;
  transform: translate(68.6302vw, -10px) scale(0.6663);
  animation: fall-190 19s -11s linear infinite;
}
@keyframes fall-190 {
  79.085% {
    transform: translate(72.4427vw, 79.085vh) scale(0.6663);
  }
  to {
    transform: translate(70.53645vw, 100vh) scale(0.6663);
  }
}
.snow:nth-child(191) {
  opacity: 0.9625;
  transform: translate(91.0456vw, -10px) scale(0.2424);
  animation: fall-191 14s -20s linear infinite;
}
@keyframes fall-191 {
  40.776% {
    transform: translate(85.7161vw, 40.776vh) scale(0.2424);
  }
  to {
    transform: translate(88.38085vw, 100vh) scale(0.2424);
  }
}
.snow:nth-child(192) {
  opacity: 0.7772;
  transform: translate(88.0772vw, -10px) scale(0.4438);
  animation: fall-192 30s -21s linear infinite;
}
@keyframes fall-192 {
  33.005% {
    transform: translate(97.8404vw, 33.005vh) scale(0.4438);
  }
  to {
    transform: translate(92.9588vw, 100vh) scale(0.4438);
  }
}
.snow:nth-child(193) {
  opacity: 0.0548;
  transform: translate(94.3462vw, -10px) scale(0.4825);
  animation: fall-193 20s -14s linear infinite;
}
@keyframes fall-193 {
  69.418% {
    transform: translate(94.5074vw, 69.418vh) scale(0.4825);
  }
  to {
    transform: translate(94.4268vw, 100vh) scale(0.4825);
  }
}
.snow:nth-child(194) {
  opacity: 0.3713;
  transform: translate(69.8596vw, -10px) scale(0.1717);
  animation: fall-194 14s -11s linear infinite;
}
@keyframes fall-194 {
  35.459% {
    transform: translate(60.6803vw, 35.459vh) scale(0.1717);
  }
  to {
    transform: translate(65.26995vw, 100vh) scale(0.1717);
  }
}
.snow:nth-child(195) {
  opacity: 0.0374;
  transform: translate(40.8394vw, -10px) scale(0.8082);
  animation: fall-195 22s -27s linear infinite;
}
@keyframes fall-195 {
  70.218% {
    transform: translate(43.2693vw, 70.218vh) scale(0.8082);
  }
  to {
    transform: translate(42.05435vw, 100vh) scale(0.8082);
  }
}
.snow:nth-child(196) {
  opacity: 0.0979;
  transform: translate(78.9558vw, -10px) scale(0.5582);
  animation: fall-196 23s -10s linear infinite;
}
@keyframes fall-196 {
  45.742% {
    transform: translate(73.8879vw, 45.742vh) scale(0.5582);
  }
  to {
    transform: translate(76.42185vw, 100vh) scale(0.5582);
  }
}
.snow:nth-child(197) {
  opacity: 0.7913;
  transform: translate(18.8349vw, -10px) scale(0.8346);
  animation: fall-197 13s -10s linear infinite;
}
@keyframes fall-197 {
  52.122% {
    transform: translate(13.8142vw, 52.122vh) scale(0.8346);
  }
  to {
    transform: translate(16.32455vw, 100vh) scale(0.8346);
  }
}
.snow:nth-child(198) {
  opacity: 0.512;
  transform: translate(45.279vw, -10px) scale(0.2661);
  animation: fall-198 28s -21s linear infinite;
}
@keyframes fall-198 {
  79.126% {
    transform: translate(54.5766vw, 79.126vh) scale(0.2661);
  }
  to {
    transform: translate(49.9278vw, 100vh) scale(0.2661);
  }
}
.snow:nth-child(199) {
  opacity: 0.879;
  transform: translate(77.8911vw, -10px) scale(0.9503);
  animation: fall-199 23s -20s linear infinite;
}
@keyframes fall-199 {
  64.979% {
    transform: translate(73.9347vw, 64.979vh) scale(0.9503);
  }
  to {
    transform: translate(75.9129vw, 100vh) scale(0.9503);
  }
}
.snow:nth-child(200) {
  opacity: 0.0754;
  transform: translate(47.0324vw, -10px) scale(0.0583);
  animation: fall-200 21s -3s linear infinite;
}
@keyframes fall-200 {
  46.397% {
    transform: translate(45.5821vw, 46.397vh) scale(0.0583);
  }
  to {
    transform: translate(46.30725vw, 100vh) scale(0.0583);
  }
}
</style>
