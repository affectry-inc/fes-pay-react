import { firebaseDb } from '../firebase/'

// Subscribe
function loadOrders(bandId) {
  return dispatch => {
    const ref = firebaseDb.ref('pays/' + bandId).orderByKey()
    ref.once('value')
    .then(snapshot => {dispatch(loadOrdersSuccess(snapshot))})
    .catch(error => {dispatch(loadOrdersError(error))})
  }
}

function loadOrdersSuccess(snapshot){
  const orders = []
  snapshot.child('charges').forEach(order => {
    orders.unshift({ key: order.key, ...order.val() })
  })
  return {
    type: 'ORDERS_RECEIVE_DATA',
    orders: orders,
    totalAmount: snapshot.child('summary/totalAmount').val()
  }
}

function loadOrdersError(error){
  return {
    type: 'ORDERS_RECEIVE_ERROR',
    message: error.message
  }
}

module.exports = {
  loadOrders,
}
