<template>
    <div class='site'>
        <header class='site__header'>
            <img class='header__logo' src='../assets/logo.png'>
        </header>
        <div class='site__wrap'>
            <article class='site__content'>
                <router-view />
            </article>
            <aside class='site__menu'>
                <router-link class='site__menu-link' to="/profile">profile</router-link>
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
    .site{
        margin: 0;
    }
    .site__wrap{
        display: flex;
        flex-direction: row-reverse ;
        margin-left: 16%;
        margin-top: 10px;
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
    .site__header{
        height: 60px;
        background: #BDE991;
        width: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: flex-start;
    }
    .header__logo{
        margin: 10px 0 10px 470px;
        height:40px;
    }
</style>