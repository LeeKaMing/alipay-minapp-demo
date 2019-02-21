import { showModal } from '../../vendor/utils/index'
const app = getApp()
Page({
  helloWorld: function() {
    app.BaaS.invokeFunction('helloWorld',).then(res => {
      showModal(JSON.stringify(res.data))
    }, err => {
      console.log('err', err)
      showModal(JSON.stringify(err))
    })
  },

  testRequest: function() {
    app.BaaS.invokeFunction('testRequest', {url: 'https://www.ifanr.com'}).then(res => {
      showModal(JSON.stringify(res.data))
    }, err => {
      console.log('err', err)
      showModal(JSON.stringify(err))
    })
  }
})
