//index.js
//获取应用实例
const app = getApp()
import api from '../../utils/api.js'
import config from '../../utils/config.js'
Page({
  data: {
    pageNum: 1, //当前请求数据是第几页
    hasMoreData: false, //上拉时是否继续请求数据，即是否还有更多数据
    ranking_list: [],
    userInfo: "",
    scrolly: true
  },

  onShareAppMessage: function () {
    return {
      title: '十九届五中全会知识问答开始啦，快来试试吧！',
      path: '/pages/ranking/ranking'
    }
  },

  onShow: function (options) {
    var that = this
    that.data.scrolly = true
    that.data.pageNum = 1
    // 页面初始化 options为页面跳转所带来的参数
    api.getRankingList(that.data.pageNum).then((data) => {
      if (data.lenth === 0) {
        api.show_toast('网络出现问题，请重试')
      } else {
        let ranking_list = data.data
        that.data.ranking_list = ranking_list
        that.setData({
          ranking_list: ranking_list
        })
        if (wx.getStorageSync("openid") != '') {
          api.getMyRank().then((data) => {
            if (data.data === "error") {
              api.show_toast('请完成注册信息填写')
              app.getUserInfo()
            } else {
              that.data.userInfo = data.data
              that.setData({
                userInfo: data.data
              })
            }
          })
        } else {
          wx.navigateTo({
            url: '../welcome/welcome'
          });
        }

      }

    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */

  getMore: function () {
    var that = this;
    if (that.data.scrolly == false) {
      return
    }
    var pageNum = that.data.pageNum + 1;
    that.data.pageNum = pageNum
    wx.showLoading({
      title: ' 加载中',
      make: true
    })
    wx.request({
      url: config.server + 'xcx/get_rankingList?',
      method: 'GET',
      data: {
        pageNum: pageNum
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var res = res.data;
        if (res.length != 0) {
          that.data.ranking_list = that.data.ranking_list.concat(res)
          that.setData({
            ranking_list: that.data.ranking_list
          })
        } else {
          wx.showModal({
            title: '',
            showCancel: false,
            content: '没有更多啦',
            success: function (res) {}
          });
          that.data.scrolly = false
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器异常',
          duration: 1500
        })
      },
      complete: function () {
        if (pageNum >= 1) {
          wx.hideLoading()
        }
      }
    })
  }
  // onShow: function () {
  //   const pages = getCurrentPages()
  //   const perpage = pages[pages.length - 1]
  //   perpage.onLoad()
  // },
})