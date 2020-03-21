<template>
    <v-data-table
            v-model="selected"
            :headers="headers"
            :items="entries"
            :single-select="false"
            :single-expand="true"
            :expanded.sync="expanded"
            item-key="name"
            show-select
            class="elevation-1"
    >
        <template v-slot:item.action="{ item }">
            <v-icon
                    class="mr-2"
                    @click="dialog = true"
            >
                edit
            </v-icon>
            <v-dialog
                    v-model="dialog"
            >
                <v-card>
                    <v-card-title class="headline">Aligned Sequences
                        <v-spacer></v-spacer>
                        <v-btn
                                color="green darken-1"
                                text
                                @click="dialog = false"
                        >
                            Close
                        </v-btn>
                    </v-card-title>
                    <v-data-table dense :headers="sequenceHeader" :items="item.alignedSequenceList" item-key="name" class="elevation-1"></v-data-table>
                </v-card>
            </v-dialog>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        name: "TableSection",
        props:{
            entries:Array
        },
        data:()=>({
            dialog:false,
            expanded:[],
            selected:[],
           headers:[
               {
                   text: 'Gene ID',
                   align: 'left',
                   sortable: false,
                   value: 'geneID',
               },
               { text: 'Percentage of Identity', value: 'percentageOfIdentity' },
               { text: 'Sequences', value: 'action', sortable: false },
           ],
            sequenceHeader:[
                {
                    text: 'Start',
                    align: 'left',
                    sortable: false,
                    value: 'starts',
                },
                { text: 'End', value: 'ends' },
                { text: 'Coverage', value: 'coverage' },
                { text: 'Number of Gaps', value: 'numGaps' },
                { text: 'Sequence', value: 'sequence' }
            ]
        }),
        methods:{
        }
    }
</script>

<style scoped>

</style>