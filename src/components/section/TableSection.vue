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
        <template v-slot:item.splits="{ item }">
            <v-select
                    :items="splitItems"
                    item-text="text"
                    item-value="value"
                    v-model="item.split"
                    dense
            ></v-select>
        </template>
        <template v-slot:item.survivals="{ item }">
            <v-select
                    :items="survivalItems"
                    item-text="text"
                    item-value="value"
                    v-model="item.survival"
                    dense
            ></v-select>
        </template>
        <template v-slot:item.tnms="{ item }">
            <v-select
                    :items="tnmItems"
                    item-text="text"
                    item-value="value"
                    v-model="item.tnm"
                    dense
            ></v-select>
        </template>
        <template v-slot:item.races="{ item }">
            <v-select
                    :items="raceItems"
                    item-text="text"
                    item-value="value"
                    v-model="item.race"
                    dense
            ></v-select>
        </template>
        <template v-slot:item.genders="{ item }">
            <v-select
                    :items="genderItems"
                    item-text="text"
                    item-value="value"
                    v-model="item.gender"
                    dense
            ></v-select>
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
    import Constant from "../../client/Constant";

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
                { text: 'TNM', value: 'tnms', sortable: false },
                { text: 'Gender', value: 'genders', sortable: false },
                { text: 'Race', value: 'races', sortable: false },
                { text: 'Survival', value: 'survivals', sortable: false },
                { text: 'Split', value: 'splits', sortable: false },
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
            },
            splitItems:Constant.Split,
            survivalItems:Constant.Survival,
            tnmItems:Constant.TNM,
            raceItems:Constant.Race,
            genderItems:Constant.Gender
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
                        i.tnm = Constant.TNM[0].value;
                        i.gender = Constant.Gender[0].value;
                        i.race = Constant.Race[0].value;
                        i.survival = Constant.Survival[0];
                        i.split = Constant.Split[0].value;
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
                this.dialog.display = true;
            }
        }
    }
</script>

<style scoped>

</style>