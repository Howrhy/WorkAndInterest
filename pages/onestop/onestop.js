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
    index: 0
  },
  click_next(e) {
    if (this.checked == 0) {
      let message = "选项不能为空"
      api.show_toast(message)
      return
    } else {
      let index = this.data.index
      index = index + 1
      this.checked = 0
      this.setData({
        answer: '',
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
    api.show_toast("恭喜成功", 'success')
    setTimeout(function () {
      wx.navigateBack({ //返回
        delta: 1
      })
    }, 2000);
  },
  calculate(dict) {
    let question_list = this.data.question_list
    let score = 0
    for (let i = 0; i < question_list.length; i++) {
      if (question_list[i].answer == dict[i]) {
        score = score + 20
      }
    }
    api.show_toast("分数：" + score, 'success')
    setTimeout(function () {
      wx.navigateBack({ //返回
        delta: 1
      })
    }, 2000);
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
    let value = e.detail.value
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
    console.log(e)
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
    this.getOneFight()
  },
  getOneFight() {
    let _this = this
    wx.showLoading({
      title: '拉取题库中',
      mask: true
    })
    api.one_fight()
      .then(res => {
        console.log(res.data)
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
                  _this.data.data[i].answer = ''
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
            question: question_list[_this.data.index]
          })
        }

      }).catch(e => {
        console.log(e)
      })
  },
})