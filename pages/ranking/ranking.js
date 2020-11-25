//index.js
//获取应用实例
const app = getApp()
import {
  setclasslay
} from '../../utils/config.js'
import api from '../../utils/api.js'
Page({
  data: {
    hidden: true, //隐藏表单控件
    page: 1, //当前请求数据是第几页
    pageSize: 5, //每页数据条数
    hasMoreData: true, //上拉时是否继续请求数据，即是否还有更多数据
    ranking_list: [{
      head_url: "../../images/b.jpg",
      user_name: "第一名",
      score: 98,
      school: "西北工业大学",
      college: "计算机学院"
    }, {
      head_url: "../../images/b.jpg",
      user_name: "第二名",
      score: 90,
      school: "西安交通大学",
      college: "计算机学院"
    }, {
      head_url: "../../images/b.jpg",
      user_name: "第三名",
      score: 88,
      school: "电子科技大学",
      college: "人文与经法学院"
    }, {
      head_url: "../../images/b.jpg",
      user_name: "第四名",
      score: 86,
      school: "西北工业大学",
      college: "计算机学院"
    }, {
      head_url: "../../images/b.jpg",
      user_name: "第五名",
      score: 66,
      school: "西北工业大学",
      college: "计算机学院"
    }, {
      head_url: "../../images/b.jpg",
      user_name: "第一名",
      score: 98,
      school: "西北工业大学",
      college: "计算机学院"
    }, {
      head_url: "../../images/b.jpg",
      user_name: "第二名",
      score: 90,
      school: "西安交通大学",
      college: "计算机学院"
    }, {
      head_url: "../../images/b.jpg",
      user_name: "第三名",
      score: 88,
      school: "电子科技大学",
      college: "人文与经法学院"
    }, {
      head_url: "../../images/b.jpg",
      user_name: "第四名",
      score: 86,
      school: "西北工业大学",
      college: "计算机学院"
    }, {
      head_url: "../../images/b.jpg",
      user_name: "第五名",
      score: 66,
      school: "西北工业大学",
      college: "计算机学院"
    }, {
      head_url: "../../images/b.jpg",
      user_name: "第一名",
      score: 98,
      school: "西北工业大学",
      college: "计算机学院"
    }, {
      head_url: "../../images/b.jpg",
      user_name: "第二名",
      score: 90,
      school: "西安交通大学",
      college: "计算机学院"
    }, {
      head_url: "../../images/b.jpg",
      user_name: "第三名",
      score: 88,
      school: "电子科技大学",
      college: "人文与经法学院"
    }, {
      head_url: "../../images/b.jpg",
      user_name: "第四名",
      score: 86,
      school: "西北工业大学",
      college: "计算机学院"
    }, {
      head_url: "../../images/b.jpg",
      user_name: "第五名",
      score: 66,
      school: "西北工业大学",
      college: "计算机学院"
    }],
    datas: []
  },
  onLoad: function () {
    this.setData({
      datas: setclasslay
    })
  },
  onShareAppMessage: function () {
    return {
      title: '十九届五中全会知识问答开始啦，快来试试吧！',
      path: '/pages/index/index'
    }
  },
  // 获取分页列表
  getInfo: function (message) {
    var that = this;
    wx.showNavigationBarLoading() //在当前页面显示导航条加载动画
    wx.showLoading({ //显示 loading 提示框
      title: message,
    })
    wx.request({
      url: 'http://localhost:88/wechat/test.php', //本地设置不校验合法域名
      data: {
        page: that.data.page,
        count: that.data.pageSize
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var contentlistTem = that.data.contentlist;
        if (res.data.length > 0) {
          wx.hideNavigationBarLoading() //在当前页面隐藏导航条加载动画
          wx.hideLoading() //隐藏 loading 提示框
          if (that.data.page == 1) {
            contentlistTem = []
          }
          var contentlist = res.data;
          if (contentlist.length < that.data.pageSize) {
            that.setData({
              ranking_list: contentlistTem.concat(contentlist),
              hasMoreData: false
            })
          } else {
            that.setData({
              ranking_list: contentlistTem.concat(contentlist),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        }
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        wx.hideLoading()
        wx.showToast({
          title: "网络连接失败",
          icon: 'loading',
          duration: 2000,
          mask: true
        })
      },
      complete: function (res) {

      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    that.getInfo('正在加载数据...')
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