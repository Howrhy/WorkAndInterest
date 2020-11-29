//index.js
//获取应用实例
const app = getApp()
import api from '../../utils/api.js'
Page({
  data: {
    hidden: true, //隐藏表单控件
    page: 1, //当前请求数据是第几页
    pageSize: 5, //每页数据条数
    hasMoreData: false, //上拉时是否继续请求数据，即是否还有更多数据
    ranking_list: [],
    userInfo: "",
  },

  onShareAppMessage: function () {
    return {
      title: '十九届五中全会知识问答开始啦，快来试试吧！',
      path: '/pages/ranking/ranking'
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    api.getRankingList().then((data) => {
      if (data.lenth === 0) {
        api.show_toast('网络出现问题，请点击搜索重试')
      } else {
        let ranking_list = data.data
        this.data.ranking_list = ranking_list
        this.setData({
          ranking_list: ranking_list
        })
        api.getMyRank().then((data) => {
          console.log(data)
          if (data.data === undefined) {
            api.show_toast('网络出现问题，请点击搜索重试')
          } else {
            this.data.userInfo = data.data
            this.setData({
              userInfo: data.data
            })
          }
        })
      }

    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getInfo('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },

})