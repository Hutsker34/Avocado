<template>
  <div id="nav">
  <router-link to="/sign-in">sign-In</router-link> |
  <router-link to="/regist">regist</router-link> |
  <router-link to="/content">content</router-link>
  </div>
  <router-view />
</template>

<script>


export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Krub:wght@300&family=Montserrat:ital,wght@0,400;1,300&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
