<template>
  <div class="site">
    <header class="site__header">
      <div class="header__cpntent">
        <img class="header__logo" src="../assets/logo.png" />
        <div class="header__user--wrap">
          <img :src="avatarGet" class="header__user--avatar" />
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
import { authHeader } from "../helpers.js";

export default {
  name: "ContentScreen",
  data() {
    return {
      userName: "Name",
      avatar: '',
    };
  },
  computed: {
    avatarGet() {
      return this.$store.state.avatar
    },
  },
  methods: {
    getUserName() {
      //const self = this
      axios
        .get(`${url}/userInfo`, {
          headers: authHeader(),
        })
        // .then(({ data }) => {
        //     this.userName = data.data.name;
        //     if (data.data.avatar) {
        //     this.avatar = require(`../assets/${data.data.avatar}`);
        //   }
        // });
    },
    
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
  background: #add288;
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
  height: 60px;
  background: #bde991;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
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
  margin: 10px 10px 0 0;
  width: auto;
  height: 35px;
}
</style>
