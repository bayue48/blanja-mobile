const bagReducer = (
  prevstate = {
    mybag: [],
    myOrder: [],
    totalAmount: 0,
    totalPayment: 0,
    trxId: 0
  }, action) => {

  switch (action.type) {
    case "ADD_ITEMS":
      console.log(action.data.id)
      let newItem = action.data
      const inCart = prevstate.mybag.find(({ id, color, size }) =>
        id === newItem.id && color === newItem.color && size === newItem.size ? true : false
      )
      console.log(inCart)
      return {
        ...prevstate,
        mybag: inCart ?
          prevstate.mybag.map((items) =>
            items.id === newItem.id && items.color === newItem.color && items.size === newItem.size ?
              { ...items, qty: items.qty + 1 }
              : items
          )
          : [...prevstate.mybag, { ...action.data }],
        totalAmount: prevstate.totalAmount + (newItem.product_price)

      }
    case "INC_QTY":
      const IncreaseQty = prevstate.mybag.map((items) =>
        items.id == action.data.id && items.color === action.data.color && items.size === action.data.size ?
          { ...items, qty: items.qty + 1 }
          : items
      )
      return {
        ...prevstate,
        mybag: IncreaseQty,
        totalAmount: prevstate.totalAmount + action.data.product_price
      }

    case "DEC_QTY":
      const DecreaseQty = prevstate.mybag.map((items) =>
        items.id == action.data.id && items.color === action.data.color && items.size === action.data.size ?
          { ...items, qty: items.qty - 1 }
          : items
      )
      return {
        ...prevstate,
        mybag: DecreaseQty,
        totalAmount: prevstate.totalAmount - action.data.product_price
      }

    case 'ORDER_ITEMS':
      return {
        ...prevstate,
        mybag:
          prevstate.mybag.map((items) =>
            true ?
              { ...items, payment: action.data.payment, address: action.data.address, trxId: action.data.trxId }
              : items
          ),
        trxId: prevstate.trxId + 1
      }
    case "DELETE_ITEM":
      const itemAfterRemove = prevstate.mybag.filter((items) => {
        return items.id != action.data.id || items.color != action.data.color || items.size != action.data.size
      })
      return {
        ...prevstate,
        mybag: itemAfterRemove,
        totalAmount: prevstate.totalAmount - action.data.product_price
      }
      case "TOTAL_PAYMENT":
        return {
            totalPayment: prevstate.totalPayment + action.data
        }
    case "EMPTY_BAG":
        return {
            ...prevstate,
            mybag: [],
            myOrder: [],
            totalAmmount: 0,
            totalPayment: 0,
        }
    default:
        return {
            ...prevstate,
        };
}

}


export default bagReducer;