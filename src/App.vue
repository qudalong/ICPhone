<template>
    <div id="app">
    
        <!-- <div @click='setinterval'> -->
        <div>
    
            <router-view v-on:footer="footer" v-on:header="header" />
    
        </div>
    
    </div>
</template>

<script>
import login from "./components/login";
import regis from "./components/regis";
import taskRoom from "./components/taskRoom";
import taskContent from "./components/taskContent";
import serviceRoom from "./components/serviceRoom";
import serviceContent from "./components/serviceContent";
import mine from "./components/mine";
import footers from "./components/footers";
import minefabu from "./components/minefabu";
import minetoudi from "./components/minetoudi";
import minefw from "./components/minefw";
import minerenzheng from "./components/minerenzheng";
import minewanshan from "./components/minewanshan";
import mineinfor from "./components/mineinfor";
import mineset from "./components/mineset";
import headerS from "./components/headerS";
import modifypassword from "./components/modifypassword";
import pingjia from "./components/pingjia";
import jzxqfb from "./components/jzxqfb";
import jzfwfb from "./components/jzfwfb";
export default {
    name: "App",
    components: {
        login,
        regis,
        taskRoom,
        taskContent,
        serviceRoom,
        serviceContent,
        mine,
        footers,
        minefabu,
        minefw,
        minerenzheng,
        minewanshan,
        mineinfor,
        mineset,
        minetoudi,
        headerS,
        modifypassword,
        pingjia,
        jzxqfb

    },
    created() {
		console.log('App...................')
    },
    data() {
        return {
            footer_show: true,
            header_show: true,
            title: "登录",
            timer: null,
            i: 0
        };
    },
    methods: {

        footer(bool) {
            this.footer_show = bool;
        },
        header(bool) {
            this.header_show = bool;
        },
    }
};
</script>

<style>
#app {
    text-align: center;
    background-color: #efefef;
    margin: 0;
    padding: 0;
    font-size: 0.36rem;
    position: relative;
}

a {
    color: black;
}
</style>
