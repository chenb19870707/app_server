/**
 * Created by chen on 2017/3/8.
 * 检验用户uid是否合法
 */

const querystring = require('querystring')

module.exports = (req, res, next) => {
  let token = req.cookies.u_token;

  if (! token){
    var param= querystring.parse(req.header('Set-Cookie')[0]);
    if(param.u_token) {
      token =param.u_token;
    } else{
      return res.failure(ERRORS.REQUEST_UNAUTHORIZED)
    }
  }

  let arr = token.split('|');
  if(arr.length != 3)
  {
    res.failure(ERRORS.REQUEST_UNAUTHORIZED);
    return;
  }

  let uid = new Buffer(arr[0],'base64');
  if(_.toInteger(uid) == 0){
    res.failure(ERRORS.REQUEST_UNAUTHORIZED);
    return;
  }

  let timestamp = _.toInteger(arr[1]);
  let now = _.toInteger((new Date).getTime()/1000);

  if(timestamp < now - 2678400 || timestamp > now + 2678400) {
    res.failure(ERRORS.REQUEST_UNAUTHORIZED);
    return;
  }

  req.uid = _.toInteger(uid);
  next()
};
