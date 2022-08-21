import React, { Component } from "react";
import { informationPage } from "../../services/api/api.service";
class Footer extends Component {
    constructor() {
        super()
        this.state = {
            footerInfo: []
        }
    }

    getProductService = () => {

    }
    componentDidMount() {
        this.getProductService()

    }

    render() {
        return (
            <div className="container_fluid footer">
                <div className="container">
                    <ul>
                        <li>
                            <div>
                                <h5>Popular Cities</h5>
                                <p>Delhi</p>
                                <p>Mumbai</p>
                                <p>Delhi</p>
                                <p>Mumbai</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h5>Trending Locations</h5>
                                <p>Delhi</p>
                                <p>Mumbai</p>
                                <p>Mumbai</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h5>About Us</h5>
                                <p>About Name Group</p>
                                <p>Careers</p>
                                <p>Contact Us</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h5>Site's Name</h5>
                                <p>Help</p>
                                <p>Sitemap</p>
                                <p>Blog</p>
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
        );
    }
}
export default Footer;