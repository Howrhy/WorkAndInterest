//index.js
//获取应用实例
const app = getApp()
const config = require('../../utils/config.js')
const api = require('../../utils/api.js')
Page({
  data: {
    userInfo: '',
    hasUserInfo: false,
  },
  //事件处理函数
  onShow: function () {
    if (wx.getStorageSync("openid") == '') {
      wx.navigateTo({
        url: '../welcome/welcome'
      });
    }
    let _this = this
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        _this.setData({
          userInfo: res.data
        })
      },
    })
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function () {
    return {
      title: '十九届五中全会知识问答开始啦，快来试试吧！',
      path: '/pages/personalCenter/personalCenter'
    }
  },
})