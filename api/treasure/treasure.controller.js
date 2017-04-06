export const getTreasureActivities = async (req, res) => {
  let code = _.toInteger(req.query.code);

  assert(code, ERRORS.PARA_MISS);

  let ret = await Treasure.getTreasureActivities(code,req.uid);

  res.response(ret);
};

export const signUpTreasureActivity = async (req, res) => {
  let activityId = _.toInteger(req.query.activityId);

  assert(activityId, ERRORS.PARA_MISS);

   let ret = await Treasure.signUpTreasureActivity(activityId,req.uid);

  res.response(ret);
};

export const getTreasureActivityDetail = async (req, res) => {
  let activityId = _.toInteger(req.query.activityId);

  assert(activityId, ERRORS.PARA_MISS);

  let ret = await Treasure.getTreasureActivityDetail(activityId,req.uid);

  res.response(ret);
};

export const syncTreasureFind = async (req, res) => {
  let { body } = req;

  assert(body.activityId, ERRORS.PARA_MISS);
  assert(body.itemId, ERRORS.PARA_MISS);

  let ret = await Treasure.syncTreasureFind(body.activityId,body.itemId,req.uid);

  res.response(ret);
};

catchException(module.exports, LOG('trasure'));