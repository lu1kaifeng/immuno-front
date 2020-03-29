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
                        <v-col cols="12"><v-text-field label="Search Gene Name" :rules="rules" hide-details="auto" v-model="requestKey">
                            <v-btn icon @click="search" slot="append" :disabled="requestKey === ''"><v-icon>mdi-magnify</v-icon></v-btn>
                        </v-text-field></v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12">
                        </v-col>
                    </v-row>
                </v-container>
            </v-list-item-content>
        </v-list-item>

        <v-card-actions>
        </v-card-actions>
        <ProbeSelectionDialog @close="close" v-bind:key-word="requestKey" v-bind:dialog="dialog"/>
    </v-card>
</template>

<script>

    import ProbeSelectionDialog from "../dialog/ProbeSelectionDialog";
    export default {
        name: "RequestSection",
        components: {ProbeSelectionDialog},
        data:()=>({
            requestKey:"",
            dialog:false,
            rules: [
                value => !!value || 'Required.',
            ],
        }),
        methods:{
            search:function () {
                this.dialog = true
            },
            close:function () {
                this.dialog = false
            }
        }
    }
</script>

<style scoped>

</style>