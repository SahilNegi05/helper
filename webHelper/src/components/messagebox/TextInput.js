import React, { useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { SaveChat } from '../../services/api/api.service';
import { useState } from 'react';


const useStyles = makeStyles((theme = Theme) =>
    createStyles({
        wrapForm: {
            display: "flex",
            justifyContent: "center",
            width: "100%",
            margin: `${theme.spacing(0)} auto`
        },
        wrapText: {
            width: "100%"
        },
        button: {
            //margin: theme.spacing(1),
        },
    })
);


export const TextInput = (props) => {
    console.log(props);
    const classes = useStyles();
    const [data, setData] = useState(null);
    function messagefunc() {
        setData({
            ...props.saveData,
            uid: props.saveData.userId,
            product_id: props.saveData.productId,
            product_owner_id: props.saveData.ownerId,
            [event.target.name]: event.target.value
        })
    }
    console.log(data);
    function saveChatFunc() {
        SaveChat(data)
            .then((res) => {
                props.saveData.chatWork();
                console.log(res, document.getElementsByTagName('input'))
            })
            .then(() => {
                Object.values(document.getElementsByTagName('input')).map((e)=>{
                    console.log(e.value);
                    e.value="";
            })

    })
}
return (
    <>
        <form className={classes.wrapForm} noValidate autoComplete="off">
            <TextField
                id="standard-text"
                label="Please Type"
                className={classes.wrapText}
                onChange={messagefunc}
                name="message"
            />
            <Button variant="contained" color="primary" className={classes.button} onClick={saveChatFunc}>
                <SendIcon />
            </Button>
        </form>
    </>
)
}



