//app.js
const config = require('./utils/config.js')
const api = require('./utils/api.js')
String.prototype.trim = function () {
  return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
App({
  globalData: {
    userInfo: '',
    my_state: false
  },
  getUserInfo() {
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
        wx.setStorageSync('my_state', true)
        wx.setStorageSync('userInfo', res.userInfo)
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
        this.goto_login()
      },
      fail: function () {
        wx.showModal({
          title: '',
          showCancel: false,
          content: '请先点击开始挑战进行信息授权',
          success: function (res) {}
        });
      }
    })
  },
  getInfo() {
    let that = this
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
            }
          })
        } else {
          wx.openSetting({ //打开小程序设置页面，用户自己选择授权
            success: function (res) {
              res.authSetting = {
                "scope.userInfo": true
              }
            }
          })
        }
      }
    })
  },
  goto_login() {
    wx.login({
      success: function (res) {
        wx.request({
          url: config.server + 'xcx/get_openId.php',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            //如果收到1，说明该用户已注册，在考虑服务器要不会返回该用户学校、姓名等信息用于本地存
            //如果收到0，说明该用户未注册
            //此处弹出注册页面，要求用户填写【学校、姓名、学号】信息，随openid一起发给服务器注册
            wx.setStorageSync("openid", res.data[1]);
            if (res.data[0] == "1") {
              wx.switchTab({
                url: '../../pages/index/index'
              });
            } else {
              wx.navigateTo({
                url: '../../pages/register/register',
              });
            }
          },
          fail: function (res) {
            wx.showModal({
              title: '',
              showCancel: false,
              content: '服务器未响应，请联系管理员',
              success: function (res) {}
            });
          }
        })
      }
    })
  },
  onLaunch: function () {
    //this.getUserInfo()
  }
})