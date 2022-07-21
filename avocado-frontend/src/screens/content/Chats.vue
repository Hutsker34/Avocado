<template >
    <div  v-for="(item, index) in chats" :key="index" class='messages'>
        <Chat :chat = 'item'  />
    </div>
</template>
<script>
import Chat from './Chat.vue'
import axios from 'axios'


const url = 'http://localhost:3003/api'

export default {
    components:{
        Chat
    },
    data(){
        return {
            chats: []
        }
    },
    methods: {
        getChats(){
            axios.get(`${url}/chat`,{

            }).then(
                ({data})=>{
                    console.log(data.data)
                    this.chats = data.data
                }
            )
        },
        
    },
    mounted() {
        this.getChats()
    }
}
</script>
<style>
    .messages{
        display: flex;
        flex-direction: column;
    }
</style>