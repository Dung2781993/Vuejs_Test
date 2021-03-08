import Vue from "vue";
import Router from "vue-router";
import Login from '@/components/Login'
import ContactList from '@/components/ContactList'
import AddContact from '@/components/AddContact'

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
        {
            path: "/addContact",
            name: "addContact",
            component: AddContact
        },
        // otherwise redirect to home
        { path: '*', redirect: '/' }
    ]
});

router.beforeEach((to, from, next) => {
    if (!localStorage.getItem('user-token') && (to.fullPath == '/' || to.fullPath == 'addContact')) {
        return next('/login');
    }
    if(localStorage.getItem('user-token') && to.fullPath == '/login') {
        return next('/');
    }
    next();
})
export default router;