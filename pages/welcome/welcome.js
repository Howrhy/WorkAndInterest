// pages/welcome/welcome.js
const app = getApp()
const api = require('../../utils/api.js')
Page({
  data: {
    viewShowed: false, //控制授权是否显示true不弹出
  },

  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    this.getUserInfo()
    setTimeout(() => {
      wx.hideLoading()
    }, 1000)
  },
  getUserInfo: function (e) {
    if (app.globalData.my_state) {
      app.goto_login()
      wx.switchTab({
        url: '../index/index'
      });
    } else {
      app.getUserInfo()
    }
  },
})