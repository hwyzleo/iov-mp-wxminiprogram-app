/**
 * rpx（responsive pixel）单位转换为 px（像素）单位
 * @param {*} rpx 
 */
function rpxTopx(rpx) {
  let deviceWidth = wx.getSystemSetting().windowWidth
  let px = (deviceWidth / 750) * Number(rpx)
  return Math.floor(px)
}

/**
 * px（像素）单位转换为 rpx（responsive pixel）单位
 * @param {*} px 
 */
function pxTorpx(px) {
  let deviceWidth = wx.getSystemSetting().windowWidth
  let rpx = (750 / deviceWidth) * Number(px)
  return Math.floor(rpx)
}

/**
 * 是否空值
 * @param {*} param 
 */
function isEmpty(param) {
  return param == '' || param == null || param == undefined
}

/**
 * 是否登录
 */
function isLogin() {
  const token = wx.getStorageSync('token')
  return !isEmpty(token)
}
/**
 * 获取用户信息
 */
function getUserInfo() {
  return wx.getStorageSync('user')
}

module.exports = {
  rpxTopx: rpxTopx,
  pxTorpx: pxTorpx,
  isLogin: isLogin,
  getUserInfo: getUserInfo,
}

export default {
  rpxTopx,
  pxTorpx,
  isLogin,
  getUserInfo,
}