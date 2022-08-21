// export const colourOptions = [
//     { value: "orderid", label: "Order ID" },
//     { value: "billinglabel", label: "Billing label" },
//     { value: "date", label: "Date" },
//     { value: "total", label: "Total" },
//     { value: "paymentstatus", label: "Pmt Status" },
//     { value: "paymentmethod", label: "Pmt Method" },
//     { value: "action", label: "Action" }
//     ];
export const colourOptions = [


    {
        value: 'id',
        label: 'S.No'
    }, {
        value: 'createdAt',
        label: 'Created At'
    }, {
        value: 'ticketNo',
        label: 'Ticket No.'
    },
    { value: 'customerName', label: 'Customer Name' },
    { value: 'totalInv', label: 'Total Inv.' },
    { value: 'pendingInv', label: 'Pending Inv.' },
    { value: 'collectedInv.', label: 'Collected Inv.' },
    { value: 'accountStatus', label: 'Account Status' },
    { value: 'address', label: 'Address' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'altMobile	', label: 'Alt. Mobile' },
    { value: 'status', label: 'Status' },
    { value: 'lastModifiedRemark', label: 'LastModifiedRemark' },
    { value: 'remark', label: 'Remark' },
    { value: 'totalTime', label: 'Total Time' },
    { value: 'updatedAt', label: 'Updated At' },
    { value: 'assignToEmp', label: 'Assign To Emp.' },
    { value: 'followUpReason', label: 'Follow Up Reason' },
    { value: 'createdBy', label: 'Created By', width: '110' },
    { value: 'assignedTime', label: 'Assigned Time' },
    { value: 'inProgressByEmp', label: 'InProgress By Emp' },
    { value: 'inProgressDateTime', label: 'InProgress DateTime' },
    { value: 'softClosedByEmp', label: 'SoftClosed By Emp' },
    { value: 'softClosedFrom', label: 'SoftClosed From' },
    { value: 'softClosedReason', label: 'SoftClosed Reason' },
    { value: 'softClosedTime', label: 'SoftClosed Time' },
    { value: 'closedByEmp', label: 'Closed By Emp' },
    { value: 'closedReason', label: 'Closed Reason' },
    { value: 'closedTime', label: 'Closed Time' },
    { value: 'diffbwInPrandSL.', label: 'Diff b/w InPr. and SL.' },
    { value: 'diffb/wSCandC', label: 'Diff b/w SC and C' },
    { value: 'retainByEmp', label: 'Retain By Emp' },
    { value: 'tillTempDisc.', label: 'Till Temp Disc.' },
    { value: 'softDiss.By', label: 'Soft Diss. By' },
    { value: 'softDiss.DateTime', label: 'Soft Diss. DateTime' },
    { value: 'confirmDiss.By', label: 'Confirm Diss. By' },
    { value: 'confirmDiss.DateTime', label: 'Confirm Diss. DateTime' },
    { value: 'service', label: 'Service' },
    { value: 'department', label: 'Department' },
    { value: 'reportingManager', label: 'Reporting Manager' },
    { value: 'reason', label: 'Reason' },
    { value: 'statusUpdatereason', label: 'Status Update Reason' },
    { value: 'team', label: 'Team' },
    { value: 'city', label: 'City' },
    { value: 'areaLocationLevel', label: 'Area/Location Level 1' },
    { value: 'locationLevel2', label: 'Location Level 2' },
    { value: 'locationLevel3', label: 'Location Level 3' },
    { value: 'locationLevel4', label: 'Location Level 4' },
    { value: 'newAddres', label: 'New Addres' },
    { value: 'previousAssignEmp	', label: 'Previous Assign Emp' },
    { value: 'previousAssignTeam	', label: 'Previous Assign Team' },
    { value: 'reseller', label: 'Reseller' },
    { value: 'partner', label: 'Partner' },
    { value: 'chargeAmount', label: 'Charge Amount' },
    { value: 'settopBoxNo.', label: 'Settop Box No.' },
    { value: 'cardNo.', label: 'Card No.' },
    { value: 'no.ofTV', label: 'No. of TV' },
    { value: 'did', label: 'DID' },
    { value: 'intercom', label: 'Intercom' },
    { value: 'emailId', label: 'Email Id' },
    { value: 'updateAt', label: 'Update At' },
    { value: 'updateBy', label: 'Update By' },
    { value: 'forwardReason', label: 'Forward Reason' },
    { value: 'ticketType', label: 'Ticket Type' },
    { value: 'reOpen', label: 'ReOpen' }
];

const Col = [
    {
        label: 'Date Range',
        value: 'date_range'
    },
    {
        label: 'Upload At',
        value: 'upload_at'
    },
    {
        label: 'Upload By',
        value: 'upload_by'
    },
    {
        label: 'Ticket No',
        value: 'ticket_no'
    },
    {
        label: 'Crm User',
        value: 'crm_user'
    },
    {
        label: 'Mobile',
        value: 'mobile'
    },
    {
        label: 'Ticket Type',
        value: 'ticket_type'
    },
    {
        label: 'Prev Assign Team',
        value: 'prev_assign_team'
    },
    {
        label: 'Assign to Emp',
        value: 'assign_to_emp'
    }, {
        label: 'Created By',
        value: 'created_by'
    }, {
        label: 'Department',
        value: 'department'
    }, {
        label: 'Service',
        value: 'service'
    }, {
        label: 'Reason',
        value: 'reason'
    }, {
        label: 'City',
        value: 'city'
    }, {
        label: 'Area',
        value: 'area'
    }, {
        label: 'Partner',
        value: 'partner'
    }, {
        label: 'Reseller',
        value: 'reseller'
    }, {
        label: 'Source',
        value: 'source'
    }, {
        label: 'Intercom',
        value: 'intercom'
    }, {
        label: 'Did',
        value: 'did'
    }, {
        label: 'Soft Close By Emp',
        value: 'soft_close_by_emp'
    }, {
        label: 'Confirm Diss By Emp',
        value: 'confirm_diss_by_emp'
    }, {
        label: 'Repeated Ticket',
        value: 'repeated_ticket'
    }, {
        label: 'Soft Closed Date',
        value: 'soft_closed_date'
    }, {
        label: 'Assign Date',
        value: 'assign_date'
    }, {
        label: 'Close Date',
        value: 'close_date'
    }, {
        label: 'InProgress Date',
        value: 'inprogress_date'
    }, {
        label: 'Retain Date',
        value: 'retain_date'
    }, {
        label: 'Soft Disconnection Date',
        value: 'soft_disconnection_date'
    }, {
        label: 'Confirm Disconnection Date',
        value: 'confirm_disconnection_date'
    }, {
        label: 'Temp. Disc Till Date',
        value: 'temp_disc_till_date'
    }
];
