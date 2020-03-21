<template>
    <v-container>
        <v-row>
            <v-col cols="2"><v-spacer/></v-col>
            <v-col cols="8" class="mt-xl-12 mt-lg-10 mt-md-8 mt-sm-8">
                <RequestSection @onResult="onResult"/>
            </v-col>
            <v-col cols="2"><v-spacer/></v-col>
        </v-row>
        <v-row>
            <v-col cols="2"><v-spacer/></v-col>
            <v-col cols="8" class="mt-xl-12 mt-lg-10 mt-md-8 mt-sm-8">
                <TableSection v-if="entries.length !== 0" v-bind:entries="entries"/>
            </v-col>
            <v-col cols="2"><v-spacer/></v-col>
        </v-row>
    </v-container>
</template>

<script>
    import RequestSection from "@/components/section/RequestSection";
    import TableSection from "@/components/section/TableSection";
    export default {
        name: "Alignment",
        components:{
            TableSection,
            RequestSection
        },
        data:()=>({
            entries:[]
        }),
        methods:{
            onResult:function (entries) {
                this.entries.length = 0;
                for(let entry of entries){
                    this.entries.push(entry)
                }
            }
        }
    }
</script>

<style scoped>

</style>