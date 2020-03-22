<template>
    <v-card
            class="mx-auto"
            max-width="900"
            outlined
    >
        <v-list-item>
            <v-list-item-content>

                <v-container fluid>
                    <v-row  no-gutters>
                        <v-col cols="12"><v-text-field label="Gene Symbol" :rules="rules" hide-details="auto" :loading="loading" v-model="keyWord">
                            <v-btn icon @click="search" slot="append"><v-icon>mdi-magnify</v-icon></v-btn>
                        </v-text-field></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-select
                                    :items="geneNames"
                                    @change="geneSelectChange"
                                    label="idref"
                                    :disabled="!selectionEnable"
                                    v-model="geneNameSelected"
                            ></v-select>
                        </v-col>
                        <v-col cols="4">
                            <v-select
                                    :items="chromosomeNames"
                                    @change="chromosomeSelectChange"
                                    label="Chromosome"
                                    :disabled="!selectionEnable"
                                    v-model="chromosomeNameSelected"
                            ></v-select>
                        </v-col>
                        <v-col cols="4">
                            <v-select
                                    :items="chromosomeRanges"
                                    label="Chromosome Range"
                                    :disabled="!selectionEnable"
                                    v-model="chromosomeRangeSelected"
                                    item-text="chromosomeRange"
                                    item-value="id"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                            <v-select
                                    :items="events"
                                    label="Survival"
                                    :disabled="!selectionEnable"
                                    v-model="eventSelected"
                                    item-text="text"
                                    item-value="value"
                            ></v-select>
                        </v-col>
                        <v-col cols="3">
                        <v-select
                                :items="tnm"
                                label="TNM"
                                :disabled="!selectionEnable"
                                v-model="tnmSelected"
                                item-text="text"
                                item-value="value"
                        ></v-select>
                        </v-col>
                        <v-col cols="2">
                            <v-select
                                    :items="race"
                                    label="Race"
                                    :disabled="!selectionEnable"
                                    v-model="raceSelected"
                                    item-text="text"
                                    item-value="value"
                            ></v-select>
                        </v-col>
                        <v-col cols="2">
                            <v-select
                                    :items="gender"
                                    label="Gender"
                                    :disabled="!selectionEnable"
                                    v-model="genderSelected"
                                    item-text="text"
                                    item-value="value"
                            ></v-select>
                        </v-col>
                        <v-col cols="2">
                            <v-select
                                    :items="split"
                                    label="Split"
                                    :disabled="!selectionEnable"
                                    v-model="splitSelected"
                                    item-text="text"
                                    item-value="value"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </v-list-item-content>
        </v-list-item>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="plot" :disabled="!plotEnabled" class="text-transform-none">Kaplan-Meier plot</v-btn>
        </v-card-actions>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-card>
</template>

<script>

    import Client from "../../client/Client";
    import JSONBigInt from "json-bigint"
    import Constant from "../../client/Constant";

    export default {
        name: "RequestSection",
        data:()=>({
            split:Constant.Split,
            splitSelected:null,
            gender:Constant.Gender,
            genderSelected:null,
            tnm:Constant.TNM,
            tnmSelected:null,
            race:Constant.Race,
            raceSelected:null,
            keyWord:"",
            overlay:false,
            loading:false,
            events: Constant.Survival,
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
            eventSelected:'OS',
            selectionEnable:false
        }),
        watch:{
            keyWord:function () {
                this.reset()
            }
        },
        computed:{
          plotEnabled:function () {
              return this.chromosomeRangeSelected !== null && this.chromosomeNameSelected !== null && this.geneNameSelected !== null
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
                model.eventSelected = 'OS';
                model.splitSelected=null;
                model.genderSelected=null;
                model.tnmSelected=null;
                model.raceSelected=null;
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
                let selectGene = model.chromosomeRangeSelected;
                // eslint-disable-next-line no-unused-vars
                Client.plot(this.eventSelected,selectGene,model.tnmSelected,model.genderSelected,model.raceSelected).then(function (response) {
                    model.$emit("onResult",'data:image/png;base64,'+Buffer.from(response.data, 'binary').toString('base64'));
                    model.overlay  = false;
                    // eslint-disable-next-line no-unused-vars
                }).catch(function (error) {
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
                        g.chromosomeRange = g.chromosomeStart +"-"+ g.chromosomeEnd;
                        model.chromosomeRanges.push(g)
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .v-btn {
        text-transform:none !important;
    }
</style>