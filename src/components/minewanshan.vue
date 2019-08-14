<template>
  <div class="app">
    <div class="headers">
      <van-nav-bar title="信息完善" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <!-- 个人信息 -->
      <div class="person" v-show="isUser">
        <van-cell-group>
          <van-field
            v-model="username"
            :readonly="status ? false : 'readonly'"
            label="会员名"
            placeholder="请输入会员名"
          />
          <van-field
            v-model="phone"
            :readonly="status ? false : 'readonly'"
            type="tel"
            label="手机号"
            placeholder="请输入手机号"
          />
          <van-field
            v-model="wx"
            :readonly="status ? false : 'readonly'"
            label="微信号"
            placeholder="请输入微信号"
          />
          <!-- 最早开工时间 -->

          <van-field
            v-model="educationS"
            :readonly="status ? false : 'readonly'"
            label="最高学历"
            right-icon="arrow-down"
            placeholder="请选择"
            @click="educationClick"
          />
          <!-- <div class="item" v-show="grShow==1"> -->
          <!-- <div class="name">
            <span>*</span>
            <span>最高学历:</span>
          </div> -->
          <!-- <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.eduvalue"
              :value="item.eduid"
              :selected="item.selected"
            ></el-option>
          </el-select>
        </div> -->
          <!-- 最早开工时间 -->
          <van-field
            v-model="address"
            :readonly="status ? false : 'readonly'"
            label="所在地"
            placeholder="请输入所在地"
          />
          <van-field
            v-model="school"
            :readonly="status ? false : 'readonly'"
            label="学校"
            placeholder="请输入学校"
          />
          <van-field
            v-model="graduationtime"
            :readonly="status ? false : 'readonly'"
            label="毕业年份"
            placeholder="请输入毕业年份"
          />
          <van-field
            v-model="experience"
            :readonly="status ? false : 'readonly'"
            type="textarea"
            label="项目经验"
            placeholder="请输入"
          />
          <van-field
            v-model="specialty"
            :readonly="status ? false : 'readonly'"
            type="textarea"
            label="技能特长"
            placeholder="请输入"
          />
          <van-field
            v-model="other"
            :readonly="status ? false : 'readonly'"
            type="textarea"
            label="其他"
            placeholder="请输入"
          />
        </van-cell-group>
        <div class="ideas">
          <span>查看联系方式余{{faUser.ckphonenum}}次</span>
          <span>发布信息余{{faUser.fabunum}}次</span>
          <span>可预约人数余{{faUser.yuyuenum}}次</span>
        </div>
        <div class="do">
          <van-button type="info" v-show="isHave" @click="wanshan">完善信息</van-button>
          <van-button type="info" v-show="!isHave" @click="modify">修改</van-button>
        </div>
      </div>
      <!-- 个人信息 -->
      <!-- 公司信息 -->
      <div v-show="!isUser">
        <van-cell-group>
          <van-field
            v-model="username"
            :readonly="status ? false : 'readonly'"
            label="会员名"
            placeholder="请输入会员名"
          />
          <van-field
            v-model="phone"
            :readonly="status ? false : 'readonly'"
            type="tel"
            label="手机号"
            placeholder="请输入手机号"
          />
          <van-field
            v-model="wx"
            :readonly="status ? false : 'readonly'"
            label="微信号"
            placeholder="请输入微信号"
          />
          <van-field
            v-model="companyName"
            :readonly="status ? false : 'readonly'"
            label="公司名称"
            placeholder="请输入公司名称"
          />
          <van-field
            v-model="companyUrl"
            :readonly="status ? false : 'readonly'"
            label="公司主页"
            placeholder="请输入公司主页"
          />
          <van-field
            v-model="companyProject"
            :readonly="status ? false : 'readonly'"
            type="textarea"
            label="产品服务"
            placeholder="请输入"
          />
          <van-field
            v-model="other"
            :readonly="status ? false : 'readonly'"
            type="textarea"
            label="其他"
            placeholder="请输入"
          />
        </van-cell-group>
        <div class="do">
          <van-button type="info" v-show="isHave" @click="wanshan">完善信息</van-button>
          <van-button type="info" v-show="!isHave" @click="modify">提交</van-button>
        </div>
      </div>
      <!-- 公司信息 -->
      <!-- 宝贝种类 -->
    <van-popup v-model="education" position="bottom">
      <van-picker
        show-toolbar
        title="最高学历"
        :columns="educationarr"
        @cancel="onCancel"
        @confirm="educationConfirm"
      />
    </van-popup>
    <!-- 宝贝种类 -->
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      faUser:'',
      username: "",
      phone: "",
      wx: "",
      education: "",
      school: "",
      address: "",
      graduationtime: "",
      experience: "",
      specialty: "",
      other: "",
      companyName: "",
      companyUrl: "",
      companyProject: "",
      isUser: true,
      isHave: true,
      status: false,
      education:false,
      educationS:"",
      educationarr:["本科","专科","硕士","博士","高中","小学"],
      educationArr:[
        {
          eduid: "0",
          eduvalue: "本科"
        },
        {
          eduid: "1",
          eduvalue: "专科"
        },
        {
          eduid: "2",
          eduvalue: "硕士"
        },
        {
          eduid: "3",
          eduvalue: "博士"
        },
        {
          eduid: "4",
          eduvalue: "高中"
        },
        {
          eduid: "5",
          eduvalue: "小学"
        },
      ],
      educationSS:""
    };
  },
  created() {
    this.$route.params.type == 0 ? (this.isUser = true) : (this.isUser = false);
    localStorage.setItem("backType", 2);
    // 个人信息
    this.$axios
      .post("/api/faUser/info", {
        id: localStorage.getItem("userid")
      })
      .then(res => {
        if (res.data.code == 0) {
          this.faUser = res.data.faUser;
          this.username = this.faUser.username;
          this.phone = this.faUser.mobile;
          this.wx = this.faUser.wx;
          this.school = this.faUser.school;
          this.address = this.faUser.address;
          this.graduationtime = this.faUser.graduationtime;
          this.experience = this.faUser.experience;
          this.specialty = this.faUser.specialty;
          this.other = this.faUser.other;
          this.companyName = this.faUser.companyName;
          this.companyUrl = this.faUser.companyUrl;
          this.companyProject = this.faUser.companyProject;
          this.status = false;
            switch (this.faUser.education) {
              case '0':
                this.educationS = "本科";
                break;
              case '1':
                this.educationS = "专科";
                  break;
              case '2':
                this.educationS = "硕士";
                  break;
              case '3':
                this.educationS = "博士";
                  break;
              case '4':
                this.educationS = "高中";
                  break;
              case '5':
                this.educationS = '小学';
                  break;
              default:
                break;
          }
        } else {
          this.$toast(res.data.msg);
        }
      });
  },
  methods: {
    // 最高学历选择
    educationClick(){
      this.education = true;
    },
    onCancel(){
      this.education = false;
    },
    educationConfirm(value){
      this.educationS = value;
      this.education = false;
    },
    wanshan() {
      // 个人信息
      this.status = true;
      this.isHave = false;
    },
    onClickLeft() {
      this.$router.push({ name: "mine" });
    },
    modify() {
      if (this.isUser) {
        if(!this.educationS){
          this.$toast("请选择最高学历");
          return;
        }
         switch (this.educationS) {
            case "本科":
            this.educationSS = 0;
              break;
            case "专科":
            this.educationSS = 1;
              break;
            case "硕士":
            this.educationSS = 2;
              break;
            case "博士":
            this.educationSS = 3;
              break;
            case "高中":
            this.educationSS = 4;
              break;
            case "小学":
            this.educationSS = 5;
              break;
            default:
              break;
          }
        // 个人信息
        this.$axios
          .post("/api/faUser/edit", {
            id: localStorage.getItem("userid"),
            type: this.$route.params.type,
            wx: this.wx,
            mobile: this.phone,
            education: this.educationSS,
            graduationtime: this.graduationtime,
            school: this.school,
            experience: this.experience,
            specialty: this.specialty,
            address: this.address,
            other: this.other
          })
          .then(res => {
            if (res.data.code == 0) {
              this.$toast("操作成功");
            } else {
              this.$toast(res.data.msg);
            }
          });
      } else {
        // 公司信息
        this.$axios
          .post("/api/faUser/edit", {
            id: localStorage.getItem("userid"),
            type: this.$route.params.type,
            wx: this.wx,
            name: this.name,
            mobile: this.phone,
            companyName: this.companyName,
            companyUrl: this.companyUrl,
            companyProject: this.companyProject,
            experience: this.experience,
            specialty: this.specialty,
            other: this.other
          })
          .then(res => {
            if (res.data.code == 0) {
              this.$toast("操作成功");
            } else {
              this.$toast(res.data.msg);
            }
          });
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app {
  background-color: white;
  font-size: 0.32rem;
}

.app .logo {
  width: 94%;
  vertical-align: top;
  margin-bottom: 0.2rem;
  border-radius: 8px;
}

.func {
  display: flex;
  justify-content: space-between;
  color: #0172ff;
  margin-top: 0.2rem;
}

.content {
  margin: 46px auto 60px;
  padding: 0.2rem 0;
}

.content >>> .van-field__label {
  text-align: left;
}

.content >>> input {
  text-align: right;
}

.content >>> .van-area .van-picker__frame {
  position: absolute !important;
}

.vip {
  position: relative;
}

.vipfee >>> .van-field__control {
  width: 90% !important;
  color: #f8931f;
}

.vip .unit {
  position: absolute;
  right: 0.3rem;
  top: 0;
  bottom: 0;
  margin: auto 0;
  display: flex;
  align-items: center;
}

.zhu {
  width: 94%;
  margin: 0.2rem auto;
  font-size: 0.26rem;
  color: #999;
  text-align: left;
}

.do {
  width: 94%;
  margin: 0 auto;
  position: fixed;
  bottom: 0.2rem;
  left: 0;
  right: 0;
}

.van-button--normal {
  width: 100%;
  font-size: 0.3rem;
}

.do .func {
  display: flex;
  justify-content: flex-end;
  font-size: 0.28rem;
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

.headers >>> .van-nav-bar {
  background-color: #0172ff;
  color: white;
}

.headers >>> .van-nav-bar__text,
.headers >>> .van-nav-bar .van-icon {
  color: white;
}

.headers >>> .van-nav-bar__title {
  color: white;
}

.ideas {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.26rem;
  margin: 0.2rem 0.2rem 0;
}
</style>
