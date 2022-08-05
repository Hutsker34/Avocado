<template >
    <div class='messages'>
        <div class='friend__profile'>
            <button class='back'> ⇽ back </button>
            <h1 class='name'>{{userName}}</h1>
            <img src='../../assets/avatar.png' class='avatar'>
        </div>
        <div v-for="(item, index) in mus" :key = 'index'  class='message__wrap'>
            <MessageMy :text = 'item'/>
        </div>
        <input v-model = 'value' class='input' placeholder='type a message' v-on:keyup.enter = "messageAppend()" />
    </div>
</template>
<script>
import axios from 'axios'
import MessageMy from './MessageMy.vue'


const url = 'http://localhost:3006/api'


export default {
    components: {
        MessageMy
    },
     data(){
        return{
            userName: 'Name',
            mus: [],
            value: '',
        }
    },
    methods: {
        messageAppend(){
             axios.post(`${url}/message`,{
                text: this.value,
                sender_id: "629636cf3910ee22c0b8eb01",
                dialogue_id:"62a8c161d0570f49b493a90d"
            }).then(
               ({data})=>{
                   this.mus.push(data.data.text)
                }
            )
            this.value = ''
        }
    },
    mounted() {
       axios.get(`${url}/chat/${this.$route.params.id}`,{
            }).then(
                ({data})=>{
                    axios.get(`${url}/bio/${data.data.receiver_id}`, {

                    }).then(
                        ({data})=>{
                            this.userName = data.data.name
                        }
                    )
                   
                    
                }
            ),
        axios.get(`${url}/message`,{
            }).then(
                ({data})=>{
                    console.log(data)
                }
            ) 
    }
}
</script>
<style scoped>
    .messages{
        display: flex;
        height: 100%;
        justify-content: space-between
    }
    
    .back{
        background: none;
        border: none;
        margin: 20px;
    }
    .back:hover{
        color: grey;
    }
    .input{
        margin: 0 10px 30px 10px ;
        padding: 4px 4px 4px 4px;
        border-radius: 5px ;
        border: 1px solid grey;
        background: #9BC472;
        
    }
    .friend__profile{
        width: 100%;
        height: 70px;
        border-bottom: solid 1px grey;
        display: inline-flex;
        flex-wrap: wrap;
        align-content: center;
        justify-content: space-around
    }
    .name{
        margin: 0 auto;
        font-size: 16px;
        margin-top: 15px;
    }
    .avatar{
        width: 50px;
        margin: 5px 20px 5px 0;
    }
    .message__wrap{
        display: inline-flex;
        height:100%;
        width:100%;
        justify-content: flex-end;
        align-items: flex-end;
        flex-direction: column;
    }
    
</style>