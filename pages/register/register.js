const api = require("../../utils/api");

// pages/user/info/index.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    spinShow: false,
    openid: '',
    sex: '',
    index: 0,
    sex_range: ["男", "女"]
  },
  onLoad: function (options) {
    this.loadUserInfo()
  },
  loadUserInfo() {
    let _this = this
    _this.setData({
      spinShow: false
    });
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
  formSubmit: function (e) {
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    console.log(e.detail.value)
    api.register(e.detail.value)
      .then(res => {
        console.log(res)
        if (res.data == "Ok") {
          wx.reLaunch({
            url: '../index/index',
          });
        } else {
          wx.showModal({
            title: '',
            showCancel: false,
            content: '提交失败，请联系管理员',
            success: function (res) {}
          });
        }
        wx.hideLoading()
      }).catch(e => {
        wx.showModal({
          title: '',
          showCancel: false,
          content: '网络错误',
          success: function (res) {}
        });
        wx.hideLoading()
      })
  }
})