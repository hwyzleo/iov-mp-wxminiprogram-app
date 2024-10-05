// pages/my-setting/my-setting.js
import util from '../../utils/util.js'
import globalStateManager from '../../utils/global-state-manager.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    footerHeight: 0,
    version: "",
    mockCount: 0,
    showMock: false,
    isMock: true,
    apiUrl: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app = getApp()
    this.setData({
      version: app.globalData.version,
      apiUrl: app.globalData.apiUrl
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      isLogin: util.isLogin()
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  onClickMock() {
    this.data.mockCount++
    if (this.data.mockCount > 10) {
      this.setData({
        isMock: false,
        showMock: true
      });
      globalStateManager.toggleMockMode()
    }
  },

  /**
   * 点击退出登录按钮
   */
  onClickLogout() {
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确认退出？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.removeUserInfo()
          that.successRedirect()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 删除用户信息
   */
  removeUserInfo() {
    wx.removeStorageSync('user')
    wx.removeStorageSync('token')
  },

  /**
   * 退出登录成功后跳转
   */
  successRedirect() {
    let pages = getCurrentPages()
    const num = pages.filter(item => item.route === 'pages/my-setting/my-setting').length
    setTimeout(() => {
      wx.navigateBack({
        delta: num
      })
    }, 1000)
    return
  },
})