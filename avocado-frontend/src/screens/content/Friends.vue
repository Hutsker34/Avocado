<template >
    <div v-if="users.length == 0" class="site__content--chats">скоро тут появятся друзья</div>
    <div v-for="(item, index) in users" :key="index" class='messages'>
        <Friend v-on:click='addChat(item._id)' class='message' :friend='item' />
    </div>
</template>
<script>
import Friend from './Friend.vue'
import axios from 'axios'
import {getToken,  authHeader } from '../../helpers.js'
import router from '../../router'

const url = 'http://localhost:3006/api'

export default {
    components: {
        Friend
    },
    data(){
        return {
            users: []
        }
    },
    methods: {
        getUsers(){
            axios.get(`${url}/bio`,{
                headers: authHeader(),
            }).then(
                ({data})=>{
                    this.users = data.data
                }
            )
        },
        addChat(_id){
            axios.post(`${url}/chat`,{
                sender_id: getToken('user')._id,
                receiver_id: _id
            }).then(
               ({data})=>{
                    router.push({ path: `/messages/${data.data._id}`})
                }
            ).catch(()=>{
                alert('не удалось создать беседу(')
            })
        }
    },
    mounted() {
        this.getUsers()
    }
}
</script>
<style scoped>
    .messages{
        display: flex;
        flex-direction: column;
    }
    .site__content--chats{
        /* background-color: rgba(189, 233, 145, 0.8);
        border-radius: 5px;
        width: 500px;
        height: 600px; */
        margin: auto;
        margin-top: 40px;
        font-size: 28px;
        /* padding: 30px 0 0 0; */
}
    .message{
        width: 100%;
        height: 86px;
        border-bottom: solid 1px grey;
        display: inline-flex;
        flex-wrap: wrap;
        align-content: center;
    }
    .message:hover{
        background: rgba(255,255,255,0.15);
    }
    .name{
        margin: 10px 0 0 0;
        font-size: 16px;
        color: #c0cbd7;
    }
    .reading{
        margin: 16px 0 0 0;
        font-size: 12px;
        
    }
    .avatar{
        width: 67px;
        margin: 5px 0 5px 20px;
    }
    .text-wrap{
        display: flex;
        flex-direction: column;
        margin: 8px 0 0 25px;
        text-align: start;
    }
</style>