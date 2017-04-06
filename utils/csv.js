const encode = (head, body) => {
  return _.reduce(_.concat([head], body), (str, line) => str += `\t${_.join(line, ',\t')}\r\n`, '')
}

const decode = data => {
  return _(data)
    .split('\n')
    .compact()
    .map(line => _.split(line.replace(/\t/g, ''), ','))
    .map(line => _.map(line, v => _.trimEnd(v, '\r')))
    .value()
}

export { encode, decode }