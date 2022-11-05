<template>
  <div class="message">
    <img :src = 'chooseAvo()' class="avatar" />
    <div class="text-wrap">
      <h1 class="name">{{ chat.user.name }}</h1>
      <p class="last-message">how are you?</p>
    </div>
  </div>
</template>
<script>
const url = 'http://localhost:3006/api'

import forestMan from "@/assets/forestMan.png";
import axios from 'axios'
import { authHeader} from '../../helpers.js'

export default {
  name: "Chat",
  props: {
    chat: Object
  },
  data() {
    return {
        avatar: forestMan,
    };
  },
  methods: {
    getUserName(){
            //const self = this
            axios.get(`${url}/userInfo`,{
                headers: authHeader(),
            }).then(
                ({data})=>{
                    console.log('ava',data.data.avatar);
                    this.avatar = require(`@/assets/${data.data.avatar}`)
                }
            )
        },
        chooseAvo(){
            return this.chat.avatar ? require(`@/assets/${this.chat.avatar}`) : this.avatar;
        }
  },
  mounted() {},
};
</script>
<style>
.message {
  width: 100%;
  height: 70px;
  border-bottom: solid 1px grey;
  display: inline-flex;
  flex-wrap: wrap;
  align-content: center;
}
.message:hover {
  background: #88ad62;
}
.name {
  margin: 0;
  font-size: 16px;
}
.last-message {
  margin: 10px 0 0 0;
  font-size: 12px;
}
.avatar {
  width: 50px;
  margin: 5px 0 5px 20px;
}
.text-wrap {
  display: flex;
  flex-direction: column;
  margin: 8px 0 0 25px;
  text-align: start;
}
</style>
