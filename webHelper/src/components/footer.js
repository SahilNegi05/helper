import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { informationPage } from '../services/api/api.service';


const Footer = () => {
  const [data, getdata] = useState([])

  useEffect(() => {
    informationPage()
      .then((res) => {
        if (res.data.status == 200) {
          getdata(res.data.data)
        } else {
          getdata([])
        }
      })
  }, [])


  return (
    <div className="container_fluid footer">
      <div className="container">
        <ul>

          <li>
            <div>
              <h5>About Us</h5>
              {data.map((e) => (<p><NavLink to={`/detailPage/${e.pname.replace(' ','-').toLowerCase()}/${e.id}`}>{e.pname}</NavLink></p>))}
            </div>
          </li>
          <li>
            <h5>Follow Us</h5>
            <div className="social_media">
              <div className="fb"><i className="fa fa-facebook" aria-hidden="true"></i></div>
              <div className="gmail"><i className="fa fa-envelope" aria-hidden="true"></i></div>
              <div className="insta"> <i className="fa fa-instagram" aria-hidden="true"></i></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer;
