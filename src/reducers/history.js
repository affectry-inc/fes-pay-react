
const initState = {
  orders: [],
  totalAmount: 0,
}

function history(state = initState, action){
  switch (action.type) {
    case 'ORDERS_RECEIVE_DATA':
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
        orders: [...orders],
        totalAmount: action.totalAmount ? action.totalAmount : 0,
      })

    case 'ORDERS_RECEIVE_ERROR':
    default:
      return state
  }
}

export default history
