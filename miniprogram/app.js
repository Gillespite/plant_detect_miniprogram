//app.js
App({
  globalData: {
    statusBarHeight: '', //获取顶部导航栏高度
    screenWidth: '', //获取屏幕宽度
    isIphoneX: '', //是否为iPhone X及以上机型
    ios: '', //是否为ios系统
    android: '', //是否为android系统

    
    idid: "",
    nickname: "",
    pic: "",
    time: -1,
    plantdata: "",

    windowWidth: null, //手机屏幕宽度
    top:null, //胶囊按钮到顶部的距离
    
    inindex:null,
    result: [],

    inindex2:null,
    result2: []
  },


  onLaunch: function () {
    var that = this;
    //初始化云函数
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    
   let menuButtonObject = wx.getMenuButtonBoundingClientRect();
   console.log("menuButtonObject",menuButtonObject)
   this.globalData.top = menuButtonObject.top;
    //获取系统参数
    wx.getSystemInfo({
      success(res) {
        that.globalData.windowWidth = res.windowWidth
        that.globalData.statusBarHeight = res.statusBarHeight;
        that.globalData.screenWidth = res.screenWidth;
        let modelmes = res.model;
        if (modelmes.search("iPhone X") != -1) {
          that.globalData.isIphoneX = true
        }
        if (res.system.search("ios") != -1) {
          that.globalData.ios = true
        } else {
          that.globalData.ios = false
        }
        if (that.globalData.ios == false) {
          that.globalData.statusBarHeight = that.globalData.statusBarHeight + 4;
        }
        if (res.system.search("Android") != -1) {
          that.globalData.android = true
          console.error("android", that.globalData.android)
        }
      }
    })
  }
})