<template>
  <div>
    <b-row>
        <b-col>
            <b-button variant="outline-primary"  @click="$router.push('recent-results')">
              Recent results <b-icon icon="list-check"></b-icon>
            </b-button>
        </b-col>
    </b-row>
    <b-row class="mt-4">
        <b-col>
          <b-form-file
            variant="dark"
            v-model="audioFile"
            placeholder="Choose an audio file (.wav) or drop it here..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
        </b-col>
    </b-row>
    <b-row v-if="this.audioFile != null" class="mt-2">
        <b-col>
          <b-button variant="outline-info" @click="uploadFile">Analyze</b-button>
        </b-col>
    </b-row>
  </div>
</template>

<script>
import {uploadToS3} from "../services/aws";
export default {
  name: 'AudioUploader',
  components: {

  },
  data: function() {
    return {
      audioFile: null,
    }
  },
  methods:{
    uploadFile(){
      uploadToS3(this.audioFile);
      this.$router.push('recent-results');
    }
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
