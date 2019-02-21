import {showSuccessToast, showFailToast, showModal, showOwnLoading, hideOwnLoading, getPointerIds} from '../../vendor/utils/index'
import data from './data'
const app = getApp()

let Product
let pointer_ids = {}
// 用于更新和原子操作测试
let masterProductID

Page({
  data: {
    records: [],
    offset: 0,
    limit: 10,
    sortKey: '',
  },

  onLoad() {
    pointer_ids = getPointerIds()
  },

  createRecords() {
    return Product.createMany(data)
      .then(res => {
        if (res.data.succeed == data.length) {
          console.log('创建数据成功')
        }
      })
      .catch(err => console.log('创建数据失败'))
  },

  deleteAllRecords() {
    const query = new app.BaaS.Query()
    return new Promise((resolve, reject) => {
      const deleteRecord = () => {
        Product.limit(1000).offset(0).delete(query).then(res => {
          if (!!res.data.next) {
            deleteRecord()
          } else {
            resolve()
          }
        }).catch(err => reject(err))
      }
      deleteRecord()
    })
  },

  onLoad() {
    Product = new app.BaaS.TableObject('auto_maintable')
    masterProductID = app.config.appName === 'sdk' ? '5b7ba570839c61291eeb258f' : '5b7ba570839c61291eeb258f'
  },

  handleResetData() {
    this.deleteAllRecords()
      .then(this.createRecords)
      .then(() => {
        showSuccessToast()
      })
      .catch(() => {
        showFailToast()
      })
  },

  getAllProduct() {
    showOwnLoading()
    Product.find().then(res => {
      this.setData({
        records: res.data.objects,
      })
      let result = `查询成功-总记录数为：${res.data.meta.total_count}`
      showModal(result)
    }, err => {
      showFailToast()
    }).then(hideOwnLoading)
  },

  getAllProductWithOptions() {
    const {sortKey, offset, limit} = this.data
    Product.offset(offset).limit(limit).orderBy(sortKey).find().then(res => {
      this.setData({
        records: res.data.objects,
      })
    }, err => {
      showFailToast()
    }).then(hideOwnLoading)
  },

  getAllProductWithExpand() {
    Product.expand(['pointer_userprofile', 'pointer_test_order']).find().then(res => {
      this.setData({
        records: res.data.objects,
      })
    }, err => {
      showFailToast()
    }).then(hideOwnLoading)
  },

  handleSelectSortKey(event) {
    const sortKey = event.currentTarget.dataset.sortKey
    this.setData({
      sortKey,
    })
  },

  handleModifyNum(event) {
    const numType = event.currentTarget.dataset.numType
    const actionType = event.currentTarget.dataset.actionType

    this.setData({
      [numType]: actionType === 'increase'
        ? this.data[numType] + 1
        : this.data[numType] > 0 ? this.data[numType] - 1 : 0
    })
  },


  getProduct: function () {
    const {records} = this.data
    if (!records.length) return
    showOwnLoading()
    Product.get(records[0].id).then(res => {
      hideOwnLoading()
      let result = `查询成功-ID为：${res.data.id}`
      showModal(result)
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  getProductBySelect_asc: function () {
    const {records} = this.data
    if (!records.length) return
    showOwnLoading()
    Product.select('str').get(records[0].id).then(res => {
      hideOwnLoading()
      let result = `查询成功-str：${res.data.str}`
      showModal(result)
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  getProductBySelect_desc: function () {
    const {records} = this.data
    if (!records.length) return
    showOwnLoading()
    Product.select(['-str', '-array_i']).get(records[0].id).then(res => {
      hideOwnLoading()
      // let result = `All keys：[${JSON.stringify(Object.keys(res.data))}]`
      let result = `All keys：[${Object.keys(res.data)}]`
      showModal(result)
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  compareQuery: function (event) {
    let opt = event.currentTarget.dataset.type
    let query = new app.BaaS.Query()
    query.compare('int', opt, 50)
    showOwnLoading()
    Product.setQuery(query).find().then(res => {
      hideOwnLoading()
      let result = `查询成功-总记录数为：${res.data.meta.total_count}`
      showModal(result)
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  containsQuery: function () {
    let query = new app.BaaS.Query()
    query.contains('str', 'm')
    showOwnLoading()
    Product.setQuery(query).find().then(res => {
      hideOwnLoading()
      let result = `查询成功-总记录数为：${res.data.meta.total_count}`
      showModal(result)
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  regxQuery: function (event) {
    let type = event.currentTarget.dataset.type
    let query = new app.BaaS.Query()
    let regx = type === 'str' ? /^a/ : new RegExp(/^q/, 'i')
    query.matches('str', regx)
    showOwnLoading()
    Product.setQuery(query).find().then(res => {
      hideOwnLoading()
      let result = `查询成功-总记录数为：${res.data.meta.total_count}`
      showModal(result)
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  inQuery: function () {
    let query = new app.BaaS.Query()
    query.in('array_s', ['黑', '白'])
    showOwnLoading()
    Product.setQuery(query).find().then(res => {
      hideOwnLoading()
      let result = `查询成功-总记录数为：${res.data.meta.total_count}`
      showModal(result)
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  notInQuery: function () {
    let query = new app.BaaS.Query()
    query.notIn('array_s', ['灰'])
    showOwnLoading()
    Product.setQuery(query).find().then(res => {
      hideOwnLoading()
      let result = `查询成功-总记录数为：${res.data.meta.total_count}`
      showModal(result)
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  arrayContainsQuery: function () {
    let query = new app.BaaS.Query()
    query.arrayContains('array_s', ['黑', '白', '灰'])
    showOwnLoading()
    Product.setQuery(query).find().then(res => {
      hideOwnLoading()
      let result = `查询成功-总记录数为：${res.data.meta.total_count}`
      showModal(result)
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  // return 400
  compareQuery_2: function () {
    let query = new app.BaaS.Query()
    query.compare('array_s', '=', ['a', 'b', 'c', 'd'])
    showOwnLoading()
    Product.setQuery(query).find().then(res => {
      hideOwnLoading()
      let result = `查询成功-总记录数为：${res.data.meta.total_count}`
      showModal(result)
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  nullQuery: function () {
    let query = new app.BaaS.Query()
    query.isNull('int')
    showOwnLoading()
    Product.setQuery(query).find().then(res => {
      hideOwnLoading()
      let result = `查询成功-总记录数为：${res.data.meta.total_count}`
      showModal(result)
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  notNullQuery: function () {
    let query = new app.BaaS.Query()
    query.isNotNull('int')
    showOwnLoading()
    Product.setQuery(query).find().then(res => {
      hideOwnLoading()
      let result = `查询成功-总记录数为：${res.data.meta.total_count}`
      showModal(result)
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  // sdk version >= 1.1.1
  existsQuery: function () {
    let query = new app.BaaS.Query()
    query.exists(['str', 'int'])
    showOwnLoading()
    Product.setQuery(query).find().then(res => {
      hideOwnLoading()
      let result = `查询成功-总记录数为：${res.data.meta.total_count}`
      showModal(result)
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  notExistsQuery: function () {
    let query = new app.BaaS.Query()
    query.notExists('int')
    showOwnLoading()
    Product.setQuery(query).find().then(res => {
      hideOwnLoading()
      let result = `查询成功-总记录数为：${res.data.meta.total_count}`
      showModal(result)
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  complexQueryProduct: function () {
    let query1 = new app.BaaS.Query()
    query1.compare('int', '>', 50)
    let query2 = new app.BaaS.Query()
    query2.isNotNull('str')
    let andQuery = app.BaaS.Query.and(query1, query2)
    let query3 = new app.BaaS.Query()
    query3.in('array_s', ['黑'])
    let orQuery = new app.BaaS.Query.or(andQuery, query3)
    showOwnLoading()
    Product.setQuery(orQuery).find().then(res => {
      hideOwnLoading()
      let result = `查询成功-总记录数为：${res.data.meta.total_count}`
      showModal(result)
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  // limitOffset: function (event) {
  //   let {offset, limit} = event.currentTarget.dataset
  //   offset = parseInt(offset)
  //   limit = parseInt(limit)
  //   showOwnLoading()
  //   Product.limit(limit).offset(offset).find().then(res => {
  //     hideOwnLoading()
  //     let result = `查询成功-总记录数为：${res.data.objects.length}`
  //     showModal(result)
  //   }, err => {
  //     hideOwnLoading()
  //     showFailToast()
  //   })
  // },

  // orderByQuery_desc: function () {
  //   let query = new app.BaaS.Query()
  //   query.compare('num', '<', 100)
  //   // 方式一
  //   // Product.setQuery(query).orderBy('-price').find().then(res => {
  //   // 方式二
  //   showOwnLoading()
  //   Product.setQuery(query).orderBy(['-num']).find().then(res => {
  //     hideOwnLoading()
  //     showSuccessToast()
  //   }, err => {
  //     hideOwnLoading()
  //     showFailToast()
  //   })
  // },

  // orderByQuery_asc: function () {
  //   let query = new app.BaaS.Query()
  //   query.compare('num', '<', 100)
  //   // 方式一
  //   // Product.setQuery(query).orderBy('price').find().then(res => {
  //   // 方式二
  //   showOwnLoading()
  //   Product.setQuery(query).orderBy(['num']).find().then(res => {
  //     hideOwnLoading()
  //     showSuccessToast()
  //   }, err => {
  //     hideOwnLoading()
  //     showFailToast()
  //   })
  // },

  queryByTime1: function () {
    let query = new app.BaaS.Query()
    let startTimestamp = (new Date()).setHours(0, 0, 0, 0) / 1000
    let endTimestamp = startTimestamp + 24 * 60 * 60
    query.compare('created_at', '>=', startTimestamp)
    query.compare('created_at', '<', endTimestamp)
    showOwnLoading()
    Product.setQuery(query).find().then(res => {
      hideOwnLoading()
      let result = `查询成功-总记录数为：${res.data.meta.total_count}`
      showModal(result)
      showSuccessToast()
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  queryByTime2: function () {
    let query = new app.BaaS.Query()

    let timestamp = (new Date(2018, 0, 1)).setHours(0, 0, 0, 0)
    query.compare('date', '<=', (new Date(timestamp)).toISOString())

    // let startTimestamp = new Date().setHours(0, 0, 0, 0)
    // let endTimestamp = startTimestamp + 24 * 60 * 60 * 1000
    // query.compare('duedate', '>=', (new Date(startTimestamp)).toISOString())
    // query.compare('duedate', '<', (new Date(endTimestamp)).toISOString())
    showOwnLoading()
    Product.setQuery(query).find().then(res => {
      hideOwnLoading()
      let result = `查询成功-总记录数为：${res.data.meta.total_count}`
      showModal(result)
      showSuccessToast()
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  selectQuery: function () {
    showOwnLoading()
    Product.select(['num']).find().then(res => {
      hideOwnLoading()
      showModal(JSON.stringify(res.data.objects))
      showSuccessToast()
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  unselectQuery: function () {
    showOwnLoading()
    Product.select(['-array_s', '-str', '-file']).find().then(res => {
      hideOwnLoading()
      showModal(JSON.stringify(res.data.objects))
      showSuccessToast()
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  // selectGet: function () {
  //   showOwnLoading()
  //   Product.select(['-array_s']).get(masterProductID).then(res => {
  //     hideOwnLoading()
  //     showSuccessToast()
  //   }, err => {
  //     hideOwnLoading()
  //     showFailToast()
  //   })
  // },

  expandCreated_by: function () {
    showOwnLoading()
    Product.expand('created_by').find().then(res => {
      hideOwnLoading()
      showModal('created_by: ' + JSON.stringify(res.data.objects[0].created_by))
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  getExpand: function () {
    const {records} = this.data
    if (!records.length) return
    showOwnLoading()
    Product.expand('created_by').get(records[0].id).then(res => {
      hideOwnLoading()
      showModal('created_by: ' + JSON.stringify(res.data.created_by))
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  hasKey(){
    let query = new app.BaaS.Query()
    query.hasKey('obj', 'num')
    showOwnLoading()
    Product.setQuery(query).find().then(res => {
      hideOwnLoading()
      let result = `查询成功-总记录数为：${res.data.meta.total_count}`
      showModal(result)
      showSuccessToast()
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  countItem(){
    let query = new app.BaaS.Query()
    showOwnLoading()
    Product.setQuery(query).count().then(res => {
      hideOwnLoading()
      showModal(JSON.stringify(res))
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  pointerQuery(e) {
    let {action} = e.target.dataset
    let query = new app.BaaS.Query()
    if (action === 'exist') {
      query.exists('pointer_test_order')
    } else if (action === 'compare') {
      query.compare('pointer_test_order', '=', new app.BaaS.TableObject('pointer_test_order').getWithoutData(pointer_test_order_id))
      query.compare('pointer_userprofile', '=', new app.BaaS.User().getWithoutData(pointer_ids.pointer_userprofile_id))
    } else if (action === 'in') {
      let Order = new app.BaaS.TableObject('pointer_test_order')
      query.in('pointer_test_order', [Order.getWithoutData(pointer_ids.pointer_test_order_id), Order.getWithoutData(pointer_ids.pointer_test_order_id2)])
    } else if (action === 'notIn') {
      let Order = new app.BaaS.TableObject('pointer_test_order')
      query.notIn('pointer_test_order', [Order.getWithoutData(pointer_ids.pointer_test_order_id), Order.getWithoutData('fakeid123')])
    }

    showOwnLoading()
    Product.setQuery(query).expand('pointer_test_order').find().then(res => {
      hideOwnLoading()
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  }
})
