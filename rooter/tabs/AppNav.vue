<template>
  <div id="appNav">
    <el-menu default-active="2" class="aside el-menu-vertical-demo" :collapse="isCollapse" @select="onMenuSelected" :unique-opened="true">
      <el-submenu v-for="menu in menuList" :index='menu.MenuId' v-bind:key="menu.MenuId">
        <el-menu-item v-if="menu.SubMenu.length ==0" :index="menu.MenuId" :key="menu.MenuDesc+','+menu.FormUrl">
          <i class="el-icon-location"></i>
          <span> {{menu.MenuDesc}}</span>
        </el-menu-item>
        <template slot="title" v-else>
          <i :class="'icon '+ menu.Icon" style="font-size:18px;float:left;line-height:46px;padding:15px;color:#D9E0EE; opacity:0.8"></i>
          <span style="float:left;padding-left:5px;"> {{menu.MenuDesc}}</span>
        </template>
        <el-menu-item v-for="subMenu in menu.SubMenu" :key="subMenu.MenuId" :index="subMenu.MenuId">
          <i style="float: left; width:6px;height:6px;margin-right:10px;font-size:20px">•</i>
          {{ subMenu.MenuDesc }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>


<script>
export default {
  props: {
    isCollapse: {
      type: Boolean,
      require: false,
      default: true
    }
  },
  data() {
    return {
      menuList: [],
      allMenuList: []
    };
  },
  mounted: function () {
    this.bindMenus();
  },
  methods: {
		//加载菜单
    bindMenus() {
      var apiUrl = "../api/CallCenterMenu/UserMenu/xrm";
      rt
        .get(apiUrl)
        .then(retMenuList => {
          this.menuList = retMenuList;
        })
        .catch(error => {
          rt.showErrorToast(error);
        });
    },
    onMenuSelected(key, ids) {
      let menuId = ids[0];
      let menuInfo;
      var p_menuInfo = this.menuList.filter(p => p.MenuId == menuId);
      if (p_menuInfo != null && p_menuInfo.length > 0) {
        var c_menuinfos = p_menuInfo[0].SubMenu.filter(p => p.MenuId == key);
        if (c_menuinfos != null && c_menuinfos.length > 0) {
          menuInfo = c_menuinfos[0];
        }
      }
      //this.$router.push({ path: "/" + key }); //取配置地址
      // var menu = menuInfo;
      var item = {
        name: menuInfo.MenuDesc,
        tag: menuInfo.MenuDesc,
        url: "/" + menuInfo.FormUrl,
        id: menuInfo.MenuId,
        IsMore: menuInfo.IsMore
			};
			//TODO：因为布局原因 这个地方找到组件apptabs需要两次parent 根据组件位置修改
      this.$parent.$parent.$refs._content.menuClick(item);
    }
  }
};
</script>

<style>
#appNav .el-menu-vertical-demo:not(.el-menu--collapse) .el-submenu__title i {
	padding: 15px 25px 15px 5px !important;
}
#appNav .el-menu {
	border-radius: 0px;
}
ul.el-menu.aside.el-menu-vertical-demo {
	padding-bottom: 45px;
}
/* #appNav .el-submenu:first-child .el-submenu__title i.icon {
    color: #fff !important;
    opacity: 1 !important;
} */
#appNav .el-submenu__title span {
	color: #fefefe;
}
li :focus {
	outline: none;
}
/* .el-icon-plus,.el-icon-minus{
  position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -7px;
    font-size: 12px;
} */
#appNav .el-submenu__title {
	height: 50px;
	line-height: 50px;
	/* margin-bottom: 23px; */
	/* border-radius: 23px; */
	/* margin-top: 30px; */
	/* padding-left: 0 !important; */
}
#appNav .el-submenu:first-child .el-submenu__title {
	/* margin-top: 50px !important; */
}

#appNav .el-submenu__title {
	/* background-color: #f0f3fa; */
	/* margin: 30px 0 23px 0; */
}
.el-menu--collapse .el-submenu__title {
	padding-left: 11px !important;
}
#appNav .is-opened .el-submenu__title {
	background-color: #2b313d !important;
	color: #fff;
}
#appNav .el-menu-item.is-active,
.el-menu-item is-active,
.el-menu-item {
	background-color: #fff;
	/* color: #fff !important; */
}
#appNav .el-submenu .el-menu-item:hover {
	background-color: #fff;
	color: #fff;
	background-color: transparent;
}
/* .el-icon-menu{
  margin-left: -10px !important;
} */
#appNav {
	height: 100%;
	line-height: 44px;
}

#appNav > .aside {
	height: 100%;
}

#appNav .el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}
/* #appNav .el-menu--collapse {
  width: 56px;
} */
#appNav .el-menu {
	/* padding-bottom: 45px; */
	background-color: #373f4c;
}

#appNav .el-menu--collapse {
	width: 68px;
}

#appNav .el-menu--collapse > .el-menu-item [class^='el-icon-'],
#appNav
	.el-menu--collapse
	> .el-submenu
	> .el-submenu__title
	[class^='el-icon-'] {
	margin: 0;
	vertical-align: middle;
	width: 24px;
	text-align: center;
}

#appNav .el-menu--collapse > .el-menu-item .el-submenu__icon-arrow,
#appNav.el-menu--collapse
	> .el-submenu
	> .el-submenu__title
	.el-submenu__icon-arrow {
	display: none;
}

#appNav .el-menu--collapse > .el-menu-item span,
#appNav .el-menu--collapse > .el-submenu > .el-submenu__title span {
	height: 0;
	width: 0;
	overflow: hidden;
	visibility: hidden;
	display: inline-block;
}

#appNav .el-menu--collapse .el-menu .el-submenu {
	min-width: 200px;
}

#appNav .el-menu--collapse .el-submenu {
	position: relative;
}

#appNav .el-menu--collapse .el-submenu .el-menu {
	position: absolute;
	/* margin-left: 5px; */
	top: 0;
	left: 100%;
	z-index: 10;
}

#appNav
	.el-menu--collapse
	.el-submenu.is-opened
	> .el-submenu__title
	.el-submenu__icon-arrow {
	transform: none;
}

#appNav .el-submenu__title .el-icon-arrow-down:before {
	content: '\E61C' !important;
	color: #8da3b0;
	display: none;
}
#appNav .is-opened .el-icon-arrow-down:before {
	content: '\E619' !important;
	color: #fff;
	display: none;
}
#appNav .is-opened .icon {
	color: #fff !important;
}
#appNav .el-menu--collapse .el-icon-caret-right {
	display: none;
}
#appNav .el-menu--collapse .el-menu-item.is-active,
.el-menu-item is-active,
.el-menu-item {
	background-color: transparent;
}
#appNav .el-menu--collapse .el-submenu .el-menu {
	padding: 7px 0;
	background-color: #475162 !important;
	/* border-radius: 5px; */
}
#appNav .el-menu--collapse .el-submenu .el-menu-item {
	color: #b9c0ce !important;
	padding-left: 17px !important;
	/* text-align: center; */
}
#appNav .el-menu--collapse .el-submenu .el-menu-item:hover {
	/* background: rgba(83, 164, 252, 1); */
	color: #fefefe !important;
}
#appNav .el-menu-item.is-active {
	color: #fff !important;
	background-color: transparent;
}
#appNav .el-submenu .el-menu-item {
	height: 36px !important;
	line-height: 36px !important;
	padding: 0 55px !important;
	color: #b9c0ce;
}
#appNav .el-submenu__title:hover {
	background-color: #2b313d;
	/* border-radius: 23px; */
}
#appNav .el-submenu__title:hover.el-submenu__title span {
	/* color: #728ba2; */
}
#appNav .is-opened .el-submenu__title span {
	color: #fff;
}
#appNav .el-menu .is-opened:hover .icon {
	color: #fff !important;
	/* transition: color 0.6s; */
	opacity: 1 !important;
}
.el-submenu__title {
	margin-bottom: 0;
}
/* background-color:transparent; */
</style>
