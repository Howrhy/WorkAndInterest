// pages/paperlist/paperlist.js
const app = getApp()
import {
  getpapers
} from '../../utils/api.js'
Page({
  data: {
    paper_list: [],
    issueId: '',
  },

  onLoad: function (options) {
    wx.getStorage({
      key: 'login_key',
      success: (res) => {
        this.getdata(options.issueId)
      },
      fail(res) {
        setTimeout(() => {
          this.getdata(options.issueId)
        }, 1000)
      }
    })
  },

  getdata: function (issueId) {
    getpapers(issueId)
      .then((data) => {
        if (data.data === 0) {
          data.data = [],
            this.setData({
              message: '网络出现问题，请点击搜索重试'
            })
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