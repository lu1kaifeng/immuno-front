<template>
    <v-card
            class="mx-auto"
            max-width="900"
            outlined
    >
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="overline mb-4">Gene Searcher</v-list-item-title>
                <v-container fluid>
                    <v-row  no-gutters>
                        <v-col cols="12"><v-text-field label="Search Gene Name" :rules="rules" hide-details="auto" :loading="loading" v-model="keyWord">
                            <v-btn icon @click="search" slot="append"><v-icon>mdi-magnify</v-icon></v-btn>
                        </v-text-field></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-select
                                    :items="geneNames"
                                    @change="geneSelectChange"
                                    label="Select Gene"
                                    :disabled="!selectionEnable"
                                    v-model="geneNameSelected"
                            ></v-select>
                        </v-col>
                        <v-col cols="2">
                            <v-select
                                    :items="chromosomeNames"
                                    @change="chromosomeSelectChange"
                                    label="Select Chromosome"
                                    :disabled="!selectionEnable"
                                    v-model="chromosomeNameSelected"
                            ></v-select>
                        </v-col>
                        <v-col cols="4">
                            <v-select
                                    :items="chromosomeRanges"
                                    label="Select Chromosome Range"
                                    :disabled="!selectionEnable"
                                    v-model="chromosomeRangeSelected"
                            ></v-select>
                        </v-col>
                        <v-col cols="2">
                            <v-select
                                    :items="events"
                                    label="Select Event"
                                    :disabled="!selectionEnable"
                                    v-model="eventSelected"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </v-list-item-content>
        </v-list-item>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="plot" text :disabled="this.geneSelected === null || this.eventSelected === null">Plot</v-btn>
        </v-card-actions>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-card>
</template>

<script>

    import Client from "../../client/Client";
    import JSONBigInt from "json-bigint"

    export default {
        name: "RequestSection",
        data:()=>({
            keyWord:"",
            overlay:false,
            loading:false,
            events: ['OS'],
            geneLists: [
            ],
            geneNames:[],
            chromosomeNames:[],
            chromosomeRanges:[],
            rules: [
                value => !!value || 'Required.',
            ],
            chromosomeRangeSelected:null,
            chromosomeNameSelected:null,
            geneNameSelected:null,
            eventSelected:null,
            selectionEnable:false
        }),
        watch:{
            keyWord:function () {
                this.reset()
            }
        },
        methods:{
            reset:function(){
                let model = this;
                model.geneLists.length = 0;
                model.geneNames.length = 0;
                model.chromosomeNames.length = 0;
                model.chromosomeRanges.length = 0;
                model.chromosomeRangeSelected = null;
                model.chromosomeNameSelected = null;
                model.geneNameSelected = null;
                model.eventSelected = null;
                model.selectionEnable = false;
            },
            search:function () {
                this.loading = true;
                let model = this;
                Client.search(this.keyWord).then(function(response){
                    for(let i of JSONBigInt({"storeAsString": true}).parse(response.data)){
                        model.geneLists.push(i)
                    }
                    for(let g of model.geneLists){
                            model.geneNames.push(g.gene +"-"+g.sample)
                    }
                    model.loading = false;
                    model.selectionEnable = true;
                    // eslint-disable-next-line no-unused-vars
                }).catch(function (error) {
                    alert(error);
                    model.loading = false
                })
            },
            plot:function(){
                this.overlay  = true;
                let model = this;
                let selectGene;
                for(let g of this.geneLists){
                    if((this.geneNameSelected === g.gene +"-"+g.sample) && this.chromosomeNameSelected === g.chromosome && this.chromosomeRangeSelected === g.chromosomeStart + "-" + g.chromosomeEnd){
                        selectGene = g;
                    }
                }
                // eslint-disable-next-line no-unused-vars
                Client.plot(this.eventSelected,selectGene.id).then(function (response) {
                    model.$emit("onResult",'data:image/png;base64,'+Buffer.from(response.data, 'binary').toString('base64'));
                    model.overlay  = false;
                    // eslint-disable-next-line no-unused-vars
                }).then(function (error) {
                    alert(error);
                    model.overlay  = false;
                })
            },
            geneSelectChange:function () {
                let model = this;
                for(let g of model.geneLists){
                    if(model.geneNames.includes(g.gene +"-"+g.sample)){
                        model.chromosomeNames.push(g.chromosome)
                    }
                }
            },
            chromosomeSelectChange:function () {
                let model = this;
                for(let g of model.geneLists){
                    if(model.chromosomeNames.includes(g.chromosome)){
                        model.chromosomeRanges.push(g.chromosomeStart + "-" + g.chromosomeEnd)
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>