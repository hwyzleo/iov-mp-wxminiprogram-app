import {
  promisifyAll
} from 'miniprogram-api-promise'
const wxp = wx.p = {}
promisifyAll(wx, wxp)

App({
  onLaunch() {},
  globalData: {
    version: "0.0.2",
    apiUrl: "http://192.168.2.223:8081",
    windowHeight: 0,
    statusBarHeight: 20,
    screenHeight: 0,
    bottomLift: 0,
    tabbarHeight: 0,
    topLift: 0,
    userInfo: null,
    longitude: 0.0,
    latitude: 0.0,
  },
  onLaunch() {
    // 获取设备屏幕信息
    wx.getSystemSetting({
      success: res => {
        this.globalData.screenHeight = res.screenHeight;
        this.globalData.statusBarHeight = res.statusBarHeight;
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.bottomLeft = res.screenHeight - res.safeArea.bottom;
        this.globalData.tabbarHeight = res.screenHeight - res.windowHeight;
        this.globalData.topLeft = res.screenHeight - res.windowHeight;
      },
      fail(err) {}
    })
  }
})