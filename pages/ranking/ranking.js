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
    hasMoreData: false, //上拉时是否继续请求数据，即是否还有更多数据
    ranking_list: [{
      head_url: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJnqqVBe8KCL3vhDw6hMnnZaU3jM0sXvic2lcN1kHZjvZpRGLkDeRRpuqrEoaic3KdkuoYpJcV2Biayg/132",
      user_name: "第一名",
      score: 98,
      school: "西北工业大学",
      college: "计算机学院"
    }, {
      head_url: "../../images/finish.png",
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
     
    })
  },
  onShareAppMessage: function () {
    return {
      title: '十九届五中全会知识问答开始啦，快来试试吧！',
      path: '/pages/index/index'
    }
  },
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

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