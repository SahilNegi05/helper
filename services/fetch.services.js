import axios from "axios";
//import { toast } from "../Components/Toast/Toast";

export { _fetch as fetch };
let show = false;
let session = false;

function handleError(error, reject) {

  if (!error) {
    if (show === false) {
      show = true;
      // console.log("Something went wrong, Please try again");
    }
  }

  if (error) {
    let status = error.status;

    if (status === 401) {
      if (session === false) {
        session = true;
        setTimeout(() => {
        //  window.localStorage.clear();
       //   window.location.href = `/`;
        }, 1500);

        return /* toast.error */// console.log("Session expired, you are going to be logout");
      }
    }

    if (status === "404 Not Found") {
      return /* toast.error */// console.log("Internal Server Error.");
    }

    if (
      error.data.message ===
      "You are not authorised to perform this action."
    ) {
      setTimeout(() => {
      //  localStorage.clear();
      //  window.location.href = `/`;
      }, 2000);

      return /* toast.error */// console.log(error.data.message);
    }
  }

  // if (error) {
  //   toast.error(error.data.message);
  // }

  reject(error);

  return;
}

function handleResponse(successs, resolve) {
  resolve(successs);
  return;
}

function setMehod(method, path, body, options, params) {
  let config = {};
  if (options) {
    if (options) {
      config.headers = { ...options };
    //  // console.log('config.headers ', config.headers)
    }
  }
  params = params ? "?" + new URLSearchParams(params).toString() : "";
  if (method === "get" || method === "delete") {
    return axios[method](`${path}${params}`, config);
  }
  if (method === "post" || method === "put") {
    return axios[method](`${path}`, body, config);
  }
}

function _fetch(method, path, body, options, params) {
  return new Promise((resolve, reject) => {
    return setMehod(method, path, body, options, params)
      .then(function (response) {
        // console.log(JSON.stringify(response))
        handleResponse(response, resolve);
        return;
      })
      .catch(function (error) {
        // console.log(JSON.stringify(error))
        handleError(error.response, reject);
        return;
      });
  });
}
