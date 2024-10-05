// pages/login/login.js
import tspApi from '../../utils/tsp-api.js'
import bus from '../../utils/Bus.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    agreePolicy: false,
    userData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  onBack() {
    if (this.data.redirect) {
      wx.redirectTo({
        url: this.data.redirect
      })
    } else if (this.backtab) {
      wx.switchTab({
        url: decodeURIComponent(this.backtab)
      })
    } else if (this.successTo) {
      wx.redirectTo({
        url: this.successTo
      })
    } else {
      wx.navigateBack()
    }
  },
  /**
   * 切换用户协议
   */
  togglePolicyItem() {
    this.setData({
      agreePolicy: !this.data.agreePolicy,
    })
  },

  showAlertMsg() {
    wx.showToast({
      title: '请先阅读并同意用户协议和隐私协议',
      icon: 'none',
    })
  },

  getPhoneNumber(e) {
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      if (e.detail.code) {
        this.login(e.detail.code)
      } else if (getApp().globalData.system.indexOf('mac') >= 0) {
        wx.showToast({
          title: '请用手机端小程序打开',
          duration: 1000,
          icon: 'none',
        })
      } else {
        wx.showToast({
          title: '请升级微信版本',
          duration: 1000,
          icon: 'none',
        })
      }
    } else if (this.data.redirect) {
      wx.redirectTo({
        url: this.data.redirect
      })
      return
    }
  },

  async login(mobileCode) {
    try {
      const loginResponse = await tspApi.weixinMobileCodeLogin({
        mobileCode: mobileCode
      })
      this.saveUserInfo(loginResponse)
      bus.emit('loginSuccessEvent', '')
      wx.showToast({
        title: '登录成功',
        duration: 1000,
        success: () => {
          this.successRedirect()
        },
      })
    } catch (error) {
      console.log(error)
      wx.showToast({
        title: error.data.message || '登录失败',
        icon: 'none',
        duration: 2000,
        mask: true,
        success: () => {
        },
      })
    }
  },
  /**
   * 保存用户信息
   * @param {*} loginResponse 登录相应
   */
  saveUserInfo(loginResponse) {
    let userData = loginResponse.data.data
    this.data.userData = userData
    wx.setStorageSync('user', userData)
    wx.setStorageSync('token', userData.token)
  },
  /**
   * 登录成功后跳转
   */
  successRedirect() {
    if (this.data.userData.nickname && this.data.userData.avatar) {
      let pages = getCurrentPages()
      const num = pages.filter(item => item.route === 'pages/login/login').length
      setTimeout(() => {
        wx.navigateBack({
          delta: num
        })
      }, 1000)
      return
    }
  },
})