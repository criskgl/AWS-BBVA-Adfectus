<template>
  <div>
    <!-- Main table element -->
    <b-row class="mb-2">
      <b-col md="3" offset-md="9">
        <b-button
          pill
          variant="warning"
          size="sm"
          @click="refreshItems"
        >
          Refresh <b-icon icon="arrow-repeat"></b-icon>
        </b-button>
      </b-col>
    </b-row>
    <b-table
      show-empty
      small
      stacked="md"
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      :busy="loadingItems"
    >
      <template v-slot:table-busy>
        <div class="text-center text-warning">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <template v-slot:cell(name)="row">
        {{ row.value }}
      </template>

      <template v-slot:cell(seeDetails)="row">
        <b-button
          size="sm"
          @click="$router.push(`dashboard/${row.item.partitionKey}`)"
          class="mr-1"
        >See details</b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>
  </div>
</template>
<script>
import {getAllResults} from "../services/aws";

export default {
  name: "App",
  components: {},
  mounted() {
    this.loadingItems = true;
    getAllResults().then(res => {
      this.items = res.Items;
      this.loadingItems = false;
    }).catch(err => {
      console.log(err.message);
      this.loadingItems = true;
    })
  },
  data() {
    return {
      loadingItems: false,
      items: [],
      sortBy: 'created',
      sortDesc: true,
      sortDirection: 'desc',
      fields: [
        {
          key: "partitionKey",
          label: "File name"
        },
        {
          key: "created",
          label: "Date (Epoch)",
          sortable: true,
          sortDirection: "desc",
          class: "text-center"
        },
        {
          key: "seeDetails",
          label: "",
          class: "text-center"
        }
      ]
    };
  },
  methods: {
    refreshItems(){
      this.loadingItems = true;
      getAllResults().then(res => {
        this.items = res.Items;
        this.loadingItems = false;
      }).catch(err => {
        console.log(err.message);
        this.loadingItems = true;
      })
    }
  }
};
</script>