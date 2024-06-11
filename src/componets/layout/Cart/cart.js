import React from 'react'
import "./cart.css"
import CartItem from './cartItem'
import {useDispatch, useSelector} from "react-redux"
import { addItemsToCart, removeItemsFromCart } from '../../action/cartAction'
import { RemoveShoppingCart } from '@material-ui/icons'
import { Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../Header/MetaData'

const Cart = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const{ cartItems } = useSelector((state)=> state.cart)
    const { isAuthenticated } = useSelector((state)=> state.user)
    const increaseQuantity = (id,quantity,stock)=>{
        const newQty = quantity + 1
        if(stock <= quantity){
            return;
        }
        dispatch(addItemsToCart(id, newQty))
    }
    const decreaseQuantity = (id,quantity)=>{
        const newQty = quantity - 1
        if(1 >= quantity){
            return;
        }
        dispatch(addItemsToCart(id, newQty))
    }

    const deleteCartItems = (id)=>{
        dispatch(removeItemsFromCart(id))
    }
   
   const checkOutHandler = ()=>{
  if(isAuthenticated){
    navigate("/shipping")
  }else{
    navigate("/login?redirect=shipping")
  }
   }
   
  
      return (
    <>
     <MetaData title="Cart" />
     <div className='cartm'>
   { !cartItems || cartItems.length === 0 ?(
    <div className='emptyCart'>
         <RemoveShoppingCart/>
         <Typography>No Product In your Cart</Typography>
         <Link to='/products'>View Product</Link>
    </div>
   ):(
    <div className='cartPage'>
    <div className='cartHeader'>
     <p>Product</p>
     <p>Quantity</p>
     <p>SubTotal</p>
    </div>
    {cartItems && 
    cartItems.map((item, index) => (
<div key={index} className='cartContainer'>
<CartItem item={item} deleteCartItems={deleteCartItems}/>

<div className='cartInput'>
  <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
  <input type="number" readOnly value={item.quantity}/>
  <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
</div>

<p className='CartSubTotal'>Rs{item.price * item.quantity}</p>
</div>
))}

<div className='cartGrossProfit'>
<div></div>
<div className='cartGrossProfitBox'>
    <p>Gross Total</p>
    <p>{`₹${cartItems && cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
</div>
<div></div>
<div className='checkOutBtn'>
    <button onClick={checkOutHandler}>Check Out</button>
</div>
</div>

</div>
   ) }
   </div>
    </>
  )
}

export default Cart
