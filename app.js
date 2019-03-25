App({
  onLaunch() {
    this.BaaS = require('./vendor/sdk-alipay.2.0.0-a.js')
    my.BaaS.init('') // 从 BaaS 后台获取 clientID
  },

  config: {
    appName: 'minapp',
  },
});
