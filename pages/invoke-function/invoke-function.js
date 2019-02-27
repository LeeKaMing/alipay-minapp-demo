import { showModal } from '../../vendor/utils/index'
const app = getApp()
Page({
  data: {
    length: 0,
    height: 0,
  },
  
  helloWorld: function() {
    app.BaaS.invokeFunction('helloWorld',).then(res => {
      showModal(JSON.stringify(res.data))
    }, err => {
      console.log('err', err)
      showModal(JSON.stringify(err))
    })
  },

  bindLengthChanged(e) {
    this.setData({
      length: e.detail.value,
    })
  },

  bindHeightChanged(e) {
    this.setData({
      height: e.detail.value,
    })
  },

  calculateArea: function() {
    const {length, height} = this.data
    app.BaaS.invokeFunction('calculateArea', {length, height}).then(res => {
      showModal(JSON.stringify(res.data))
    }, err => {
      console.log('err', err)
      showModal(JSON.stringify(err))
    })
  },
})
