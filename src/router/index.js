import Vue from "vue";
import Router from "vue-router";
import Login from '@/components/Login'
import ContactList from '@/components/ContactList'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/",
            name: "contactList",
            component: ContactList
        },
        // otherwise redirect to home
        { path: '*', redirect: '/' }
    ]
});

router.beforeEach((to, from, next) => {
    if (!localStorage.getItem('user-token') && to.fullPath == '/') {
        return next('/login');
    }
    if(localStorage.getItem('user-token') && to.fullPath == '/login') {
        return next('/');
    }
    next();
})
export default router;