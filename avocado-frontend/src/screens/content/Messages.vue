<template>
  <div class="messages">
    <div class="friend__profile">
      <button @click="goBack" class="back">⇽ back</button>
      <h1 class="name">{{ userName }}</h1>
      <img :src="avatar" class="avatar" />
    </div>
    <div class="message__wrap">
      <MessageCommon
        v-for="(item, index) in mus"
        :key="index"
        :message="item"
      />
    </div>
    <input
      v-model="value"
      class="input"
      placeholder="type a message"
      v-on:keyup.enter="messageAppend()"
    />
  </div>
</template>
<script>
import axios from "axios";
import { getToken, authHeader , backLink} from "../../helpers.js";
import MessageCommon from "./MessageCommon.vue";
import router from "../../router";
import forestMan from "@/assets/forestMan.png";

const url = "http://localhost:3006/api";

export default {
  components: {
    MessageCommon,
  },
  data() {
    return {
      userName: "Name",
      mus: [],
      value: "",
      avatar: forestMan,
    };
  },
  methods: {
    goBack() {
      return router.go(-1);
    },
    messageAppend() {
      axios
        .post(`${url}/message`, {
          text: this.value,
          sender_id: getToken("user")._id,
          dialogue_id: this.$route.params.id,
        })
        .then(({ data }) => {
          this.mus.push({ ...data.data, isMine: true });
        });
      this.value = "";
    },
  },

  mounted() {
    axios.get(`${url}/chat/${this.$route.params.id}`).then(({ data }) => {
      axios.get(`${url}/bio/${data.data.receiver_id}`).then(({ data }) => {
        if (data.data.avatar) {
          this.avatar = `${backLink}${data.data.avatar}`;
        }
        this.userName = data.data.name;
      });
    }),
      axios
        .get(`${url}/message/${this.$route.params.id}`, {
          headers: authHeader(),
        })
        .then(({ data }) => {
          this.mus = data.data;
        });
  },
};
</script>
<style scoped>
.messages {
  display: flex;
  height: 100%;
  justify-content: space-between;
}

.back {
  background: none;
  border: none;
}
.back:hover {
  color: grey;
}
.input {
  margin: 0 10px 30px 10px;
  padding: 4px 4px 4px 4px;
  border-radius: 5px;
  border: 1px solid grey;
  background: #9bc472;
}
.friend__profile {
  width: 100%;
  height: 70px;
  border-bottom: solid 1px grey;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
.name {
  font-size: 16px;
  margin: 0 60px;
}
.avatar {
  width: 50px;
}
.message__wrap {
  display: inline-flex;
  height: 100%;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
}
</style>
