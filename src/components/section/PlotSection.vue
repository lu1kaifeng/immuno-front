<template>
    <!--<v-img v-if="plot !== null" :src="plot" alt="plot" width="320" height="320"/>-->
    <v-img
            :src="plot"
            lazy-src="https://picsum.photos/id/11/100/60"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="500"
            max-height="300"
            :key="rerenderKey"
    >
        <template v-slot:placeholder>
            <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
            >
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
        </template>
    </v-img>
</template>

<script>
    import Client from "../../client/Client";

    export default {
        name: "PlotSection",
        data:()=>({
           plot:undefined,
            rerenderKey:0
        }),
        props:{
            id:String,
            entry:Object
        },
        watch:{
          id:function () {
              this.plot = undefined;
              this.forceRerender();
              this.plotFunc();
          },
            survival:function () {
                this.plot =  undefined;
                this.forceRerender();
                this.plotFunc()
          }
        },
        methods:{
            plotFunc:function(){
                let model = this;
                // eslint-disable-next-line no-unused-vars

                Client.plot(this.entry.survival,this.id,this.entry.tnm,this.entry.gender,this.entry.race).then(function (response) {
                    model.plot = 'data:image/png;base64,'+Buffer.from(response.data, 'binary').toString('base64');
                    model.$emit("loaded")
                    // eslint-disable-next-line no-unused-vars
                }).then(function (error) {
                    model.$emit("loaded")

                })
            },
            forceRerender() {
                this.rerenderKey += 1;
            }
        }
    }
</script>

<style scoped>

</style>