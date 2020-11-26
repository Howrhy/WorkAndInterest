//index.js
//获取应用实例
const app = getApp()
const config = require('../../utils/config.js')
const api = require('../../utils/api.js')
Page({
  user_answer: {},
  checked: 0,
  data: {
    total: 5,
    question_list: [{
        question_id: '1',
        index: 1,
        question_type: 0,
        type_name: "单选",
        paper_id: '1',
        choice_content: "《党政领导干部选拔任用工作条例》规定，选拔任用党政领导干部，必须经过民主推荐。民主推荐结果作为选拔任用的重要参考，在几年内有效？",
        choice_all: [{
            value: 'A',
            name: '半年'
          },
          {
            value: 'B',
            name: '一年',
          },
          {
            value: 'C',
            name: '二年'
          },
          {
            value: 'D',
            name: '三年'
          }
        ],
        choice_answer: 'A'
      },
      {
        question_id: '2',
        index: 2,
        question_type: 1,
        type_name: "多选",
        paper_id: '1',
        choice_content: "1+1等于几？",
        choice_all: [{
            value: 'A',
            name: '1'
          },
          {
            value: 'B',
            name: '2',
          },
          {
            value: 'C',
            name: '3'
          },
          {
            value: 'D',
            name: '4'
          }
        ],
        choice_answer: ['B']
      },
      {
        question_id: '3',
        index: 3,
        question_type: 2,
        type_name: "判断",
        paper_id: '1',
        choice_content: "2+2等于4",
        choice_all: [{
            value: '1',
            name: '正确'
          },
          {
            value: '0',
            name: '错误',
          }
        ],
        choice_answer: '1'
      },
    ]

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
      if (question_list[i].question_type == 1) {
        if (question_list[i].choice_answer.sort().toString() == dict[i + 1].sort().toString()) {
          score = score + 20
        }
      } else {
        if (question_list[i].choice_answer == dict[i + 1]) {
          score = score + 20
        }
      }
    }
    this.show_toast("分数：" + score)
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
  onLoad: function () {
    let index = 0
    this.setData({
      total: this.data.question_list.length,
      index: index,
      question: this.data.question_list[index]
    })
  },
})