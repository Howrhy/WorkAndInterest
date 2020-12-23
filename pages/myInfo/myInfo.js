const api = require("../../utils/api");
const app = getApp()
// pages/user/info/index.js
Page({
  data: {
    user_info: {},
    openid: '',
    index: 0
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.loadUserInfo()
  },
  loadUserInfo() {
    let _this = this
    api.getMyInfo()
      .then(res => {
        if (res.data != undefined) {
          _this.data.user_info = res.data
          _this.setData({
            user_info: res.data
          });
          wx.hideLoading({
            success: (res) => {},
          })
        } else {
          wx.navigateTo({
            url: '../register/register',
          });
        }
        wx.hideLoading()
      })
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
      api.setMyInfo(e.detail.value, app.globalData.userInfo)
        .then(res => {
          if (res.data == "OK") {
            setTimeout(function () {
              wx.navigateBack({ //返回
                delta: 1
              })
            }, 1000);
          } else {
            wx.showModal({
              title: '',
              showCancel: false,
              content: '提交失败，请联系管理员',
              success: function (res) {}
            });
          }
          wx.hideLoading()
        })
    } else {
      wx.showModal({
        title: '',
        showCancel: false,
        content: '字段不能为空 请检查注册信息',
        success: function (res) {}
      });
    }

  },
  
})