import React, { useState, useEffect } from 'react';
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Redirect } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { PaymentResponse } from '../../services/api/api.service';

import Button from '@mui/material/Button';
// import { FormControl, FormLabel, FormHelperText, Input, InputLabel } from '@mui/material';

export const CheckoutForm = ({ amount, closeFunc, consumerData }) => {
  const [data, setData] = useState({
    modalVal: false,
    payStatus: '',
  });
  const stripe = useStripe();
  const elements = useElements();

  const clearFunc = () => {
    setData({
      modalVal: false,
      payStatus: '',
    });
  };
  // console.log(amount);

  const handleSubmit = async (event) => {
    console.log('submit')
    event.preventDefault();
    const cardNumberElement = await elements.getElement(CardNumberElement);
    const cardExpiryElement = await elements.getElement(CardExpiryElement);
    const cardCvcElement = await elements.getElement(CardCvcElement);
    console.log(cardNumberElement);

    // const cardNumberElement = event.target.cardNumberElement.value;
    // const cardExpiryElement = event.target.cardExpiryElement.value;
    // const cardCvcElement = event.target.cardCvcElement.value;
    // if (elements == null) {
    //   return;
    // }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      // card: elements.getElement(CardElement),
      card: cardNumberElement,
      card: cardExpiryElement,
      card: cardCvcElement
      ,
    });

    if (error) {
      console.log('Payment Not Received', error);
      PaymentResponse(consumerData.data.customerID, consumerData.orderID, "failure")
        .then(() => {
          setData({
            modalVal: false,
            payStatus: 2,
          })
        });
    } else {
      console.log('Payment SuccessFull', paymentMethod ,consumerData.data.customerID, consumerData.orderID, "success");
      PaymentResponse(consumerData.data.customerID, consumerData.orderID, "success")
        .then(() => {
          setData({
            modalVal: true,
            payStatus: 1,
          })
        });
      // return <Redirect to="/dashboard" />
    }
  };

  return (
    <>
      {data && data.modalVal == false ? (
        <div>

          <CloseIcon
            sx={{
              textlign: 'right', position: 'absolute',
              top: '14px',
              right: '19px'
            }}
            onClick={(e) => closeFunc(false)}

          />
          {data && data.payStatus != '' && data.payStatus == 2 ? <Alert severity="error">Transaction Failed !</Alert> : null}
          {/* <form onSubmit={handleSubmit}>
            <ul>
              <li><label>Card Number</label><CardNumberElement onChange={clearFunc} /></li>
            </ul>
            <ul>
              <li><label>Card Expiry Date</label><CardExpiryElement onChange={clearFunc} /></li>
            </ul>
            <ul>
              <li><label>CVV</label><CardCvcElement onChange={clearFunc} /></li>
            </ul>
            <Button type="submit" variant="contained">Make Payment</Button>
          </form> */}

          <Box onSubmit={handleSubmit}
            component="form"
            sx={{
              width: 500,
              maxWidth: '100%',
            }}
            noValidate
            autoComplete="off"
          >
            <ul>
              <li><label>Card Number</label><CardNumberElement /></li>
            </ul>
            <ul>
              <li><label>Card Expiry Date</label><CardExpiryElement /></li>
            </ul>
            <ul>
              <li><label>CVV</label><CardCvcElement /></li>
            </ul>
            {/* <CardNumberElement />
            <CardExpiryElement />
            <CardCvcElement />
            <TextField
              outlined
              id="outlined"
              label="Card Number"
              placeholder="123456789"
              fullWidth="true"
              margin="normal"
              onChange={clearFunc}
              name='cardNumberElement'
            ><CardNumberElement /></TextField>
            <TextField
              outlined
              id="outlined-error-helper-text"
              label="Card Expiry Date"
              placeholder="Card Expiry Date"
              fullWidth="true"
              margin="normal"
              onChange={clearFunc}
              name='cardExpiryElement'>
              <CardExpiryElement />
            </TextField>
            <TextField
              outlined
              id="outlined-error-helper-text"
              label="cvv"
              placeholder="cvv"
              fullWidth="true"
              margin="normal"
              onChange={clearFunc}
              name='cardCvcElement'>
              <CardCvcElement /></TextField> */}

            <Button variant="contained" type='submit'>
              Make Payment
            </Button>
          </Box>

          {/* <FormControl>
            <InputLabel htmlFor="my-input">Card Number</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" placeholder='Card Number' fullwidth='true'/>
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>

          </FormControl> */}
        </div>
      ) : (
        <Stack sx={{ width: '100%' }} spacing={2}>
          {data && data.payStatus != '' && data.payStatus == 1 ? <Alert severity="success">Payment Successful !</Alert> : null}
        </Stack>
      )}
    </>
  );
};
