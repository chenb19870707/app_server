module.exports = {
  DEFAULT: { errmsg: 'ERROR', errno: 1000 },
  REQUEST_INVALID: { errmsg: '请求不合法', errno: 1001 },
  REQUEST_UNAUTHORIZED: { errmsg: '请求未授权', errno: 100 },

  OK:{errmsg: '操作成功',errno:0 },
  PARA_MISS: { errmsg: '缺少参数', errno: 99 },
  ACTIVITY_NOT_EXIST:{ errmsg: '藏宝活动不存在', errno: 1000000 },
  ACTIVITY_END:{ errmsg: '藏宝活动已结束', errno: 1000001 },
  ACTIVITY_SINGED_UP:{ errmsg: '已报名该藏宝活动', errno: 1000002 },
  ACTIVITY_NOT_SINGN_UP:{ errmsg: '未报名该藏宝活动', errno: 1000003 },
  ACTIVITY_NOT_START:{ errmsg: '藏宝活动未开始', errno: 1000004 },
  ACTIVITY_ITEM_NOT_EXIST:{ errmsg: '藏宝点不存在', errno: 1000005 },
}
