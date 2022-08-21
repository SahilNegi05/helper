import React, { Component } from "react";
import Homepage from "./home"
import Header from "../../components/header/index";
import Footer from "../../components/footer/index";



class Home extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <>

                <Homepage />

            </>
        );
    }
}

export default Home;