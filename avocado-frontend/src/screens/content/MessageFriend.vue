<template>
    <div class='messageFriend'>
        <p class='text'>{{text}}</p>
    </div>
</template>
<script>
export default {
    name: "MessageFriend",
    props: {
        text: String,
        MessageFriend: Object
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
    .messageFriend{
        min-width:150px;
        min-height:25px;
        background: #CBF6DB;
        border: none;
        border-radius: 13px;
        margin: 0 0 15px 15px;
        font-size: 14px;
        padding: 3px 0 3px 10px;
        display: flex;
        align-self: flex-start;
    }
    .text{
        margin: 4px 0 0 10px ;

    }
</style>