<template>
    <div class="app">
    
        <div class="headers">
    
            <van-nav-bar :title="msg" left-arrow @click-left="onClickLeft" />
    
        </div>
    
        <div class="content">
    
            <!-- 兼职需求发布 -->
    
            <van-cell-group v-show="id == 0">
    
                <van-field v-model="username" clearable disabled label="发布人" />
    
                <van-field v-model="title" type="text" label="标题" placeholder="请输入标题" clearable />
    
                <van-field v-model="contact" type="text" label="联系人" placeholder="请输入联系人" clearable />
    
                <div class="pass">
    
                    <van-field v-model="tel" :type="isPass ? 'password':'tel'" label="联系电话" placeholder="请输入联系电话" clearable />
    
                    <div class="iptradio">
    
                        <van-checkbox v-model="checked">是否隐藏</van-checkbox>
    
                    </div>
    
                </div>
    
                <!-- <van-field
    
              v-model="znS"
    
              readonly
    
              label="职能"
    
              right-icon="arrow-down"
    
              placeholder="请选择"
    
              @click="znClick"
    
            /> -->
    
                <van-collapse v-model="activeNames">
    
                    <van-collapse-item title="职能" name="1">
    
                        <van-checkbox-group v-model="result_znarr">
    
                            <van-cell-group>
    
                                <van-cell v-for="(item, index) in znarr" clickable :key="item" :title="item">
    
                                    <van-checkbox :name="item" ref="checkboxes" slot="right-icon" />
    
                                </van-cell>
    
                                <van-field v-if="result_znarr.indexOf('其他') > -1" v-model="other_znarr" type="textarea" class="area" placeholder="请输入" />
    
                            </van-cell-group>
    
                        </van-checkbox-group>
    
                    </van-collapse-item>
    
                </van-collapse>
    
    
    
                <van-collapse v-model="activeNames">
    
                    <van-collapse-item title="产品方向" name="2">
    
                        <van-checkbox-group v-model="result_cparr">
    
                            <van-cell-group>
    
                                <van-cell v-for="(item, index) in cparr" clickable :key="item" :title="item">
    
                                    <van-checkbox :name="item" ref="checkboxes" slot="right-icon" />
    
                                </van-cell>
    
                                <van-field v-if="result_cparr.indexOf('其他') > -1" v-model="other_cparr" type="textarea" class="area" placeholder="请输入" />
    
                            </van-cell-group>
    
                        </van-checkbox-group>
    
                    </van-collapse-item>
    
                </van-collapse>
    
    
    
                <van-field v-model="skillKey" clearable label="技能关键字" placeholder="请输入技能关键字" />
    
                <van-field v-model="tool" clearable label="熟悉的EDA工具" placeholder="请输入熟悉的EDA工具" />
    
                <van-field v-model="skill" type="textarea" class="area" label="经历技能介绍" placeholder="请输入经历或技能介绍" />
    
                <van-field v-model="lesstimeS" readonly label="每天可至少工作" right-icon="arrow-down" placeholder="请选择" @click="lesstimeClick" />
    
                <van-field v-model="lessworkS" readonly label="每周业余可工作" right-icon="arrow-down" placeholder="请选择" @click="lessworkClick" />
    
                <van-field v-model="workhours" clearable label="工作时长" readonly />
    
                <van-field v-model="modelS" readonly label="工作模式" right-icon="arrow-down" placeholder="请选择" @click="modelClick" />
    
                <van-field v-model="adS" readonly label="工作地点" right-icon="arrow-down" placeholder="请选择" @click="adClick" />
    
                <van-field v-model="money" clearable label="薪资" placeholder="请输入薪资" />
    
                <van-field v-model="worktimeS" readonly label="最早开工时间" right-icon="arrow-down" placeholder="请选择" @click="worktimeClick" />
    
                <van-cell title="可预约人数">
    
                    <van-stepper v-model="maxnum" />
    
                </van-cell>
    
                <van-field v-model="other" type="textarea" class="area" label="其他条件" placeholder="请输入其他条件..." />
    
                <van-field v-model="limitS" readonly label="有效期" right-icon="arrow-down" placeholder="请选择" @click="limitClick" style="margin-top:0.2rem;" />
    
            </van-cell-group>
    
            <!-- 兼职需求发布 -->
    
    
    
    
    
            <!-- 全职需求发布 -->
    
            <van-cell-group v-if="id == 1">
    
                <van-field v-model="username" clearable disabled label="发布人" />
    
                <van-field v-model="title" type="text" label="标题" placeholder="请输入标题" clearable />
    
                <van-field v-model="contact" type="text" label="联系人" placeholder="请输入联系人" clearable />
    
                <div class="pass">
    
                    <van-field v-model="tel" :type="isPass ? 'password':'tel'" label="联系电话" placeholder="请输入联系电话" clearable />
    
                    <div class="iptradio">
    
                        <van-checkbox v-model="checked">是否隐藏</van-checkbox>
    
                    </div>
    
                </div>
    
                <van-collapse v-model="activeNames">
    
                    <van-collapse-item title="职能" name="1">
    
                        <van-checkbox-group v-model="result_znarr">
    
                            <van-cell-group>
    
                                <van-cell v-for="(item, index) in znarr" clickable :key="item" :title="item">
    
                                    <van-checkbox :name="item" ref="checkboxes" slot="right-icon" />
    
                                </van-cell>
    
                                <van-field v-if="result_znarr.indexOf('其他') > -1" v-model="other_znarr" type="textarea" class="area" placeholder="请输入" />
    
                            </van-cell-group>
    
                        </van-checkbox-group>
    
                    </van-collapse-item>
    
                </van-collapse>
    
                <van-collapse v-model="activeNames">
    
                    <van-collapse-item title="产品方向" name="2">
    
                        <van-checkbox-group v-model="result_cparr">
    
                            <van-cell-group>
    
                                <van-cell v-for="(item, index) in cparr" clickable :key="item" :title="item">
    
                                    <van-checkbox :name="item" ref="checkboxes" slot="right-icon" />
    
                                </van-cell>
    
                                <van-field v-if="result_cparr.indexOf('其他') > -1" v-model="other_cparr" type="textarea" class="area" placeholder="请输入" />
    
                            </van-cell-group>
    
                        </van-checkbox-group>
    
                    </van-collapse-item>
    
                </van-collapse>
    
                <van-field v-model="skillKey" clearable label="技能关键字" placeholder="请输入技能关键字" />
    
                <van-field v-model="tool" clearable label="熟悉的EDA工具" placeholder="请输入熟悉的EDA工具" />
    
                <van-field v-model="skill" type="textarea" class="area" label="经历技能介绍" placeholder="请输入经历或技能介绍" />
    
                <van-field v-model="modelS" readonly label="工作模式" right-icon="arrow-down" placeholder="请选择" @click="modelClick" />
    
                <van-field v-model="adS" readonly label="工作地点" right-icon="arrow-down" placeholder="请选择" @click="adClick" />
    
                <van-field v-model="money" clearable label="薪资" placeholder="请输入薪资" />
    
                <van-field v-model="worktimeS" readonly label="最早开工时间" right-icon="arrow-down" placeholder="请选择" @click="worktimeClick" />
    
                <van-cell title="可预约人数">
    
                    <van-stepper v-model="maxnum" />
    
                </van-cell>
    
                <van-field v-model="other" type="textarea" class="area" label="其他条件" placeholder="请输入其他条件..." />
    
                <van-field v-model="limitS" readonly label="有效期" right-icon="arrow-down" placeholder="请选择" @click="limitClick" style="margin-top:0.2rem;" />
    
            </van-cell-group>
    
            <!-- 全职需求发布 -->
    
    
    
    
    
    
    
    
    
            <!-- 项目外包发布 -->
    
            <van-cell-group v-if="id == 2">
    
                <van-field v-model="username" clearable disabled label="发布人" />
    
                <van-field v-model="title" type="text" label="标题" placeholder="请输入标题" clearable />
    
                <van-field v-model="contact" type="text" label="联系人" placeholder="请输入联系人" clearable />
    
                <div class="pass">
    
                    <van-field v-model="tel" :type="isPass ? 'password':'tel'" label="联系电话" placeholder="请输入联系电话" clearable />
    
                    <div class="iptradio">
    
                        <van-checkbox v-model="checked">是否隐藏</van-checkbox>
    
                    </div>
    
                </div>
    
                <van-field v-model="projectname" clearable label="项目名称" placeholder="请输入项目名称" />
    
                <van-field v-model="projectdes" type="textarea" class="area" label="项目简介" placeholder="请输入..." />
    
                <van-field v-model="projecthours" clearable label="项目周期" placeholder="请输入项目周期" />
    
                <van-field v-model="projecttask" type="textarea" class="area" label="项目任务" placeholder="请输入..." />
    
                <van-field v-model="projectpay" clearable label="项目预算" placeholder="请输入项目预算" />
    
                <van-field v-model="projectstander" type="textarea" class="area" label="交付标准" placeholder="请输入..." />
    
                <van-field v-model="projectwpsS" readonly label="项目文档" right-icon="arrow-down" placeholder="请选择" @click="projectwpsClick" />
    
                <van-field v-model="limitS" readonly label="有效期" right-icon="arrow-down" placeholder="请选择" @click="limitClick" style="margin-top:0.2rem;" />
    
            </van-cell-group>
    
            <!-- 项目外包发布 -->
    
    
    
    
    
            <!-- 咨询需求发布 -->
    
            <van-cell-group v-if="id == 3">
    
                <van-field v-model="username" clearable disabled label="发布人" />
    
                <van-field v-model="title" type="text" label="标题" placeholder="请输入标题" clearable />
    
                <van-field v-model="contact" type="text" label="联系人" placeholder="请输入联系人" clearable />
    
                <div class="pass">
    
                    <van-field v-model="tel" :type="isPass ? 'password':'tel'" label="联系电话" placeholder="请输入联系电话" clearable />
    
                    <div class="iptradio">
    
                        <van-checkbox v-model="checked">是否隐藏</van-checkbox>
    
                    </div>
    
                </div>
    
                <van-field v-model="talktypeS" readonly label="咨询种类" right-icon="arrow-down" placeholder="请选择" @click="talktypeClick" />
    
                <van-field v-model="talkrange" type="textarea" class="area" label="内容范围" placeholder="请输入..." />
    
                <van-field v-model="talkparttern" type="textarea" class="area" label="合作方式" placeholder="请输入..." />
    
                <van-field v-model="limitS" readonly label="有效期" right-icon="arrow-down" placeholder="请选择" @click="limitClick" style="margin-top:0.2rem;" />
    
                <!-- 咨询需求发布 -->
    
            </van-cell-group>
    
    
    
    
    
    
    
            <!-- 培训需求发布 -->
    
            <van-cell-group v-if="id == 4">
    
                <van-field v-model="username" clearable disabled label="发布人" />
    
                <van-field v-model="title" type="text" label="标题" placeholder="请输入标题" clearable />
    
                <van-field v-model="contact" type="text" label="联系人" placeholder="请输入联系人" clearable />
    
                <div class="pass">
    
                    <van-field v-model="tel" :type="isPass ? 'password':'tel'" label="联系电话" placeholder="请输入联系电话" clearable />
    
                    <div class="iptradio">
    
                        <van-checkbox v-model="checked">是否隐藏</van-checkbox>
    
                    </div>
    
                </div>
    
                <van-collapse v-model="activeNames">
    
                    <van-collapse-item title="职能" name="1">
    
                        <van-checkbox-group v-model="result_znarr">
    
                            <van-cell-group>
    
                                <van-cell v-for="(item, index) in znarr" clickable :key="item" :title="item">
    
                                    <van-checkbox :name="item" ref="checkboxes" slot="right-icon" />
    
                                </van-cell>
    
                                <van-field v-if="result_znarr.indexOf('其他') > -1" v-model="other_znarr" type="textarea" class="area" placeholder="请输入" />
    
                            </van-cell-group>
    
                        </van-checkbox-group>
    
                    </van-collapse-item>
    
                </van-collapse>
    
                <van-field v-model="pxdes" type="textarea" class="area" label="培训说明" placeholder="请输入..." />
    
                <van-field v-model="limitS" readonly label="有效期" right-icon="arrow-down" placeholder="请选择" @click="limitClick" style="margin-top:0.2rem;" />
    
                <!-- 培训需求发布 -->
    
            </van-cell-group>
    
    
    
    
    
            <!-- 宝贝需求发布 -->
    
            <van-cell-group v-if="id == 5">
    
                <van-field v-model="username" clearable disabled label="发布人" />
    
                <van-field v-model="title" type="text" label="标题" placeholder="请输入标题" clearable />
    
                <van-field v-model="contact" type="text" label="联系人" placeholder="请输入联系人" clearable />
    
                <div class="pass">
    
                    <van-field v-model="tel" :type="isPass ? 'password':'tel'" label="联系电话" placeholder="请输入联系电话" clearable />
    
                    <div class="iptradio">
    
                        <van-checkbox v-model="checked">是否隐藏</van-checkbox>
    
                    </div>
    
                </div>
    
                <van-field v-model="bbzlS" readonly label="宝贝种类" right-icon="arrow-down" placeholder="请选择" @click="bbzlClick" />
    
                <van-field v-model="bbname" type="text" label="宝贝名称" placeholder="请输入宝贝名称" clearable />
    
                <van-field v-model="bbdes" type="textarea" class="area" label="宝贝说明" placeholder="请输入..." />
    
                <van-field v-model="fbdzS" readonly label="发布者地址" right-icon="arrow-down" placeholder="请选择" @click="fbdzClick" />
    
                <van-field v-model="tradeS" readonly label="交易方式" right-icon="arrow-down" placeholder="请选择" @click="tradeClick" />
    
                <van-field v-model="limitS" readonly label="有效期" right-icon="arrow-down" placeholder="请选择" @click="limitClick" style="margin-top:0.2rem;" />
    
                <!-- 培训需求发布 -->
    
            </van-cell-group>
    
        </div>
    
        <!-- 职能 -->
    
        <van-popup v-model="zn" position="bottom">
    
            <van-picker show-toolbar title="职能" :columns="znarr.name" @cancel="onCancel" @confirm="znConfirm" />
    
        </van-popup>
    
        <!-- 产品方向 -->
    
        <van-popup v-model="cp" position="bottom">
    
            <van-picker show-toolbar title="产品方向" :columns="cparr" @cancel="onCancel" @confirm="cpConfirm" />
    
        </van-popup>
    
        <!-- 每天至少工作时间 -->
    
        <van-popup v-model="lesstime" position="bottom">
    
            <van-picker show-toolbar title="工作时长" :columns="lesstimearr" @cancel="onCancel" @confirm="lesstimeConfirm" />
    
        </van-popup>
    
        <!-- 每周至少工作时间 -->
    
        <van-popup v-model="lesswork" position="bottom">
    
            <van-picker show-toolbar title="工作时长" :columns="lessworkarr" @cancel="onCancel" @confirm="lessworkConfirm" />
    
        </van-popup>
    
        <!-- 工作模式 -->
    
        <van-popup v-model="model" position="bottom">
    
            <van-picker show-toolbar title="工作模式" :columns="modelarr" @cancel="onCancel" @confirm="modelConfirm" />
    
        </van-popup>
    
        <!-- 最早开工时间 -->
    
        <van-popup v-model="workdata" position="bottom">
    
            <van-datetime-picker v-model="currentDate" type="date" @cancel="dataCancel" @confirm="dataSure" />
    
        </van-popup>
    
        <!-- 最早开工时间 -->
    
        <!-- 项目文档 -->
    
        <van-popup v-model="projectwps" position="bottom">
    
            <van-picker show-toolbar title="项目文档" :columns="projectwpsarr" @cancel="onCancel" @confirm="projectwpsarrConfirm" />
    
        </van-popup>
    
        <!-- 项目文档 -->
    
        <!-- 咨询种类 -->
    
        <van-popup v-model="talktype" position="bottom">
    
            <van-picker show-toolbar title="项目文档" :columns="talktypearr" @cancel="onCancel" @confirm="talktypeConfirm" />
    
        </van-popup>
    
        <!-- 咨询种类 -->
    
        <!-- 宝贝种类 -->
    
        <van-popup v-model="bbzl" position="bottom">
    
            <van-picker show-toolbar title="宝贝种类" :columns="bbzlarr" @cancel="onCancel" @confirm="bbzlConfirm" />
    
        </van-popup>
    
        <!-- 宝贝种类 -->
    
        <!-- 发布者地址 -->
    
        <van-popup v-model="fbdz" position="bottom">
    
            <van-area :area-list="fbdzarr" @cancel="fbdzCancel" @confirm="fbdzSure" />
    
        </van-popup>
    
        <!-- 发布者地址 -->
    
        <!-- 交易方式 -->
    
        <van-popup v-model="trade" position="bottom">
    
            <van-picker show-toolbar title="交易方式" :columns="tradearr" @cancel="onCancel" @confirm="tradeConfirm" />
    
        </van-popup>
    
        <!-- 交易方式 -->
    
        <van-popup v-model="limit" position="bottom">
    
            <van-picker show-toolbar title="有效期" :columns="limitarr" @cancel="onCancel" @confirm="limitConfirm" />
    
        </van-popup>
    
        <!-- 地址数据 -->
    
        <van-popup v-model="diqu" position="bottom">
    
            <van-area :area-list="adarr" @cancel="diquCancel" @confirm="diquSure" />
    
        </van-popup>
    
        <!--支付弹框-->
    
        <van-dialog v-model="show" title="支付" show-cancel-button show-confirm-button @confirm="pay_num">
    
            <p>可预约人数不足,超出 <span class="color_blue">{{maxnum - copymaxnum}}</span>人</p>
    
            <p>应支付 <span class="color_red">{{pay_money}}</span>元</p>
    
            <form action="/api/faOrder/h5addorder" method="post" ref="forms">
    
                <input type="hidden" name="money" :value="pay_money" />
    
                <input type="hidden" name="payType" value="1" />
    
            </form>
    
        </van-dialog>
    
        <!-- 筛选数据 -->
    
        <div class="submit">
    
            <van-button type="info" @click="submit">确认发布</van-button>
    
        </div>
    
    </div>
</template>

<script>
import province_list from "../../static/area.js";
export default {
    name: "login",
    data() {
        return {
            id: 3, //筛选id
            msg: "兼职需求发布",
            username: "",
            title: "",
            contact: "",
            tel: "",
            checked: false,
            isPass: 0,
            zn: false,
            cp: false,
            time: false,
            model: false,
            ad: false,
            worktime: false,
            limit: false,
            lesstime: false,
            lesswork: false,
            workdata: false,
            money: "",
            workhours: "",
            diqu: false,
            worktimeS: "",
            modelS: "",
            adS: "",
            timeS: "",
            cpS: "",
            znS: "",
            limitS: "",
            lesstimeS: "",
            lessworkS: "",
            cparr: [],
            result_cparr: [], //产品
            other_cparr: '',
            znarr: [],
            other_znarr: '',
            result_znarr: [], //职能
            lesstimearr: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            lessworkarr: ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50"],
            modelarr: ["上门工作", "远程登录工作", "自有环境工作"],
            adarr: province_list,
            worktimearr: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
            limitarr: [
                "1个月",
                "2个月",
                "3个月",
                "4个月",
                "5个月",
                "6个月",
                "7个月",
                "8个月",
                "9个月",
                "10个月",
                "11个月",
                "12个月"
            ],
            maxnum: "",
            skillKey: "",
            tool: "",
            skill: "",
            other: "",
            currentDate: new Date(),
            //   项目外包
            projectname: "",
            projecthours: "",
            projectdes: "",
            projectpay: "",
            projecttask: "",
            projectstander: "",
            projectwps: false,
            projectwpsS: "",
            projectwpsarr: ["需要", "可无"],
            // 咨询需求
            talktype: false,
            talktypeS: "",
            talktypearr: ["提供行业资讯", "设计方案", "技术文档"],
            talkrange: "",
            talkparttern: "",
            //   培训需求
            znS: "",
            pxdes: "",
            //   宝贝需求
            bbname: "",
            bbdes: "",
            bbzl: false,
            bbzlS: "",
            bbzlarr: [],
            fbdz: false,
            fbdzS: "",
            fbdzarr: province_list,
            trade: false,
            tradeS: "",
            tradearr: ["直接交易", "平台担保"],
            activeNames: ['0'], //折叠面板
            copymaxnum: '', //可预约人
            show: false, //支付弹框
            pay_money: 0, //应支付金额
        };
    },
    created() {
        this.getUserInfo()
        this.id = this.$route.params.id;
        this.username = localStorage.getItem("username")
        switch (this.id) {
            case 0:
                this.msg = "兼职需求发布";
                break;
            case 1:
                this.msg = "全职需求发布";
                break;
            case 2:
                this.msg = "项目外包发布";
                break;
            case 3:
                this.msg = "咨询需求发布";
                break;
            case 4:
                this.msg = "培训需求发布";
                break;
            case 5:
                this.msg = "宝贝需求发布";
                break;
            default:
                break;
        }
        // 职能接口
        this.$axios.post("/api/faFunctionsCategory/list").then(res => {
            if (res.data.code == 0) {

                res.data.rows.forEach(item => {
                    // var obj  = {};
                    // obj.name = item.name;
                    // obj.id = item.id;
                    // obj.isActive = item.name;
                    this.znarr.push(item.name);
                });
            } else {
                this.$toast(res.data.msg);
            }
        });
        // 产品分类
        this.$axios.post("/api/faProductCategory/list").then(res => {
            if (res.data.code == 0) {
                res.data.rows.forEach(item => {
                    this.cparr.push(item.name);
                });
            } else {
                this.$toast(res.data.msg);
            }
        });
        // 宝贝分类
        this.$axios.post("/api/faBabyCategory/list").then(res => {
            if (res.data.code == 0) {
                res.data.rows.forEach(item => {
                    this.bbzlarr.push(item.name);
                });
            } else {
                this.$toast(res.data.msg);
            }
        });
    },
    watch: {
        checked: function() {
            if (this.checked) {
                this.isPass = 1;
            } else {
                this.isPass = 0;
            }
        },
        lessworkS: function() {
            if (this.lesstimeS && this.lessworkS) {
                this.workhours = this.lessworkS * 4;
            }
        },
        lesstimeS: function() {
            if (this.lessworkS && this.lesstimeS) {
                this.workhours = this.lessworkS * 4;
            }
        }
    },
    methods: {
        toggle(index) {
            this.$refs.checkboxes[index].toggle();
        },
        getUserInfo() {
            // var id = localStorage.getItem("userid");
            this.$axios.post("/api/faUser/info", {
                    id: localStorage.getItem("userid")
                })
                .then(res => {
                    if (res.data.code == 0) {
                        this.maxnum = res.data.faUser.yuyuenum;
                        this.copymaxnum = res.data.faUser.yuyuenum
                    }
                })
        },
        //判断可预约人数 调用弹框支付
        pay_num() {
            this.$refs.forms.submit();
        },
        //需求发布
        submit() {
            if (this.id == 0) {
                if (this.maxnum > this.copymaxnum) {
                    this.pay_money = this.maxnum - this.copymaxnum
                    this.show = true;
                    return
                }
                if (!this.username ||
                    !this.title ||
                    !this.contact ||
                    !this.tel ||
                    !this.result_znarr.length ||
                    !this.result_cparr.length ||
                    !this.skillKey ||
                    !this.tool ||
                    !this.skill ||
                    !this.workhours ||
                    !this.lesstimeS ||
                    !this.lessworkS ||
                    !this.modelS ||
                    !this.adS ||
                    !this.money ||
                    !this.worktimeS ||
                    !this.limitS
                ) {
                    this.$toast("温馨提示:只有其他条件为非必填项");
                    return;
                }
                if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.tel)) {
                    this.$toast("请输入正确的手机号");
                    return;
                }
                let copy_znarr = this.result_znarr
                let copy_cparr = this.result_cparr
                if (copy_znarr.indexOf('其他') > -1) {

                    copy_znarr.splice(this.result_znarr.indexOf('其他'), 1)
                    copy_znarr.push(this.other_znarr)
                }
                if (copy_cparr.indexOf('其他') > -1) {
                    copy_cparr.splice(copy_cparr.indexOf('其他'), 1)
                    copy_cparr.push(this.other_cparr)
                }
                this.$axios
                    .post("/api/faParttimeNeed/add", {
                        userId: localStorage.getItem("userid"),
                        userName: this.username,
                        title: this.title,
                        telName: this.contact,
                        tel: this.tel,
                        telStatus: this.isPass,
                        functions: copy_znarr,
                        productDir: copy_cparr,
                        skill: this.skillKey,
                        edaTool: this.tool,
                        experience: this.skill,
                        worktime: this.workhours,
                        lesstime: this.lesstimeS,
                        llessweek: this.lessworkS,
                        workmode: this.modelS,
                        workaddress: this.adS,
                        pay: this.money,
                        startTime: this.worktimeS,
                        other: this.other,
                        validity: this.limitS,
                        maxnum: this.maxnum
                    })
                    .then(res => {
                        if (res.data.code == 0) {
                            this.$toast("操作成功");
                            this.toProjectDes();
                        } else {
                            this.$toast(res.data.msg);
                        }
                    });
            } else if (this.id == 1) {
                if (!this.username ||
                    !this.title ||
                    !this.contact ||
                    !this.result_znarr.length ||
                    !this.result_cparr.length ||
                    // !this.cpS ||
                    !this.skillKey ||
                    !this.tool ||
                    !this.skill ||
                    !this.modelS ||
                    !this.adS ||
                    !this.money ||
                    !this.worktimeS ||
                    !this.limitS
                ) {
                    this.$toast("温馨提示:只有其他条件为非必填项");
                    return;
                }
                if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.tel)) {
                    this.$toast("请输入正确的手机号");
                    return;
                }
                let copy_znarr = this.result_znarr
                let copy_cparr = this.result_cparr
                if (copy_znarr.indexOf('其他') > -1) {

                    copy_znarr.splice(this.result_znarr.indexOf('其他'), 1)
                    copy_znarr.push(this.other_znarr)
                }
                if (copy_cparr.indexOf('其他') > -1) {
                    copy_cparr.splice(copy_cparr.indexOf('其他'), 1)
                    copy_cparr.push(this.other_cparr)
                }
                this.$axios
                    .post("/api/faFulltimeNeed/add", {
                        userId: localStorage.getItem("userid"),
                        userName: this.username,
                        title: this.title,
                        telName: this.contact,
                        tel: this.tel,
                        telStatus: this.isPass,
                        functions: copy_znarr, //职能
                        productDir: copy_cparr,
                        skill: this.skillKey,
                        edaTool: this.tool,
                        experience: this.skill,
                        workmode: this.modelS,
                        workaddress: this.adS,
                        pay: this.money,
                        startTime: this.worktimeS,
                        other: this.other,
                        validity: this.limitS
                    })
                    .then(res => {
                        if (res.data.code == 0) {
                            this.$toast("操作成功");
                            this.toProjectDes();
                        } else {
                            this.$toast(res.data.msg);
                        }
                    });
            } else if (this.id == 2) {
                // if (
                //   !this.username ||
                //   !this.title ||
                //   !this.contact ||
                //   !this.tel ||
                //   !this.projectName ||
                //   !this.projectdes ||
                //   !this.projecthours ||
                //   !this.projecttask ||
                //   !this.projectpay ||
                //   !this.projectstander ||
                //   !this.projectwpsS ||
                //   !this.limitS
                // ) {
                //   this.$toast("温馨提示:只有其他条件为非必填项");
                //   return;
                // }
                if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.tel)) {
                    this.$toast("请输入正确的手机号");
                    return;
                }
                switch (this.projectwpsS) {
                    case "需要":
                        var projectwpsSS = 0;
                        break;
                    case "可无":
                        var projectwpsSS = 1;
                        break;
                    default:
                        break;
                }

                this.$axios
                    .post("/api/faProjectNeed/add", {
                        userId: localStorage.getItem("userid"),
                        userName: this.username,
                        title: this.title,
                        telName: this.contact,
                        tel: this.tel,
                        telStatus: this.isPass,
                        projectName: this.znS,
                        content: this.cpS,
                        cycle: this.skillKey,
                        task: this.tool,
                        budget: this.skill,
                        standard: this.modelS,
                        word: projectwpsSS,
                        other: this.other,
                        validity: this.limitS
                    })
                    .then(res => {
                        if (res.data.code == 0) {
                            this.$toast("操作成功");
                            this.toProjectDes();
                        } else {
                            this.$toast(res.data.msg);
                        }
                    });
            } else if (this.id == 3) {
                if (!this.username ||
                    !this.title ||
                    !this.contact ||
                    !this.tel ||
                    !this.talktypeS ||
                    !this.talkrange ||
                    !this.talkparttern ||
                    !this.limitS
                ) {
                    this.$toast("温馨提示:只有其他条件为非必填项");
                    return;
                }
                if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.tel)) {
                    this.$toast("请输入正确的手机号");
                    return;
                }
                this.$axios
                    .post("/api/faConsultNeed/add", {
                        userId: localStorage.getItem("userid"),
                        userName: this.username,
                        title: this.title,
                        telName: this.contact,
                        tel: this.tel,
                        telStatus: this.isPass,
                        categoryZx: this.talktypeS,
                        content: this.talkrange,
                        cooperateWay: this.talkparttern,
                        other: this.other,
                        validity: this.limitS
                    })
                    .then(res => {
                        if (res.data.code == 0) {
                            this.$toast("操作成功");
                            this.toProjectDes();
                        } else {
                            this.$toast(res.data.msg);
                        }
                    });
            } else if (this.id == 4) {
                if (!this.username ||
                    !this.title ||
                    !this.contact ||
                    !this.tel ||
                    !this.result_znarr.length ||
                    !this.pxdes ||
                    !this.limitS
                ) {
                    this.$toast("温馨提示:只有其他条件为非必填项");
                    return;
                }
                if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.tel)) {
                    this.$toast("请输入正确的手机号");
                    return;
                }
                let copy_znarr = this.result_znarr
                let copy_cparr = this.result_cparr
                if (copy_znarr.indexOf('其他') > -1) {
                    copy_znarr.splice(this.result_znarr.indexOf('其他'), 1)
                    copy_znarr.push(this.other_znarr)
                }

                this.$axios
                    .post("/api/faConsultNeed/add", {
                        userId: localStorage.getItem("userid"),
                        userName: this.username,
                        title: this.title,
                        telName: this.contact,
                        tel: this.tel,
                        telStatus: this.isPass,
                        categoryZn: this.znS,
                        functions: copy_znarr,
                        contentTraining: this.pxdes,
                        other: this.other,
                        validity: this.limitS
                    })
                    .then(res => {
                        if (res.data.code == 0) {
                            this.$toast("操作成功");
                            this.toProjectDes();
                        } else {
                            this.$toast(res.data.msg);
                        }
                    });
            } else if (this.id == 5) {
                if (!this.username ||
                    !this.title ||
                    !this.contact ||
                    !this.tel ||
                    !this.bbzlS ||
                    !this.bbname ||
                    !this.bbdes ||
                    !this.fbdzS ||
                    !this.tradeS ||
                    !this.limitS
                ) {
                    this.$toast("温馨提示:只有其他条件为非必填项");
                    return;
                }
                if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.tel)) {
                    this.$toast("请输入正确的手机号");
                    return;
                }
                switch (this.tradeS) {
                    case "直接交易":
                        var tradeSS = 0;
                        break;
                    case "平台担保":
                        var tradeSS = 1;
                        break;
                    default:
                        break;
                }
                this.$axios
                    .post("/api/faBabyNeed/add", {
                        userId: localStorage.getItem("userid"),
                        userName: this.username,
                        title: this.title,
                        telName: this.contact,
                        tel: this.tel,
                        telStatus: this.isPass,
                        typeBb: this.bbzlS,
                        name: this.bbname,
                        content: this.bbdes,
                        address: this.fbdzS,
                        tradeType: tradeSS,
                        other: this.other,
                        validity: this.limitS
                    })
                    .then(res => {
                        if (res.data.code == 0) {
                            this.$toast("操作成功");
                            this.toProjectDes();
                        } else {
                            this.$toast(res.data.msg);
                        }
                    });
            }
        },
        change() {
            this.isPass = !this.isPass;
            this.isPass ? (this.type = "隐藏") : (this.type = "显示");
        },
        // 项目详情
        toProjectDes() {
            this.$router.push({
                name: "taskRoom"
            });
        },
        //职能
        znClick() {
            this.zn = true;
        },
        onCancel() {
            this.zn = false;
        },
        znConfirm(value) {
            this.znS = value;
            this.zn = false;
        },
        // 产品方向
        cpClick() {
            this.cp = true;
        },
        cpConfirm(value) {
            this.cpS = value;
            this.cp = false;
        },
        // 每天工作时间
        lesstimeClick() {
            this.lesstime = true;
        },
        lesstimeConfirm(value) {
            this.lesstimeS = value;
            this.lesstime = false;
        },
        // 每周工作时间
        lessworkClick() {
            this.lesswork = true;
        },
        lessworkConfirm(value) {
            this.lessworkS = value;
            this.lesswork = false;
        },
        // 工作模式
        modelClick() {
            this.model = true;
        },
        modelConfirm(value) {
            this.modelS = value;
            this.model = false;
        },
        // 工作地点
        adClick() {
            this.diqu = true;
        },
        diquCancel() {
            this.diqu = false;
        },
        diquSure(res) {
            this.adS = res[0].name + res[1].name + res[2].name;
            this.diqu = false;
        },
        // 最早开工时间
        worktimeClick() {
            this.workdata = true;
        },
        dataCancel() {
            this.workdata = false;
        },
        dataSure(res) {
            var date = this.currentDate;
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            this.worktimeS =
                date.getFullYear() + seperator1 + month + seperator1 + strDate;
            this.workdata = false;
        },
        // 有效期
        limitClick() {
            this.limit = true;
        },
        limitConfirm(value) {
            this.limitS = value;
            this.limit = false;
        },
        // 项目外包文档
        projectwpsClick() {
            this.projectwps = true;
        },
        projectwpsarrConfirm(value) {
            this.projectwpsS = value;
            this.projectwps = false;
        },
        // 咨询种类
        talktypeClick() {
            this.talktype = true;
        },
        talktypeConfirm(value) {
            this.talktypeS = value;
            this.talktype = false;
        },
        // 培训职能
        pxznClick() {
            this.pxzn = true;
        },
        pxznConfirm(value) {
            this.pxznS = value;
            this.pxzn = false;
        },
        // 宝贝需求
        bbzlClick() {
            this.bbzl = true;
        },
        bbzlConfirm(value) {
            this.bbzlS = value;
            this.bbzl = false;
        },
        // 发布者地址
        fbdzClick() {
            this.fbdz = true;
        },
        fbdzCancel(value) {
            this.fbdz = false;
        },
        fbdzSure(res) {
            this.fbdzS = res[0].name + res[1].name + res[2].name;
            this.fbdz = false;
        },
        // 交易方式
        tradeClick() {
            this.trade = true;
        },
        tradeConfirm(value) {
            this.tradeS = value;
            this.trade = false;
        },
        onClickLeft() {
            this.$router.push({ name: "taskRoom" })
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app {
    background-color: #efefef;
}

.content {
    margin: 46px auto 60px;
    padding-bottom: 0.2rem;
}

.van-cell {
    font-size: 0.32rem;
}

.content>>>.van-field__label,
.content>>>.van-cell__title {
    text-align: left;
}

.content>>>.van-field__control {
    text-align: right;
}

.pass {
    position: relative;
}

.iptradio {
    display: flex;
    font-size: 0.3rem;
    position: absolute;
    left: 2rem;
    top: 0;
    bottom: 0;
    margin: auto 0;
}

.area>>>.van-field__control {
    text-align: left;
    height: 100px;
    border: 1px solid #e2e4e6;
    text-indent: 1em;
}

.content>>>.van-field__label {
    width: 120px;
}

.submit {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: white;
}

.submit button {
    background-color: #f8931f;
    border: none;
    width: 94%;
    margin: 0 auto 0.2rem;
}

.content>>>.van-cell-group {
    background-color: #efefef;
}

.headers {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 46px;
    z-index: 10;
}

.headers>>>.van-nav-bar {
    background-color: #0172ff;
    color: white;
}

.headers>>>.van-nav-bar__text,
.headers>>>.van-nav-bar .van-icon {
    color: white;
}

.headers>>>.van-nav-bar__title {
    color: white;
}

.color_blue {
    color: blue;
    font-size: 20px
}

.color_red {
    color: red;
    font-size: 26px
}
</style>
<style>
.content .van-cell__title {
    font-size: 0.32rem;
}
</style>
