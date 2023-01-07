<template>
  <div id="nav">
    
  </div>
  <div v-if="checkedGet">
    <div  v-for= "(item, index) in snows" :key = index class="snow"></div>
  </div>
  <router-view />
  
</template>

<script>


export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      snows: new Array(100)

    }
  },
  computed: {
    checkedGet() {
      return this.$store.state.checked
    }
  },
  mounted() {
    this.$store.dispatch('getAvo');
  }
}
</script>
  

<style>
@import url('https://fonts.googleapis.com/css2?family=Krub:wght@300&family=Montserrat:ital,wght@0,400;1,300&display=swap');
@import url('./styles/snow.css');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
body{
  background: #CBF6DB;
  margin: 0;
}

</style>
