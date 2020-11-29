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
        if (res.data.length == 0) {
          wx.showModal({
            title: '',
            showCancel: false,
            content: '获取失败，请联系管理员',
            success: function (res) {}
          });
          setTimeout(function () {
            wx.navigateBack({ //返回
              delta: 1
            })
          }, 1000);
        } else {
          wx.hideLoading()
          _this.data.listData = res.data
        }
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