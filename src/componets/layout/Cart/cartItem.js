import React from 'react'
import {Link} from "react-router-dom";
import "./cartItem.css"
const CartItem = ({item, deleteCartItems}) => {
  return (
    <>
    <div className='CartItemCard'>
      <img src={item.image} alt='sss'/>
      <div>
       <Link to={`/product/${item.product}`}  > {item.name} </Link>
        <span>{`Price : Rs.${item.price}`}</span>
        <p onClick={()=> deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
    </>
  )
}

export default CartItem
