import React, { Component } from "react";
import Categories from "./categories";
import Header from "../../components/header/index";
import Footer from "../../components/footer/index";

class Productcategories extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <>
                <div className="container"><Categories keywords={this.props.computedMatch.params.keywords}  Categorie={this.props} pageName={this.props.computedMatch.params.page_slug} /></div>

            </>
        )
    };
}
export default Productcategories;