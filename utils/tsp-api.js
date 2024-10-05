import tspManager from './tsp-manager.js'
import globalStateManager from './global-state-manager.js'

const user = wx.getStorageSync('user') || {}

const weixinMobileCodeLogin = ({
  mobileCode
}) => {
  if (globalStateManager.getMockMode()) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let tspResponse = {
          data: {
            code: 0,
            message: "",
            ts: Date.now(),
            data: {
              mobile: "13917288107",
              nickname: "hwyz_leo",
              avatar: "https://pic.imgdb.cn/item/66e667a0d9c307b7e93075e8.png",
              token: "zgZA0dO9gTbhSb6PDBXCb_0mxFq",
              tokenExpires: Date.now() + 1000000000,
              refreshToken: "rWtoZhVVf6mZW-t1hhqkNazR0r92KkhxDItf05jfQYChT6SrnFi2IXaXD02irjVc",
              refreshTokenExpires: Date.now() + 1000000000
            }
          }
        }
        resolve(tspResponse);
      }, 200);
    });
  } else {
    return tspManager.request({
      url: '/mp/login/action/weixinMobileCodeLogin',
      params: {
        mobileCode: mobileCode,
      },
      method: 'POST',
    })
  }
}

module.exports = {
  weixinMobileCodeLogin: weixinMobileCodeLogin
}

export default {
  weixinMobileCodeLogin
}