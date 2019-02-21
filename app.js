App({
  onLaunch() {
    this.BaaS = require('./vendor/sdk-alipay.2.0.0-a.js')
    my.BaaS.init('ccd09bf9473e451ed27d')
  },

  config: {
    appName: 'minapp',
  },
});
