// pages/mine/mine.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    data: '',
    time:-1,
    isroot:false,
    isLogin: false,
    userInfo: null,
    disabled: true,
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo);
        app.globalData.nickname = res.userInfo.nickName;
        app.globalData.pic = res.userInfo.avatarUrl;

        this.setData({
          nickname: app.globalData.nickname,
          pic: app.globalData.pic,
          userInfo: res.userInfo,
          hasUserInfo: true
        })


        console.log("get " + this.data.nickname)

        db.collection("user").where({
          nickname: app.globalData.nickname,
          pic: app.globalData.pic,
        }).get({
          success: res => {
            console.log(res.data)
            if (res.data.length == 0) {
              db.collection("user").add({
                data: {
                  nickname: app.globalData.nickname,
                  pic: app.globalData.pic,
                  time: 5,
                  isroot:false
                },
                success:(res)=>{
                  db.collection("user").where({
                    pic: app.globalData.pic
                  }).get({
                    success: res => {
                      app.globalData.time = res.data[0].time;
                      app.globalData.idid = res.data[0]._id;

                      this.setData({
                        time: app.globalData.time,
                        isroot:res.data[0].isroot
                      })
                    }
                  })
                }
              })
            } else {
              app.globalData.time = res.data[0].time;
              app.globalData.idid = res.data[0]._id;

              this.setData({
                time: app.globalData.time,
                isroot:res.data[0].isroot
              })

              //console.log(app.globalData.idid)
              // console.log(this.data.time)

              

              console.log("账号已存在")
            }
          }
        })

      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
  ,
  gonew(){
    this.setData({
      nickname:app.globalData.nickname,
      pic:app.globalData.pic,
      time: app.globalData.time
    })
    console.log("更新数据")
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  reduce() {
    if (app.globalData.idid != "") {
      console.log("A")
      db.collection("user").doc(app.globalData.idid).update({
        data: {
          time: app.globalData.time - 1
        },
        success: (res) => {
          app.globalData.time -=  1
          console.log("1.减少成功 当前剩余次数" + app.globalData.time)
          this.gonew()
        }
      })
    }
  },
  goup(){
    wx.navigateTo({
      url: '../send/send'
    })
  },
  onShow() {
    console.log("t1");
    this.gonew()
  },
  goAbout() {
    wx.showToast({
      title: '还在开发中',
      icon: 'none',
      duration: 1500
    })
    // wx.navigateTo({
    //   url: '../about/about',
    // })
  },
  goSetting() {
    wx.showToast({
      title: '还在开发中',
      icon: 'none',
      duration: 1500
    })
    // wx.navigateTo({
    //   url: '../setting/setting',
    // })
  },

  goAboutStart() {
    var that = this;
    that.setData({
      tap1: true
    })
  },
  goAboutEnd() {
    var that = this;
    that.setData({
      tap1: false
    })
  },
  goCanvasStart() {
    var that = this;
    that.setData({
      tap2: true
    })
  },
  goCanvasEnd() {
    var that = this;
    that.setData({
      tap2: false
    })
  },
  goCanvasStart() {
    var that = this;
    that.setData({
      tap3: true
    })
  },
  goCanvasEnd() {
    var that = this;
    that.setData({
      tap3: false
    })
  },
  goindex() {
    wx.switchTab({
      url: '../index/index'
    })
  }
})