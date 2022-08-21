import React, { useEffect, useState } from 'react';
import { Input, InputLabel, MenuItem, FormControl, Select, TextField, Box, Button, Stack } from '@mui/material';
import { CategoriesService, UpdatePost, ProductsByProductId } from '../../services/api/api.service';
import Form from 'react-bootstrap/Form';
import { message } from '../../components/mesage';
import Alert from '@mui/material/Alert';
import { SUCCESS_TYPE, ERROR_TYPE, FAILED_TYPE, VALIDATION_TYPE } from '../../constants/message';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';

const Inputmain = styled('input')({
  display: 'none',
});

export default function PostJobs() {
  const getUserId = useSelector((e) => e.user.userDetail.userId);
  const { pid } = useParams();
  const [popup, showPopup] = useState(false);
  const [categories, getCategories] = useState([]);
  const [data, setData] = useState({
    uid: getUserId,
    product_id: pid,
    categoriesName: null,
    pname: null,
    price: null,
    category_id: null,
    short_description: null,
    imageUrl1: null,
    imageUrl2: null,
    imageUrl3: null,
    imageUrl4: null,
    city: null,
    state: null,
  });
  const [msg, saveMsg] = useState(null);

  console.log('============', getUserId);
  console.log('============', pid);

  const savePostData = (e) => {
    e.preventDefault();

    UpdatePost(data)
      .then((e) => {
        if (e.data.status == 200) {
          showPopup(true);
          setTimeout(() => {
            showPopup(false);
          }, 3000);
        } else {
          saveMsg(VALIDATION_TYPE);
        }
        console.log(e);
      })
      .catch((e) => saveMsg(ERROR_TYPE));
  };

  const updateFeilds = (e) => {
    console.log(e.target.value);
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
    });
  };
  console.log(data);
  const uploadHandler = (event) => {
    getBase64(event.target.files[0]).then((response) =>
      setData({
        ...data,
        [event.target.name]: response,
      }),
    );
  };

  useEffect(() => {
    ProductsByProductId(pid)
      .then((e) => {
        console.log(e.data.data);
        if (e.data.status == 200) {
          return e.data.data;
        }
      })
      .then((response) => {
        console.log(response);
        setData({
          ...data,
          pname: response[0].title,
          categoriesName: response[0].categories_name,
          short_description: response[0].subtitle,
          category_id: response[0].categories_id,
          price: response[0].price,
          city: response[0].city,
          state: response[0].state,
          imageUrl1: response[0].img1,
          imageUrl2: response[0].img2,
          imageUrl3: response[0].img3,
          imageUrl4: response[0].img4,
        });
      });
    CategoriesService().then((response) => {
      if (response.status == 200) {
        console.log('CategoriesService', response.data.data);
        getCategories(response.data.data);
      }
    });
  }, []);
  const handelModal = () => {
    showPopup(false);
  };

  return (
    <>
      {popup && (
        <div class="contents modalPopup">
          <div class="alert alert-success alert-white rounded">
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-hidden="true"
              onClick={() => {
                handelModal();
              }}
            >
              ×
            </button>
            <div class="icon">
              <i class="fa fa-check"></i>
            </div>
            <strong> Success!</strong> your post updated successfully!
          </div>
        </div>
      )}
      <div class="post_job">
        <div class="post_shadow">
          <h2 className="fixed_heading">Update Post</h2>
          <Box component="form" noValidate={false} autoComplete="off" onSubmit={(e) => savePostData(e)}>
            {msg ? <Alert severity={msg}>{message(msg)}</Alert> : null}

            <div className="feild_input">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{data.categoriesName}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="categoriesName"
                  label="Categories"
                  value={data.categoriesName}
                  name="categoriesName"
                  fullWidth={true}
                  onChange={(e) => updateFeilds(e)}
                >
                  {categories.map((e) => {
                    return <MenuItem value={e.id}>{e.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>

              <Box
                component="form"
                sx={{
                  '& > :not(style)': { mt: 3, mb: 3, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label="Product Name"
                  variant="outlined"
                  id="pname"
                  name="pname"
                  value={data.pname}
                  onChange={(e) => updateFeilds(e)}
                  focused
                />
              </Box>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { mb: 3, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label="Price"
                  variant="outlined"
                  value={data.price}
                  id="price"
                  name="price"
                  onChange={(e) => updateFeilds(e)}
                  focused
                />
              </Box>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { mb: 3, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label="City"
                  variant="outlined"
                  value={data.city}
                  id="city"
                  name="city"
                  onChange={(e) => updateFeilds(e)}
                  focused
                />
              </Box>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { mb: 3, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label="State"
                  variant="outlined"
                  value={data.state}
                  id="city"
                  name="state"
                  onChange={(e) => updateFeilds(e)}
                  focused
                />
              </Box>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { mb: 3, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label="Short Description"
                  multiline
                  variant="outlined"
                  value={data.short_description}
                  id="short_description"
                  name="short_description"
                  onChange={(e) => updateFeilds(e)}
                  focused
                />
              </Box>
            </div>
            <div className="PictureHandler">
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
              {data.imageUrl1 == 'NULL' ? null : (
                <div className="PostImage">
                  <img src={data.imageUrl1} />
                </div>
              )}
              {data.imageUrl2 == 'NULL' ? null : (
                <div className="PostImage">
                  <img src={data.imageUrl2} />
                </div>
              )}
              {data.imageUrl3 == 'NULL' ? null : (
                <div className="PostImage">
                  <img src={data.imageUrl3} />
                </div>
              )}
              {data.imageUrl4 == 'NULL' ? null : (
                <div className="PostImage">
                  <img src={data.imageUrl4} />
                </div>
              )}
            </div>
            <Button
              variant="contained"
              type="submit"
              size="large"
              fullWidth={true}
              onClick={(e) => {
                savePostData(e);
              }}
            >
              SUBMIT
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
}
