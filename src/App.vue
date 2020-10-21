<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

// import {api} from "@/lib/api";
import {app} from "@/lib/app"

export default {
  name: 'App',
  components: {

  },
  async created() {
    app.vue = this;
    // config những url đc đi qua
    if (this.$route.path.startsWith("/register")
        || this.$route.path.startsWith("/login")
        || this.$route.path.startsWith("/home")
        || this.$route.path.startsWith("/detail")
        || this.$route.path.startsWith("/car")
        || this.$route.path.startsWith("/manage")){
      return;
    }
    this.$router.push("/login");
    // var res = await api.me();
    //
    // if (res.data){
    //   app.user = res.data;
    //   app.isLogin = true;
    // }
  },
  async beforeMount() {
    document.title = "GB - Website bán ô tô lướt lớn nhất Việt Nam";
  }
}
</script>

<style>
#app {
  font-family: "Dosis", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
