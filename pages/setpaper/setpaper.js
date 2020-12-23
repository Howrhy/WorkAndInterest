//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/api.js')

Page({
  user_answer: {},
  checked: 0,
  data: {
    inputValue: null,
    question_list: [],
    index: 0,
    paperId: ""
  },
  click_next(e) {
    if (this.checked == 0) {
      let message = "答案不能为空"
      api.show_toast(message)
    } else {
      this.data.index++
      this.checked = 0
      this.setData({
        answer: '',
        check_answer: '',
        index: this.data.index,
        inputValue: '',
        question: this.data.question_list[this.data.index]
      })
    }
  },
  click_last(e) {
    if (this.checked == 0) {
      let message = "选项不能为空"
      api.show_toast(message)
      return
    } else {
      this.data.index--
      this.checked = 0
      this.setData({
        answer: '',
        check_answer: '',
        inputValue: '',
        index: this.data.index,
        question: this.data.question_list[this.data.index]
      })
    }
  },
  click_submit(e) {
    if (this.checked == 0) {
      let message = "选项不能为空"
      api.show_toast(message)
      return
    } else {
      this.calculate(this.user_answer)
    }
  },
  calculate(dict) {
    let question_list = this.data.question_list
    let score = 0
    for (let i = 0; i < question_list.length; i++) {
      if (question_list[i].answer == dict[i]) {
        score = score + 10
      }
    }
    api.show_toast("分数：" + score, 'success')
    if (wx.getStorageSync("openid") != '') {
      api.saveGrade(this.data.paperId, score, this.data.paperName)
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
    } else {
      wx.navigateTo({
        url: '../welcome/welcome'
      });
    }

    // this.update();
    //this.onLoad() //再次加载，实现返回上一页页面刷新
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
  getquestions: function (paperId) {
    wx.showLoading({
      title: '拉取题库中',
      mask: true
    })
    api.getQuestions(paperId)
      .then((data) => {
        if (data.data.length == 0) {
          api.show_toast("网络连接出现问题")
          setTimeout(function () {
            wx.navigateBack({ //返回
              delta: 1
            })
          }, 2000);
        } else {
          wx.hideLoading()
          data.data = data.data
          let question_list = []
          for (let i = 0; i < data.data.length; i++) {
            data.data[i].begin = 0
            data.data[i].end = 0
            if (i == 0) {
              data.data[i].begin = 1
            }
            if (i == data.data.length - 1) {
              data.data[i].end = 1
            }
            let choiceA = {},
              choiceB = {},
              choiceC = {},
              choiceD = {}
            let choice_all = []
            switch (data.data[i].question_type) {
              case 0:
                choice_all = []
                data.data[i].type_name = "单选"
                choiceA.value = 'A'
                choiceA.name = data.data[i].optionA
                choiceB.value = 'B'
                choiceB.name = data.data[i].optionB
                choiceC.value = 'C'
                choiceC.name = data.data[i].optionC
                choiceD.value = 'D'
                choiceD.name = data.data[i].optionD
                choice_all.push(choiceA)
                choice_all.push(choiceB)
                choice_all.push(choiceC)
                choice_all.push(choiceD)
                data.data[i].choice_all = choice_all
                break;
              case 1:
                choice_all = []
                data.data[i].type_name = "多选"
                choiceA.value = 'A'
                choiceA.name = data.data[i].optionA
                choiceB.value = 'B'
                choiceB.name = data.data[i].optionB
                choiceC.value = 'C'
                choiceC.name = data.data[i].optionC
                choiceD.value = 'D'
                choiceD.name = data.data[i].optionD
                choice_all.push(choiceA)
                choice_all.push(choiceB)
                choice_all.push(choiceC)
                choice_all.push(choiceD)
                data.data[i].choice_all = choice_all
                break;
              case 2:
                choice_all = []
                data.data[i].type_name = "判断"
                if (data.data[i].answer) {
                  data.data[i].answer = '1'
                } else {
                  data.data[i].answer = '0'
                }
                choiceA.value = '1'
                choiceA.name = '正确'
                choiceB.value = '0'
                choiceB.name = '错误'
                choice_all.push(choiceA)
                choice_all.push(choiceB)
                data.data[i].choice_all = choice_all
                break;
              case 3:
                data.data[i].type_name = "填空"
                break;
              default:
                break
            }
            question_list.push(data.data[i])
          }
          this.data.index = 0
          this.data.question_list = question_list
          this.setData({
            index: this.data.index,
            question: question_list[this.data.index]
          })
        }
      })
  },
  onLoad: function (options) {
    this.getquestions(options.paperId)
    this.data.paperId = options.paperId
    this.data.paperName = options.paperName
  },
  onShareAppMessage: function () {
    return {
      title: '十九届五中全会知识问答开始啦，快来试试吧！',
      path: '/pages/setpaper/setpaper'
    }
  },
})