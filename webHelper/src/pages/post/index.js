import React, { useEffect, useState } from 'react';
import { Input, InputLabel, MenuItem, FormControl, Select, TextField, Box, Button, Stack, Autocomplete } from '@mui/material';
import VisibleLoading from '../../components/LoadingVisble';

import { CategoriesService, SavePost, getGeoLocationAddress } from '../../services/api/api.service';
import { message } from '../../components/mesage';
import Alert from '@mui/material/Alert';
import { SUCCESS_TYPE, ERROR_TYPE, FAILED_TYPE, VALIDATION_TYPE } from '../../constants/message';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';

const Inputmain = styled('input')({
  display: 'none',
});

export default function PostJobs() {
  const customer_id = useSelector((e) => e.user.userDetail.userId);
  const [categories, getCategories] = useState([]);
  const [Product, getProduct] = useState([]);
  const [loading, clsLoading] = useState(false);
  const [citiesList, setCitiesList] = useState([]);
  const [pincode, setpincode] = useState('');
  const [location, setLocation] = useState([]);
  const [data, setData] = useState({
    uid: customer_id,
    categoriesName: '',
    pname: '',
    price: null,
    category_id: '54',
    short_description: '',
    imageUrl1: null,
    imageUrl2: null,
    imageUrl3: null,
    imageUrl4: null,
    state: localStorage.getItem('state'),
    city: null,
    pincode: null,
  });
  const history = useHistory();
  const [msg, saveMsg] = useState(null);
  const getUserId = useSelector((e) => e);
  console.log('============', getUserId);
  const savePostData = (e) => {
    clsLoading(true);
    e.preventDefault();

    SavePost(data).then((e) => {
      console.log(e);
      if (e.data.status == 200) {
        setTimeout(() => {
          history.push('/view-post');
        }, 900);
        clsLoading(false);
        saveMsg(SUCCESS_TYPE);
        // Object.values(document.querySelectorAll('input')).map((e) => {
        //     e.value = "";
        // })
        const inputs = document.querySelectorAll(
          '#categoriesName, #pname , #price , #short_description, #imageUrl,#imageUrl2, #imageUrl3 , #imageUrl4',
        );
        inputs.forEach((input) => {
          input.value = null;
        });
        for (var i = 0; i < document.getElementById(categoriesName).options.length; i++) {
          document.getElementById(categoriesName).options[i] = null;
        }
      } else {
        saveMsg(VALIDATION_TYPE);
        clsLoading(false);
      }
      console.log(e);
    });
    // .catch((error) => saveMsg(ERROR_TYPE))
  };
  const getLocalities = (pin) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${pin}&key=AIzaSyARNDXzSr-Heq6c0_4e2LifNMdUlkVLdyY`)
      .then((e) => e.json())
      .then((e) => {
        console.log(e);
        let Total_cities = e['results'][0]['postcode_localities'];
        let mainCity = e['results'][0]['formatted_address'];

        let arr = [];
        for (var eachVal of Total_cities) {
          arr.push({ label: `${eachVal}` });
        }
        setCitiesList(arr);
      });
  };
  const getCities = (e) => {
    const x = e.currentTarget.value;
    setpincode(x);
    getLocalities(x);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = '';
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log('Called', reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  const uploadHandler = (event) => {
    getBase64(event.target.files[0]).then((response) =>
      setData({
        ...data,
        [event.target.name]: response,
      }),
    );
  };

  const updateFeilds = (e) => {
    console.log(e.target.value);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  console.log('########', data);

  useEffect(() => {
    CategoriesService().then((response) => {
      if (response.status == 200) {
        console.log('CategoriesService', response.data.data);
        getCategories(response.data.data);
      }
    });
  }, []);

  const searchLocation = (e) => {
    getGeoLocationAddress(e).then((data) => setLocation(data.data.result));
  };
  console.log(citiesList);
  return (
    <div class="post_job">
      <div class="post_shadow">
        {loading && <VisibleLoading />}
        <h2 className="fixed_heading">Post your AD</h2>
        <Box component="form" noValidate={false} autoComplete="off" onSubmit={(e) => savePostData(e)}>
          {msg ? <Alert severity={msg}>{message(msg)}</Alert> : null}

          <div className="feild_input">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="categoriesName"
                label="Categories Name"
                name="category_id"
                fullWidth={true}
                onChange={(e) => updateFeilds(e)}
              >
                {categories.map((e) => {
                  return <MenuItem value={e.id}>{e.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>
          <div className="feild_input">
            <TextField
              fullWidth={true}
              id="pname"
              label="Product Name"
              name="pname"
              variant="outlined"
              onChange={(e) => updateFeilds(e)}
              required
            />
          </div>
          <div className="feild_input">
            <TextField
              fullWidth={true}
              id="price"
              label="Price"
              name="price"
              variant="outlined"
              onChange={(e) => updateFeilds(e)}
              required
            />
          </div>

          <div className="feild_input">
            <TextField fullWidth={true} id="pincode" name="pincode" label="Zipcode" variant="outlined" onChange={getCities} />
          </div>
          <div className="feild_input">
            {citiesList.length > 0 && (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">select locality</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="city"
                  label="select locality"
                  name="city"
                  fullWidth={true}
                  onChange={(e) => updateFeilds(e)}
                >
                  {citiesList.map((e) => {
                    return <MenuItem value={e.label}>{e.label}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            )}
          </div>

          <div className="">
            <Stack direction="row" alignItems="center" spacing={2}>
              <label htmlFor="imageUrl1">
                <Inputmain accept="image/*" id="imageUrl1" name="imageUrl1" multiple type="file" onChange={uploadHandler} />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
              <label htmlFor="imageUrl2">
                <Inputmain accept="image/*" id="imageUrl2" name="imageUrl2" multiple type="file" onChange={uploadHandler} />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
              <label htmlFor="imageUrl3">
                <Inputmain accept="image/*" id="imageUrl3" name="imageUrl3" multiple type="file" onChange={uploadHandler} />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
              <label htmlFor="imageUrl4">
                <Inputmain accept="image/*" id="imageUrl4" name="imageUrl4" multiple type="file" onChange={uploadHandler} />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </Stack>
          </div>
          <div className="postImage_main">
            {data.imageUrl1 ? (
              <div className="PostImage">
                <img src={data.imageUrl1} />
              </div>
            ) : null}
            {data.imageUrl2 ? (
              <div className="PostImage">
                <img src={data.imageUrl2} />
              </div>
            ) : null}
            {data.imageUrl3 ? (
              <div className="PostImage">
                <img src={data.imageUrl3} />
              </div>
            ) : null}
            {data.imageUrl4 ? (
              <div className="PostImage">
                <img src={data.imageUrl4} />
              </div>
            ) : null}
          </div>
          <div className="field_output">
            <TextField
              fullWidth={true}
              multiline
              id="short_description"
              label="Description"
              variant="outlined"
              name="short_description"
              onChange={(e) => updateFeilds(e)}
              minRows={4}
              required
            />
          </div>
          <Button variant="contained" type="submit" size="large" fullWidth={true}>
            SUBMIT
          </Button>
        </Box>
      </div>
    </div>
  );
}
