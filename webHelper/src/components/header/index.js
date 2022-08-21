import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { getGeoLocation, CategoriesService, authTokenExpiration } from '../../services/api/api.service'
import { Link, NavLink } from 'react-router-dom'
import { generatePageSlug } from '../../helper/pageSlug.helper'
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import { state } from "../state";
import { withRouter } from "react-router-dom";
import { IMAGE_PATH } from "../../constants/path";

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchData: [],
            searchKeywords: null,
            stateSearch: null,
            searchId: null,
            redirect: false,
            searchContainer: false,
            dropdown: false,
        }
    }

    openDropdown = () => {
        this.setState({
            dropdown: true
        })
    }
    closeDropdown = () => {
        this.setState({
            dropdown: false
        })
    }

    getGeoLocationData = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude
                const long = position.coords.longitude
                getGeoLocation(lat, long)
                    .then(res => res.data.results[0])
                    .then(data => {
                        return {
                            state: data.address_components[(data.address_components).length - 3].long_name,
                            pincode: data.address_components[(data.address_components).length - 1].long_name,
                        }
                    })
                    .then(({
                        state, pincode
                    }) => {
                        localStorage.setItem('pincode', pincode)
                        localStorage.setItem('state', state)
                    })
            });
        } else {
            console.log('Location Not Allowed')
        }
    }
    getCategoriesData = () => {
        CategoriesService()
            .then(res => {
                this.setState({
                    searchData: res.data.data
                })
            })
    }

    submitSearch = (e) => {
        e.preventDefault()
        // this.props.location.pathname('/search')

    }


    setSearchKeywords = (e) => {
        // console.log(e)
        this.setState({
            searchKeywords: (e.target.value).toLowerCase()
        })
        if (e.target.value.length !== 0) {
            this.setState({
                searchContainer: true
            })
        } else if (e.target.value.length == 0 || null || this.state.searchKeywords == null) {
            this.setState({
                searchContainer: false
            })
        }
    }
    setSearchData = (e, id) => {
        // console.log('setE',e)
        this.setState({
            ...this.state,
            searchKeywords: e,
            searchId: id,
            redirect: true
        })
        // console.log(this.props.history)

    }
    checkToken = (token) => {
        authTokenExpiration(token).then((response) => {
            if (response.status !== 200) {
                const token = localStorage.getItem('persist:primary');
                let tokendata = JSON.parse(token);
                let tokendataget = JSON.parse(tokendata.user).token

                if (tokendataget) {
                    console.log('visible')
                    localStorage.clear()
                    window.location.reload()
                }
            }
        })
    }

    logoutHandler() {

        const token = localStorage.getItem('persist:primary');
        let tokendata = JSON.parse(token);
        let tokendataget = JSON.parse(tokendata.user).token

        if (tokendataget) {
            localStorage.clear()
            window.location.reload()
        }

    }
    componentDidMount() {
        if (!(localStorage.getItem('pincode'))) {
            this.getGeoLocationData()
        }
        //  this.getGeoLocation()
        this.getCategoriesData()
        this.checkToken(this.props.token)
    }

    searchHandler = (e) => {
        this.setState({
            ...state,
            [e.target.id]: e.target.value
        })
        console.log(this.state.inputValue)
    }
    searchValue = () => {
        this.props.history.push(`/search/${this.state.inputValue}`);
    }

    render() {
        return (
            <>
                <div className="header_block">
                    <div className="container_fluid">
                        <div className="container">
                            <div className="header">
                                <div className="header_logo">
                                    <NavLink to="/">
                                        <h4>LG</h4>
                                    </NavLink>
                                </div>

                                <div className="header_categories">
                                    {/* {this.props.isDrawerOpen ? */}

                                    {this.props.token ? <div className="menu_btn_container drawer_dropdown">

                                        {this.state.dropdown ? <IconButton aria-label="delete" size="large" onClick={() => this.closeDropdown()}>
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton> : <IconButton aria-label="delete" size="large" onClick={() => this.openDropdown()}>
                                            <MenuIcon fontSize="inherit" />
                                        </IconButton>}
                                        {this.state.dropdown ? <ul>
                                            <li><NavLink to={'/chat'}>Chat</NavLink></li>
                                            <li><NavLink to={'/post-jobs'}>Post AD</NavLink></li>
                                            <li><NavLink to={'/view-post'}>View Post</NavLink></li>
                                            <li><NavLink to={'/change-password'}>Change Password</NavLink></li>

                                            <li><NavLink to={'/edit-profile'}>Edit Profile</NavLink></li>
                                            <li className="Logout_coursor" onClick={this.logoutHandler}>Logout</li>
                                        </ul> : null}

                                    </div> : null}


                                    <div className="search_btn_container searchHandler">
                                        <form>
                                            <input type="text" placeholder="Search" value={this.state.searchKeywords} onChange={(e) => this.searchHandler(e)} id="inputValue" />
                                            <button type="submit" onClick={this.searchValue}><i class="fa fa-search" aria-hidden="true"></i> </button>
                                        </form>
                                        {/* {this.state.searchContainer && <div className="search_suges">{this.state.searchKeywords && this.state.searchData
                                            .filter((e) => (e.name).toLowerCase().includes(this.state.searchKeywords))
                                            .map((e) => <li onClick={() => this.setSearchData(e.name, e.id)}><Link to={`/category/${generatePageSlug(e.name)}/${e.id}`}>{e.name}</Link></li>)}</div>} */}
                                    </div>
                                    <div className="location_btn_container">
                                        {localStorage.getItem('state')
                                        }
                                    </div>

                                    <div className="sell_btn_container">
                                        <NavLink to="/login">
                                            <i className="fa fa-plus-circle" aria-hidden="true"></i> <span>Sell</span>
                                        </NavLink>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.user.token
    }
}
export default connect(mapStateToProps)(withRouter(Header));