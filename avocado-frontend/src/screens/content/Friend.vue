<template>
        <div class='message'>
            <img :src = 'chooseAvo()' class='avatar'>
            <div class='text-wrap'>
                <h1 class='name'>{{friend.name}}</h1>
            </div>
        </div>
</template>
<script>
const url = 'http://localhost:3006/api'

import axios from 'axios'
import { authHeader} from '../../helpers.js'
import forestMan from "@/assets/forestMan.png";

export default {
    name: "Friend",
    props: {
        friend: Object
    },
    data(){
        return{
            username: 'name',
            avatar: forestMan,
        }
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
            return this.friend.avatar ? require(`@/assets/${this.friend.avatar}`) : this.avatar;
        }
    },
    
    mounted() {
        
    }

}
</script>
<style scoped>
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