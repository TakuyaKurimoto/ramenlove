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
      <Props :state="state" :radioButton="radioButton" :time="time"></Props>
      <!--<Add></Add>-->
      <Train />
      <!-----③これよりProps------>
    </v-main>
  </v-app>
</template>

<script>
import Frame from "./components/Frame";
import Clock from "@/components/Clock";
import Search from "@/components/Search";
import Train from "@/components/Train";
import Props from "@/components/Props";
//import Add from "@/components/Add.vue";

export default {
  name: "App",

  components: {
    Frame,
    Clock,
    Search,
    Train,
    Props,
    //Add,
  },

  data: function() {
    return {
      time: "",
      state: "",
      radioButton: "",
    };
  },
};
</script>
