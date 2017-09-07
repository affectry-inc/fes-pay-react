import * as Types from '../types/history'

const initState = {
  isPrivileged: false,
  orders: [],
  totalAmount: 0,
}

function history(state = initState, action){
  switch (action.type) {
    case Types.ORDERS_RECEIVE_DATA:
      let orders = []
      if (action.orders){
        action.orders.forEach(order => {
          orders.push({
            key: order.key,
            amount: order.amount,
            amountCard: order.amountCard,
            amountCoupon: order.amountCoupon,
            cardLastDigits: order.cardLastDigits,
            paidAt: order.paidAt,
            tenantName: order.tenantName,
          })
        })
      }
      return Object.assign({}, state, {
        isPrivileged: true,
        orders: [...orders],
        totalAmount: action.totalAmount ? action.totalAmount : 0,
      })

    case Types.ORDERS_RECEIVE_ERROR:
    case Types.NO_PRIVILEGE:
      return Object.assign({}, state, initState)

    default:
      return state
  }
}

export default history
