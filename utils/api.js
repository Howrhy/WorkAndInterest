const config = require('./config.js')

function getpixiv() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.pixivurl,
      dataType: 'jsonp',
      headers: {
        cookie: config.pixivcookie
      },
      success: function (data) {
        resolve(data)
      }
    })
  })
}

function getbilibilir() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.bilibiliurlr,
      dataType: 'jsonp',
      success: function (data) {
        resolve(data)
      }
    })
  })
}

function getbilibiliz() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.bilibiliurz,
      dataType: 'jsonp',
      success: function (data) {
        resolve(data)
      }
    })
  })
}

// 删除题目
function deleteTopic(id) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.server + 'xcx/deleteTopic.php',
      method: 'GET',
      data: {
        id: id
      },
      success: (data) => {
        resolve(data)
      }
    })
  })
}

// 删除试卷
function deletepaper(id) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.server + 'xcx/deletepaper.php',
      method: 'GET',
      data: {
        id: id
      },
      success: (data) => {
        resolve(data)
      }
    })
  })
}

// 获取我的题目
function getmyTopic(parameter) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      success: (res) => {
        wx.request({
          url: config.server + 'xcx/getmyTopic.php',
          method: 'GET',
          data: {
            userid: res.data,
            page: parameter.page,
            classify: parameter.classify,
            keyword: parameter.search,
            overt: parameter.overt,
          },
          success: (data) => {
            resolve(data)
          }
        })
      },
    })
  })
}

// 获取我的试卷
function getmypaper(parameter) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      success: (res) => {
        wx.request({
          url: config.server + 'xcx/getmypaper.php',
          method: 'GET',
          data: {
            userid: res.data,
            page: parameter.page,
            classify: parameter.classify,
            keyword: parameter.search,
            overt: parameter.overt,
          },
          success: (data) => {
            resolve(data)
          }
        })
      },
    })
  })
}

// 获取我的试卷下的题目
function getpaperInTopic(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.server + 'xcx/getpaperInTopic.php',
      method: 'GET',
      data: {
        options: options
      },
      success: (data) => {
        resolve(data)
      }
    })
  })
}

// 获取某个分类下的题目
function getsubject(classify) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      success: (res) => {
        wx.request({
          url: config.server + 'xcx/getsubject.php',
          method: 'GET',
          data: {
            classify: classify,
            userid: res.data
          },
          success: (data) => {
            resolve(data)
          }
        })
      },
    })

  })
}

//获取用户默认设置和信息
function getinformation() {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      success: (res) => {
        wx.request({
          url: config.server + 'xcx/getinformation.php',
          method: 'GET',
          data: {
            userid: res.data
          },
          success: (data) => {
            resolve(data)
          }
        })
      },
    })
  })
}

//举报题目
function reportsubject(id) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      success: (res) => {
        wx.request({
          url: config.server + 'xcx/reportsubject.php',
          method: 'GET',
          data: {
            userid: res.data,
            id: id
          },
          success: (data) => {
            resolve(data)
          }
        })
      },
    })
  })
}

//举报试卷
function reportpaper(id) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      success: (res) => {
        wx.request({
          url: config.server + 'xcx/reportpaper.php',
          method: 'GET',
          data: {
            userid: res.data,
            paperid: id
          },
          success: (data) => {
            resolve(data)
          }
        })
      },
    })
  })
}

//收藏题目和取消收藏
function collectionsubject(id) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      success: (res) => {
        wx.request({
          url: config.server + 'xcx/collectionsubject.php',
          method: 'GET',
          data: {
            userid: res.data,
            id: id
          },
          success: (data) => {
            resolve(data)
          }
        })
      },
    })
  })
}

//收藏试卷和取消收藏
function collectiontestPaper(id) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      success: (res) => {
        wx.request({
          url: config.server + 'xcx/collectiontestPaper.php',
          method: 'GET',
          data: {
            userid: res.data,
            id: id
          },
          success: (data) => {
            resolve(data)
          }
        })
      },
    })
  })
}

// 获取收藏的题目
function getmycollectionTopic(parameter) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      success: (res) => {
        wx.request({
          url: config.server + 'xcx/getmycollectionTopic.php',
          method: 'GET',
          data: {
            userid: res.data,
            page: parameter.page,
            classify: parameter.classify,
            keyword: parameter.search,
            overt: parameter.overt
          },
          success: (data) => {
            resolve(data)
          }
        })
      },
    })
  })
}

// 获取收藏的试卷
function getmycollectionPaper(parameter) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      success: (res) => {
        wx.request({
          url: config.server + 'xcx/getmycollectionPaper.php',
          method: 'GET',
          data: {
            userid: res.data,
            page: parameter.page,
            classify: parameter.classify,
            keyword: parameter.search,
            overt: parameter.overt
          },
          success: (data) => {
            resolve(data)
          }
        })
      },
    })
  })
}

//获取试卷或题目的举报和收藏状态
function iscollectionandreporting(obj) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      success: (res) => {
        wx.request({
          url: config.server + 'xcx/iscollectionandreporting.php',
          method: 'GET',
          data: {
            userid: res.data,
            paperid: obj.paperid,
            subjectid: obj.subjectid,
          },
          success: (data) => {
            resolve(data)
          }
        })
      },
    })
  })
}

// 发送用户已经做完的题目
function sethavefinishedlist(list) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      success: (res) => {
        wx.request({
          url: config.server + 'xcx/sethavefinishedlist.php',
          method: 'GET',
          data: {
            havefinishedlist: list,
            userid: res.data
          },
          success: (data) => {
            resolve(data)
          }
        })
      },
    })

  })
}

// 获取符合搜索条件的试卷
function getissues() {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      complete: (res) => {
        wx.request({
          url: config.server + 'xcx/get_issues.php',
          method: 'GET',
          data: {},
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


// 获取试卷及试卷下的题目
function getTestQuestions(paperid) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      success: (res) => {
        wx.request({
          url: config.server + 'xcx/getTestQuestions.php',
          method: 'GET',
          data: {
            userid: res.data,
            paperid: paperid
          },
          success: (data) => {
            resolve(data)
          }
        })
      },
    })
  })
}

// 获取分享页面的试卷及试卷下的题目
function getshareTestQuestions(paperid) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.server + 'xcx/getshareTestQuestions.php',
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

// 获取试卷及试卷下的题目
function sethavefinishedpaper(paperid) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      success: (res) => {
        wx.request({
          url: config.server + 'xcx/sethavefinishedpaper.php',
          method: 'GET',
          data: {
            userid: res.data,
            paperid: paperid
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

// 设置用户信息
function setinformation(username, gender) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'login_key',
      success: (res) => {
        wx.request({
          url: config.server + 'xcx/setinformationdata.php',
          method: 'GET',
          data: {
            id: res.data,
            username: username,
            gender: gender
          },
          success: (data) => {
            resolve(data)
          }
        })
      },
    })

  })
}

function show_toast(message, icon = 'none', duration = 2000, mask = true) {
  wx.showToast({
    title: message,
    icon: icon,
    duration: duration,
    mask: mask
  })
}



// 注册
function register(user) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.server + 'xcx/register',
      method: 'POST',
      data: {
        name: user.name,
        school: user.school,
        student_No: user.student_No,
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
      // data: {
      //   paperId: paperId
      // },
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

module.exports = {
  getpixiv: getpixiv,
  register: register,
  getbilibilir: getbilibilir,
  getbilibiliz: getbilibiliz,
  deleteTopic: deleteTopic,
  getmyTopic: getmyTopic,
  getsubject: getsubject,
  getinformation: getinformation,
  reportsubject: reportsubject,
  collectionsubject: collectionsubject,
  getmycollectionTopic: getmycollectionTopic,
  getmypaper: getmypaper,
  deletepaper: deletepaper,
  getpaperInTopic: getpaperInTopic,
  getmycollectionPaper: getmycollectionPaper,
  sethavefinishedlist: sethavefinishedlist,
  getissues: getissues,
  getpapers: getpapers,
  getTestQuestions: getTestQuestions,
  sethavefinishedpaper: sethavefinishedpaper,
  getonepaper: getonepaper,
  getshareTestQuestions: getshareTestQuestions,
  collectiontestPaper: collectiontestPaper,
  reportpaper: reportpaper,
  iscollectionandreporting: iscollectionandreporting,
  setinformation: setinformation,
  getQuestions: getQuestions,
  show_toast: show_toast,
  one_fight: one_fight
}