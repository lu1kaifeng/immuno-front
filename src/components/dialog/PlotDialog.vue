<template>
        <v-dialog
                v-model="display"
        >
            <v-card>
                <v-card-title class="headline"></v-card-title>
                    <v-simple-table dense>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-left">Sample</th>
                                <th class="text-left">Gene</th>
                                <th class="text-left">Genomic Region</th>
                                <th class="text-left">Methylation Position</th>
                                <th class="text-left">Relation To Island</th>
                                <th class="text-left">TNM</th>
                                <th class="text-left">Gender</th>
                                <th class="text-left">Race</th>
                                <th class="text-left">Survival</th>
                                <th class="text-left">Split</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{{ entry.sample }}</td>
                                <td>{{ entry.gene }}</td>
                                <td>{{ entry.genomicRegion }}</td>
                                <td>{{ entry.methylationPosition }}</td>
                                <td>{{ entry.relationToIsland }}</td>
                                <td>{{ entry.tnm===null?'All':entry.tnm }}</td>
                                <td>{{ entry.gender===null?'All':entry.gender  }}</td>
                                <td>{{ entry.race===null?'All':entry.race  }}</td>
                                <td>{{ entry.survival }}</td>
                                <td>{{ entry.split }}</td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
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
