import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { userRegistration } from '../../services/api/api.service'
import { SUCCESS_TYPE, SUCCESSREG_TYPE, ERROR_TYPE, FAILED_TYPE, VALIDATION_TYPE } from '../../constants/message'
import { message } from '../../components/mesage';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




export default function userRegestration() {
    const history = useHistory()
    const [msg, saveMsg] = useState(null)
    const [showAlert, setAlert] = useState(false)
    const [initailData, changeData] = useState({
        firstname: null,
        email: null,
        pwd: null,
        reg_date: null,
        mobile: null,
    })
    const SubmitForm = (e) => {
        e.preventDefult
        changeData({
            ...initailData,
            [e.target.name]: e.target.value
        })
        console.log(initailData)
    }
    const submitData = () => {
        userRegistration(initailData).then((e) => {
            if (e.data.status == '200') {
                saveMsg(SUCCESS_TYPE)
                setTimeout(() => {
                    history.push('/login')
                }, 3000);
            } else if (e.data.status == 406) {
                setAlert(true)
                document.getElementById('email').textContent = ''
            } else {
                saveMsg(VALIDATION_TYPE)
            }
            console.log(e);
        })
            .catch((e) => saveMsg(ERROR_TYPE))

    }
    const handleClose = () => {
        setAlert(false)
    }

    return (
        <>

            <Box component="form" onSubmit={(e) => submitData(e)}>
                <div className='Szx-SiHsds'>
                    <h2 >Registration Form</h2>
                    {msg ? <Alert severity={msg}>{message(msg)}</Alert> : null}

                    <TextField
                        required={true} sx={style} variant="outlined" name='firstname' label="First Name" helperText=""
                        onChange={(e) => SubmitForm(e)}
                    />
                    <TextField
                        type='email' id='email' sx={style} required={true} name='email' variant="outlined" label="Email" helperText="" onChange={(e) => SubmitForm(e)}
                    />
                    <TextField
                        type='password' required={true} sx={style} name='pwd' variant="outlined" label="Password" helperText="" onChange={(e) => SubmitForm(e)}
                    />
                    {/* <TextField
                        type='date' required={true} sx={style} name='reg_date' variant="outlined" helperText=""
                        onChange={(e) => SubmitForm(e)}
                    /> */}
                    <TextField
                        sx={style} required={true} type='text' inputProps={{ maxLength: 12 }} name='mobile' variant="outlined" label="Mobile No" helperText="" onChange={(e) => SubmitForm(e)}
                    />
                    <Button size='large' variant="contained" sx={{ margin: '12px 0px 12px 47px', padding: '10px', width: '90%' }} onClick={submitData} style={{ textAlign: 'center' }} disableElevation>
                        submit
                    </Button>
                </div>
            </Box>
            {showAlert && <Stack spacing={2} sx={{ width: '52%', margin: '33px auto' }}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    This email already in use. Please try another
                </Alert>
            </Stack>}
        </>
    )
}
const style = {
    width: '90%',
    margin: '12px 0px 12px 50px',
    textAlign: 'center'
}
