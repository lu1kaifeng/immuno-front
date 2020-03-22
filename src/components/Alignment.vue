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
                <img v-if="plot !== null" :src="plot" alt="plot"/>
            </v-col>
            <v-col cols="2"><v-spacer/></v-col>
        </v-row>
    </v-container>
</template>

<script>
    import RequestSection from "@/components/section/RequestSection";
    export default {
        name: "Alignment",
        components:{
            RequestSection
        },
        data:()=>({
            entries:[],
            plot:null
        }),
        methods:{
            onResult:function (plot) {
                this.plot =plot;
            }
        }
    }
</script>

<style scoped>

</style>