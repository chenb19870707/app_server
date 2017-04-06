"use strict";
const knex = DB.knex();
const redis = DB.redis();

const {
  ADMIN_TEAM_HOT_AREAS_TABLE,
  TREASURE_ACTIVITY,
  TREASURE_ACTIVITY_MEMBER,
  TREASURE_ACTIVITY_ITEM,
  TREASURE_ACTIVITY_USER_RECORDS,
  TREASURE_ACTIVITY_PRIZE_TICKET
} = constants.TABLES;

const {
  TREASURE_ACTIVITY_NOT_START,
  TREASURE_ACTIVITY_ING,
  TREASURE_ACTIVITY_END
}= constants.TREASURE_ACTIVITY_STATUS;

export const getTreasureActivities = async(code, uid) => {
  let res = {status: ERRORS.OK};

  let signedActivities = await getMyActivities(uid);
  let now = moment().unix();

  res.data  =await knex(TREASURE_ACTIVITY)
    .select(
      'id',
      'issuer_name',
      'start_datetime',
      'end_datetime',
      'is_need_sign_in',
      'area_image_url',
      'agree_url',
      'banner_url',
      'name',
      'activity_desc',
      'activity_desc_url'
    )
    .where({'city_code':code,'is_online':1})
    .orderBy('start_datetime', 'desc')
    .map(activity =>
      _(activity)
        .set('is_me_signed_up', undefined != _.find(signedActivities, {activity_id: activity.id}))
        .set('status',setActivityStatus(now,activity.start_datetime,activity.end_datetime))
        .value()
    );

  return res;
};

export const setActivityStatus =function (now,start_datetime,end_datetime) {
  let endtime = moment(end_datetime).unix();
  let starttime =moment(start_datetime).unix();

  if(now < starttime) {
    return TREASURE_ACTIVITY_NOT_START;
  }
  else if(now > starttime && now < endtime){
    return TREASURE_ACTIVITY_ING;
  }
  else if(now > endtime){
    return TREASURE_ACTIVITY_END;
  }
};

export const signUpTreasureActivity = async(activityId, uid) => {
  let res = {status: ERRORS.OK};

  //检查活动ID是否合法
  let treasureActivity = await getTreasureActivityById(activityId);
  if (!treasureActivity) {
    res.status = ERRORS.ACTIVITY_NOT_EXIST;
    return res;
  }

  //检查活动是否结束
  let endtimestatmp = moment(treasureActivity.end_datetime);
  if (moment().unix() > endtimestatmp.unix()) {
    res.status = ERRORS.ACTIVITY_END;
    return res;
  }

  //判断我是否已报名
  let signedUpAct = await getTreasureMyActivity(activityId, uid);
  if (signedUpAct) {
    res.status = ERRORS.ACTIVITY_SINGED_UP;
    return res;
  }

  await knex('treasure_activity_member')
    .insert({activity_id: activityId, uid: uid, create_time: Timer.now()})

  res.data = {timestamp:moment().unix()}

  return res;
};

export const getTreasureActivityDetail = async(activityId, uid) => {
  let res = {status: ERRORS.OK};

  //检查活动ID是否合法
  let treasureActivity = await knex(TREASURE_ACTIVITY)
    .where({'id': activityId, 'is_online': 1})
    .first()
    .select(
      'id',
      'start_datetime',
      'end_datetime',
      'accomplish_desc',
      'area_image_url',
      'name',
      'accomplish_img_url',
      'banner_url',
      'activity_desc',
      'activity_desc_url',
      'is_need_sign_in'
    );
  if (!treasureActivity) {
    res.status = ERRORS.ACTIVITY_NOT_EXIST;
    return res;
  }

  //检查活动还未开始
  let starttimestatmp = moment(treasureActivity.start_datetime);
  if (moment().unix() < starttimestatmp.unix()) {
    res.status = ERRORS.ACTIVITY_NOT_START;
    return res;
  }

  //判断我是否已报名
  let signedUpAct = await getTreasureMyActivity(activityId, uid);
  if (!signedUpAct && treasureActivity.is_need_sign_in) {
    res.status = ERRORS.ACTIVITY_NOT_SINGN_UP;
    return res;
  }

  //获取所有藏宝点
  let items = await  knex(`${TREASURE_ACTIVITY_ITEM} as a`)
    .where('a.activity_id', activityId)
    .leftJoin(`${TREASURE_ACTIVITY_USER_RECORDS} as u`, function () {
      this.on('u.activity_id', '=', 'a.activity_id')
        .on('u.item_id', '=', 'a.id')
        .on('u.uid', '=', uid)
    })
    .select(
      'a.id',
      'a.name',
      'a.desc',
      'longitude',
      'latitude',
      'tips_pic_url',
      'target_pic_url',
      'effect_url',
      'exchange_url',
      'ticket_desc',
      'code',
      'uid',
      'prize_type'
    )
    .map(item =>
      _(item).set('is_me_finished', null != item.uid)
        .omit('uid')
        .value())

  res.data = {
    activity: treasureActivity,
    items: items
  };

  return res;
};

export const syncTreasureFind = async(activityId, itemId, uid) => {
  let res = {status: ERRORS.OK};

  //检查活动ID是否合法
  let treasureActivity = await knex(TREASURE_ACTIVITY)
    .where({'id': activityId, 'is_online': 1})
    .first()
  if (!treasureActivity) {
    res.status = ERRORS.ACTIVITY_NOT_EXIST;
    return res;
  }

  //检查活动还未开始
  let starttimestatmp = moment(treasureActivity.start_datetime);
  if (moment().unix() < starttimestatmp.unix()) {
    res.status = ERRORS.ACTIVITY_NOT_START;
    return res;
  }

  //判断我是否已报名
  let signedUpAct = await getTreasureMyActivity(activityId, uid);
  if (!signedUpAct && treasureActivity.is_need_sign_in) {
    res.status = ERRORS.ACTIVITY_NOT_SINGN_UP;
    return res;
  }

  //检查藏宝点是否存在
  let item = await  knex(TREASURE_ACTIVITY_ITEM)
    .where({'activity_id': activityId, 'id': itemId})
    .first()
  if (!item) {
    res.status = ERRORS.ACTIVITY_ITEM_NOT_EXIST;
    return res;
  }

  //检查藏宝点是否已完成
  let myItem = await  knex(TREASURE_ACTIVITY_USER_RECORDS)
    .where({'activity_id': activityId, 'item_id': itemId,'uid':uid})
    .first()
  if (myItem) {
    res.data = {
      exchangeUrl: myItem.exchange_url,
      ticketDesc: myItem.ticket_desc,
      ticketCode: [myItem.code],
    }
    return res;
  }

  //检查是否有奖券
  let code = '';
  let ticketIndex = await redis.getAsync(activityId + ':' + itemId);
  if (item.prize_type > 0 && _.toInteger(ticketIndex) < item.prize_num ) {
    redis.set(activityId + ':' + itemId,_.toInteger(ticketIndex) + 1);

    code = await knex(TREASURE_ACTIVITY_PRIZE_TICKET)
      .where({treasure_item_id:itemId})
      .limit(1).offset(_.toInteger(ticketIndex))
      .first();

    if(!code){
      code = {ticket_code:''};
    }

    res.data = {
      exchangeUrl: item.prize_exchage_url,
      ticketDesc: item.prize_desc,
      ticketCode: [code.ticket_code],
    }
  }

  await knex(TREASURE_ACTIVITY_USER_RECORDS)
    .insert({uid:uid
      ,activity_id:activityId
      ,item_id:itemId
      ,exchange_url:item.prize_exchage_url
      ,ticket_desc:item.prize_desc
      ,code:code.ticket_code
      ,createtime:Timer.now()})

  return res;
};

export const getTreasureActivityById = async(activity) => {
  return knex(TREASURE_ACTIVITY)
    .where({'id': activity, 'is_online': 1})
    .first()
};

export const getTreasureMyActivity = async(activity, uid) => {
  return knex(TREASURE_ACTIVITY_MEMBER)
    .where({'activity_id': activity, 'uid': uid})
    .first()
};

export const getMyActivities = async(uid) => {
  return knex(TREASURE_ACTIVITY_MEMBER)
    .select('activity_id')
    .where({uid: uid})
};