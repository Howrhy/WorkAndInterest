//index.js
//获取应用实例
const api = require('../../utils/api.js')
const app = getApp()
Page({
  data: {
    period_list: [],
    finished_issues: [1, 2]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (!wx.getStorageSync('my_state')) {
      wx.navigateTo({
        url: '../welcome/welcome'
      });
    } else {
      app.getUserInfo()
    }
    // let _this = this
    // wx.getStorage({
    //   key: 'login_key',
    //   success: (res) => {
    //     _this.getdata(true)
    //   },
    //   fail(res) {
    //     setTimeout(() => {
    //       _this.getdata(true)
    //     }, 1000)
    //   }
    // })
  },
  oncancel: function () {

  },
  onShareAppMessage: function () {
    return {
      title: '十九届五中全会知识问答开始啦，快来试试吧！',
      path: '/pages/index/index'
    }
  },
})