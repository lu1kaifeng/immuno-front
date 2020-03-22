<template>
    <v-card
            class="mx-auto"
            max-width="700"
            outlined
    >
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="overline mb-4">Gene Searcher</v-list-item-title>
                <v-container fluid>
                    <v-row  no-gutters>
                        <v-col cols="12"><v-text-field label="Search Gene Name" :rules="rules" hide-details="auto" v-model="request.keyWord">
                            <v-btn icon @click="search" slot="append"><v-icon>mdi-magnify</v-icon></v-btn>
                        </v-text-field></v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-data-table
                                    :headers="headers"
                                    :items="genes"
                                    show-select
                                    :loading="loading"
                                    loading-text="Searching... Please wait"
                                    :single-select="true"
                                    v-model="selected"
                            ></v-data-table>
                        </v-col>
                    </v-row>
                </v-container>
            </v-list-item-content>
        </v-list-item>

        <v-card-actions>
            <v-select
                    :items="items"
                    label="Select Event"
                    v-model="eventSelected"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn @click="plot" text :disabled="this.selected.length === 0 || this.eventSelected.length === 0">Plot</v-btn>
        </v-card-actions>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-card>
</template>

<script>
    import AlignmentRequest from "@/model/AlignmentRequest";
    import Client from "../../client/Client";
    import JSONBigInt from "json-bigint"

    export default {
        name: "RequestSection",
        data:()=>({
            request:new AlignmentRequest(),
            overlay:false,
            loading:false,
            headers: [
                {
                    text: 'Sample',
                    align: 'start',
                    sortable: false,
                    value: 'sample',
                },
                { text: 'Gene', value: 'gene' },
                { text: 'Chromosome', value: 'chromosome' },
                { text: 'Start', value: 'chromosomeStart' },
                { text: 'End', value: 'chromosomeEnd' },
            ],
            items: ['OS'],
            genes: [
            ],
            rules: [
                value => !!value || 'Required.',
            ],
            selected:[],
            eventSelected:[]
        }),
        methods:{
            search:function () {
                this.loading = true;
                let model = this;
                Client.search(this.request.keyWord).then(function(response){
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
            plot:function(){
                this.overlay  = true;
                let model = this;
                // eslint-disable-next-line no-unused-vars
                Client.plot(this.eventSelected,this.selected[0].id).then(function (response) {
                    model.$emit("onResult",'data:image/png;base64,'+Buffer.from(response.data, 'binary').toString('base64'));
                    model.overlay  = false;
                    // eslint-disable-next-line no-unused-vars
                }).then(function (error) {
                    model.overlay  = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>