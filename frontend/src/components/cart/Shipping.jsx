import React, { useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import countryList from 'iso3166-2-db/countryList/en';
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from '../../redux/features/cartSlice';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from './CheckOutSteps';


const Shipping = () => {
  const navigate = useNavigate();
  const countriesList = Object.values(countryList);
  
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  
  const { shippingInfo } = useSelector((state) => state.cart);

  useEffect(()=>{
    if(shippingInfo){
      
      setAddress(shippingInfo?.address);

      setCity(shippingInfo?.city);

      setPhoneNo(shippingInfo?.phoneNo);

      setZipCode(shippingInfo?.zipCode);

      setCountry(shippingInfo?.country);

    }
  },[shippingInfo])
  const submitHandler = (e) =>{
    e.preventDefault();

    dispatch(saveShippingInfo({address,city,phoneNo,zipCode,country}));
    navigate("/confirm_order")
  }
  return (
    <>
    <MetaData  title={"Shipping info"}/>
    <CheckOutSteps shipping />
    <div className="row wrapper mb-5">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4">Shipping Info</h2>
          <div className="mb-3">
            <label htmlFor="address_field" className="form-label">Address</label>
            <input
              type="text"
              id="address_field"
              className="form-control"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="city_field" className="form-label">City</label>
            <input
              type="text"
              id="city_field"
              className="form-control"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone_field" className="form-label">Phone No</label>
            <input
              type="tel"
              id="phone_field"
              className="form-control"
              name="phoneNo"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="postal_code_field" className="form-label"
              >Postal Code</label
            >
            <input
              type="number"
              id="postal_code_field"
              className="form-control"
              name="postalCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="country_field" className="form-label">Country</label>
            <select
              id="country_field"
              className="form-select"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              {countriesList.map((country) => (
                  <option value={country?.name} key={country?.name}>{country?.name}</option>
              ))}
            </select>
          </div>

          <button id="shipping_btn" type="submit" className="btn w-100 py-2">
            CONTINUE
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Shipping