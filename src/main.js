import Vue from 'vue'
import App from './App.vue'
import router from "./lib/routes"
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import { app } from "./lib/app";
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

Vue.config.productionTip = false

locale.use(lang)

export const eventBus = new Vue();

Vue.mixin({
  data: () => ({
    app,
  }),
  methods:{
    alertSuccess(message){
      app.vue.$message({
        showClose: true,
        message: message,
        type:'success'
      })
    },
    alertError(message){
      app.vue.$message({
        showClose: true,
        message: message,
        type:'error'
      })
    },

    upperCaseFirstLetter(letter){
      return letter.charAt(0).toUpperCase() + letter.slice(1);
    },
    formatCarType(type){
      if (type == "OLD") return "Xe cũ"
      else return "Xe mới"
    },
    formatOrigin(post){
      if (post.originType == "IMPORT"){
        return "Xe nhập khẩu";
      }else return "Xe lắp ráp trong nước";
    },
    formatGear(post){
      if (post.gearType == "MT") return "Số tay";
      else return "Số tự động";
    },
    formatPrice(price){
      var num = price / 1000;
      if (num >= 1){
        return num + " tỷ đồng ";
      }
      return price + " triệu đồng";
    },
    formatFuel(post){
      var fuel = "";
      switch (post.fuelType) {
        case "GASOLINE":
          fuel =  "Xăng";
          break;
        case "DIESEL":
          fuel =  "Dầu";
          break;
        case "ELECTRIC":
          fuel = "Điện"
          break;
        case "HYBRID":
          fuel = "Xăng và Điện";
          break;
      }
      return fuel;
    },

    formatWheelType(wheelType){
      var wheel = "";
      switch (wheelType) {
        case "FWD":
          wheel =  "cầu trước";
          break;
        case "RWD":
          wheel =  "cầu sau";
          break;
        case "4WD":
          wheel = "4 bánh"
          break;
        case "AWD":
          wheel = "4 bánh toàn thời gian";
          break;
      }
      return wheel;
    },
    formatCarName(post){
      return post.brand +" "+ post.name +" "+ post.version + " " + post.yearOfManufacture;
    },
    formatDetail(post){
      return this.formatOrigin(post)+", đã đi "
          + post.numberOfKmMoved+"km, "
          + ", màu "+ post.colorOutside
          +", nội thất " + post.colorInside
          +", máy "+ this.formatFuel(post)
          +", "+ this.formatGear(post)+" ...";


    },
    formatTime(createAt){
        var date = new Date(createAt);
        return date.toLocaleString();
    },
    getTextBird(description, length){
        return description.substr(0, length) + '...';
    }
  }
})

Vue.use(ElementUI);

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)



// window.app = new Vue({
//   router,
//   render: h => h(App),
// }).$mount('#app')

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
