import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight } from "./Message";
// import mainFunc from "../highordercomponent.js";
const useStyles = makeStyles((theme = Theme) =>
  createStyles({
    paper: {
      width: "100%",
      height: "100%",
      maxWidth: "100%",
      maxHeight: "100%",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    paper2: {
      width: "100%",
      maxWidth: "100%",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    messagesBody: {
      width: "100%",
      margin: 0,
      overflowY: "scroll",
      height: "100%"
    }
  })
);

export default function MessageArea(props) {
  const [chatMainData, setChatMainData] = useState([]);
  useEffect(() => {
    if (props.ownerdata && props.ownerdata.chatData != []) {
      setChatMainData(props.ownerdata.chatData)
    }
  })
  const classes = useStyles();
  console.log(chatMainData);
  return (
    <div className={classes.container}>
      <Paper className={classes.paper} zDepth={2}>
        <Paper id="style-1" className={classes.messagesBody}>
          {chatMainData.length != 0 ? chatMainData.map((e) => {
            if (e.get_message) {
              return (
                <>
                  <MessageLeft
                    message={e.get_message}
                    timestamp={e.chatdate}
                    photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                    displayName={props.ownerdata.ownerName}
                    avatarDisp={false}
                  />
                </>
              )
            }
            else {
              return (
                <>
                  <MessageRight
                    message={e.message}
                    timestamp={e.chatdate}
                    photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                    displayName="You"
                    avatarDisp={false}
                  />
                </>
              )
            }
          }) : chatMainData.length == 0 ?
            <div><h3>No Chat Yet</h3></div> :
            null
          }
        </Paper>
        <TextInput saveData={props.ownerdata} />
      </Paper>
    </div>
  );
}
// export default mainFunc(MessageArea);