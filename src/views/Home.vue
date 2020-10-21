<template>
    <div>
        <header-bar/>
    </div>
</template>

<script>
    import HeaderBar from "@/views/components/HeaderBarHome";

    export default {
        components:{
            HeaderBar,
        },

        methods:{

        },
        beforeMount() {

        }
    }
</script>

<style scoped>
.header{
    display: flex;

}
#menu {
    margin-left: 20px;
    display: flex;
    align-items: center;
}
    #menu ul{
        display: flex;
        list-style: none;
    }
    #menu li{
        margin-left: 20px;
    }
    a {
        text-decoration: none;
    }
</style>