<template >
    <div class='messages'>
        <div class='friend__profile'>
            <button class='back'> ⇽ back </button>
            <h1 class='name'>{{userName}}</h1>
            <img src='../../assets/avatar.png' class='avatar'>
        </div>
        <div class='message__wrap'>
            <Message/>
            <Message/>
        </div>
        <input class='input' placeholder='type a message'/>
    </div>
</template>
<script>
import axios from 'axios'
import Message from './Message.vue'

const url = 'http://localhost:3003/api'

export default {
    components: {
        Message
    },
     data(){
        return{
            userName: 'Name',
        }
    },
    methods: {

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