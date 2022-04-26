<template>
    <div class='site'>
        <img src='../assets/avo.png'>
        <h1 class='site__h1'>Avocado</h1>
        <div class='site__inputs'>
            <input class='site__input login' placeholder='login'>
            <input class='site__input password' placeholder='password'>
        </div>
        <div class='site__links'>
            <router-link class='site__link' to="/signIn">create an account</router-link>
            <button class='site__button'>sign-in</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SignInScreen'
}
</script>
<style scoped>
    .site__h1{
    font-size: 46px;
    color: #9BC472;
    font-family: 'Montserrat', sans-serif;
}
.site__input{
    width: 450px;
    height: 27px;
    padding: 5px 0 5px 15px;
    background: #9BC472;
    outline: none;
    border: none;
    border-radius: 10px;
    margin-bottom: 10px;
}
.site__inputs{
    display: flex;
    flex-direction: column;
    align-items: center;

}
.site__button{
    width: 180px;
    padding: 10px 15px 10px 15px ;
    background: #F5BEB4;
    outline: none;
    border: none;
    border-radius: 19px;
}
.site__button:hover{
    background: #DCA49A;
    border: 1px solid grey;
}
.site__links{
    display: flex;
    justify-content: space-between;
    width: 450px;
    margin: 0 auto;
}
.site__link{
    text-decoration: none;
    color: grey;
    margin: 10px 0 0 40px;;
}
.site__link:hover{
    color: black;
}
</style>