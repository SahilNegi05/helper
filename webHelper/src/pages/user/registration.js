import React, { useEffect, useState } from 'react';
import { SaveRecruiter, getCountryData } from '../../services/api/api.service';
import { InputLabel, MenuItem, FormControl, Select, TextField, Box, TextareaAutosize, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useLocation } from 'react-router-dom';


export default function Registration() {
    const location = useLocation()
    const [country, countryDta] = useState([])
    const [data, setData] = useState({
        company_name: null,
        email: null,
        pwd: null,
        location: null,
        phone_no: null,
        mobile: null,
        website: null,
        industry: null,
    })

    const updateFeilds = (e) => {
        console.log(e.target.value)
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }

    const updateApiFeilds = (e) => {
        console.log(e.target.name)
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        getCountryData()
            .then((response) => {
                if (response.status == 200) {
                    countryDta(response.data.data)
                    setTimeout(() => {
                        location(-1)
                    }, 1000);
                }
            })
    }, [])
    const SaveData = async () => {
        const obj = data
        setTimeout(() => {
            SaveRecruiter(obj)
        }, 1000)
    }
    return (
        <div class="post_job">
            <div class="post_shadow">
                <h2 className='fixed_heading'>Recruiter Registration</h2>
                <div className='feild_input'>
                    <TextField fullWidth={true} size={"medium"} id="company_name" label="Company Name" variant="outlined" onChange={(e) => updateFeilds(e)} />
                </div>
                <div className='feild_input'>
                    <TextField fullWidth={true} id="email" type="email" label="Email" variant="outlined" onChange={(e) => updateFeilds(e)} />
                </div>
                <ul className='two_input'>
                    <li>
                        <TextField fullWidth={true} id="pwd" type='password' label="Password" variant="outlined" onChange={(e) => updateFeilds(e)} />
                    </li>
                    <li>
                        <Box sx={{ minWidth: 200 }}>
                            <FormControl fullWidth>
                                <InputLabel id="location">location</InputLabel>
                                <Select
                                    labelId="location"
                                    name="location"
                                    id="location"
                                    label="location"
                                    onChange={(e) => updateApiFeilds(e)}
                                >
                                    {country.map((e) => { return <MenuItem value={e.country_id}>{e.country_name}</MenuItem> })}

                                </Select>
                            </FormControl>
                        </Box>
                    </li>
                </ul>
                <div className='feild_input'>
                    <TextField fullWidth={true} id="phone_no" type="number" label="Phone No" variant="outlined" onChange={(e) => updateFeilds(e)} />
                </div>
                <div className='feild_input'>
                    <TextField fullWidth={true} id="mobile" type="text" label="Mobile No" variant="outlined" onChange={(e) => updateFeilds(e)} />
                </div>
                <div className='feild_input'>
                    <TextField fullWidth={true} id="website" label="Website" variant="outlined" onChange={(e) => updateFeilds(e)} />
                </div>
                <div className='feild_input'>
                    <TextField fullWidth={true} id="industry" label="industry" variant="outlined" onChange={(e) => updateFeilds(e)} />
                </div>
                <div className='feild_input'>
                    <Button onClick={SaveData} variant="contained" size="large" fullWidth={true}>SUBMIT</Button>
                </div>

            </div>

        </div>

    )
}