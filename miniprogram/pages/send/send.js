// pages/send/send.js

const app = getApp()
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alt:"",
    picid:"",
  },
  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      alt: ''
    })
  },
  formSubmit(e) {
    var res=e.detail.value;
    console.log(res.name);
    console.log(res.title);
    console.log(res.img);
    console.log(res.des);


    if(res.name!=""&&res.title!=""&&res.des!=""){
      this.setData({
        alt:"格式正确"
      })
      db.collection("test").add({
        data: {
          name: res.name,
          img: res.img,
          title: res.title,
          des:res.des
        },
        success:(res)=>{
          this.setData({
            alt:"上传成功"
          })
        }
      })
    }else{
      this.setData({
        alt:"有未填项"
      })
    }
    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  getpic(){
    var that=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        // 上传图片
        const cloudPath = `despic/${Date.now()} ${filePath.match(/\.[^.]+?$/)[0]}`

        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res.fileID);
            that.setData({
              picid:res.fileID
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
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