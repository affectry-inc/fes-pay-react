import { firebaseDb, firebaseAuth } from '../firebase/'
import * as Types from '../types/history'

// Subscribe
function loadOrders(bandId) {
  return dispatch => {
    dispatch({ type: Types.DISP_LOADER })
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
    type: Types.ORDERS_RECEIVE_DATA,
    orders: orders,
    totalAmount: snapshot.child('summary/totalAmount').val()
  }
}

function loadOrdersError(error){
  if (error.code === 'PERMISSION_DENIED') {
    return {
      type: Types.NO_PRIVILEGE,
    }
  } else {
    return {
      type: Types.ORDERS_RECEIVE_ERROR,
      message: error.message,
    }
  }
}

function listenLogin(bandId) {
  return dispatch => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        dispatch(loadOrders(bandId))
      } else {
        dispatch({ type: Types.NO_PRIVILEGE })
      }
    })
  }
}

module.exports = {
  loadOrders,
  listenLogin,
}
