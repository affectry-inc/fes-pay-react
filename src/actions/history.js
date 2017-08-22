import { firebaseDb } from '../firebase/'

// Subscribe
function loadOrders(bandId) {
  return dispatch => {
    const ref = firebaseDb.ref('pays/' + bandId)
    ref.off()
    ref.on('value',
      (snapshot) => {dispatch(loadOrdersSuccess(snapshot))},
      (error) => {dispatch(loadOrdersError(error))}
    )
  }
}

function loadOrdersSuccess(snapshot){
  console.log(snapshot)
  return {
    type: 'ORDERS_RECEIVE_DATA',
    orders: snapshot.child('charges').val(),
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
