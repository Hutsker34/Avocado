<template >
    <div class='profile'>
        <div class='user__info'>
            <img src='https://pomogaetsrazu.ru/images/offers/969532582.jpg' class='user__avatar'>
            <h1  class='user__name'>{{userName}}</h1>
        </div>
        <div class='posts'>
            <div class='post__ceate--post'>
                <input placeholder='leave a record...' class='posts__input'>
                <button class='posts__button'>submit</button>
            </div>
            <div class='posts__post'>
                <p class='post__text'>somethink...</p>
                <img src='https://user-life.com/uploads/posts/2019-04/thumbs/1556566365_variant-pustoi-avatarki.png' class='post__photo'>
            </div>
        </div>
    </div>
</template>
<script>

const url = 'http://localhost:3006/api'

import axios from 'axios'
import {authHeader} from '../../helpers.js'

export default {
    data(){
        return{
            userName: 'Name',
        }
    },
    methods: {
        getUserName(){
            //const self = this
            axios.get(`${url}/userInfo`,{
                headers: authHeader(),
            }).then(
                ({data})=>{
                    this.userName = data.data.name
                   // console.log(self.userName)
                }
            )
        }
    },
    mounted() {
        this.getUserName()
    }
}
</script>
<style scoped>
    .profile{
       padding:30px;
    }
    .user__info{
        display: flex;
    }
    .user__avatar{
        background:grey;
        width: 150px;
        height: 200px;
    }
    .user__name{
        margin-left: 10px;
        font-size: 15px;
    }
    .post__ceate--post{
        padding: 10px ;
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        background: #9BC472;
        border-radius: 5px;
        margin-bottom: 20px;
        
    }
    .posts__input{
        background:#9BC472;
        border: none;
        width: 70%;

    }
    .posts__button{
        margin-right: 50px;
        border-radius: 7px;
        border: none;
        background: #7FAE50;
        width: 80px;
    }
    .posts__button:hover{
        background: #6C9741;
    }
    .posts__post{
        background: #9BC472;
        padding: 10px;
        text-align: start;
    }
    .post__text{
        margin:5px 0 5px 0;
    }
    .post__photo{
        background: grey;
        width: 100%;
        

    }
</style>