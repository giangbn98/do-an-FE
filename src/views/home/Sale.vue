<template>
    <div style="margin: auto">
        <div>
        <header-bar-sale></header-bar-sale>
        </div>
        <div style="display: flex; width: 70%; margin-left: 10%">
            <Brand></Brand>
            <ListPost></ListPost>
        </div>

    </div>
</template>

<script>
    import HeaderBarSale from "@/views/components/HeaderBarSale";
    import Brand from "@/views/components/Brand";
    import ListPost from "@/views/components/ListPost";
    import {api} from "@/lib/api";
    import {app} from "@/lib/app";

    export default {
        components: {HeaderBarSale,
            Brand,
            ListPost},
        data(){
            return{

            }
        },
        methods:{
            async fetchAllBrand(){
                var response = await api.callAPI("GET","/api/brand", null);
                if (response.data) app.brands = response.data;
            }
        },
        beforeMount(){
            this.fetchAllBrand();
        }
    }
</script>

<style scoped>

</style>