<template>
    <v-container fluid>
    <v-data-table
            :headers="headers"
            :items="genes"
            :loading="loading"
            loading-text="Searching... Please wait"
            v-model="selected"
    >
        <template v-slot:item.plots="{ item }">
            <v-icon
                    small
                    class="mr-2"
                    @click="plotFunc(item)"
            >
                mdi-chart-line
            </v-icon>

        </template>
    </v-data-table>
        <PlotDialog
                v-bind:entry="dialog.entry"
                v-bind:survival="dialog.survival"
                @close="dialog.display = false"
                v-bind:display="dialog.display"
        />
    </v-container>
</template>

<script>
    import Client from "../../client/Client";
    import JSONBigInt from "json-bigint";
    import PlotDialog from "../dialog/PlotDialog";

    export default {
        name: "TableSection",
        components: {PlotDialog},
        data:()=>({
            headers: [
                {
                    text: 'Sample',
                    align: 'start',
                    value: 'sample',
                },
                { text: 'Gene', value: 'gene' },
                { text: 'Genomic Region', value: 'genomicRegion' },
                { text: 'Methylation Position', value: 'methylationPosition' },
                { text: 'Relation To Island', value: 'relationToIsland' },
                { text: 'Plot', value: 'plots', sortable: false }
            ],
            genes: [
            ],
            loading:false,
            selected:[],
            dialog:{
                entry : null,
                survival:null,
                display:false
            }
        }),
        props:{
          keyWord:String
        },
        mounted() {
            this.clear();
            this.search()
        },
        watch:{
          keyWord:function () {
              this.clear();
              this.search()
          }
        },
        methods:{
            clear:function(){
                this.genes.length = 0;
                this.selected.length = 0;
            },
            search:function () {
                this.loading = true;
                let model = this;
                Client.search(this.keyWord).then(function(response){
                    model.selected.length = 0;
                    model.genes.length=0;

                    for(let i of JSONBigInt({"storeAsString": true}).parse(response.data)){
                        model.genes.push(i)
                    }
                    model.loading = false
                    // eslint-disable-next-line no-unused-vars
                }).catch(function (error) {
                    model.loading = false
                })
            },
            // eslint-disable-next-line no-unused-vars
            plotFunc:function (item) {
                this.dialog.entry = item;
                this.dialog.survival = 'OS';
                this.dialog.display = true;
            }
        }
    }
</script>

<style scoped>

</style>