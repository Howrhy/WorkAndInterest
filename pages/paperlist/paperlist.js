// pages/paperlist/paperlist.js
const app = getApp()
const api = require('../../utils/api.js')
import {
  getpapers
} from '../../utils/api.js'
Page({
  data: {
    paper_list: [],
    issueId: '',
  },

  onLoad: function (options) {
    let that = this
    wx.getStorage({
      //TODO
      key: 'login_key',
      success: (res) => {
        that.getdata(options.issueId)
      },
      fail(res) {
        setTimeout(() => {
          that.getdata(options.issueId)
        }, 1000)
      }
    })
  },

  getdata: function (issueId) {
    getpapers(issueId)
      .then((data) => {
        if (data.data === 0) {
          data.data = [],
            api.show_toast("网络出现问题，请重试")
          setTimeout(function () {
            wx.navigateBack({ //返回
              delta: 1
            })
          }, 2000);
        } else {
          let paper_list = data.data
          this.setData({
            paper_list: paper_list
          })
        }

      })
  },

  onReady: function () {

  },

  onShow: function () {

  },


  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})