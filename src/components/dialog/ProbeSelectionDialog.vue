<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="$emit('close')">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Select</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                </v-toolbar>

                <v-list three-line subheader>
                    <v-subheader>User Controls</v-subheader>
                    <TableSection v-if="dialog" v-bind:key-word="keyWord"/>
                </v-list>
                <v-divider></v-divider>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import TableSection from "../section/TableSection";
    export default {
        name: "ProbeSelectionDialog",
        components: {TableSection},
        props:{
          keyWord:String,
            dialog:Boolean
        },
        data:()=>({
            notifications: false,
            sound: true,
            widgets: false,
        })
    }
</script>

<style scoped>

</style>