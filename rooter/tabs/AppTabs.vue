<template>
  <!--iframe页面展示区域-->
  <div id="tabsIframe">
    <div id="_tabs">
      <!-- closable @tab-remove="removeTab"  -->
      <el-tabs v-model="iframeSelectTabRandom" type="border-card" @tab-click="tabClick">
        <el-tab-pane v-for="(item,index) in iframeTabData" :key="item.index" :label="item.name" :name="item.random"
          :closable="item.closable">
          <span slot="label" id="jt">
            {{item.name}}
            <i v-if="item.name!='首页'" class="el-icon-rt-close" title="关闭" @click.stop="removeTab2(item.random)"
              @mouseover="changeMask(index)" @mouseout="returnMask()" :class="overIndex==index?'overClass':''">
            </i>
          </span>
        </el-tab-pane>
        <div class="_content">
          <keep-alive v-if="iframeSelectTab!=null">
            <router-view :key="$route.fullPath + iframeSelectTabItem.random"></router-view>
          </keep-alive>
          <v-goTop></v-goTop>
        </div>
        <!-- <div class="content-right"></div> -->
      </el-tabs>
    </div>

  </div>
</template>
<script>
  import goTop from "../goTop";
  export default {
    data() {
      return {
        iframeTabData: [{
          name: "首页",
          url: "/home",
          // url:'webchat',
          tag: "首页",
          closable: false,
          id: "1",
          random:  rt.formatDateTime(new Date(), "yyyy-mm-dd HH:mm:ss")
        }],
        overIndex: null,
        iframeSelectTab: null,
        iframeSelectTabItem: {},
        iframeSelectTabRandom: null
      };
    },
    computed: {
      // iframeSelectTab: function () {
      //     return this.iframeSelectTabItem.name;
      // },
    },
    components: {
      "v-goTop": goTop
    },
    watch: {
      $route() {
        this.iframeSelectTabItem.url = this.$route.path;
        this.iframeSelectTabItem.routeName = this.$route.name;
      },
      iframeSelectTabItem(vaule) {
        this.iframeSelectTab = this.iframeSelectTabItem.name;
        this.iframeSelectTabRandom = this.iframeSelectTabItem.random;
      }
      // '$route.params.id': function (val) {
      //     debugger
      // }
    },
    created() {
      this.iframeSelectTabItem = this.iframeTabData[0];
      this._goto();
    },
    mounted() {
      // debugger
      // const _this = this
      // // 1、监听添加iframe中tab的广播
      // this.$root.bus.$on('menuClick', function (item) {
      //     _this.menuClick(item);
      // });
    },
    methods: {
      key() {
        return this.$route.fullPath + this.iframeSelectTabItem.random;
      },
      //点击菜单
      menuClick(tabItem) {
        let isNewTab = true;
        let oldItem = null;
        this.iframeTabData.forEach(item => {
          if (item.tag == tabItem.tag && !tabItem.IsMore) {
            isNewTab = false;
            oldItem = item;
          }
        });
        tabItem.random = tabItem.name + new Date();
        if (isNewTab) {
          this.iframeTabData.push(tabItem);
          this.iframeSelectTabItem = tabItem;
        } else {
          this.iframeSelectTabItem = oldItem;
        }
        this._goto();
      },
      changeMask(index) {
        this.overIndex = index;
      },
      returnMask() {
        this.overIndex = null;
      },
      removeTab2(random) {
        let tabs = this.iframeTabData;
        if (this.iframeSelectTabRandom === random) {
          tabs.forEach((tab, index) => {
            if (tab.random === random) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                this.iframeSelectTabItem = nextTab;
              }
            }
          });
        }
        this.iframeTabData = tabs.filter(tab => tab.random !== random);
        this._goto();
      },
      //删除tab
      removeTab(targetName) {
        let tabs = this.iframeTabData;
        if (this.iframeSelectTab === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                this.iframeSelectTabItem = nextTab;
              }
            }
          });
        }
        this.iframeTabData = tabs.filter(tab => tab.name !== targetName);
        this._goto();
      },
      //刷新
      refreshIframe(id) {
        // debugger
        this.$forceUpdate(); //强制重新绘制
        this.$set(
          this.iframeSelectTabItem,
          "random",
          this.iframeSelectTabItem.tag + new Date()
        );
        this._goto();
      },
      //点击tab
      tabClick(tabItem, event) {
        // debugger;
        let tabs = this.iframeTabData;
        tabs.forEach((tab, index) => {
          if (tab.random === this.iframeSelectTabRandom) {
            this.iframeSelectTabItem = tab;
          }
        });
        this._goto();
      },
      _goto() {
        this.$router.push({
          path: this.iframeSelectTabItem.url
        });
      }
    }
  };

</script>

<style>
  /* .el-submenu .el-menu-item:hover,
.el-menu-item.is-active{
  background:rgba(151,173,200,1);
  opacity:0.96;
  box-shadow:0px 0px 10px rgba(82,101,124,0.5);
  color:#fff;
} */
  #appNav .el-submenu .el-menu {
  background: #475162;
}
  #tabsIframe {
    /*测试位置的时候显示这段--开始*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*background-color: red;*/
    /*display: block !important;*/
    /*测试位置的时候显示这段--结束*/
    /* position: absolute;
	left: 0;
	right: 0;
	top: 45px;
	bottom: 0;
	z-index: 5000 !important; */
  }

  .el-tabs__header {
    width: 100%;
    height: 44px;
    /* margin: 80px auto auto 243px !important; */
    background-color: #EBF3FB !important;
  }

  .el-tabs__item.is-active {
    background-color: #F9FCFF !important;
    color: #356FAC !important;
  }

  .el-tabs__nav {
    margin-left: 17px;
  }

  #tabsIframe .el-tabs__nav-prev {
    height: 44px;
  }

 #tabsIframe .el-tabs__nav-prev .el-icon-arrow-left,
  .el-icon-arrow-right {
    /* color: #4187D2 !important; */
    font-size: 12px;
    line-height: 55px;
    /* line-height: 44px;
    margin-top: 5px; */
  }

  #tabsIframe .el-tabs__nav-scroll {
    box-sizing: border-box;
    width: 100%;
    /* overflow: hidden; */
  }

  #tabsIframe .el-tabs__nav {
    margin: 0;
  }

  .el-tabs__item {
    height: 32px;
    /* width: 148px; */
    min-width: 120px;
    margin: 11px 1px auto auto !important;
    line-height: 32px;
    font-size: 14px;
    color: #eaeaea;
    padding: 0 7px !important;
    text-align: center;
    font-family: MicrosoftYaHei;
  }

  .el-tabs__item.is-closable {
    background-color: #728ba2;
  }

  #_tabs .el-tabs__header {
    padding: 0 17px !important;
    box-sizing: border-box;
  }

  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    border-radius: 0 0 0 0 !important;
    border: none !important;
  }

  .el-tabs__content {
    height: 637px;
    width: 100%;
    padding-right: 100px;
    background-color: #F9FCFF;
    top: -1px;
    /* margin-left: 243px; */
  }

  ._content {
    margin: auto auto auto 17px;
    width: 100%;
    height: calc(100% - 40px);
    background-color: #fff;
    float: left;
    overflow-y: auto;
    height: 100% !important;
  }

  ._content::-webkit-scrollbar {
    display: none;
  }

  .el-tabs--border-card>.el-tabs__content {
    padding: 0px;
    height: 100%;
  }

  /* .full {
	position: relative;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}
#_tabs .el-tabs__nav {
	padding-left: 20px;
}
#_tabs .el-tabs__nav .el-tabs__item:nth-child(1) {
	padding-right: 16px;
}
#_tabs .el-tabs--border-card > .el-tabs__content {
	padding: 0px;
}
#_tabs .el-tabs__nav .el-tabs__item:nth-child(1) .el-icon-rt-close,
#_tabs .el-tabs__nav .el-tabs__item:nth-child(1) .el-icon-refresh {
	display: none;
}
#_tabs .el-tabs--border-card > .el-tabs__header {
	background-color: #97adc8;
	font-size: 14px;
} */

  #_tabs .el-tabs__item {
    padding: 0 7px;
    font-size: 14px;
    color: #fff;
    height: 32px;
    /* line-height: 40px; */
    margin-top: 10px;
    background:#92B2D4;
    min-width: 120px;
    text-align: center;
    font-weight: 400;
    margin-right: 2px;
    font-family: MicrosoftYaHei;
  }

  #_tabs .el-tabs__item.is-active {
    background-color: #F9FCFF;
    border: 1px solid #F9FCFF;
    border-bottom-color: transparent;
    color: #728ba2;
  }

  #_tabs .el-tabs__item:hover span {
    /* color: #888; */
    /* display:block; */
  }

  #_tabs .el-tabs__item span {
    line-height: 32px;
    position: relative;
    top: 0;
    left: -10px;
    display: block;
  }

  #_tabs .el-icon-rt-close {
    background-image: url(../../assets/imgs/关闭2.png);
    width: 10px;
    height: 10px;
    /* background-size: cover; */
    margin-left: 10px;
    vertical-align: middle;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 0px;
  }

  #_tabs .el-tabs__item.is-active .el-icon-rt-close {
    background-image: url(../../assets/imgs/关闭.png);
  }

  #_tabs .el-icon-refresh {
    background-image: url(../../assets/imgs/icon_refresh.png);
    width: 12px;
    height: 12px;
    background-size: cover;
  }

  */ #tabsIFrame ._content {
    width: 100%;
    min-height: 500px;
    background-color: #fff;
    border: 1px #ccc solid;
    border-top: 0px;
    padding-left: 20px;
    box-sizing: border-box;
  }

  .content-right {
    width: 28%;
    float: right;
    height: 100%;
    background: #ffffff;
    overflow-y: auto;
  }

  .content-right::-webkit-scrollbar {
    display: none;
  }

  #_tabs .overClass {
    background-image: url(../../assets/imgs/关闭2划过.png) !important;
  }

</style>
