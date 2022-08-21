import React, { Fragment, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';


export default function TableUi() {
  const [columns, setcolumns] = useState({
    columns: [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'Name', headerName: 'Name', width: 130 },
      //  { field: 'Remark', headerName: 'Last name', width: 130 },
      // { field: 'TicketNum', headerName: 'TicketNum' },
    ],
  }
  )
    const[rows,setrows] = useState({
    rows: [
      { id: 1, Remark: 'Snow', Name: 'Jon', TicketNum: 35 },
      { id: 2, Remark: 'Lannister', Name: 'Cersei', TicketNum: 42 },
      { id: 3, Remark: 'Lannister', Name: 'Jaime', TicketNum: 45 },
      { id: 4, Remark: 'Stark', Name: 'Arya', TicketNum: 16 },
      { id: 5, Remark: 'Targaryen', Name: 'Daenerys', TicketNum: null },
      { id: 6, Remark: 'Melisandre', Name: null, TicketNum: 150 },
      { id: 7, Remark: 'Clifford', Name: 'Ferrara', TicketNum: 44 },
      { id: 8, Remark: 'Frances', Name: 'Rossini', TicketNum: 36 },
      { id: 9, Remark: 'Roxie', Name: 'Harvey', TicketNum: 65 },
      { id: 10, Remark: 'Snow', Name: 'Jon', TicketNum: 35 },
      { id: 11, Remark: 'Lannister', Name: 'Cersei', TicketNum: 42 },
      { id: 12, Remark: 'Lannister', Name: 'Jaime', TicketNum: 45 },
      { id: 13, Remark: 'Stark', Name: 'Arya', TicketNum: 16 },
      { id: 14, Remark: 'Targaryen', Name: 'Daenerys', TicketNum: null },
      { id: 15, Remark: 'Melisandre', Name: null, TicketNum: 150 },
      { id: 16, Remark: 'Clifford', Name: 'Ferrara', TicketNum: 44 },
      { id: 17, Remark: 'Frances', Name: 'Rossini', TicketNum: 36 },
      { id: 18, Remark: 'Roxie', Name: 'Harvey', TicketNum: 65 },
    ],
    checkedValue: []
  })
  const convertCamelcase = (e) => {
    // this e is transfering the value or you can say the name .
       console.log(e)
        let finalWord = null;
        finalWord = e.replaceAll(' ', '')
        return finalWord
      }
    

  const updateFeildsColumns = (e) => {
    if (e.target.checked) {
      let obj = { field: convertCamelcase(e.target.value), headerName: e.target.value, width: 130 }
      setcolumns({
        columns: [
          ...columns.columns,
          obj
        ]
      })
    } else {
      columns.columns.forEach((val, index) => {
        // console.log(val.headerName, e)
        if (val.headerName == e.target.value) {
          // console.log('Mathc');
          console.log(index, columns.columns);
          columns.columns.splice(index, 1);
          setcolumns({
            columns: [
              ...columns.columns
            ]
          })
        }
      })
    }
  }


  return (

    <Fragment>


      <div>
        <input type="checkbox" name='filter' value={'TicketNum'} style={{margin:10}} onChange={(e) =>{ updateFeildsColumns(e)}} /><label> Ticket Number </label>
        <input type="checkbox" name='filter' value={'Remark'} style={{margin:10}} onChange={(e) =>{ updateFeildsColumns(e)}} /><label> Remark </label>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows.rows}
          pageSize={5}
          columns={columns.columns}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>




    </Fragment>

  )
}