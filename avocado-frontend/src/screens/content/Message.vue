<template>
    <div class='message'>
        <p class='text'>some text</p>
    </div>
</template>
<script>
export default {
    name: "Message",
    props: {
        Message: Object
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
    .message{
        width:150px;
        height:25px;
        background: #9BC472;
        border: none;
        border-radius: 13px;
        margin: 0 15px 15px 0;
        font-size: 14px;
        padding: 1px 0 1px 10px;
    }
</style>