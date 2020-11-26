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
  onLoad: function () {
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
      title: '趣工问答，可以自行定义选择题让您的好友答题，快来试试吧！',
      path: '/pages/personalCenter/personalCenter'
    }
  },

})