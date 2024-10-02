// rpx（responsive pixel）单位转换为 px（像素）单位
function rpxTopx(rpx) {
  let deviceWidth = wx.getSystemSetting().windowWidth
  let px = (deviceWidth / 750) * Number(rpx)
  return Math.floor(px)
}

// px（像素）单位转换为 rpx（responsive pixel）单位
function pxTorpx(px) {
  let deviceWidth = wx.getSystemSetting().windowWidth
  let rpx = (750 / deviceWidth) * Number(px)
  return Math.floor(rpx)
}

module.exports = {
  rpxTopx: rpxTopx,
  pxTorpx: pxTorpx,
}

export default {
  rpxTopx,
  pxTorpx,
}