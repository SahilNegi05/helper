import React, { useState, useEffect } from 'react';
import { CheckoutForm } from './index'
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements
} from '@stripe/react-stripe-js';
import { STRIPE_KEY } from '../../constants/token'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { SaveOrderID } from '../../services/api/api.service';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
};


function PaymentButton(props) {
    const stripePromise = loadStripe(STRIPE_KEY);
    const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [dataVal, setDataVal] = useState(false);
    const [orderID, setOrderID] = useState("");
    const dataFunc = () => {
        SaveOrderID(props.data.customerID, props.data.packageID)
        .then(res => {
            if (res.data.status == 200) {
                setOrderID(res.data.purchase_id);
            }
            else {
                setDataVal(true);
            }
        })
        .then(()=>{
            setOpen(true);
        });
    };
    return (
        <div>
            {/* <Button onClick={(e)=>setOpen(true)} variant="contained">x</Button> */}
            <Button sx={{ borderRadius: 8 }} onClick={dataFunc} variant="contained">Make Payment</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {!dataVal ?
                        <Elements stripe={stripePromise}>
                            <CheckoutForm amount={props.amount} consumerData={{...props,orderID: orderID}} closeFunc={setOpen} />
                        </Elements>
                        :
                        <div>
                            <CloseIcon
                                sx={{
                                    textlign: 'right', position: 'absolute',
                                    top: '14px',
                                    right: '19px'
                                }}
                                onClick={(e) => setOpen(false)}

                            />
                            <h2>Already Purchased</h2>
                        </div>}
                </Box>
            </Modal>
        </div>

    )
}


export default PaymentButton;