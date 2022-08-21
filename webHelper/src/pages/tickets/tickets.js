import React, { useEffect, useState } from 'react';
import DataTable from '../../ui/table';
import { getGenericCrmTickets, exportTicketsExcel } from '../../services/api/api.service'
import { InputLabel } from '@mui/material';
import Pagination from '../../ui/pagination'
import Loader from '../../ui/loader'
import Select from '../../ui/select'
import MultiSelect from '../../ui/multiselectdropdown'

import exportFromJSON from 'export-from-json'
import { useHistory } from 'react-router-dom';
import { size } from 'lodash';
import { fontWeight, height, maxHeight, sizeHeight, display, width } from '@mui/system';
// import MultiSelectt from '../../ui/MultiSelectDowntwo';

function Sahil() {
    alert("working");
}
const Tickets = () => {
    const history = useHistory()
    const [data, setData] = useState([])
    const [rows, setRows] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [loader, setLoader] = useState(false)
    const [pageSize, setPageSize] = useState(20)
    const [selectedFilter, setSelectedFilter] = useState({
        tickets: ' '
    })
    const [age, setAge] = useState("");
    
    const [tickets, setTickets] = useState([{
        name: 'All',
        value: ''
    },
    {
        name: 'INPROGRESS',
        value: 'IN-PROGRESS'
    },
    {
        name: 'New',
        value: 'new'
    },
    {
        name: 'Assigned',
        value: 'Assigned'
    },
    {
        name: 'InProgress',
        value: 'InProgress'
    },
    {
        name: 'FollowUp',
        value: 'FollowUp'
    },
    {
        name: 'Retained',
        value: 'Retained'
    },
    {
        name: 'Temp. Disc',
        value: 'TempDisc'
    },
    {
        name: 'SoftDisc',
        value: 'SoftDisc'
    },
    {
        name: 'ConfirmDisc',
        value: 'ConfirmDisc'
    },
    {
        name: 'SoftClosed',
        value: 'SoftClosed'
    },
    {
        name: 'Completed',
        value: 'Completed'
    },
    {
        name: 'PendingAll',
        value: 'PendingAll'
    }
    ])

    const [col, setcol] = useState([
        {
            name: 'Date Range',
            value: 'date_range'
        },
        {
            name: 'Upload At',
            value: 'upload_at'
        },
        {
            name: 'Upload By',
            value: 'upload_by'
        },
        {
            name: 'Ticket No',
            value: 'ticket_no'
        },
        {
            name: 'Crm User',
            value: 'crm_user'
        },
        {
            name: 'Mobile',
            value: 'mobile'
        },
        {
            name: 'Ticket Type',
            value: 'ticket_type'
        },
        {
            name: 'Prev Assign Team',
            value: 'prev_assign_team'
        },
        {
            name: 'Assign to Emp',
            value: 'assign_to_emp'
        }, {
            name: 'Created By',
            value: 'created_by'
        }, {
            name: 'Department',
            value: 'department'
        }, {
            name: 'Service',
            value: 'service'
        }, {
            name: 'Reason',
            value: 'reason'
        }, {
            name: 'City',
            value: 'city'
        }, {
            name: 'Area',
            value: 'area'
        }, {
            name: 'Partner',
            value: 'partner'
        }, {
            name: 'Reseller',
            value: 'reseller'
        }, {
            name: 'Source',
            value: 'source'
        }, {
            name: 'Intercom',
            value: 'intercom'
        }, {
            name: 'Did',
            value: 'did'
        }, {
            name: 'Soft Close By Emp',
            value: 'soft_close_by_emp'
        }, {
            name: 'Confirm Diss By Emp',
            value: 'confirm_diss_by_emp'
        }, {
            name: 'Repeated Ticket',
            value: 'repeated_ticket'
        }, {
            name: 'Soft Closed Date',
            value: 'soft_closed_date'
        }, {
            name: 'Assign Date',
            value: 'assign_date'
        }, {
            name: 'Close Date',
            value: 'close_date'
        }, {
            name: 'InProgress Date',
            value: 'inprogress_date'
        }, {
            name: 'Retain Date',
            value: 'retain_date'
        }, {
            name: 'Soft Disconnection Date',
            value: 'soft_disconnection_date'
        }, {
            name: 'Confirm Disconnection Date',
            value: 'confirm_disconnection_date'
        }, {
            name: 'Temp. Disc Till Date',
            value: 'temp_disc_till_date'
        }
    ])

    // const [col, setcol]=useState([
    // {
    //     name:'Date Range',
    //     value:'date_range'
    // },
    // {
    //     name:'Upload At',
    //     value:'upload_at'
    // },
    // {
    //     name:'Upload By',
    //     value:'upload_by'
    // },
    // {
    //     name:'Ticket No',
    //     value:'ticket_no'
    // },
    // {
    //     name:'Crm User',
    //     value:'crm_user'
    // },
    // {
    //     name:'Mobile',
    //     value:'mobile'
    // },
    // {
    //     name:'Ticket Type',
    //     value:'ticket_type'
    // },
    // {
    //     name:'Prev Assign Team',
    //     value:'prev_assign_team'
    // },
    // {
    //     name:'Assign to Emp',
    //     value:'assign_to_emp'
    // },{
    //     name:'Created By',
    //     value:'created_by'
    // },{
    //     name:'Department',
    //     value:'department'
    // },{
    //     name:'Service',
    //     value:'service'
    // },{
    //     name:'Reason',
    //     value:'reason'
    // },{
    //     name:'City',
    //     value:'city'
    // },{
    //     name:'Area',
    //     value:'area'
    // },{
    //     name:'Partner',
    //     value:'partner'
    // },{
    //     name:'Reseller',
    //     value:'reseller'
    // },{
    //     name:'Source',
    //     value:'source'
    // },{
    //     name:'Intercom',
    //     value:'intercom'
    // },{
    //     name:'Did',
    //     value:'did'
    // },{
    //     name:'Soft Close By Emp',
    //     value:'soft_close_by_emp'
    // },{
    //     name:'Confirm Diss By Emp',
    //     value:'confirm_diss_by_emp'
    // },{
    //     name:'Repeated Ticket',
    //     value:'repeated_ticket'
    // },{
    //     name:'Soft Closed Date',
    //     value:'soft_closed_date'
    // },{
    //     name:'Assign Date',
    //     value:'assign_date'
    // },{
    //     name:'Close Date',
    //     value:'close_date'
    // },{
    //     name:'InProgress Date',
    //     value:'inprogress_date'
    // },{
    //     name:'Retain Date',
    //     value:'retain_date'
    // },{
    //     name:'Soft Disconnection Date',
    //     value:'soft_disconnection_date'
    // },{
    //     name:'Confirm Disconnection Date',
    //     value:'confirm_disconnection_date'
    // },{
    //     name:'Temp. Disc Till Date',
    //     value:'temp_disc_till_date'
    // }
    // ])

    const [cols, setcols] = useState([
        {
            name: 'S No.',
            value: 's_no'
        }, {
            name: 'Created At',
            value: 'created_at'
        }, {
            name: 'Ticket No.',
            value: 'ticket_no.'
        }, {
            name: 'Customer Name',
            value: 'customer_name'
        }, {
            name: 'Total Inv.',
            value: 'total_inv'
        }, {
            name: 'Pending Inv.',
            value: 'pending_inv'
        }, {
            name: 'Collected Inv.',
            value: 'collected_inv'
        }, {
            name: 'Account status',
            value: 'account_status'
        }, {
            name: 'Address',
            value: 'address'
        }, {
            name: 'Mobile',
            value: 'mobile'
        }, {
            name: 'Alt. Mobile',
            value: 'alt_mobile'
        }, {
            name: 'Status',
            value: 'Status'
        }, {
            name: 'LastModifiedRemark',
            value: 'lastmodifiedremark'
        }, {
            name: 'Remark',
            value: 'remark'
        }, {
            name: 'Total Time',
            value: 'total_time'
        }, {
            name: 'Uploaded At',
            value: 'uploaded_at'
        }, {
            name: 'Assign To Emp.',
            value: 'assign_to_emp'
        }, {
            name: 'Follow Up Reason',
            value: 'follow_up_reason'
        }, {
            name: 'Created By',
            value: 'created_by'
        }, {
            name: 'Assigned Time',
            value: 'assigned_time'
        }, {
            name: 'InProgress By Emp.',
            value: 'inprogress_by_emp'
        }, {
            name: 'InProgress DateTime',
            value: 'inprogress_datetime'
        }, {
            name: 'SoftClosed From',
            value: 'softClosedFrom'
        }, {
            name: 'SoftClosed Reason',
            value: 'softClosedReason'
        }, {
            name: 'SoftClosed Time',
            value: 'softclosedTime'
        }, {
            name: 'Closed By Emp',
            value: 'closedbyemp'
        }, {
            name: 'Closed Reason',
            value: 'closedreason'
        }, {
            name: 'Closed Time',
            value: 'closedtime'
        }, {
            name: 'Diff b/w InPr. and SL.',
            value: 'diffbwInPrandSL'
        }, {
            name: 'Diff b/w SC and C',
            value: 'diffb/wSCandC'
        }, {
            name: 'Retain By Emp',
            value: 'retainbyemp'
        }, {
            name: 'Till Temp Disc.',
            value: 'till_temp_disc'
        }, {
            name: 'Soft Diss. By',
            value: 'softDissBy'
        }, {
            name: 'Soft Diss. DateTime',
            value: 'softDissDateTime'
        }, {
            name: 'Confirm Diss. By',
            value: 'ConfirmDissBy'
        }, {
            name: 'Department',
            value: 'department'
        }, {
            name: 'Reporting Manager',
            value: 'reportingManager'
        }, {
            name: 'Reason',
            value: 'reason'
        }, {
            name: 'Status Update Reason',
            value: 'statusUpdateReason'
        }, {
            name: 'Team',
            value: 'team'
        }, {
            name: 'City',
            value: 'city'
        }, {
            name: 'Area/Location Level 1',
            value: 'areaLocationLevel'
        }, {
            name: 'Location Level 2',
            value: 'locationLevel2'
        }, {
            name: 'Location Level 3',
            value: 'locationLevel3'
        }, {
            name: 'Location Level 4',
            value: 'locationLevel4'
        }, {
            name: 'New Address',
            value: 'Newaddress'
        }, {
            name: 'Previous Assign Emp',
            value: 'previousassignemp'
        }, {
            name: 'Reseller',
            value: 'reseller'
        }, {
            name: 'Partner',
            value: 'partner',

        }, {
            name: 'Charge Amount',
            value: 'chargeAmount'
        }, {
            name: 'Settop Box No.',
            value: 'settopboxno'
        }, {
            name: 'Card no.',
            value: 'cardNo'
        }, {
            name: 'No. of Tv',
            value: 'noofTv'
        }, {
            name: 'DID',
            value: 'did'
        }, {
            name: 'Intercom',
            value: 'intercom'
        }, {
            name: 'Email Id',
            value: 'emailId'
        }, {
            name: 'Update At',
            value: 'updateBy'
        }, {
            name: 'Update By',
            value: 'UpdateBy'
        }, {
            name: 'Forward Reason',
            value: 'forwardReason'
        }, {
            name: 'Ticket Type',
            value: 'ticketType'
        }, {
            name: 'ReOpen',
            value: 'reOpen'
        }
    ])

    useEffect(() => {

        setLoader(true)
        getGenericCrmTickets(pageSize, pageNo)
            .then((response) => response.data.data)
            .then((e) => {
                if(!(age)){
                    setData(e)
                }
                console.log("======================",e)
                // setData(e)
                let statusArr=[];
                if(age.length){
                    console.log("**********************",e)
                    
                    e.map((x)=>{
                        console.log("Object",x);
                        // if(x.status==age){
                        //     setData(
                        //         statusArr.push(x)
                        //     )
                        // }
                    })
                }
                setLoader(false)
            })
            .catch((e) => {

                setLoader(false)
            })
    }, [pageNo])

    const CreateTickets = () => {
        history.push('/create-tickets')
    }


    const [columns,setcolumns] = useState([
        { field: 'id', headerName: 'S.No', width: '50' },
        { field: 'createdAt', headerName: 'Created At', width: '97' },
        { field: 'ticketNo', headerName: 'Ticket No.', width: '80' },
        { field: 'customerName', headerName: 'Customer Name', width: '116' },
        // { field: 'totalInv', headerName: 'Total Inv.', width: '67' },
        { field: 'mobile', headerName: 'Mobile', width: '102' },
        // { field: 'pendingInv', headerName: 'Pending Inv.', width: '80' },
        // { field: 'collectedInv.', headerName: 'Collected Inv.', width: '90' },
        // { field: 'accountStatus', headerName: 'Account Status', width: '125' },
        // { field: 'address', headerName: 'Address', width: '310' },
        // { field: 'altMobile	', headerName: 'Alt. Mobile' },
        // { field: 'status', headerName: 'Status', width: '70' },
        // { field: 'lastModifiedRemark', headerName: 'LastModifiedRemark', width: '191' },
        // { field: 'remark', headerName: 'Remark', width: '191' },
        // { field: 'totalTime', headerName: 'Total Time', width: '86' },
        // { field: 'updatedAt', headerName: 'Updated At' },
        // { field: 'assignToEmp', headerName: 'Assign To Emp.', width: '135' },
        // { field: 'followUpReason', headerName: 'Follow Up Reason', width: '150' },
        // { field: 'createdBy', headerName: 'Created By', width: '110' },
        // { field: 'assignedTime', headerName: 'Assigned Time', width: '114' },
        // { field: 'inProgressByEmp', headerName: 'InProgress By Emp', width: '160' },
        // { field: 'inProgressDateTime', headerName: 'InProgress DateTime', width: '120' },
        // { field: 'softClosedByEmp', headerName: 'SoftClosed By Emp', width: '150' },
        // { field: 'softClosedFrom', headerName: 'SoftClosed From', width: '135' },
        // { field: 'softClosedReason', headerName: 'SoftClosed Reason', width: '160' },
        // { field: 'softClosedTime', headerName: 'SoftClosed Time', width: '150' },
        // { field: 'closedByEmp', headerName: 'Closed By Emp', width: '140' },
        // { field: 'closedReason', headerName: 'Closed Reason', width: '130' },
        // { field: 'closedTime', headerName: 'Closed Time' },
        // { field: 'diffbwInPrandSL.', headerName: 'Diff b/w InPr. and SL.', width: '160' },
        // { field: 'diffb/wSCandC', headerName: 'Diff b/w SC and C', width: '150' },
        // { field: 'retainByEmp', headerName: 'Retain By Emp', width: '140' },
        // { field: 'tillTempDisc.', headerName: 'Till Temp Disc.', width: '120' },
        // { field: 'softDiss.By', headerName: 'Soft Diss. By' },
        // { field: 'softDiss.DateTime', headerName: 'Soft Diss. DateTime', width: '160' },
        // { field: 'confirmDiss.By', headerName: 'Confirm Diss. By', width: '130' },
        // { field: 'confirmDiss.DateTime', headerName: 'Confirm Diss. DateTime', width: '171' },
        // { field: 'service', headerName: 'Service', width: '100' },
        // { field: 'department', headerName: 'Department', width: '100' },
        // { field: 'reportingManager', headerName: 'Reporting Manager', width: '120' },
        // { field: 'reason', headerName: 'Reason' },
        // { field: 'statusUpdatereason', headerName: 'Status Update Reason', width: '180' },
        // { field: 'team', headerName: 'Team', width: '145' },
        // { field: 'city', headerName: 'City' },
        // { field: 'areaLocationLevel', headerName: 'Area/Location Level 1', width: '166' },
        // { field: 'locationLevel2', headerName: 'Location Level 2', width: '140' },
        // { field: 'locationLevel3', headerName: 'Location Level 3', width: '135' },
        // { field: 'locationLevel4', headerName: 'Location Level 4', width: '135' },
        // { field: 'newAddres', headerName: 'New Addres' },
        // { field: 'previousAssignEmp	', headerName: 'Previous Assign Emp', width: '160' },
        // { field: 'previousAssignTeam	', headerName: 'Previous Assign Team', width: '170' },
        // { field: 'reseller', headerName: 'Reseller', width: '146' },
        // { field: 'partner', headerName: 'Partner', width: '120' },
        // { field: 'chargeAmount', headerName: 'Charge Amount', width: '140' },
        // { field: 'settopBoxNo.', headerName: 'Settop Box No.', width: '130' },
        // { field: 'cardNo.', headerName: 'Card No.' },
        // { field: 'no.ofTV', headerName: 'No. of TV' },
        // { field: 'did', headerName: 'DID' },
        // { field: 'intercom', headerName: 'Intercom' },
        // { field: 'emailId', headerName: 'Email Id', width: '125' },
        // { field: 'updateAt', headerName: 'Update At', width: '97' },
        // { field: 'updateBy', headerName: 'Update By', width: '97' },
        // { field: 'forwardReason', headerName: 'Forward Reason', width: '130' },
        // { field: 'ticketType', headerName: 'Ticket Type', width: '108'},
        // { field: 'reOpen', headerName: 'ReOpen' }

    ]);

    // console.log(e, 'sahil important ')
    useEffect(() => {
        let rowsList = []
        let count = 0
        if (pageNo !== 1) {
            count = (pageNo - 1) * pageSize
        }
        for (let n of data) {
            count += 1
            rowsList.push({
                id: count,
                createdAt: n.created,
                ticketNo: n.ticketNo,
                customerName: n.customerName,
                totalInv: n.totalInvCollected,
                pendingInv: n.totalInvPending,
                collectedInv: n.totalInvCollected,
                accountStatus: n.accountStatus,
                address: n.address,
                mobile: n.mobileNo,
                altMobile: n.altMobileNo,
                status: n.status,
                lastModifiedRemark: n.remark,
                remark: n.remark,
                totalTime: n.totalTimeTaken,
                updatedAt: n.updated,
                inProgressDateTime: n.inprogressDatetime,
                softClosedTime: n.softCloseDatetime,
                diffbwInPrandSL: n.softCloseToCloseTimeDifference,
                service: n.service.name,
                department: n.departmentMaster.name,
                reportingManager: n.reportingManager,
                createdBy: n.createdByEmp.name,
                reason: n.reason,
                team: n.teamName,
                city: n.workLocationCity,
                partner: n.teamName,
                emailId: n.emailId,
                updateAt: n.updated,
                updateBy: n.updatedBy.name,
                ticketType: n.createdByType,
                reseller: n.crmPartner
            })
        }

        setRows(rowsList)
    }, [data])
    console.log("------------------", rows)
    console.log("...............", data);
    const fileName = 'download'
    const exportType = 'xls'
    const ExportToExcel = () => {
        if (rows != []) {
            var data = [...rows]
            exportFromJSON({ data, fileName, exportType })
        }
    }




    const updateFeildsColumns = (val, label) => {
        let obj = { field: val, headerName: label, width: 130 }
       // console.log(obj)
        setcolumns([
            ...columns,
                obj
            ])
        // console.log('========================',columns)
    }


 

    console.log("age",age)

    return (
        <>
            <div className='ticketname' >
                <h4>Tickets</h4>
            </div>
            <div className='ticketheader' style={{ width: "100%", float: "left", clear: "both" }} >
                <div className="container">
                    <div className="container_left" style={{ width: "80%", float: "left" }}>
                        <div className="row">
                            <div className=".col-md-" id='satss'>
                                <InputLabel id="demo-simple-select-label" className='labelgrey' > Select Status </InputLabel>
                                <Select feildName={'Select...'} data={tickets} onChange={()=>getStatusData(e)} setAge={setAge} age={age} />
                                {/* <MultiSelect  feildName={'Status'} data={tickets}/> */}
                            </div>
                            {/* <div className=".col-lg-" >

                            </div> */}
                            <div className=".col-lg-">
                                <InputLabel id="demo-simple-select-label" className='labelgrey'> Select Columns</InputLabel>
                                {/* <Select feildName={'Select Colmn'} data={cols} /> */}
                                <MultiSelect updateFeildsColumns={updateFeildsColumns} />

                            </div>
                            {/* <div className=".col-lg-" >

                            </div> */}
                            <div className=".col-sm-">
                                {/* <Select feildName={'Select Filter'} data={col} /> */}
                                <InputLabel id="demo-simple-select-label" className='labelgrey'>Filters</InputLabel>
                                {/* <MultiSelect /> */}

                            </div>
                            {/* <div className=".col-lg-" >
                                <>
                                </>
                            </div> */}

                        </div>
                    </div>
                    <div className="container_right" style={{ float: "left", width: "20%" }}>
                        <div className="row">

                            <div className=".col-sm-">

                            </div>
                            <div>

                            </div>
                            <div className=".col-sm" >
                                <button type="button" id='exexl' onClick={() => {
                                    ExportToExcel()
                                }} style={{ background: "red", color: "#ffff", borderRadius: "10px", padding: "7px 20px", float: "right", marginLeft: "10px", border: "none", marginTop: "10px", fontWeight: "500" }}> Export <span><i className="metismenu-icon pe-7s-next-2" /> </span> </button>
                            </div>
                            <div className=".col-sm-">
                                <button id='crtic' style={{ background: "red", color: "#ffff", borderRadius: "10px", padding: "7px 20px", float: "right", marginLeft: "10px", border: "none", marginTop: "10px" }} onClick={() => CreateTickets()}> Create Ticket </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='tickettable' >
                {loader ? <Loader /> : null}
                <DataTable columns={columns} rows={rows} pageSize={pageSize} rowsPerPageOptions={[20]} />
                <Pagination setPageNo={setPageNo} pageNo={pageNo} />
            </div>
        </>
    )
}
export default Tickets;

