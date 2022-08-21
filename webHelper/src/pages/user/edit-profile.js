import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { coustomerProfile, updateProfile } from '../../services/api/api.service';
import { SUCCESS_TYPE, ERROR_TYPE, FAILED_TYPE, VALIDATION_TYPE } from '../../constants/message';
import { message } from '../../components/mesage';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';

export default function EditProfile() {
  const getUserId = useSelector((e) => e.user.userDetail.userId)
  const [msg, saveMsg] = useState(null);
  const [initailData, changeData] = useState({
    uid: null,
    firstname: null,
    email: null,
    mobile: null,
    phone: null,
    addressBuildingName: null,
    addressTownCity: null,
    addressStateCounty: null,
    postal_code: null,
    country_id: null,
    img_url: null,
  });


  const submitData = () => {
    updateProfile(initailData)
      .then((e) => {
        console.log(e);
        if (e.data.status == '200') {
          saveMsg(SUCCESS_TYPE);

        } else {
          saveMsg(VALIDATION_TYPE);
        }
      })
      .catch((e) => saveMsg(ERROR_TYPE));
  };

  const SubmitForm = (e) => {

    changeData({
      ...initailData,
      [e.target.name]: e.target.value
    })
    console.log(initailData)
  }

  useEffect(() => {
    coustomerProfile(getUserId)
      .then((response) => {
        if (response.status == 200) {
          console.log(response)
          return response.data.data
        }
      })
      .then(response => {
        console.log(response)
        changeData({
          ...initailData,
          uid: response[0].id,
          firstname: response[0].name,
          mobile: response[0].mobile,
          email: response[0].email,
          phone: response[0].phone,
          addressBuildingName: response[0].addressBuildingName,
          addressTownCity: response[0].addressTownCity,
          addressStateCounty: response[0].addressStateCounty,
          postal_code: response[0].postal_code,
          country_id: response[0].country_id,
        })
      })
  }, []);
  return (
    <>
      <Box component="form" onSubmit={(e) => submitData(e)}>
        <div className="Szx-SiHsds">
          <h2>Edit Profile </h2>
          {msg ? <Alert severity={msg}>{message(msg)}</Alert> : null}

          <TextField
            focused={initailData.firstname ? true : false}
            size='small'
            value={initailData.firstname}
            required
            sx={style}
            variant="outlined"
            name="firstname"
            label="First Name"
            onChange={(e) => SubmitForm(e)}
          />
          <TextField
            focused={initailData.email ? true : false}
            size='small'
            type="email"
            sx={style}
            required={true}
            name="email"
            value={initailData.email}
            variant="outlined"
            label="Email"
            onChange={(e) => SubmitForm(e)}
          />
          <TextField
            focused={initailData.mobile ? true : false}
            size='small'
            type="number"
            sx={style}
            required={true}
            name="mobile"
            value={initailData.mobile}
            variant="outlined"
            label="Number"
            onChange={(e) => SubmitForm(e)}
          />
          <TextField
            focused={initailData.phone ? true : false}
            size='small'
            type="email"
            sx={style}
            required={true}
            name="phone"
            value={initailData.phone}
            variant="outlined"
            label="Phone"
            onChange={(e) => SubmitForm(e)}
          />
          <div>
            <TextField
              focused={initailData.addressBuildingName ? true : false}
              value={initailData.addressBuildingName}
              size='small'
              required={true}
              sx={style}
              name="addressBuildingName"
              variant="outlined"
              label="Building Name"
              helperText=""
              onChange={(e) => SubmitForm(e)}
            />
            <TextField
              focused={initailData.addressTownCity ? true : false}
              value={initailData.addressTownCity}
              size='small'
              sx={style}
              required={true}
              name="addressTownCity"
              variant="outlined"
              label="Town City"
              helperText=""
              onChange={(e) => SubmitForm(e)}
            />
          </div>
          <TextField
            focused={initailData.addressStateCounty ? true : false}
            value={initailData.addressStateCounty}
            size='small'
            required={true}
            sx={style}
            variant="outlined"
            name="addressStateCounty"
            label="State County"
            helperText=""
            onChange={(e) => SubmitForm(e)}
          />
          <TextField
            focused={initailData.postal_code ? true : false}
            value={initailData.postal_code}
            size='small'
            type='number'
            required={true}
            sx={style}
            variant="outlined"
            name="postal_code"
            label="postal Code"
            helperText=""
            onChange={(e) => SubmitForm(e)}
          />
          <TextField
            focused={initailData.country_id ? true : false}
            value={initailData.country_id}
            size='small'
            type='text'
            required={true}
            sx={style}
            variant="outlined"
            name="country_id"
            label="country"
            helperText=""
            onChange={(e) => SubmitForm(e)}
          />
          <Button size='large' variant="contained" sx={{ margin: '12px 0px 12px 36px', padding: '10px', width: '90%' }} onClick={submitData} style={{ textAlign: 'center' }} disableElevation>
            submit
          </Button>
        </div>
      </Box>
    </>
  );
}
const style = {
  width: '90%',
  margin: '12px 0px 12px 35px',
  textAlign: 'center',
};
