<template>
  <v-app>
    <v-app-bar app color="teal lighten-3" dark>
      <div class="d-flex align-center">
        <v-toolbar-title class="display-1 font-weight-bold"
          >Application Name</v-toolbar-title
        >
      </div>
    </v-app-bar>

    <v-main>
      <Frame />
      <Clock />
      <!--
      <div>
        <Clock class="clock" />
      </div>
      -->
      <Search />
      <Train />
    </v-main>
  </v-app>
</template>

<script>
import Frame from "./components/Frame";
import Clock from "@/components/Clock";
import Search from "@/components/Search";
import Train from "@/components/Train";

export default {
  name: "App",

  components: {
    Frame,
    Clock,
    Search,
    Train,
  },

  data: () => ({
    //
  }),
};
</script>
