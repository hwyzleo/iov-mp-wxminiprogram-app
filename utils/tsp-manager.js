import globalStateManager from './global-state-manager.js'
const app = getApp()
const apiUrl = app.globalData.apiUrl

const user = wx.getStorageSync('user') || {}

const request = ({
  url,
  params,
  header = {},
  method = 'POST',
  isNeedShowErrToast = true,
  failCallback = null,
}) => {
  header['clientId'] = getClientId()
  header['Content-Type'] = "application/json"
  let token = wx.getStorageSync('token') || user?.token
  if (token != '' && token != null && token != undefined) {
    header['token'] = token
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl + url,
      data: params,
      header: header,
      method: method,
      success: (res) => {
        console.log('api: ', url, res.data?.data || res.data)
        if (res.data.code == 0 || res.data?.result == 1) {
          resolve(res)
        } else {
          if (isNeedShowErrToast) {
            wx.showToast({
              title: res.data.message || res.data.msg || '网络出错',
              icon: 'none',
              duration: 2000,
              mask: true,
            })
          }
          reject(res)
        }
      },
      fail: (res) => {
        wx.getNetworkType({
          success(netRes) {
            const networkType = netRes.networkType
            wx.reportEvent('custom_requestfail', {
              'requesturl': `${url}`,
              'current_network_status': `${networkType}`,
              'payordertime': `${new Date()}`,
              'err_msg': res.errMsg,
              'errno': `${res?.errno || -1}`,
            })
          },
        })
        if (isNeedShowErrToast) {
          wx.showToast({
            title: res?.data?.message || res?.data?.msg || '网络出错',
            icon: 'none',
            duration: 2000,
            mask: true,
          })
        }
        reject(res)
      },
      complete: function (res) {

      },
    })
  })
}

/**
 * 获取客户端ID
 */
function getClientId() {
  var clientId = wx.getStorageSync('clientId')
  if (clientId) {
    return clientId
  } else {
    clientId = generateUUID()
    wx.setStorageSync('clientId', clientId)
  }
  return clientId
}

//生成uuid
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

module.exports = {
  request: request,
}

export default {
  request,
}