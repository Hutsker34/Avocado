<template>
  <div v-for="(item, index) in chats" :key="index" class="messages">
    <Chat :chat="item" v-on:click="goToChat(item._id)" />
  </div>
</template>
<script>
import Chat from "./Chat.vue";
import axios from "axios";
import { authHeader } from "../../helpers.js";
import router from "../../router";

const url = "http://localhost:3006/api";

export default {
  components: {
    Chat,
  },
  data() {
    return {
      chats: [],
    };
  },
  methods: {
    getChats() {
      axios
        .get(`${url}/chat`, {
          headers: authHeader(),
        })
        .then(({ data }) => {
          this.chats = data.data;
        });
    },
    goToChat(item) {
      axios.get(`${url}/chat/${item}`, {}).then(({ data }) => {
        router.push({ path: `/messages/${data.data._id}`});
      });
    },
  },
  mounted() {
    this.getChats();
  },
};
</script>
<style>
.messages {
  display: flex;
  flex-direction: column;
}
</style>
