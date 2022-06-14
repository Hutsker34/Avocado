<template >
    <div v-for="(item, index) in users" :key="index" class='messages'>
        <Friend v-on:click='addChat' class='message' :friend='item' />
    </div>
</template>
<script>
import Friend from './Friend.vue'
import axios from 'axios'

const url = 'http://localhost:3001/api'

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

            }).then(
                ({data})=>{
                    console.log(this)
                    this.users = data.data
                }
            )
        },
        addChat(){
            axios.post(`${url}/chat`,{
                sender_id: "629636cf3910ee22c0b8eb01",
                receiver_id: "62963bda3910ee22c0b8eb09"
            }).then(
               ({data})=>{
                    console.log(data)
                }
            )
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
    .message{
        width: 100%;
        height: 86px;
        border-bottom: solid 1px grey;
        display: inline-flex;
        flex-wrap: wrap;
        align-content: center;
    }
    .message:hover{
        background: #88AD62;
    }
    .name{
        margin: 10px 0 0 0;
        font-size: 16px;
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