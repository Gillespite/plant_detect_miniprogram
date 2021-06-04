// pages/detail/detail.js
const app = getApp()

var top = Math.round(app.globalData.top*0.85); 
var windowWidth = Math.round(app.globalData.windowWidth*0.85);

const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    inin:app.globalData.inindex,
    result: [],
    res:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
         console.log("导航高度",res)
         app.globalData.windowWidth = res.windowWidth
      }
    })
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    console.log("menuButtonObject",menuButtonObject)
    app.globalData.top = menuButtonObject.top;
    this.setData({
      top: top,
      inin:app.globalData.inindex,
      result:app.globalData.result
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
    db.collection("test").where({
      name:app.globalData.result[app.globalData.inindex].name
    }).get({
      success: res => {
        console.log(res.data);
        that.setData({
          res:res.data
        })
        app.globalData.result2=res.data
        console.log(res.data[0].img);
      }
    })
  },
  
  go3:function(e){
    //console.log(e);
    console.log(e.currentTarget.dataset.index);
    app.globalData.inindex2=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../detail2/detail2'
    })
  },

  goindex() {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      inin:app.globalData.inindex,
      result:app.globalData.result
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})