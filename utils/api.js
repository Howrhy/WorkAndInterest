const config = require('./config.js')
const app = getApp()
// 获取所有期限的试卷
function getissues() {
  let wx_id = wx.getStorageSync("openid")
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      complete: (res) => {
        wx.request({
          url: config.server + 'xcx/get_issues.php',
          method: 'GET',
          data: {
            wx_id: wx_id,
          },
          success: (data) => {
            resolve(data)
          }
        })
      },

    })

  })
}
// 获取这一期下的所有试卷
function getpapers(issueId) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      complete: (res) => {
        wx.request({
          url: config.server + 'xcx/get_papers.php',
          method: 'GET',
          data: {
            issueId: issueId
          },
          success: (data) => {
            resolve(data)
          }
        })
      },

    })

  })
}
// 获取试卷的信息
function getonepaper(paperid) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.server + 'xcx/getonepaper.php',
      method: 'GET',
      data: {
        paperid: paperid
      },
      success: (data) => {
        resolve(data)
      }
    })
  })
}
//弹窗封装
function show_toast(message, icon = 'none', duration = 2000, mask = true) {
  wx.showToast({
    title: message,
    icon: icon,
    duration: duration,
    mask: mask
  })
}
// 注册
function register(user, global) {
  return new Promise((resolve, reject) => {
    user.wx_id = wx.getStorageSync("openid")
    user.avatarUrl = global.avatarUrl
    wx.request({
      url: config.server + 'xcx/register',
      method: 'POST',
      data: {
        user: JSON.stringify(user)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (data) => {
        resolve(data)
      }
    })
  })
}


// 修改信息
function setMyInfo(user, global) {
  return new Promise((resolve, reject) => {
    user.wx_id = wx.getStorageSync("openid")
    user.avatarUrl = global.avatarUrl
    wx.request({
      url: config.server + 'xcx/set_info',
      method: 'POST',
      data: {
        user: JSON.stringify(user)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (data) => {
        resolve(data)
      }
    })
  })
}

// 个人信息
function getMyInfo(user) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.server + 'xcx/get_myInfo',
      method: 'GET',
      data: {
        wx_id: wx.getStorageSync("openid")
      },
      success: (data) => {
        resolve(data)
      }
    })
  })
}
//一站到底
function one_fight() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.server + 'xcx/one_fight',
      method: 'GET',
      success: (data) => {
        resolve(data)
      },
    })
  })
}
// 获取我的试卷
function getQuestions(paperId) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.server + 'xcx/get_questions.php',
      method: 'GET',
      data: {
        paperId: paperId
      },
      success: (data) => {
        resolve(data)
      }
    })
  })
}
// 排行榜
function getRankingList(pageNum) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.server + 'xcx/get_rankingList?',
      method: 'GET',
      data: {
        pageNum: pageNum
      },
      success: (data) => {
        resolve(data)
      }
    })
  })
}
// 查自己的分数和排名
function getMyRank() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.server + 'xcx/get_myRank',
      method: 'GET',
      data: {
        wx_id: wx.getStorageSync("openid")
      },
      success: (data) => {
        resolve(data)
      }
    })
  })
}

// 提交答案
function saveGrade(paper_id, score, paperName) {
  if (score == 0 || score > 100) {
    return 
  }
  let wx_id = wx.getStorageSync("openid")
  let myDate = new Date()
  let time = formatDate(myDate)
  if (paper_id != 0) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.server + 'xcx/saveGrade1',
        method: 'GET',
        data: {
          wx_id: wx_id,
          paper_id: paper_id,
          score: score,
          data: time,
          paperName: paperName
        },
        success: (data) => {
          resolve(data)
        }
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.server + 'xcx/saveGrade2',
        method: 'GET',
        data: {
          wx_id: wx_id,
          score: score,
          data: time
        },
        success: (data) => {
          resolve(data)
        }
      })
    })
  }
}

// 答题记录
function getRecord() {
  let wx_id = wx.getStorageSync("openid")
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.server + 'xcx/get_record',
      method: 'GET',
      data: {
        wx_id: wx_id,
      },
      success: (data) => {
        resolve(data)
      }
    })
  })
}

// 一站到底记录
function getFightRecord() {
  let wx_id = wx.getStorageSync("openid")
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.server + 'xcx/get_fight',
      method: 'GET',
      data: {
        wx_id: wx_id,
      },
      success: (data) => {
        resolve(data)
      }
    })
  })
}
//格式化时间 不能使用 new Date()
function formatDate(timeObj) {
  var str = "";
  var year = timeObj.getFullYear();
  var month = timeObj.getMonth() + 1;
  var date = timeObj.getDate();
  var time = timeObj.toTimeString().split(" ")[0];
  var rex = new RegExp(/:/g);
  str = year + "-" + month + "-" + date + " " + time.replace(rex, ":");
  return str;
}
module.exports = {
  register: register,
  getissues: getissues,
  getpapers: getpapers,
  getonepaper: getonepaper,
  getQuestions: getQuestions,
  show_toast: show_toast,
  one_fight: one_fight,
  getMyInfo: getMyInfo,
  formatDate: formatDate,
  saveGrade: saveGrade,
  getRankingList: getRankingList,
  getMyRank: getMyRank,
  getRecord: getRecord,
  setMyInfo: setMyInfo,
  getFightRecord: getFightRecord
}