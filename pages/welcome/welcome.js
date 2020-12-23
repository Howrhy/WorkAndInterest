// pages/welcome/welcome.js
const app = getApp()
const api = require('../../utils/api.js')
Page({
  data: {
    viewShowed: false, //控制授权是否显示true不弹出
  },

  onLoad: function () {
    this.getUserInfo()
  },
  getUserInfo: function (e) {
    app.getUserInfo()
  },
})