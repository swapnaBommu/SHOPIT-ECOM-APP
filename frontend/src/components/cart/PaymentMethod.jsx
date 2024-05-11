import React, { useState,useEffect } from 'react'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckOutSteps';
import { useSelector } from 'react-redux';
import { calculateOrderCost } from '../../helpers/helper';
import { useCreateNewOrderMutation, useStripeCheckoutSessionMutation } from '../../redux/api/orderApi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const PaymentMethod = () => {
  const [method, setMethod] = useState("");

  const {cartItems, shippingInfo} = useSelector((state) => state.cart)
  const {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  } = calculateOrderCost(cartItems);

  const [createNewOrder, { error, isSuccess}] = useCreateNewOrderMutation();
  const [ stripeCheckoutSession, {isLoading, data: checkOutdata,error:checkoutError }] = useStripeCheckoutSessionMutation();
  const navigate = useNavigate();

  useEffect(() =>{ 
    if(checkOutdata){
      window.location.href = checkOutdata?.url;
    }
    if(checkoutError){
      toast.error(checkoutError?.data?.message);
    }

  },[checkOutdata])

  useEffect(() =>{ 
    if(error){
      toast.error(error?.data?.message);
    }

    if(isSuccess){
      navigate(`/me/orders?order_success=true`);
    }
  },[error, isSuccess ]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (method === "COD") {
      // Create COD Order
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
        paymentInfo: {
          status: "Not Paid",
        },
        paymentMethod: "COD",
      };
      createNewOrder(orderData);
    }
    
    if(method === "Card"){
      //Stripe checkout
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
      };
      stripeCheckoutSession(orderData);
    }
  }
  return (
    <>
    <MetaData  title={"Payment Method"}/>
    <CheckoutSteps shipping confirmOrder payment />
    <div className="row wrapper">
        <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={submitHandler}
        >
        <h2 className="mb-4">Select Payment Method</h2>
        <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="payment_mode"
              id="codradio"
              value="COD"
              onChange={(e)=> setMethod("COD")}
            />
            <label className="form-check-label" htmlFor="codradio">
              Cash on Delivery
            </label>
        </div>
        <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="payment_mode"
              id="cardradio"
              value="Card"
              onChange={(e)=> setMethod("Card")}
            />
            <label className="form-check-label" htmlFor="cardradio">
              Card - VISA, MasterCard
            </label>
        </div>
        <button id="shipping_btn" type="submit" className="btn py-2 w-100" disabled={isLoading}>
            CONTINUE
        </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default PaymentMethod