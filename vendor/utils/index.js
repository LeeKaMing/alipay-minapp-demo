function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function showSuccessToast () {
  if (typeof wx !== 'undefined') {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 1000,
    })
  } else if (typeof my !== 'undefined') {
    my.showToast({
      content: '成功',
      type: 'success',
      duration: 1000,
    })
  } else {
    throw new Error('方法未找到')
  }
}

function showFailToast () {
  if (typeof wx !== 'undefined') {
    wx.showToast({
      title: '失败',
      icon: 'success',
      duration: 1000,
    })
  } else if (typeof my !== 'undefined') {
    my.showToast({
      content: '失败',
      type: 'fail',
      duration: 1000,
    })
  } else {
    throw new Error('方法未找到')
  }
}

function showOwnLoading() {
  if (typeof wx !== 'undefined') {
    wx.showLoading()
  } else if (typeof my !== 'undefined') {
    my.showLoading()
  } else {
    throw new Error('方法未找到')
  }
}

function hideOwnLoading() {
  if (typeof wx !== 'undefined') {
    wx.hideLoading()
  } else if (typeof my !== 'undefined') {
    my.hideLoading()
  } else {
    throw new Error('方法未找到')
  }
}

function showModal(txt) {
  if (typeof wx !== 'undefined') {
    wx.showModal({
      content: txt,
      showCancel: false,
    })
  } else if (typeof my !== 'undefined') {
    my.alert({
      content: txt,
    })
  } else {
    throw new Error('方法未找到')
  }
}

function chooseImage(obj) {
  if (typeof wx !== 'undefined') {
    wx.chooseImage({
      success: obj.success 
    })
  } else if (typeof my !== 'undefined') {
    my.chooseImage({
      success: obj.success 
    })
  } else {
    throw new Error('方法未找到')
  }
}

function getPointerIds() {
  if (typeof wx !== 'undefined') {
    const app = getApp()
    return {
      pointer_userprofile_id: app.config.appName === 'sdk' ? 66880362 : 69147880,
      pointer_test_order_id: app.config.appName === 'sdk' ? '5bd0500d3f9dce10e7a9bfea' : '5b7bd80ae2f1d05730d3181a',
      pointer_userprofile_id2: app.config.appName === 'sdk' ? 61736923 : 67667620,
      pointer_test_order_id2: app.config.appName === 'sdk' ? '5bbac56fbd66033df7fd0aa2' : '5b7cd4220e1654436565565b',
    }
  } else if (typeof my !== 'undefined') {
    return {
      // viac2 配置
      // pointer_userprofile_id: 6339787467805041,
      // pointer_test_order_id: '5c41775ad575a953fedbe0cc',
      // pointer_userprofile_id2: 6339802625720610,
      // pointer_test_order_id2: '5c4173c1d575a953fedbe0c8',

      pointer_userprofile_id: 7460644925717,
      pointer_test_order_id: '5c4a86ab20fa9c41624c6b6c',
      pointer_userprofile_id2: 7899448926715,
      pointer_test_order_id2: '5c4a86a920fa9c47eb4c6bb0',
    }
  } else {
    throw new Error('数据未找到')
  }
}

module.exports = {
  formatTime,
  showSuccessToast,
  showFailToast,
  showModal,
  showOwnLoading,
  hideOwnLoading,
  getPointerIds,
  chooseImage,
}
