module.exports = (req, res, next) => {
  res.success = data => {
    res.send({ code: 0, response: data })
  }

  res.failure = error => {
    if (! error) error = constants.ERRORS.DEFAULT;
    res.send({ code:error.errno,msg:error.errmsg,timestamp:moment().unix() })
  }

  res.response = result =>{
    if(result.status == ERRORS.OK){
      res.success(result.data);
    }else{
      res.failure(result.status);
    }
  }

  next()
}
