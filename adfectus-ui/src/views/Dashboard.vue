<template>
  <div class="home">
    <h4>Dashboard</h4>
    <dashboard-generator :id="$route.params.id"/>
  </div>
</template>
<script>
import DashboardGenerator from '../components/DashboardGenerator'
export default {
  name: 'home',
  components: {
    DashboardGenerator
  },
  data () {
    return {
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>