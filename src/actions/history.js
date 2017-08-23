import { firebaseDb } from '../firebase/'

// Subscribe
function loadOrders(bandId) {
  return dispatch => {
    const ref = firebaseDb.ref('pays/' + bandId).orderByKey()
    ref.off()
    ref.on('value',
      (snapshot) => {dispatch(loadOrdersSuccess(snapshot))},
      (error) => {dispatch(loadOrdersError(error))}
    )
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
    totalAmount: snapshot.child('totalAmount').val()
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
