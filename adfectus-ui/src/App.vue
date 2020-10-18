<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col>
          <b-alert show variant="warning">
            Disclaimer: Works only in <strong>Google Chrome</strong> with <strong>.wav</strong> audio files
          </b-alert>
        </b-col>
      </b-row>
      <img id="image-home" alt="Vue logo" src="./assets/logo.png" width="150px" @click="$router.push('/')">
      <router-view/>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

#image-home {
  cursor: pointer;
}
</style>
