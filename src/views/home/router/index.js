import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


const Home=()=>import("../routerviews/Home.vue");
const MyWork=()=>import("../routerviews/MyWork.vue");
const MyCourse=()=>import("../routerviews/MyCourse.vue");


export default new VueRouter({
    routes:[
        {
            path:"/home",
            component:Home
        },
        {
            path:"/mywork",
            component:MyWork
        },
        {
            path:"/mycourse",
            component:MyCourse
        },
        {
            path:"/",
            redirect:"/home"
        }
    ]
})