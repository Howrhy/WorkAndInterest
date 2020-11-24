//index.js
//获取应用实例
const app = getApp()
import { getissues } from '../../utils/api.js'
Page({
  data: {
    period_list: [],
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let _this = this
    wx.getStorage({
      key: 'login_key',
      success: (res) => {
        _this.getdata(true)
      },
      fail(res) {
        setTimeout(() => {
          _this.getdata(true)
        }, 1000)
      }
    })
  },
  oncancel: function () {
    console.log('取消')
  },
  getdata: function (all) {

    getissues()
      .then((data) => {
        if (data.data === 0) {
          data.data = [],
            this.setData({
              message: '网络出现问题，请点击搜索重试'
            })
        } else {
          let period_list = data.data
          this.setData({
            period_list: period_list
          })
        }

      })
  },
})