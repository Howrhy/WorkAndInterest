//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/api.js')
Page({
  user_answer: {},
  checked: 0,
  score: 0,
  time: '120',
  data: {
    timer: '', //定时器任务
    inputValue: null,
    question_list: [],
    index: 0
  },
  click_next(e) {
    if (this.checked == 0) {
      let message = "答案不能为空"
      api.show_toast(message)
      return
    } else {
      this.calculate(this.user_answer)
      let index = this.data.index
      index = index + 1
      this.checked = 0
      this.setData({
        answer: '',
        inputValue: '',
        check_answer: '',
        index: index,
        question: this.data.question_list[index]
      })
    }

  },
  bindKeyInput(e) {
    let key = this.data.index
    let value = e.detail.value
    if (value.length > 0) {
      this.checked = 1
      this.user_answer[key] = value
    } else {
      this.checked = 0
    }
  },
  click_submit(e) {
    if (this.checked == 0) {
      let message = "答案不能为空"
      api.show_toast(message)
      return
    } else {
      let question_list = this.data.question_list
      let i = this.data.index
      if (question_list[i].answer == this.user_answer[i]) {
        this.score = this.score + 10
      }
      wx.showModal({
        title: '',
        showCancel: false,
        content: "分数：" + this.score,
        success: function (res) {}
      });
      api.saveGrade(0, this.score)
        .then((res) => {
          if (res.data === 'Ok') {
            setTimeout(function () {
              wx.navigateBack({ //返回
                delta: 1
              })
            }, 2000);
          } else {
            setTimeout(function () {
              wx.navigateBack({ //返回
                delta: 1
              })
            }, 2000);
          }
        })
    }
  },
  calculate(dict) {
    let question_list = this.data.question_list
    let i = this.data.index
    if (question_list[i].answer == dict[i]) {
      this.score = this.score + 10
    } else {
      wx.showModal({
        title: '',
        showCancel: false,
        content: "分数：" + this.score,
        success: function (res) {}
      });
      api.saveGrade(0, this.score)
        .then((res) => {
          if (res.data === 'Ok') {
            setTimeout(function () {
              wx.navigateBack({ //返回
                delta: 1
              })
            }, 2000);
          } else {
            setTimeout(function () {
              wx.navigateBack({ //返回
                delta: 1
              })
            }, 2000);
          }
        })
    }
    return true
  },
  handleChange(e) {
    let key = e.currentTarget.dataset.question_id
    let value = e.detail.value
    this.user_answer[key] = value
    this.checked = 1
    this.setData({
      answer: e.detail.value
    })
  },
  checkboxChange(e) {
    let key = e.currentTarget.dataset.question_id
    let value = e.detail.value.sort().toString().replace(/,/g, "")
    if (value.length > 0) {
      this.checked = 1
    } else {
      this.checked = 0
    }
    this.user_answer[key] = value

    this.setData({
      check_answer: e.detail.value
    })
  },
  judgeChange(e) {
    let key = e.currentTarget.dataset.question_id
    let value = "0"
    if (e.detail.value == "正确") {
      value = "1"
    }
    this.user_answer[key] = value
    this.checked = 1
    this.setData({
      judge_answer: e.detail.value
    })
  },
  onLoad: function (options) {
    let that = this
    that.getOneFight()
    that.data.timer = setInterval(function () {
      that.setData({
        time: that.time - 1,
      })
      that.time = that.time - 1
      if (that.time <= 0) {
        clearInterval(that.data.timer);
        wx.showModal({
          title: '',
          showCancel: false,
          content: "分数：" + that.score,
          success: function (res) {}
        });
        api.saveGrade(0, that.score)
          .then((data) => {
            setTimeout(function () {
              wx.navigateBack({ //返回
                delta: 1
              })
            }, 2000);
          })
      }
    }, 1000)
  },
  onUnload: function () {
    let e = this;
    clearInterval(e.data.timer);
  },
  getOneFight() {
    let _this = this
    wx.showLoading({
      title: '拉取题库中',
      mask: true
    })
    api.one_fight()
      .then(res => {
        if (res.data.length == 0) {
          wx.showModal({
            title: '',
            showCancel: false,
            content: '拉取失败，请联系管理员',
            success: function (res) {}
          });
          setTimeout(function () {
            wx.navigateBack({ //返回
              delta: 1
            })
          }, 1000);
        } else {
          wx.hideLoading()
          _this.data.data = res.data
          let question_list = []
          for (let i = 0; i < _this.data.data.length; i++) {
            _this.data.data[i].begin = 0
            _this.data.data[i].end = 0
            if (i == 0) {
              _this.data.data[i].begin = 1
            }
            if (i == _this.data.data.length - 1) {
              _this.data.data[i].end = 1
            }
            let choiceA = {},
              choiceB = {},
              choiceC = {},
              choiceD = {}
            let choice_all = []
            switch (_this.data.data[i].question_type) {
              case 0:
                choice_all = []
                _this.data.data[i].type_name = "单选"
                choiceA.value = 'A'
                choiceA.name = _this.data.data[i].optionA
                choiceB.value = 'B'
                choiceB.name = _this.data.data[i].optionB
                choiceC.value = 'C'
                choiceC.name = _this.data.data[i].optionC
                choiceD.value = 'D'
                choiceD.name = _this.data.data[i].optionD
                choice_all.push(choiceA)
                choice_all.push(choiceB)
                choice_all.push(choiceC)
                choice_all.push(choiceD)
                _this.data.data[i].choice_all = choice_all
                break;
              case 1:
                choice_all = []
                _this.data.data[i].type_name = "多选"
                choiceA.value = 'A'
                choiceA.name = _this.data.data[i].optionA
                choiceB.value = 'B'
                choiceB.name = _this.data.data[i].optionB
                choiceC.value = 'C'
                choiceC.name = _this.data.data[i].optionC
                choiceD.value = 'D'
                choiceD.name = _this.data.data[i].optionD
                choice_all.push(choiceA)
                choice_all.push(choiceB)
                choice_all.push(choiceC)
                choice_all.push(choiceD)
                _this.data.data[i].choice_all = choice_all
                break;
              case 2:
                choice_all = []
                _this.data.data[i].type_name = "判断"
                if (_this.data.data[i].answer) {
                  _this.data.data[i].answer = '1'
                } else {
                  _this.data.data[i].answer = '0'
                }
                choiceA.value = '1'
                choiceA.name = '正确'
                choiceB.value = '0'
                choiceB.name = '错误'
                choice_all.push(choiceA)
                choice_all.push(choiceB)
                _this.data.data[i].choice_all = choice_all
                break;
              case 3:
                _this.data.data[i].type_name = "填空"
                break;
              default:
                break
            }
            question_list.push(_this.data.data[i])
          }
          _this.data.index = 0
          _this.data.question_list = question_list
          _this.setData({
            index: _this.data.index,
            question: _this.data.question_list[_this.data.index]
          })
        }

      }).catch(e => {
        console.log(e)
      })
  },
  onShareAppMessage: function () {
    return {
      title: '十九届五中全会知识问答开始啦，快来试试吧！',
      path: '/pages/onestop/onestop'
    }
  },
})