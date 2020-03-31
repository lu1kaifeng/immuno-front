<template>
        <v-dialog
                v-model="display"
                width="500"
        >
            <v-card>
                <v-card-title class="headline"></v-card-title>

                <v-card-text >
                    <PlotSection v-bind:id="entry.id" v-bind:entry="entry" v-bind:re-render="reRender"/>
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
        // eslint-disable-next-line vue/no-unused-components
        components: {PlotSection},
        props:{
            entry : Object,
            display:Boolean
        },
        data:()=>({
            reRender:0
        }),
        watch:{
            display:function(){
                if(this.display === true){
                    this.reRender++;
                }
                if(this.display === false) this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>
