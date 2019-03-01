import {showSuccessToast, showFailToast, showModal, showOwnLoading, hideOwnLoading, getPointerIds} from '../../vendor/utils/index'
import data from './data'
const app = getApp()

let Product
let pointer_ids = {}

Page({
  data: {
    records: [],
    offset: 0,
    limit: 10,
    sortKey: '',
  },

  onLoad() {
    Product = new app.BaaS.TableObject('table_with_all_type')
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
      showModal(JSON.stringify(res.data.objects))
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
    Product.expand(['pointer_order']).find().then(res => {
      this.setData({
        records: res.data.objects,
      })
      showModal(JSON.stringify(res.data.objects))
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

  handleModifyLimit(event) {
    this.setData({
      limit: event,
    })
  },

  handleModifyOffset(event) {
    this.setData({
      offset: event,
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
      showModal(JSON.stringify(res.data.objects))
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
      showModal(JSON.stringify(res.data.objects))
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
      showModal(JSON.stringify(res.data.objects))
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
      showModal(JSON.stringify(res.data.objects))
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
      showModal(JSON.stringify(res.data.objects))
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
      showModal(JSON.stringify(res.data.objects))
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  compareQuery_2: function () {
    let query = new app.BaaS.Query()
    query.compare('array_s', '=', ['a', 'b', 'c', 'd'])
    showOwnLoading()
    Product.setQuery(query).find().then(res => {
      hideOwnLoading()
      showModal(JSON.stringify(res.data.objects))
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
      showModal(JSON.stringify(res.data.objects))
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
      showModal(JSON.stringify(res.data.objects))
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
      showModal(JSON.stringify(res.data.objects))
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
      showModal(JSON.stringify(res.data.objects))
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
      showModal(JSON.stringify(res.data.objects))
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  },

  queryByTime1: function () {
    let query = new app.BaaS.Query()
    let startTimestamp = (new Date()).setHours(0, 0, 0, 0) / 1000
    let endTimestamp = startTimestamp + 24 * 60 * 60
    query.compare('created_at', '>=', startTimestamp)
    query.compare('created_at', '<', endTimestamp)
    showOwnLoading()
    Product.setQuery(query).find().then(res => {
      hideOwnLoading()
      showModal(JSON.stringify(res.data.objects))
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
    showOwnLoading()
    Product.setQuery(query).find().then(res => {
      hideOwnLoading()
      showModal(JSON.stringify(res.data.objects))
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
      showModal(JSON.stringify(res.data.objects))
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
      query.exists('pointer_order')
    } else if (action === 'compare') {
      query.compare('pointer_order', '=', new app.BaaS.TableObject('order').getWithoutData(pointer_ids.pointer_order_id))
    } else if (action === 'in') {
      let Order = new app.BaaS.TableObject('order')
      query.in('pointer_order', [Order.getWithoutData(pointer_ids.pointer_order_id), Order.getWithoutData(pointer_ids.pointer_order_id2)])
    } else if (action === 'notIn') {
      let Order = new app.BaaS.TableObject('order')
      query.notIn('pointer_order', [Order.getWithoutData(pointer_ids.pointer_order_id), Order.getWithoutData('fakeid123')])
    }

    showOwnLoading()
    Product.setQuery(query).expand('pointer_order').find().then(res => {
      showModal(JSON.stringify(res.data.objects))
      hideOwnLoading()
    }, err => {
      hideOwnLoading()
      showFailToast()
    })
  }
})
