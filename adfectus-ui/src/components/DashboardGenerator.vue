<template>
  <div>
    <b-row class="mb-1">
      <b-col>
        <h5>{{ this.id.split("-")[0] }}</h5>
      </b-col>
    </b-row>
    <b-row class="">
      <b-col>
        <b-alert show variant="light">
          😁 Happy probability?: {{ Math.round((this.audioInfo.Positive + Number.EPSILON) * 100)}}%
        </b-alert>
      </b-col>
      <b-col>
        <b-alert show variant="light">
          🤨 "A bit pissed" probability?: {{ Math.round((this.audioInfo.Neutral + Number.EPSILON) * 100)}}%
        </b-alert>
      </b-col>
      <b-col>
        <b-alert show variant="light">
          🤬 Very angry probability?: {{ Math.round((this.audioInfo.Negative + Number.EPSILON) * 100)}}%
        </b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <audio controls="controls">
          <source :src="audioUrl" type="audio/wav">
        </audio>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card no-body>
          <b-nav pills card-header slot="header" v-b-scrollspy:nav-scroller>
            Transcript 📝
          </b-nav>
          <b-card-body
            id="nav-scroller"
            ref="content"
            style="position:relative; height:300px; overflow-y:scroll;"
          >
          {{this.audioInfo.transcript}}
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card 
          bg-variant="light"
          text-variant="black" 
          header="Final summary 📌" 
          class="text-left"
        >
          <b-card-text
            v-for="category in categories" :key=category.index
          >
            <strong>{{category}}</strong>: {{chartsData[category]["labels"]["xaxis"]["categories"][0]}}
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col>
        <h4><strong>Charts 📊</strong></h4>
        <p>3 most likely values for each category</p>
      </b-col>
    </b-row>
    <!-- Row generation -->
    <span v-if="audioInfo.length != 0 && chartsData.length != 0">
      <b-row v-for="item in categories" :key="item.index">
        <b-col>
          <apexchart 
            type="radar" 
            height="600" 
            :options="chartsData[item].labels" 
            :series="chartsData[item].data"
          >
          </apexchart>
        </b-col>
      </b-row>
    </span>
  </div>
</template>

<script>
import { getResultItem } from "../services/aws";

export default {
  name: "DashboardGenerator",
  props: ["id"],
  components: {},
  mounted() {
    getResultItem(this.id)
      .then(res => {
          this.audioInfo = res.Item;
          this.categories.forEach(category => {
            let categoryInfo = this.audioInfo[category].Labels;        
            let labels = [];
            let data = [];
            categoryInfo.forEach(labelAndData => {
              labels.push(labelAndData["Name"])
              let tempVal = labelAndData["Score"];
              //tempVal = Math.round((tempVal + Number.EPSILON) * 10) / 10
              data.push(tempVal)
            });
            let categoryData = {
              labels: {
                align: "right",
                title: {
                  text: category
                },
                xaxis: {
                  categories: labels
                },
                yaxis: {
                  show: true,
                  forceNiceScale: true,
                  tickAmount: 1,
                  min: 0,
                  max: 1
                }
              },
              data: [{
                data: data,
              }]
            };
            this.chartsData[category] = categoryData;
          });
      }).catch(err => {
        console.log(err.message);
      });
  },
  data() {
    return {
      audioInfo: {},
      ProductChartHtmlMapper: null,
      categories: ['Producto', 'Detalle', 'Intencion', 'Contexto', 'Movimiento'],
      chartsData: {}
    }
  },
  computed: {
    audioUrl: function(){
      const name = this.id.split("-")[0];
      const url = `https://panteras-patterns-audio-analyzer.s3-us-west-2.amazonaws.com/${name}`;
      return url;
    },
    audioNameWav: function(){
      return this.id.split("-")[0];
    }
  },
  methods:{
    generateSeriesForRadarChart(data){
      console.log(data);
      let result = [{
        data: data,
      }]
      return result;
    },
    generateCharOptionsForRadarChart(title, labels){
      console.log(title);
      console.log(labels);
      let result = {
        title: {
          text: title
        },
        xaxis: {
          categories: labels
        }
      }
      return result;
    }
  }
};
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
