<template>
  <v-app>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <v-app-bar
                  app
                  color="primary"
                  dark
                  dense
          ></v-app-bar>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Alignment/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Alignment from "@/components/Alignment";
export default {
  name: 'App',

  components: {
    Alignment
  },

  data: () => ({
    //
  }),
  mounted:function () {
  }
};
</script>
