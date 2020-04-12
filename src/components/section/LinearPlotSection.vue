<template>
    <!--<v-img v-if="plot !== null" :src="plot" alt="plot" width="320" height="320"/>-->
    <v-img
            :src="plot"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="500"
            max-height="500"
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
            entry:Object,
            reRender:Number
        },
        mounted() {
            this.reload()
        },
        watch:{
            reRender:function () {
                this.reload();
            }
        },
        methods:{
            reload:function(){
                this.plotFunc();
                this.forceRerender();
            },
            plotFunc:function(){
                let model = this;
                // eslint-disable-next-line no-unused-vars

                Client.linearPlot(model.entry.gene,model.entry.sample).then(function (response) {
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
