import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Button, Select, InputLabel, ImageUpload } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { createTickets, ServiceAll, LocationData, departmentOrType, userSearch, mobileSearch } from '../../services/api/api.service'
import Alert from '@mui/material/Alert';
import { SUCCESS_MSG, FAILED_MSG, FAILED_TYPE, SUCCESS_TYPE } from '../../constants/message'
import Loader from '../../ui/loader'
import Autocomplete from '@mui/material/Autocomplete';

    function reclearr() {
        window.location.reload();
    }

// function searchdone(){}

export default function CreateTickets() {
    const history = useHistory()
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState({
        enterUser: null,
        enterCustomerName: null,
        email: null,
        reason: null,
        mobileNumber: null,
        reason: null,
        city: null,
        area: null,
        service: null,
        enterremark: null,
        address: null
    })
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [selectedMobile, setSelectedMobile] = useState(null)
    const [selectedCustomerData, setSelectedCustomerData] = useState({})
    const [location, setLocation] = useState([])
    const [services, setServices] = useState([])
    const [reasonsData, setReasonData] = useState([])
    const [customerList, setCustomerList] = useState([])
    const [mobiledata, setMobiledata] = useState([])
    const rootElement = document.getElementById("root");

    const [saveTicketFeilds, setSaveTicketsFeilds] = useState({
        // crmUserId: selectedCustomer,
        // mobileNo: selectedCustomerData.phoneNo,
        // emailId: "jay.m@height8tech.com",
        // location: "Noida",
        // area: "Noida Sector 143B",
        // altMobileNo: "",
        // address: "6564 Noida Sector 143B Rajasthan Noida 301018",
        // locationLevel1: "Noida Sector 143B",
        // crmDid: "123456",
        // crmIntercom: "",
        // crmReseller: "",
        // crmPartner: "Tripleplay Interactive Network Pvt Ltd",
        // customerName: selectedCustomerData.customerName,
        // serviceId: "2",
        // reasonMasterId: "1",
        // departmentMasterId: 3,
        // createdByType: "TRIPLEPLAY_USER"
    })

    useEffect(() => {
        ServiceAll()
            .then((e) => e.data.data)
            .then((response) => setServices(response))
            .catch((e) => {
                setLoader(false)
            })

        let request = {
            columnName: "SERVICE_AREA"
        }
        LocationData(request)
            .then((e) => e.data.data)
            .then((response) => setLocation(response))
            .catch((e) => {
                setLoader(false)
            })
    }, [])

    useEffect(() => {
        if (data.service) {
            departmentOrType(data.service)
                .then((e) => e.data.data)
                .then((response) => setReasonData(response))
                .catch((e) => {
                    setLoader(false)
                })
        }
    }, [data.service])

    const [message, setMessage] = useState({
        showMsg: false,
        msgTitle: null,
        msgDesc: null
    })
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const setFormData = (e) => {
        console.log(e)
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const searchCustomerbyUser = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        if (data.enterUser.length > 2) {
            let request = {
                userId: data.enterUser
            }
            userSearch(request)
                .then((response) => setCustomerList(response.data.data))
                .catch((e) => {
                    setLoader(false)
                })
        }
    }
    const searchCustomerbyMob = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        if (data.mobileNumber.length > 4) {
            let request = {
                mobile: data.mobileNumber
            }
            userSearch(request)
                .then((response) => setMobiledata(response.data.data))
                .catch((e) => {
                    setLoader(false)
                })
        }
    }
    const saveData = () => {
        setLoader(true)
        createTickets(saveTicketFeilds)
            .then((response) => response.data.data)
            .then((e) => {
                setLoader(false)
                setMessage({
                    showMsg: true,
                    msgTitle: SUCCESS_TYPE,
                    msgDesc: SUCCESS_MSG
                })
            })
            .catch((e) => {
                setLoader(false)
                setMessage({
                    showMsg: true,
                    msgTitle: FAILED_TYPE,
                    msgDesc: FAILED_MSG
                })
            })
    }
    console.log(location, services, data, reasonsData, 'cl', customerList, mobiledata)
    return (
        <>
            {loader ? <Loader /> : null}
            <div className='container'>
                <div className='ticketname' >
                    <h4>Create New Ticket</h4>
                </div>
                <div className='container_from'>

                    <div className='row'>
                        <div className='col'>
                            {message.showMsg ? <Alert severity="success">This is a success alert — check it out!</Alert> : null}
                        </div>
                    </div>
                    {/* <div className='row'>
                        <div className='col'>
                            <InputLabel id="demo-simple-select-label"> Is Cable Tv Ticket*</InputLabel>
                            <Checkbox {...data} label="Label" id="Label" name='Label' size='medium'> </Checkbox>
                        </div>
                        <div className='col'>
                            <InputLabel id="demo-simple-select-label"> Is LCO *</InputLabel>
                            <Checkbox {...data} label="Label" size='medium' > </Checkbox>
                        </div>
                    </div> */}
                    <div className='row' id='main_search'>
                        <div className='col'>
                            <i class="fa fa-search" aria-hidden="true" id='srcbtn' onClick={(e) => searchCustomerbyUser(e)}></i> <i class="pe-7s-close" aria-hidden="true" id='closebnt' onClick={()=> reclearr()}></i>
                            <InputLabel id="demo-simple-select-label"> Search By Customer Name </InputLabel>
                            <TextField id="enterUser" name='enterUser' value={selectedCustomer} size='small' fullWidth={true} label="Enter Users Name" variant="outlined"  />
                            {customerList && customerList.length == 0 ? null : <ul>

                                {customerList.map((e) => <ul id='seares'><li onClick={() => {
                                    setSelectedCustomer(e.userId)
                                    setSelectedCustomerData(e)
                                    setCustomerList([])
                                }}>{e.customerName} - {e.phoneNo}</li></ul>)}

                            </ul>}
                        </div>
                        <div className='col'>
                            <span><i class="fa fa-search" aria-hidden="true" id='srcbtn'></i></span><i class="pe-7s-close" aria-hidden="true" id='closebnt' onClick={()=> reclearr()}></i>
                            <InputLabel id="demo-simple-select-label"> Search by Mobile Number </InputLabel>
                            <TextField id="enterCostmob" name='mobileNumber' value={selectedMobile} size='small' fullWidth={true} label="Enter Customer mob." variant="outlined" onChange={(e) => searchCustomerbyMob(e)} />
                            {mobiledata && mobiledata.length == 0 ? null : <ul>

                                {mobiledata.map((e) => <ul id='seares'><li onClick={() => {
                                    setSelectedMobile(e.phoneNo)
                                    setSelectedCustomerData(e)
                                    setMobiledata([])
                                   
                                }}>{e.phoneNo}</li></ul>)}

                            </ul>}


                        </div>
                    </div>
                    {selectedCustomer != null ? <div className='container_from_left'>
                        <div className="container_from_left_header">
                            <h2>Customer Detail</h2>
                        </div>
                        <div className="container_from_left_containts">
                            <ul>
                                <li><span>Name : </span> {selectedCustomerData.customerName} </li>
                                <li><span> User Id : </span> {selectedCustomerData.userId}</li>
                                <li><span> Address : </span> {selectedCustomerData.address}</li>
                                <li><span> Reseller : </span>{selectedCustomerData.resellerName} </li>
                                <li><span> Partner : </span>{selectedCustomerData.partnerName}</li>
                                <li><span> DID : </span> {selectedCustomerData.did}</li>
                                <li><span> InterCom : </span> {selectedCustomerData.intercom}</li>
                            </ul>
                            <ul>
                                <li><span> Balance Amt. : </span> {selectedCustomerData.dataBalance}</li>
                                <li><span> Data Status : </span> {selectedCustomerData.dataServiceStatus}</li>
                                <li><span> Account Status : </span> {selectedCustomerData.accountStatus}</li>
                                <li><span> Service Area : </span> {selectedCustomerData.serviceArea}</li>
                                <li><span> Location level 1 : </span> {selectedCustomerData.itemAllocatedTo}</li>
                                <li><span> Location level 2 : </span> {selectedCustomerData.itemAllocatedTo}</li>
                                <li><span> Location level 3 : </span> {selectedCustomerData.itemAllocatedTo}</li>
                                <li><span> Location level 4 : </span> {selectedCustomerData.itemAllocatedTo}</li>



                            </ul>
                        </div>
                    </div> : null}                   
                    {/* {selectedCustomer != null ? <div className='form_table'>
                        <p>{selectedCustomerData.customerName}</p>
                    </div> : null} */}
                    <div className='row'>
                        <div className='col'>
                            <InputLabel id="demo-simple-select-label">Services</InputLabel>

                            {services && services.length == 0 ? null : <Select
                                labelId="service"
                                id="service"
                                name='service'
                                size='small'
                                fullWidth={true}
                                onChange={(e) => setFormData(e)}
                                label="service"

                            >
                                {services.map((e) => <MenuItem value={e.id}>{e.name}</MenuItem>)}
                            </Select>}

                        </div>
                        {/* <div className='col'>
                            <InputLabel id="demo-simple-select-label">Email</InputLabel>
                            <TextField id="email" label="Enter Email" variant="outlined" size='small' fullWidth={true} onChange={(e) => setFormData(e)} />
                        </div> */}

                    </div>
                    <div className='row'>
                        <div className='col'>
                            {/* <label></label> */}

                            <InputLabel id="demo-simple-select-label">Reason</InputLabel>
                            {reasonsData && reasonsData.length == 0 ? null : <Select
                                labelId="service"
                                id="reason"
                                name='reason'
                                size='small'
                                fullWidth={true}
                                onChange={(e) => setFormData(e)}
                                label="reason"

                            >
                                {reasonsData.map((e) => <MenuItem value={e.id}>{e.reason}</MenuItem>)}
                            </Select>}

                        </div>
                        {/* <div className='col'>
                            <InputLabel id="demo-simple-select-label">Mobile Number</InputLabel>
                            <TextField id="mobileNumber" label="Enter Mobile Number" variant="outlined" size='small' fullWidth={true} onChange={(e) => setFormData(e)} />
                        </div> */}
                    </div>
                    {/* <div className='row'>
                        <div className='col'>
                            <InputLabel id="demo-simple-select-label">City</InputLabel>

                            {location && location.length == 0 ? null : <Select
                                labelId="demo-simple-select-label"
                                id="city"
                                name="city"
                                onChange={(e) => setFormData(e)}
                                label="city"
                                size='small'
                                fullWidth={true}
                            >
                                {location.map((e) => <MenuItem value={e}>{e}</MenuItem>)}

                            </Select>}
                        </div>

                        <div className='col'>
                            <InputLabel id="demo-simple-select-label">Area</InputLabel>


                            <Select
                                labelId="demo-simple-select-label"
                                id="area"
                                onChange={(e) => setFormData(e)}
                                label="area"
                                size='small'
                                fullWidth={true}
                            >
                                {services.map((e) => <MenuItem value={e.id}>{e.name}</MenuItem>)}

                            </Select>

                        </div>
                    </div> */}
                     <div className='row'>
                        <div className='col'>
                            <InputLabel id="demo-simple-select-label">Address</InputLabel>
                            <TextField id="address" label="Enter Address" variant="outlined" size='small' fullWidth={true} onChange={(e) => setFormData(e)} />
                        </div>
                        <div className='col'>
                            <InputLabel id="demo-simple-select-label">Remark</InputLabel>
                            <TextField id="enterremark" label="Enter Remark" variant="outlined" size='small' fullWidth={true} onChange={(e) => setFormData(e)} />
                        </div>

                    </div>

                   <div className='row'>
                        <div className='col'>

                        </div>
                        <div className='col'>
                            <Button
                                variant="contained"
                                component="label"
                                id="upimg"
                            >
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                />
                            </Button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Button variant="contained" color="success" id="submitcon" onClick={() => saveData()} > Submit </Button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}