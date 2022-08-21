import React, { useEffect, useState } from "react";
import { ProductServiceByCustomerId, deletePost } from "../../services/api/api.service";
import { DataGrid } from '@mui/x-data-grid';
import Link from '@mui/material/Link';
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import { message } from '../../components/mesage'
import Alert from '@mui/material/Alert';
import { IMAGE_PATH } from '../../constants/path'
import { SUCCESS_TYPE, ERROR_TYPE, FAILED_TYPE, VALIDATION_TYPE } from '../../constants/message'

const ViewPost = () => {
    const [msg, saveMsg] = useState(null)
    const [categories, getCategories] = useState([]);
    const customer_id = useSelector((e) => e.user.userDetail.userId)

    const DeletePost = (product_id) => {
        deletePost(product_id).then((e) => {
            if (e.data.status == 200) {
                window.location.reload()
                saveMsg(SUCCESS_TYPE)
            } else {
                saveMsg(VALIDATION_TYPE)
            }
            console.log(e);
        })
            .catch((e) => saveMsg(ERROR_TYPE))
    }


    const [rows, setRows] = useState([]);
    const columns = [
        { field: 'serial', headerName: 'S.No.', width: 100, height: 400 },
        {
            field: "productimage",
            headerName: "Product Image",
            width: 160,
            height: 400,
            renderCell: (params) => {
                return (
                    <>
                        <img src={params.value.prodimage && params.value.prodimage != "NULL" ? params.value.prodimage : IMAGE_PATH + 'noimage.jpg'} />
                    </>
                );
            }
        },
        { field: 'name', headerName: 'Product Name', width: 500, height: 400 },
        {
            field: "viewbutton",
            headerName: "View",
            width: 160,
            renderCell: (params) => {
                return (
                    <>
                        <Link sx={{ width: 140 }} variant="outlined" href={`/update-post/` + params.value.dataname} color="inherit" value="params.value.dataname">
                            {params.value.buttonval}
                        </Link>
                        <input type="hidden" value={params.value.dataname}></input>
                    </>
                );
            }
        },
        {
            field: "Delete",
            headerName: "Delete Post",
            width: 160,
            renderCell: (params) => {
                return (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => DeletePost(params.row.viewbutton.dataname)}
                    >
                        Delete
                    </Button>
                );
            }
        }

    ];

    useEffect(() => {
        let arrayData = [];
        categories.map((e, i) => {
            let dataval = new Object;
            dataval.id = i + 1;
            dataval.serial = i + 1;
            e.img1 ? dataval.productimage = {
                prodimage: e.img1
            } : dataval.productimage = "No Image";
            dataval.name = e.title;
            dataval.viewbutton = {
                dataname: e.id,
                buttonval: "Edit Post"
            };
            arrayData.push(dataval);
        })
        setRows(arrayData);
    }, [categories])

    useEffect(() => {
        ProductServiceByCustomerId(customer_id)
            .then((response) => {
                if (response.status == 200) {
                    //  console.log("hello", response.data.data)
                    getCategories(response.data.data)
                }
            })
    }, [])

    console.log("categories", categories)
    return (
        <>
            {msg ? <Alert severity={msg}>{message(msg)}</Alert> : null}
            <div style={{ height: 800, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    renderCell={columns}
                    pageSize={13}
                    rowsPerPageOptions={[5]}

                />

            </div>
        </>
    )
}
export default ViewPost;

