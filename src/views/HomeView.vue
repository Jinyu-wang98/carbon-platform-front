<template>
  <div class="app" id="app">
    <div class="app-wrapper openSidebar clearfix">
      <!-- sidebar -->
      <div class="sidebar-container">
        <div class="logo">
          <img src="../assets/imgs/logo.png" width="122.5" alt="" />
        </div>

        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            :default-active="defAct"
            :unique-opened="false"
            :collapse-transition="false"
            background-color="#343744"
            text-color="#bfcbd9"
            active-text-color="#f4f4f5"
          >
            <div v-for="item in menuList" :key="item.id">
              <el-submenu
                :index="item.id"
                v-if="item.children && item.children.length > 0"
              >
                <template slot="title">
                  <i class="iconfont" :class="item.icon"></i>
                  <span>{{ item.name }}</span>
                </template>
                <el-menu-item
                  v-for="sub in item.children"
                  :index="sub.id"
                  :key="sub.id"
                  @click="menuHandle(sub, false)"
                >
                  <i :class="iconfont"></i>
                  <span slot="title">{{ sub.name }}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="item.id"
                @click="menuHandle(item, false)"
              >
                <i class="iconfont" :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="main-container">
        <!-- <navbar /> -->
        <div class="navbar">
          <div class="head-lable">
            <span v-if="goBackFlag" class="goBack" @click="goBack()"
              ><img
                src="../assets/imgs/icons/btn_back@2x.png"
                alt=""
              />返回</span
            >
            <span>{{ headTitle }}</span>
          </div>
          <div class="right-menu">
            <div class="avatar-wrapper">{{ userInfo.name }}</div>
            <!-- <div class="logout" @click="logout">退出</div> -->
            <img
              src="../assets/imgs/icons/btn_close@2x.png"
              class="outLogin"
              alt="退出"
              @click="logout"
            />
          </div>
        </div>
        <div class="app-main" v-loading="loading">
          <div class="divTmp" v-show="loading"></div>
          <iframe
            id="cIframe"
            class="c_iframe"
            name="cIframe"
            :src="iframeUrl"
            width="100%"
            height="auto"
            frameborder="0"
            v-show="!loading"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logoutApi } from "@/assets/login.js";
import "../assets/styles/index.css";

export default {
  data() {
    return {
      defAct: "2",
      menuActived: "2",
      userInfo: {},
      menuList: [
        // {
        //   id: '1',
        //   name: '门店管理',
        //   children: [
        {
          id: "2",
          name: "碳主体",
          url: "page/member/add copy.html",
          icon: "icon-member",
        },
        {
          id: "3",
          name: "碳核算",
          url: "page/category/list.html",
          icon: "icon-category",
        },
        {
          id: "4",
          name: "碳监测",
          url: "page/food/list.html",
          icon: "icon-food",
        },
        {
          id: "5",
          name: "碳分析",
          url: "page/combo/list.html",
          icon: "icon-combo",
        },
        {
          id: "6",
          name: "碳资产",
          url: "page/order/list.html",
          icon: "icon-order",
        },
        //   ],
        // },
      ],
      iframeUrl: "page/member/add copy.html",
      headTitle: "碳主体",
      goBackFlag: false,
      loading: true,
      timer: null,
    };
  },
  computed: {},
  created() {
    const userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }
    this.closeLoading();
  },
  beforeDestroy() {
    this.timer = null;
    clearTimeout(this.timer);
  },
  mounted() {
    window.menuHandle = this.menuHandle;
  },
  methods: {
    logout() {
      logoutApi().then((res) => {
        if (res.code === 1) {
          localStorage.removeItem("userInfo");
          this.$router.push("login");
        }
      });
    },
    goBack() {
      // window.location.href = 'javascript:history.go(-1)'
      const menu = this.menuList.find((item) => item.id === this.menuActived);
      // this.goBackFlag = false
      // this.headTitle = menu.name
      this.menuHandle(menu, false);
    },
    menuHandle(item, goBackFlag) {
      this.loading = true;
      this.menuActived = item.id;
      this.iframeUrl = item.url;
      this.headTitle = item.name;
      this.goBackFlag = goBackFlag;
      this.closeLoading();
    },
    closeLoading() {
      this.timer = null;
      this.timer = setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
};
</script>
