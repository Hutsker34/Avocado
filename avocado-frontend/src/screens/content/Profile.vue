<template>
  <div class="profile">
    <div class="user__info">
      <img :src="userImg" class="user__avatar" />
      <div class="user__info--wrap">
        <h1 class="user__name">{{ userName }}</h1>
        <div class="center">
          <vue-core-image-upload
            class="btn btn-primary"
            :crop="false"
            @imageuploaded="imageuploaded"
            :max-file-size="5242880"
            :url='patchImg()' >
          </vue-core-image-upload>
        </div>
        <!--
        <div class="wrap__input">
          <label class="input__label">выбирете фото профиля</label>
          <form class='wrap__form' @submit.prevent="uploadImage">
              <input class='form__input'  type="file" name="imagesArray" @change="onFileChange" />
              <button class="btn btn-success">Submit</button>
          </form>
          
        !-->
          <!-- <input
            placeholder='изменить фото профиля'
            class='user__info--btn'
            type="file"
            accept="image/*"
            @change="uploadImage($event)"
            id="file-input"
          />
          -->
        </div>
      </div>
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
  
</template>
<script>
const url = "http://localhost:3006/api";
import VueCoreImageUpload from 'vue-core-image-upload'
import axios from "axios";
import { getCurrentTime, getToken, authHeader } from "../../helpers.js";
import forestMan from '../../assets/forestMan.png';

export default {
  components: {
    'vue-core-image-upload': VueCoreImageUpload,
  },
  data() {
    return {
      userName: "Name",
      value: "",
      mus: [],
      userImg: forestMan,
      selectedFile: "",
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
          this.userImg = require(`../../assets/${data.data.avatar}`);
        });
    },
    imageuploaded(res) {
      if (res.errcode == 0) {
        this.src = res.data.src;
      }
    },
    patchImg(){
        return `http://localhost:3006/api/photo/${getToken("user")._id}`
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
          console.log(data)
        });
      this.value = "";
    },
    onFileChange(e) {
      // const formData = new FormData();
      const selectedFile = e.target.files[0]; // accessing file
      this.selectedFile = selectedFile;
      this.progress = 0;
      this.userImg = URL.createObjectURL(e.target.files[0]);
      // formData.append("file", this.selectedFile);
    },

    uploadImage() {
      const formData = new FormData();
      formData.append("file", this.selectedFile); // appending file
      fetch(`http://localhost:3006/api/bio/${getToken("user")._id}`, {
        body: formData,
        method: "PATCH",
      });
      },
    
  },

  mounted() {
    this.getUserName(),
      axios.get(`${url}/post/${getToken("user")._id}`, {}).then(({ data }) => {
        this.mus = data.data;
        console.log(this.mus)
      });
      
  },
};
</script>
<style scoped>
.btn-primary{
    background: #7fae50;
    border-radius: 20px;
    padding: 10px 15px;
    box-shadow : 0 0 3px rgba(0,0,0,0.5);
}
.center{
    max-width: 150px;
    margin: 0 0 0 10px;
}
.profile {
  padding: 30px;
}
.user__info {
  display: flex;
}
.user__avatar {
  background: #D0D7DF;
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
.user__info--btn {
  margin: 5px 0 0 10px;
  opacity: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.user__info--wrap {
  display: flex;
  flex-direction: column;
  align-items: start;
}
.wrap__input {
  display: flex;
  align-items: start;
  flex-direction: column;
  position: relative;
  background: #7fae50;
  border-radius: 7px;
  margin: 0 0 0 10px;
}
.input__label {
  font-size: 13px;
  padding: 2px 10px;
}

.wrap__form{
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.btn-success{
  
}
.form__input{
  margin-top: 10px;
  
}
.btn{
  margin-top: 10px;
}
</style>
