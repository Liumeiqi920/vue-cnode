import timeago from 'timeago.js'

const utils = {}

utils.getTimeStr = (str) => {
  let old = new Date(str)
  let tg = timeago()
  let res = tg.format(old, 'zh_CN')
  return res
}

export default utils
