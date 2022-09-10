<template>
  <div class="profile">
    <div class="user__info">
      <img :src="userImg" class="user__avatar" />
      <h1 class="user__name">{{ userName }}</h1>
      <input
        type="file"
        accept="image/*"
        @change="uploadImage($event)"
        id="file-input"
      />
    </div>
    <div class="posts">
      <div class="post__ceate--post">
        <input
          v-model="value"
          placeholder="leave a record..."
          class="posts__input"
        />
        <button @click="addPost" class="posts__button">submit</button>
      </div>
      <div class="posts__mus">
        <div class="posts__post" v-for="(item, index) in mus" :key="index">
          <time class="post__time">{{ format(item.created_at) }}</time>
          <p class="post__text">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const url = "http://localhost:3006/api";

import axios from "axios";
import { getCurrentTime, getToken, authHeader } from "../../helpers.js";

export default {
  data() {
    return {
      userName: "Name",
      value: "",
      mus: [],
      userImg: "https://pomogaetsrazu.ru/images/offers/969532582.jpg",
    };
  },
  methods: {
    getUserName() {
      //const self = this
      axios
        .get(`${url}/userInfo`, {
          headers: authHeader(),
        })
        .then(({ data }) => {
          this.userName = data.data.name;
        });
    },
    format(created_at) {
      return getCurrentTime(created_at);
    },
    addPost() {
      axios
        .post(`${url}/post`, {
          text: this.value,
          user_id: getToken("user")._id,
        })
        .then(({ data }) => {
          this.mus.unshift(data.data);
        });
      this.value = "";
    },

    uploadImage(event) {
      console.log(event);
      this.userImg = URL.createObjectURL(event.target.files[0])
      const selectedFile = event.target.files[0];
      const formData = new FormData();
      formData.append("file", selectedFile);  // appending file

     // sending file to the backend
      axios
        .patch(`${url}/bio/${getToken("user")._id}`, formData)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.getUserName(),
      axios.get(`${url}/post/${getToken("user")._id}`, {}).then(({ data }) => {
        this.mus = data.data;
      });
  },
};
</script>
<style scoped>
.profile {
  padding: 30px;
}
.user__info {
  display: flex;
}
.user__avatar {
  background: grey;
  width: 150px;
  height: 200px;
  object-fit: contain;
}
.user__name {
  margin-left: 10px;
  font-size: 15px;
}
.post__ceate--post {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  background: #9bc472;
  border-radius: 5px;
  margin-bottom: 20px;
}
.posts__input {
  background: #9bc472;
  border: none;
  width: 70%;
}
.posts__button {
  margin-right: 50px;
  border-radius: 7px;
  border: none;
  background: #7fae50;
  width: 80px;
}
.posts__button:hover {
  background: #6c9741;
}
.posts__post {
  background: #9bc472;
  padding: 10px;
  text-align: start;
  margin: 15px 0 0 0;
}
.post__text {
  margin: 5px 0 5px 0;
}
.post__photo {
  background: grey;
  width: 100%;
}
.post__time {
  font-size: 12px;
  color: #4c5c60;
}
</style>
