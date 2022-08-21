import React, { Component, useState, useEffect, useContext } from 'react';
import { ProductServiceById, ViewChatData, CustomerName, ViewChat, ProductsByProductId } from '../../services/api/api.service';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MessageArea from '../../components/messagebox/messagecomp';
import { useSelector } from 'react-redux';
// import { blue } from '@mui/material/colors';
import CircularIndeterminate from '../../components/spinner';
import Avatar from '@mui/material/Avatar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Stack from '@mui/material/Stack';

// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

import NoSsr from '@mui/material/NoSsr';
// import { setRef } from '@material-ui/core';
// import { useRef } from 'react';
import ProductContext from '../../contexter/productcontext'

// let propsVal = "";
// export const GetData = (props) => {
//   useEffect(() => {
//     propsVal = props.data
//   })
//   return (
//     <>
//       <input type="hidden" name="" />
//     </>
//   )
// }

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Chat(props) {
  const dataProvider = useContext(ProductContext);
  // console.log(dataProvider)
  const [value, setValue] = React.useState(0);
  const [loader, setLoader] = useState(true);
  const [state, setState] = React.useState({
    open: false,
    defer: false,
    dataVal: ""
  });
  const [data, setData] = useState({
    chatData: [],
    chatValue: false
  });
  const [autoClick, setAutoClick] = useState(false);
  const [reload, setReload] = useState(false);
  const [leftTabs, setLeftTabs] = useState([]);
  const userId = useSelector((e) => e.user.userDetail.userId);
  const [dataValue, setDataValue] = useState({
    userId: userId,
    productId: "",
    ownerName: "",
    ownerId: "",
    chatData: [],
    chatWork: chatMainWork
  });
  const [isTabClicked, setIsTabClicked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  /*=========================FUNCTION FOR ARRANGING ALL THE CHATS=========================*/

  function chatMainWork() {
    console.log("DONE");
    let arr = [];
    ViewChat(userId)
      .then((res) => {
        if (res.data.status == 200) {
          res.data.data.map((e) => {
            arr.push(e)
          })
        }
      })
      .then(async () => {
        let data = await ViewChatData(userId)
        if (data.data.status == 200) {
          await data.data.data.map((e) => {
            let obj = new Object;
            obj.chat_id = e.chat_id;
            obj.user_id = e.product_owner_id;
            obj.get_message = e.message;
            obj.product_id = e.product_id;
            obj.product_owner_id = e.user_id;
            obj.chatdate = e.chatdate;
            obj.status = e.status;
            arr.push(obj);
          })
        }
      })
      .then(() => {
        if (arr.length > 0) {
          setData({
            ...data,
            chatData: arr,
            chatValue: true
          });
        }
      })
  }
  /*================USEEFFECT FOR CALLING CHAT FUNCTION==================*/

  useEffect(() => {
    chatMainWork();
  }, [])
  // console.log("$$$$$$$$$$$$$$", data)

  /*========================USEEFFECT FOR LEFT TABS======================*/

  useEffect(() => {
    let arrayData = [];
    let arr = [JSON.parse(localStorage.getItem('product_id'))];
    let prodId = Promise.resolve(
      data.chatData != [] && data.chatData.map((e) => {
        if (!(arr.includes(e.product_id))) {
          arr.push(e.product_id)
        }
      })
    )
    prodId.then(() => {
      arr.map((x) => {
        let obj = new Object;
        if (x != 0) {
          ProductsByProductId(x)
            .then(res => {
              obj.name = res.data.data[0].title
              obj.id = x
              obj.image = res.data.data[0].img1
              arrayData.push(obj)
            }
            )
            .then(() => {
              setLeftTabs(
                [...arrayData]
              );
            })
        }
      })
    })
  }, [data])

  /*====================FUNCTION FOR LEFT DROPDOWN========================*/

  function leftDropdownData(e) {
    let arrayVal = [];
    let prodNameArray = [];
    let prodOwnerid = Promise.resolve(
      data.chatValue && data.chatData.map((x) => {
        let obj = new Object;
        let dup = false;
        if (e.target.name == x.product_id && !(arrayVal.includes(x.product_owner_id))) {
          arrayVal.push(x.product_owner_id)
        }
      })
    )
    prodOwnerid.then(() => {
      arrayVal.length > 0 ? arrayVal.map((x) => {
        let obj = new Object;
        CustomerName(x)
          .then((response) => {
            obj.ownerId = response.data.data[0].id;
            obj.ownerName = response.data.data[0].name;
            prodNameArray.push(obj);
          })
          .then(() => {
            setState({
              open: true,
              defer: false,
              dataArr: prodNameArray,
              productId: e.target.name,
            });
            setIsTabClicked(true);
            setIsClicked(!isClicked);
          })
      }) :
        arrayVal.length == 0 ?

          ProductServiceById(JSON.parse(localStorage.getItem('product_id')))
            .then(response =>
              CustomerName(response.data.data[0].customer_id)
                .then(getData => {
                  let ownerMainData = {
                    ownerId: getData.data.data[0].id,
                    ownerName: getData.data.data[0].name
                  }
                  return ownerMainData
                })
            )
            .then(res =>
              setState({
                open: true,
                defer: false,
                dataArr: [res],
                productId: e.target.name,
              })
            )
            .then(() => {
              setIsTabClicked(true);
              setIsClicked(!isClicked);
            }) : null
    })
  }

  /*=======================FUNCTION FOR CREATING DATAVALUE===========================*/

  async function ownerData(e) {
    if(window.innerWidth<=760 && !autoClick){
      document.querySelector('.MuiTabs-root.MuiTabs-vertical.css-101kjhe-MuiTabs-root').style.display="none";
    }
    await setAutoClick(false);
    console.log("##########################",e.target);
    document.querySelector('.productname').innerHTML = `<p>${e.target.parentElement.previousSibling.innerText}</p><p>${e.target.innerText}</p>`;
    // document.querySelector('.productname').label = e.target.firstChild;
    console.log("DATA");
    let chatArr = [];
    data.chatData && data.chatData.map((x) => {
      if (x.product_owner_id == e.target.name && x.product_id == state.productId) {
        chatArr.push(x);
      }
    })
    setDataValue({
      ...dataValue,
      userId: userId,
      productId: state.productId,
      ownerId: e.target.name,
      ownerName: e.target.innerText,
      chatData: chatArr.sort(function (a, b) {
        return a.chat_id - b.chat_id
      })
    })
  }

  /*============================USEEFFECT FOR SETTING LOADER===============================*/

  useEffect(() => {
    if (leftTabs.length >= 1 || !(data.chatValue)) {
      setTimeout(() => {
        setLoader(false);
      })
    }
  })

  /*============================USEEFFECT FOR SETTING INITIAL DATA=============================*/

  useEffect(() => {
    if (isTabClicked == false && document.querySelectorAll('#vertical-tab-0')) {
      Object.values(document.querySelectorAll('#vertical-tab-0')).map((e, i) => {
        if (JSON.parse(localStorage.getItem('product_id')) && e.name == JSON.parse(localStorage.getItem('product_id'))) {
          e.click();
        }
        else if (i == 1) {
          e.click();
        }
      });
    }
  }, [data])

  useEffect(() => {
      document.querySelectorAll('.css-3ihgx2') && Object.values(document.querySelectorAll('.css-3ihgx2')).map(async(x) => {
        if (x.firstChild) {
          await setAutoClick(true);
          x.firstChild.click()
        }
      })
  }, [isClicked, data])




  return (
    <>
      <Box
        sx={{ width: 1, flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 1 }}
      >
        {loader == true ?
          <CircularIndeterminate /> :
          loader == false ?
            <>
              <div className="maindropdown">
                <Tab className='productname' onClick={()=>document.querySelector('.MuiTabs-root.MuiTabs-vertical.css-101kjhe-MuiTabs-root').style.display="block"} sx={{ width: 260, height: 60, borderLeft: 2, borderBottom: 0, borderRight: 2, boredrTop: 0, borderColor: 'divider' }} />
              </div>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ width: 300, borderRight: 1, borderColor: 'divider' }}
              >
                {leftTabs != [] && loader == false && leftTabs.map((e) => {
                  let dataName = <Stack direction="row" spacing={2} sx={{ width: 270, zIndex: -10 }}>
                    <Avatar
                      alt="Remy Sharp"
                      name={e.id}
                      src={e.image}
                      sx={{ width: 60, height: 60 }}
                      variant="circle"
                    /><h4>{e.name}</h4>
                  </Stack>;
                  return (
                    <>
                      <Tab onClick={(e) => { leftDropdownData(e) }} name={e.id} id="propsButton" label={dataName} {...a11yProps(0)} sx={{ width: 300, height: 60, border: 1, borderBottom: 0, borderColor: 'divider' }} />

                      <Box sx={{ width: 300, display: 'flex', flexWrap: 'wrap' }}>
                        {state.open && e.id == state.productId ? (
                          <React.Fragment>
                            {state.dataArr != [] && state.dataArr.map((x) => {
                              return (
                                <>
                                  <NoSsr defer={state.defer}>
                                    <Tab onClick={e => ownerData(e)} name={x.ownerId} label={x.ownerName} {...a11yProps(0)} sx={{ width: 260, height: 60, borderLeft: 2, borderBottom: 0, borderRight: 2, boredrTop: 0, borderColor: 'divider' }} />
                                  </NoSsr>
                                </>
                              )
                            })}
                          </React.Fragment>
                        ) : null}
                      </Box>
                    </>
                  )
                })
                }
              </Tabs>
              {data.length != 0 ? data.chatData.map((e, i) => {
                return (
                  <>
                    <TabPanel value={value} index={i} >
                      <div id="messagebox">
                        <MessageArea ownerdata={dataValue != 0 ? dataValue : null} />
                      </div>
                    </TabPanel>

                  </>
                )
              }) :
                data.length == 0 ?
                  <TabPanel value={value} >
                    <div id="messagebox">
                      <MessageArea ownerdata={dataValue != 0 ? dataValue : null} />
                    </div>
                  </TabPanel>
                  : null
              }
            </> : null}
      </Box>
    </>
  );
}