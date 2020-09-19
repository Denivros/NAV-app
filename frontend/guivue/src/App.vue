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
          
          
            <v-select v-model="select3" :items="selectionTussen" label="Tussen" dense outlined></v-select>

            <v-btn v-on:click="sendAerodromes" rounded color="deep-purple accent-4" >SET</v-btn>
          
      </v-list-item-content>

      
    </v-list-item>

    
      
    
  
      
    
  </v-card>
          </v-col>

        </v-row>
        <v-row>
          <v-select  :items="selectionResult" label="Tussen" dense outlined></v-select>
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
import icao from "./scripts/index.js";

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    
    select1: '',
    select2: '',
    select3: '',
    
    selectionDeparture: ["select1", "optie2", "hello"],
    selectionArrival: ["select1", "optie2", "hello"],
    selectionTussen: ["select1", "optie2", "hello"],
    selectionResult: []
  }),
  methods: {
    sendAerodromes: function(){
      this.selectionResult.push(this.select1);
      this.selectionResult.push(this.select2);
      this.selectionResult.push(this.select3);

    },
    
  },
  
  created() {
    this.$vuetify.theme.dark = true;
    console.log(icao);
  },
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