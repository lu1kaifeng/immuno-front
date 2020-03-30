<template>
        <v-dialog
                v-model="display"
                width="500"
        >
            <v-card>
                <v-card-title class="headline"></v-card-title>

                <v-card-text >
                    <PlotSection v-bind:id="entry.id" v-bind:entry="entry" @loaded="load = false"/>
                    <v-skeleton-loader
                            v-if="load"
                            class="mx-lg-5"
                            type="card"
                    ></v-skeleton-loader>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="green darken-1"
                            text
                            @click="$emit('close')"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script>
    import PlotSection from "../section/PlotSection";
    export default {
        name: "PlotDialog",
        components: {PlotSection},
        props:{
            entry : Object,
            display:Boolean
        },
        data:()=>({
            load:false
        }),
        watch:{
            "entry.id":function () {
                this.load = false
            },
            display:function(){
                if(this.display === false) this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>