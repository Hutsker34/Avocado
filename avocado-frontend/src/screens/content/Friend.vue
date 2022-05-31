<template>
        <div class='message'>
            <img src='../../assets/avatar.png' class='avatar'>
            <div class='text-wrap'>
                <h1 class='name'>{{friend.name}}</h1>
                <p class='reading'>reading</p>
            </div>
        </div>
</template>
<script>
export default {
    name: "Friend",
    props: {
        friend: Object
    },
    data(){
        return{
            username: 'name'
        }
    },
    
    mounted() {
        console.log(this.friend)
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