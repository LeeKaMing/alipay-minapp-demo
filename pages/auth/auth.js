import {showSuccessToast, showFailToast, showModal} from '../../vendor/utils/index'
const app = getApp()
Page({
  data: {
    name: '',
    avatar: '',
    registerName: '',
    registerPassword: '',
    loginName: '',
    loginPassword: '',
    isUserLogined: false,
    alipayLinkStatus: 0,
  },

  onLoad() {
    this.checkLoginStatus()
  },

  checkLoginStatus() {
    const uid = my.BaaS.storage.get('uid')
    const token = my.BaaS.storage.get('auth_token')
    this.setData({
      isUserLogined: uid && token,
    })
  },

  cleanSession() {
    console.log('------- clean session start -------')
    app.BaaS.storage.set('uid', '')
    app.BaaS.storage.set('auth_token', '')
    app.BaaS.storage.set('session_expires_at', '')
    console.log('------- clean session end -------')
  },

  register() {
    app.BaaS.auth.register({
      username: this.data.registerName,
      password: this.data.registerPassword,
    }).then((res) => {
      showSuccessToast()
    }, err => {
      showFailToast()
      console.log(err)
    })
  },

  bindRegisterName(e) {
    this.setData({
      registerName: e.detail.value,
    })
  },

  bindRegisterPassword(e) {
    this.setData({
      registerPassword: e.detail.value,
    })
  },

  login() {
    this.cleanSession()
    app.BaaS.auth.login({
      username: this.data.loginName,
      password: this.data.loginPassword,
    }).then((res) => {
      this.checkLoginStatus()
      showSuccessToast()
    }, err => {
      showFailToast()
      console.log(err)
    })
  },

  bindLoginName(e) {
    this.setData({
      loginName: e.detail.value,
    })
  },

  bindLoginPassword(e) {
    this.setData({
      loginPassword: e.detail.value,
    })
  },

  signout() {
    app.BaaS.auth.logout().then((res) => {
      showSuccessToast()
      this.checkLoginStatus()
      this.setData({
        name: '',
        avatar: '',
        alipayLinkStatus: 0,
      })
    }, err => {
      showFailToast()
      console.log(err)
    })
  },

  getCurrentUser() {
    app.BaaS.auth.getCurrentUser().then(user => {
      const userInfo = user.toJSON()
      console.log(userInfo)
      if (!userInfo._provider.alipay) {
        this.setData({
          alipayLinkStatus: -1,
        })
      } else {
        this.setData({
          name: userInfo._provider.alipay.nickname,
          avatar: userInfo._provider.alipay.avatar,
          alipayLinkStatus: 1,
        })
      }
    })
  },

  resetPassword() {
    app.BaaS.auth.requestPasswordReset().then((res) => {
      showSuccessToast()
    }, err => {
      showFailToast()
      console.log(err)
    })
  },

  alipaySilentLogin() {
    this.cleanSession()
    app.BaaS.auth.loginWithAlipay().then((res) => {
      this.checkLoginStatus()
      console.log(res, res.toJSON())
      showSuccessToast()
    }, err => {
      showFailToast()
      console.log(err)
    })
  },

  alipayForceLogin() {
    this.cleanSession()
    app.BaaS.auth.loginWithAlipay({forceLogin: true}).then((res) => {
      this.checkLoginStatus()
      console.log(res, res.toJSON())
      showSuccessToast()
    }, err => {
      showFailToast()
      console.log(err)
    })
  },

  linkAlipay(e) {
    const forceLogin = e.currentTarget.dataset.forceLogin
    const User = new my.BaaS.User
    const currentUser = User.getCurrentUserWithoutData()
    currentUser.linkAlipay({forceLogin})
      .then(res => {
        showSuccessToast()
        this.setData({
          alipayLinkStatus: 0,
        })
      })
      .catch(err => {
        showFailToast()
        console.log(err)
      })
  },
})

