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
        <v-row>
          <v-col cols="1">
            <v-select :items="selection2" label="Departure" dense outlined></v-select>
          </v-col>
          <v-col cols="1">
            <v-select :items="selection2" label="Arrival" dense outlined></v-select>
          </v-col>
          <v-col cols="1">
            <v-select :items="selection2" label="Tussen" dense outlined></v-select>
          </v-col>
          
        </v-row>

        <!-- row 2 --------------------------------------------------------------------------------------------------------- -->
        <v-row></v-row>
        <v-row></v-row>
      </v-container>
    </v-main>
    <!-- dees is de footer van de applicatie -->
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    items: {
      A: { text: "jello" },
      B: { text: "thomas" },
      C: { text: "thomas" },
      D: { text: "thomas" },
      E: { text: "thomas" },
      F: { text: "thomas" },
    },
    selection: {
      airport1: { text: "airport 1" },
      airport2: { text: "no" },
      airport3: { text: "yes" },
    },
    selection2: ["optie1", "optie2", "hello"],
  }),
  methods: {
    selectedAirport1: function (textselection) {
      this.selection.airport1.text = textselection;
    },
  },
  created() {
    this.$vuetify.theme.dark = true;
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