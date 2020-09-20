<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- dit is de bovenkant van de app -->
    <v-app-bar app clipped-left>
      <!-- dit is de lijn voor u de drawer in te zetten -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Flight calculator</v-toolbar-title>
    </v-app-bar>
    <!-- Dit is de body van de app -->
    <v-main>
      <v-container class="fill-height" fluid>
        

        <!-- row 2 --------------------------------------------------------------------------------------------------------- -->
        <v-row>
          <v-col cols="4">
            <v-card
    class="mx-auto"
    max-width="300"
    outlined
  >
    <v-list-item>
      <v-list-item-content>
        
        <v-list-item-title class="headline mb-5">Aerodromes</v-list-item-title>
         
            <v-select v-model="select1" :items="selectionDeparture" label="Departure" dense outlined></v-select>
          
          
            <v-select v-model="select2" :items="selectionArrival" label="Arrival" dense outlined></v-select>
          
          
            <v-select v-model="select3" :items="selectionAlternate" label="Alternate" dense outlined></v-select>

            <v-btn v-on:click="sendAerodromes" rounded color="deep-purple accent-4" >SET</v-btn>
          
      </v-list-item-content>

      
    </v-list-item>

    
      
    
  
      
    
  </v-card>
          </v-col>

        </v-row>
        <v-row>
          <v-select  :items="selectionResult" label="Alternate" dense outlined></v-select>
        </v-row>
      </v-container>
    </v-main>
    <!-- dees is de footer van de applicatie -->
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import {db} from "./scripts/index.js";
import calcRoute from "./scripts/main.js"


export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    
    select1: '',
    select2: '',
    select3: '',
    
    selectionDeparture: [],
    selectionArrival: [],
    selectionAlternate: [],
    selectionResult: []
  }),
  methods: {
    sendAerodromes: function(){
      this.selectionResult.push(this.select1);
      this.selectionResult.push(this.select2);
      this.selectionResult.push(this.select3);
      var route = calcRoute(this.select1,this.select2,this.select3,['ALBER','KONTI','TANGO']);
      console.log(route)
    },
    getsetAerodromes: function(db){
      const dbRefObject = db.ref().child('Aerodromes');
      var ad_name = [];
      var ad_icao = [];
      var ad_iata = [];
      var ad_coor = [];
      var ad_elev = [];
      var ad_type = [];
      var ad_country = [];
      var data2 = [];
      dbRefObject.on('value',snap => {
        var data = snap.val()
        for (var i in data){
          data2 = data[i];
          ad_name.push(data2.name);
          ad_icao.push(data2.icao);
          ad_iata.push(data2.iata);
          ad_elev.push(data2.elevation);
          ad_country.push(data2.country);
          ad_type.push(data2.type);
          ad_coor.push(data2.coor);
          }
        this.selectionDeparture = ad_icao
        this.selectionArrival = ad_icao
        this.selectionAlternate = ad_icao
      });
    },
    getsetWaypoints: function(db){
    const dbRefObject_wpt = db.ref().child('Waypoints');
    var wpt_name = [];
    var wpt_to_ad_icao = [];
    var wpt_coor = [];
    var wpt_country = [];
    var data2 = [];
    dbRefObject_wpt.on('value',snap => {
      var data = snap.val()
      for (var i in data){
        data2 = data[i];
        wpt_name.push(data2.name);
        wpt_to_ad_icao.push(data2.to_ad_icao);
        wpt_country.push(data2.country);
        wpt_coor.push(data2.coor);
        }

      return [wpt_name,wpt_coor,wpt_country,wpt_to_ad_icao]
      });
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
    this.getsetAerodromes(db);
    
  }
};
</script>

<style>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

::-webkit-scrollbar-thumb:hover {
  background: black;
}
</style>