//index.js
//获取应用实例
const api = require('../../utils/api.js')
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

  },
  getdata: function (all) {

    api.getissues()
      .then((data) => {
        if (data.data === 0) {
          data.data = [],
            api.show_toast('网络出现问题，请重试')
        } else {
          let period_list = data.data.data
          this.data.period_list = period_list
          let finished_issues = data.data.finished_issues
          this.data.finished_issues = finished_issues
          this.setData({
            period_list: period_list,
            finished_issues: finished_issues
          })
        }

      })
  },
  onShareAppMessage: function () {
    return {
      title: '十九届五中全会知识问答开始啦，快来试试吧！',
      path: '/pages/index/index'
    }
  },
})