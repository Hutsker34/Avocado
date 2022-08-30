<template>
     
        <messageMy v-if='message.isMine' :text = 'message.text'/>
    
    
        <messageFriend v-else :text = 'message.text'/>
    
</template>
<script>

import MessageMy from './MessageMy.vue'
import MessageFriend from './MessageFriend.vue'

export default {
    components: {
        MessageMy,
        MessageFriend
    },
    name: "MessageCommon",
    props: {
       message: Object
    },
    data(){
        return{
            
        }
    },
    
    mounted() {
        
    }

}
</script>
<style scoped>
    .messageMy{
        min-width:150px;
        min-height:25px;
        background: #9BC472;
        border: none;
        border-radius: 13px;
        margin: 0 15px 15px 0;
        font-size: 14px;
        padding: 3px 0 3px 10px;
        display: flex;

    }
    .text{
        margin: 4px 0 0 10px ;

    }
</style>