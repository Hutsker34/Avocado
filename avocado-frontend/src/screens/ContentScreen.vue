<template>
    <div class='site'>
        <header class='site__header'></header>
        <div class='site__wrap'>
            <article class='site__content'>
                <router-view />
            </article>
            <aside class='site__menu'>
                <router-link class='site__menu-link' to="/chat">chats</router-link> 
                <router-link class='site__menu-link' to="/friends">friends</router-link> 
            </aside>
        </div>
    </div>
    
</template>
<script>
export default {
    name: 'ContentScreen'
}
</script>
<style scoped>
    .site__wrap{
        display: flex;
        flex-direction: row-reverse ;
        margin-left: 16%;
        margin-top: 20px;
    }
    .site__menu{
        margin-top: 25px;
        display: flex;
        flex-direction: column;
        width: 20%;
    }
    .site__content{
        background: #ADD288;
        margin: 0 auto;
        margin-left: 0;
        width: 40%;
        min-height: 500px;

    }
    .site__menu-link{
        text-decoration: none;
        color: #9BC472;
        font-size: 24px;
        text-align: start;
        margin: 0 0 20px 55%;
    }
    .site__menu-link:hover{
        color: #88AD62;
    }
</style>