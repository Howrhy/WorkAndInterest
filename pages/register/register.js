const api = require("../../utils/api");

// pages/user/info/index.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    spinShow: false,
    openid: '',
    index: 0,
  },
  onLoad: function (options) {
    this.loadUserInfo()
  },
  loadUserInfo() {
    let _this = this
    if (wx.getStorageSync("userInfo") != undefined) {
      _this.data.userInfo = wx.getStorageSync("userInfo")
      _this.setData({
        spinShow: false
      });
    } else {
      wx.showModal({
        title: '',
        showCancel: false,
        content: '请先进行信息授权',
        success: function (res) {}
      });
    }

  },
  bindSexChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  check_register(obj) {
    for (var key in obj) {
      if (obj[key] == undefined) return false;
    }
    return true
  },
  formSubmit: function (e) {
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    if (this.check_register(e.detail.value)) {
      api.register(e.detail.value, app.globalData.userInfo)
        .then(res => {
          console.log(res)
          if (res.data == "Ok") {
            wx.setStorageSync('isRegister', true),
              wx.switchTab({
                url: '../index/index'
              });
          } else {
            wx.showModal({
              title: '',
              showCancel: false,
              content: '提交失败，请联系管理员',
              success: function (res) {}
            });
            wx.hideLoading()
          }

        })
    } else {
      wx.hideLoading({
        success: (res) => {},
      })
      wx.showModal({
        title: '',
        showCancel: false,
        content: '字段不能为空 请检查注册信息',
        success: function (res) {}
      });
    }

  }
})