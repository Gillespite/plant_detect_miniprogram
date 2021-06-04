//index.js
const app = getApp()
const db = wx.cloud.database();

Page({
  istrue:false,
  data: {
    init: {
      name: "荷花",
      description: "荷花(学名：Nelumbo SP.；英文名称：Lotus flower)：属睡莲科，是莲属二种植物的通称。又名莲花、水芙蓉等。是莲属多年生水生草本花卉。地下茎长而肥厚，有长节，叶盾圆形。花期6至9月，单生于花梗顶端，花瓣多数，嵌生在花托基部，有红、粉红、白、紫等色，或有彩纹、镶边。坚果椭圆形，种子卵形。荷花种类很多，分观赏和食用两大类。原产亚洲热带和温带地区，中国早在周朝就有栽培记载。荷花全身皆宝，藕和莲子能食用，莲子、根茎、水芝、荷叶、花及种子的胚芽等都可入药。其出污泥而不染之品格恒为世人称颂。“接天莲叶无穷碧，映日荷花别样红”就是对荷花之美的真实写照。荷花“中通外直，不蔓不枝，出淤泥而不染，濯清涟而不妖”的高尚品格，历来为诗人墨客歌咏绘画的题材之一。1985年5月荷花被评为中国十大名花之一。荷花是印度,越南的国花。",
      image_url: "https://bkimg.cdn.bcebos.com/pic/e850352ac65c1038e7515b14bf119313b07e893d"
    },
    result: [],
    filePath: ''
  },

  onLoad: function () {},

  reduce() {
    console.log("fuck"+app.globalData.time)
    if (app.globalData.idid != "") {
      console.log("A")
      db.collection("user").doc(app.globalData.idid).update({
        data: {
          time: app.globalData.time - 1
        },
        success: (res) => {
          app.globalData.time -= 1
          console.log("1.减少成功 当前剩余次数" + app.globalData.time)
          //this.gonew()
        }
      })
    }
  },

  go:function(){
    wx.switchTab({
      url: '../user/user'
    })
  },
  go2:function(){
    this.setData({
      istrue2:false
    })
  },
  go3:function(e){
    //console.log(e);
    console.log(e.currentTarget.dataset.index);
    app.globalData.inindex=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  go4:function(){
    //console.log(e);
    //console.log(e.currentTarget.dataset.index);
    app.globalData.inindex=2;
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  // 上传图片
  doUpload: function () {
    if(app.globalData.idid == ""){
      console.log("???")
      this.setData({
        istrue:true
      })
      return
    }
    if(app.globalData.time == 0){
      console.log("???")
      this.setData({
        istrue2:true
      })
      return
    }
    let that = this
    // 选择图片
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
        const cloudPath = `flower/${Date.now()} ${filePath.match(/\.[^.]+?$/)[0]}`

        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res);
            //reduce();
            that.reduce();
            wx.cloud.callFunction({
              name: "baiduai",
              data: {
                fileID: res.fileID
              },
              success: res => {
                let result = res.result.info.result;
                that.setData({
                  result,
                  filePath
                })
                app.globalData.result=result
              }
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
  onHide: function () {
    this.setData({
      istrue:false,
      istrue2:false
    })
    return
  }

})