// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import store from './vuex/store';
import axios from 'axios'
//设置axios为form-data

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.transformRequest = [function(data) {
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]
var token = localStorage.getItem('token') || "";
console.log(typeof token)
    // http response 服务器响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code == 500) {
            router.replace({
                path: "/login",
                querry: {
                    redirect: router.currentRoute.fullPath
                } //从哪个页面跳转
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    });

Vue.prototype.$axios = axios //将axios挂载在Vue实例原型上
axios.defaults.withCredentials = true;
Vue.use(Vant);
// import Toast  from 'vant';

// Vue.use(Toast);
Vue.config.productionTip = false

//触摸
function vueTouch(el, binding, type) { //触屏函数
    var _this = this;
    this.obj = el;
    this.binding = binding;
    this.touchType = type;
    this.vueTouches = { x: 0, y: 0 }; //触屏坐标
    this.vueMoves = true;
    this.vueLeave = true;
    this.vueCallBack = typeof(binding.value) == "object" ? binding.value.fn : binding.value;
    this.obj.addEventListener("touchstart", function(e) {
        _this.start(e);
    }, false);
    this.obj.addEventListener("touchend", function(e) {
        _this.end(e);
    }, false);
    this.obj.addEventListener("touchmove", function(e) {
        _this.move(e);
    }, false);
};
vueTouch.prototype = {
    start: function(e) { //监听touchstart事件
        this.vueMoves = true;
        this.vueLeave = true;
        this.longTouch = true;
        this.vueTouches = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY };
        this.time = setTimeout(function() {
            if (this.vueLeave && this.vueMoves) {
                this.touchType == "longtap" && this.vueCallBack(this.binding.value, e);
                this.longTouch = false;
            };
        }.bind(this), 1000);
    },
    end: function(e) { //监听touchend事件
        var disX = e.changedTouches[0].pageX - this.vueTouches.x; //计算移动的位移差
        var disY = e.changedTouches[0].pageY - this.vueTouches.y;
        clearTimeout(this.time);
        if (Math.abs(disX) > 10 || Math.abs(disY) > 100) { //当横向位移大于10，纵向位移大于100，则判定为滑动事件
            this.touchType == "swipe" && this.vueCallBack(this.binding.value, e); //若为滑动事件则返回
            if (Math.abs(disX) > Math.abs(disY)) { //判断是横向滑动还是纵向滑动
                if (disX > 10) {
                    this.touchType == "swiperight" && this.vueCallBack(this.binding.value, e); //右滑
                };
                if (disX < -10) {
                    this.touchType == "swipeleft" && this.vueCallBack(this.binding.value, e); //左滑
                };
            } else {
                if (disY > 10) {
                    this.touchType == "swipedown" && this.vueCallBack(this.binding.value, e); //下滑
                };
                if (disY < -10) {
                    this.touchType == "swipeup" && this.vueCallBack(this.binding.value, e); //上滑
                };
            };
        } else {
            if (this.longTouch && this.vueMoves) {
                this.touchType == "tap" && this.vueCallBack(this.binding.value, e);
                this.vueLeave = false
            };
        };
    },
    move: function(e) { //监听touchmove事件
        this.vueMoves = false;
    }
};
Vue.directive("tap", { //点击事件
    bind: function(el, binding) {
        new vueTouch(el, binding, "tap");
    }
});
Vue.directive("swipe", { //滑动事件
    bind: function(el, binding) {
        new vueTouch(el, binding, "swipe");
    }
});
Vue.directive("swipeleft", { //左滑事件
    bind: function(el, binding) {
        new vueTouch(el, binding, "swipeleft");
    }
});
Vue.directive("swiperight", { //右滑事件
    bind: function(el, binding) {
        new vueTouch(el, binding, "swiperight");
    }
});
Vue.directive("swipedown", { //下滑事件
    bind: function(el, binding) {
        new vueTouch(el, binding, "swipedown");
    }
});
Vue.directive("swipeup", { //上滑事件
    bind: function(el, binding) {
        new vueTouch(el, binding, "swipeup");
    }
});
Vue.directive("longtap", { //长按事件
    bind: function(el, binding) {
        new vueTouch(el, binding, "longtap");
    }
});



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})