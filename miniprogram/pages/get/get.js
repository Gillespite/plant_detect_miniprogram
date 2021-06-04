// pages/get/get.js

const app = getApp()
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"1",
    res:""
  },

  /**
   * 生命周期函数--监听页面加载
   */

  get: function(){
    var that=this;
    db.collection("test").where({
      name:"1"
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
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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