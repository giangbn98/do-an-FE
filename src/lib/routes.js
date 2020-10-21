import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Register from "../views/Register";
import Login from "@/views/Login";
import Sale from "@/views/home/Sale";
import CarDetail from "@/views/components/CarDetail";
import FindCar from "@/views/components/FindCar";
import PostManage from "@/views/components/PostManage";

Vue.use(VueRouter);

const routes = [
    { path : "/", component: Home},
    { path: "/register", component: Register},
    { path: "/login", component: Login },
    { path: "/home", component: Sale},
    { path: "/detail/:id", component: CarDetail},
    { path: "/car", component: FindCar},
    { path: "/manage", component: PostManage}
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
   if (to.path.includes("home")){
       next();
       return;
   }

   if (to.path.includes("register")){
       next();
       return;
   }
    if (to.path.includes("detail")){
        next();
        return;
    }
   next();
});

export default router;