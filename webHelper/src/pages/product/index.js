import React, { Component } from "react";
import Product_Main from "./details";
import Header from "../../components/header/index";
import Footer from "../../components/footer/index";

class Product extends Component {
    constructor(props) {
        super(props)
    }
    render() {
       // console.log('asdfasdf',this.props.computedMatch.params)
        return (
            <>

                <Product_Main {...this.props.computedMatch.params}  />

            </>
        )
    };
}
export default Product;