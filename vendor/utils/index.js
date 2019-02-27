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
  my.showToast({
    content: '成功',
    type: 'success',
    duration: 1000,
  })
}

function showFailToast () {
  my.showToast({
    content: '失败',
    type: 'fail',
    duration: 1000,
  })
}

function showOwnLoading() {
  my.showLoading()
}

function hideOwnLoading() {
  my.hideLoading()
}

function showModal(txt) {
  my.alert({
    content: txt,
  })
}

function chooseImage(obj) {
  my.chooseImage({
    success: obj.success 
  })
}

function getPointerIds() {
  return {
    pointer_order_id: '5c7512eb31e07f0d0516c8b0',
    pointer_order_id2: '5c7512f631e07f74ce870d84',
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
