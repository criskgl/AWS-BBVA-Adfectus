<template>
  <div class="home">
    <h4>Recent Results</h4>
    <p>⏳Results might take some time to appear here, you might as well go grab a coffee ☕️</p>
    <recent-results-list/>
  </div>
</template>
<script>
import RecentResultsList from '../components/RecentResultsList'
export default {
  name: 'home',
  components: {
    RecentResultsList
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