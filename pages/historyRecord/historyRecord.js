// pages/historyRecord/historyRecord.js
const api = require('../../utils/api.js')
Page({
  data: {
    listData: {}
  },
  getHistoryRecord() {
    let _this = this
    wx.showLoading({
      title: '获取记录中',
      mask: true
    })
    api.getRecord()
      .then(res => {
        wx.hideLoading()
        _this.data.listData = res.data
        _this.setData({
          listData: _this.data.listData
        })
      })
  },

  onLoad: function () {
    this.getHistoryRecord()
  },
  onShareAppMessage: function () {
    return {
      title: '十九届五中全会知识问答开始啦，快来试试吧！',
      path: '/pages/historyRecord/historyRecord'
    }
  },
})