<template>
  <div class="home">
    <h4>Home</h4>
    <audio-uploader/>
  </div>
</template>
<script>
import AudioUploader from '../components/AudioUploader'
export default {
  name: 'home',
  components: {
    AudioUploader
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>