const pixivurl = "https://www.pixiv.net/rpc/index.php?mode=get_recommend_users_and_works_by_user_ids&user_ids=22190423%2C6214%2C1050881%2C787998%2C11&user_num=30&work_num=${arg}&tt=07836215ff146df49cb4d2855ccb45c3"

const pixivcookie = 'first_visit_datetime_pc=2018-06-26+18%3A58%3A46; p_ab_id=3; p_ab_id_2=2; _ga=GA1.2.1976150256.1530007024; PHPSESSID=26877498_7acefe4362d679b78829a509320246b4; privacy_policy_agreement=1; c_type=20; a_type=0; b_type=1; module_orders_mypage=%5B%7B%22name%22%3A%22sketch_live%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22tag_follow%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22recommended_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22showcase%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22everyone_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22following_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22mypixiv_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22fanbox%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22featured_tags%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22contests%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22user_events%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22sensei_courses%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22spotlight%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22booth_follow_items%22%2C%22visible%22%3Atrue%7D%5D; yuid=M1IWCEc22; login_ever=yes; limited_ads=%7B%22header%22%3A%22%22%7D; __utmv=235335808.|2=login%20ever=yes=1^3=plan=normal=1^5=gender=male=1^6=user_id=26877498=1^9=p_ab_id=3=1^10=p_ab_id_2=2=1^11=lang=zh=1; ki_s=189784%3A0.0.0.0.0; is_sensei_service_user=1; __utma=235335808.1976150256.1530007024.1533283647.1533610474.3; __utmc=235335808; __utmz=235335808.1533610474.3.2.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; OX_plg=pm; __utmt=1; ki_t=1533279523293%3B1533610495001%3B1533611853576%3B2%3B4; ki_r=; __utmb=235335808.5.10.1533610474; tag_view_ranking=ojUG7gl5F-~EGefOqA6KB~E10s4iC-Ph~jycw0mDeFx~LcbvV3w_si~64toum72lP~iFcW6hPGPU~blN5RWq7CX~F5MZpMB1da~at5kYG0Mvu~obNLFtMHZi~_ZamSPz5cZ'

const bilibiliurlr = 'https://bangumi.bilibili.com/jsonp/timeline_v2_global.ver?callback=timeline&type=jsonp&_=1533543035777'

const bilibiliurlz = 'https://bangumi.bilibili.com/jsonp/timeline_v2_cn.ver?callback=gc_timeline&type=jsonp&_=1533609502097'
let setmaxclass = []
let setclasslay = [{
    maxclass: '娱乐',
    minclass: ['电影', '游戏', '动漫', '小说', '漫画', '电视剧']
  },
  {
    maxclass: '生活',
    minclass: ['饮食', '健康', '常识', '亲友', '情侣']
  },
  {
    maxclass: '职业',
    minclass: ['画家',
      '裁缝',
      '翻译',
      '魔术师',
      '科学家',
      '主持人'
    ]
  },
  {
    maxclass: '其他',
    minclass: ['综合', '撒打算']
  },
]
let maxclass = []
let classlay = [{
    maxclass: '娱乐',
    minclass: ['电影', '游戏', '动漫']
  },
  {
    maxclass: '生活',
    minclass: ['饮食', '健康', '常识', '亲友', '情侣']
  },
  {
    maxclass: '职业',
    minclass: ['教师', 'up主', '主播']
  },
  {
    maxclass: '综合',
    minclass: ['综合']
  },
]


module.exports = {
  pixivurl: pixivurl,
  pixivcookie: pixivcookie,
  bilibiliurlr: bilibiliurlr,
  bilibiliurlz: bilibiliurlz,
  server: 'https://guhang.fun/',
  // server: 'https://192.168.1/',
  maxclass: maxclass,
  classlay: classlay,
  setmaxclass: setmaxclass,
  setclasslay: setclasslay
}