import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import regis from '@/components/regis'
import taskRoom from '@/components/taskRoom'
import taskContent from '@/components/taskContent'
import serviceRoom from '@/components/serviceRoom'
import serviceContent from '@/components/serviceContent'
import mine from '@/components/mine'
import footers from '@/components/footers'
import minefabu from '@/components/minefabu'
import minetoudi from '@/components/minetoudi'
import minefw from '@/components/minefw'
import minerenzheng from '@/components/minerenzheng'
import message from '@/components/message'
import minewanshan from '@/components/minewanshan'
import mineinfor from '@/components/mineinfor'
import mineset from '@/components/mineset'
import headerS from '@/components/headerS'
import modifypassword from '@/components/modifypassword'
import pingjia from '@/components/pingjia'
import jzxqfb from '@/components/jzxqfb'
import jzfwfb from '@/components/jzfwfb'

Vue.use(Router)

// export default new Router({
const router = new Router({
    routes: [{
            path: '/',
            redirect: "taskRoom",
            component: taskRoom
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/regis',
            name: 'regis',
            component: regis
        },
        {
            path: '/taskRoom',
            name: 'taskRoom',
            component: taskRoom
        },
        {
            path: '/taskContent/:type/:pid/:userid/:my_type',
            name: 'taskContent',
            component: taskContent
        },
        {
            path: '/serviceRoom',
            name: 'serviceRoom',
            component: serviceRoom
        },
        {
            path: '/serviceContent/:type/:pid/:userid',
            name: 'serviceContent',
            component: serviceContent
        },
        {
            path: '/mine',
            name: 'mine',
            component: mine
        },
        {
            path: '/footers',
            name: 'footers',
            component: footers
        },
        {
            path: '/minefabu',
            name: 'minefabu',
            component: minefabu
        },
        {
            path: '/minetoudi',
            name: 'minetoudi',
            component: minetoudi
        },
        {
            path: '/minefw',
            name: 'minefw',
            component: minefw
        },
        {
            path: '/minerenzheng',
            name: 'minerenzheng',
            component: minerenzheng
        },
        {
            path: '/message',
            name: 'message',
            component: message
        },
        {
            path: '/minewanshan/:type',
            name: 'minewanshan',
            component: minewanshan
        },
        {
            path: '/mineinfor',
            name: 'mineinfor',
            component: mineinfor
        },
        {
            path: '/mineset',
            name: 'mineset',
            component: mineset
        },
        {
            path: '/headerS',
            name: 'headerS',
            component: headerS
        },
        {
            path: '/modifypassword',
            name: 'modifypassword',
            component: modifypassword
        },
        {
            path: '/pingjia/:type/:pid/:userid/:title',
            name: 'pingjia',
            component: pingjia
        },
        {
            path: '/jzxqfb/:id',
            name: 'jzxqfb',
            component: jzxqfb
        },
        {
            path: '/jzfwfb/:id',
            name: 'jzfwfb',
            component: jzfwfb
        }
    ]
});


// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('token');

        if (token === 'null' || token === '') {
            next('/login');
        } else {
            next();
        }
    }
});


export default router